import { Link, useNavigate } from 'react-router-dom'

import SectionShell from '../components/SectionShell.jsx'
import { sections } from '../data/profile.js'

import OrganizationCard from '../components/opensource/OrganizationCard.jsx'
import ContributionTimeline from '../components/opensource/ContributionTimeline.jsx'
import { useOpenSource } from '../hooks/useOpenSource.js'

const config = sections.find((section) => section.id === 'open-source')

/**
 * Homepage preview of open-source work — organizations + recent contributions.
 */
export default function OpenSourceSection() {
  const navigate = useNavigate()
  const { organizations, timeline } = useOpenSource()

  const topOrgs = organizations.data?.slice(0, 4) ?? []
  const recentEvents = timeline.data?.slice(0, 5) ?? []

  if (organizations.loading) {
    return (
      <SectionShell {...config} pending={null}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-panel p-5 animate-pulse"
              style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <div className="size-11 rounded-lg bg-panel-raised mb-4" />
              <div className="h-4 w-3/4 bg-line rounded" />
              <div className="mt-2 h-3 w-1/2 bg-line rounded" />
            </div>
          ))}
        </div>
      </SectionShell>
    )
  }

  if (organizations.error) {
    // Distinguish a failed request from genuinely having no contributions.
    return (
      <SectionShell {...config} pending={null}>
        <div className="text-center py-8">
          <p className="text-muted text-sm">
            Open-source data is temporarily unavailable — the full page has
            retry details.
          </p>
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

  if (!topOrgs.length) {
    return (
      <SectionShell {...config} pending={null}>
        <div className="text-center py-8">
          <p className="text-muted text-sm">No open-source contributions found.</p>
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
      <div className="space-y-10">
        {/* Organizations preview */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase font-medium">
              Organizations I&apos;ve contributed to
            </p>
            <Link
              to="/open-source"
              className="font-mono text-xs text-accent underline-offset-4 hover:underline"
            >
              View all ({organizations.data?.length ?? 4}) ↗
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topOrgs.map((org) => (
              <OrganizationCard
                key={org.login}
                org={org}
                onClick={(login) => navigate(`/open-source/${encodeURIComponent(login)}`)}
              />
            ))}
          </div>
        </div>

        {/* Recent contributions preview */}
        {recentEvents.length > 0 && (
          <div className="border-t border-white/[0.07] pt-8">
            <div className="flex items-center justify-between mb-5">
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase font-medium">
                Recent verified contributions
              </p>
              <Link
                to="/open-source"
                className="font-mono text-xs text-accent underline-offset-4 hover:underline"
              >
                View all timeline ↗
              </Link>
            </div>
            <ContributionTimeline events={recentEvents} limit={5} />
          </div>
        )}

        {/* Link to full page */}
        <div className="border-t border-white/[0.07] pt-6 text-center">
          <Link
            to="/open-source"
            className="inline-flex items-center gap-2 text-sm text-accent font-medium underline-offset-4 hover:underline"
          >
            <span>View all open-source contributions</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </SectionShell>
  )
}