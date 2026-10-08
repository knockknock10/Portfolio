import { Link } from 'react-router-dom'

import SectionShell from '../components/SectionShell.jsx'
import { sections } from '../data/profile.js'

import OrganizationCard from '../components/opensource/OrganizationCard.jsx'
import ContributionTimeline from '../components/opensource/ContributionTimeline.jsx'
// import SummaryCounts from '../components/opensource/SummaryCounts.jsx' // unused in preview
import { FilterProvider } from '../components/opensource/FilterProvider.jsx'
import { FilterBar } from '../components/opensource/Filters.jsx'
import { useOpenSource } from '../hooks/useOpenSource.js'

const config = sections.find((section) => section.id === 'open-source')

/**
 * Homepage preview of open-source work — 2-4 orgs + 3-5 recent contributions.
 */
export default function OpenSourceSection() {
  const { organizations, timeline } = useOpenSource()

  const topOrgs = organizations.data?.slice(0, 4) ?? []
  const recentEvents = timeline.data?.slice(0, 5) ?? []

  if (organizations.loading) {
    return (
      <SectionShell {...config} pending={null}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border border-line bg-panel p-5 animate-pulse">
              <div className="size-12 rounded-lg border border-line mb-4" />
              <div className="h-4 w-3/4 bg-line rounded" />
              <div className="mt-2 h-3 w-1/2 bg-line rounded" />
            </div>
          ))}
        </div>
      </SectionShell>
    )
  }

  if (organizations.error || !topOrgs.length) {
    return (
      <SectionShell {...config} pending={null}>
        <div className="text-center py-8">
          <p className="text-muted">No open-source contributions found.</p>
          <Link
            to="/open-source"
            className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            View open-source page ↗
          </Link>
        </div>
      </SectionShell>
    )
  }

  return (
    <SectionShell {...config} pending={null}>
      <div className="space-y-8">
        {/* Organizations preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Organizations I've contributed to</p>
            <Link
              to="/open-source"
              className="text-sm text-accent underline-offset-4 hover:underline"
            >
              View all ↗
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topOrgs.map((org) => (
              <OrganizationCard key={org.login} org={org} onClick={(login) => window.location.href = `/open-source/${login}`} />
            ))}
          </div>
        </div>

        {/* Recent contributions preview */}
        {recentEvents.length > 0 && (
          <div className="border-t border-line pt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Recent contributions</p>
              <Link
                to="/open-source"
                className="text-sm text-accent underline-offset-4 hover:underline"
              >
                View all ↗
              </Link>
            </div>
            <ContributionTimeline events={recentEvents} limit={5} />
          </div>
        )}

        {/* Link to full page */}
        <div className="border-t border-line pt-4 text-center">
          <Link
            to="/open-source"
            className="inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline"
          >
            Explore open-source work →
          </Link>
        </div>
      </div>
    </SectionShell>
  )
}