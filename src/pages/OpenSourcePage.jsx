import { Link, useNavigate } from 'react-router-dom'

import Layout from '../layouts/Layout.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

import OrganizationCard from '../components/opensource/OrganizationCard.jsx'
import ContributionTimeline from '../components/opensource/ContributionTimeline.jsx'
import SummaryCounts from '../components/opensource/SummaryCounts.jsx'
import { FilterProvider } from '../components/opensource/FilterProvider.jsx'
import { useFilters } from '../components/opensource/useFilters.jsx'
import { FilterBar } from '../components/opensource/Filters.jsx'
import { useOpenSource } from '../hooks/useOpenSource.js'

/**
 * Reads the filtered events off the filter context. Has to live inside
 * FilterProvider — the provider computes filteredEvents, but the page itself
 * only has the unfiltered timeline.
 */
function FilteredTimeline() {
  const { filteredEvents } = useFilters()
  return <ContributionTimeline events={filteredEvents} />
}

function OpenSourceContent() {
  const navigate = useNavigate()
  const { organizations, summary, timeline } = useOpenSource()

  usePageMeta({
    title: 'Sanjeev Kumar — Open Source',
    description: 'Open-source contributions across organizations — verified PRs, issues, and reviews with direct GitHub links.',
  })

  const handleOrgClick = (login) => navigate(`/open-source/${login}`)

  if (organizations.loading) {
    return (
      <Layout>
        <main id="main">
          <div className="border-b border-line">
            <div className="pb-12 pt-28 md:pb-16 md:pt-36">
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Open Source</p>
              <h1 className="mt-4 text-4xl font-medium tracking-tight text-fg md:text-5xl">
                I contribute to codebases that exist outside my laptop.
              </h1>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg border border-line bg-panel p-5 animate-pulse">
                  <div className="size-12 rounded-lg border border-line mb-4" />
                  <div className="h-4 w-3/4 bg-line rounded" />
                  <div className="mt-2 h-3 w-1/2 bg-line rounded" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </Layout>
    )
  }

  if (organizations.error) {
    return (
      <Layout>
        <main id="main">
          <div className="border-b border-line">
            <div className="pb-12 pt-28 md:pb-16 md:pt-36">
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Open Source</p>
              <h1 className="mt-4 text-4xl font-medium tracking-tight text-fg md:text-5xl">
                I contribute to codebases that exist outside my laptop.
              </h1>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28 text-center">
            <p className="text-muted">Unable to load open-source data.</p>
            <Link to="/" className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline">
              Back to homepage
            </Link>
          </div>
        </main>
      </Layout>
    )
  }

  const orgs = organizations.data ?? []

  return (
    <Layout>
      <main id="main">
        <div className="border-b border-line">
          <div className="pb-12 pt-28 md:pb-16 md:pt-36">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Open Source</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-fg md:text-5xl">
              I contribute to codebases that exist outside my laptop.
            </h1>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
          <SummaryCounts counts={summary.data} />

          <FilterProvider organizations={orgs} events={timeline.data}>
            <div className="mt-8 space-y-10">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                    Organizations I've contributed to
                  </p>
                  <span className="font-mono text-[11px] text-dim">{orgs.length} organizations</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {orgs.map((org) => (
                    <OrganizationCard key={org.login} org={org} onClick={handleOrgClick} />
                  ))}
                </div>
                {orgs.length === 0 && (
                  <div className="rounded-lg border border-line bg-panel p-6 text-center">
                    <p className="text-muted">No organizations found with verified contributions.</p>
                  </div>
                )}
              </div>

              {timeline.data?.length > 0 && (
                <div className="border-t border-line pt-8">
                  <FilterBar />
                  <FilteredTimeline />
                </div>
              )}
            </div>
          </FilterProvider>
        </div>
      </main>
    </Layout>
  )
}

export default function OpenSourcePage() {
  return <OpenSourceContent />
}