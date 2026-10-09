import SectionShell from '../components/SectionShell.jsx'
import { sections } from '../data/profile.js'

import ContributionCalendar from '../components/github/ContributionCalendar.jsx'
import GitHubProfile from '../components/github/GitHubProfile.jsx'
import RepositoryCard from '../components/github/RepositoryCard.jsx'
import ActivityItem from '../components/github/ActivityItem.jsx'
import { useGithubProof } from '../hooks/useGithub.js'

const config = sections.find((section) => section.id === 'proof')

/**
 * Proof of Work — live GitHub activity layer.
 * All data from internal /api/github/* endpoints (server-side GitHub calls).
 */
export default function ProofSection() {
  const {
    profile,
    repos,
    events,
    contributions,
    year,
    setYear,
    availableYears,
    username,
  } = useGithubProof()

  const totalContributions = contributions.data?.total ?? 0

  return (
    <SectionShell {...config} pending={null}>
      <div className="space-y-10 md:space-y-12">
        {/* GitHub Activity Header */}
        <div>
          <p className="text-xs font-medium tracking-wider text-muted uppercase">GitHub activity</p>
          {contributions.data ? (
            <p className="mt-2 text-2xl font-medium tracking-tight text-fg md:text-3xl">
              {totalContributions.toLocaleString()} contributions in {year}
            </p>
          ) : (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted" role="status">
              Public repositories and recent activity load below. The daily contribution calendar requires GitHub&apos;s authenticated contribution API.
            </p>
          )}
        </div>

        {/* Contribution Calendar */}
        {contributions.data && (
          <div className="relative max-w-full overflow-x-auto" aria-label="Contribution calendar wrapper">
            <ContributionCalendar
              data={contributions.data}
              year={year}
              onYearChange={setYear}
              availableYears={availableYears}
              error={contributions.error}
              loading={contributions.loading}
              stale={contributions.stale}
            />
          </div>
        )}

        {/* Profile Snapshot */}
        <div className="border-t border-line pt-6">
          <GitHubProfile data={profile.data} error={profile.error} loading={profile.loading} stale={profile.stale} />
        </div>

      {/* Selected Repositories — capped at 3 */}
        {repos.data?.length > 0 && (
          <div className="border-t border-line pt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium tracking-wider text-muted uppercase">Selected repositories</p>
              <a
                href={`https://github.com/${username}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent underline-offset-4 hover:underline"
              >
                View all ↗
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
              {repos.data.slice(0, 3).map((repo) => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
            </div>
            {repos.stale && (
              <p className="mt-3 text-[11px] text-dim" aria-live="polite">
                Showing cached repository data — live refresh pending.
              </p>
            )}
          </div>
        )}

        {/* Recent Activity — capped at 3 */}
        {events.data?.length > 0 && (
          <div className="border-t border-line pt-6">
            <p className="text-xs font-medium tracking-wider text-muted uppercase mb-4">
              Recent activity
            </p>
            <ul className="space-y-0" role="list" aria-label="Recent GitHub activity">
              {events.data.slice(0, 3).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </ul>
            <div className="mt-3 text-center">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent underline-offset-4 hover:underline"
              >
                View all activity on GitHub ↗
              </a>
              {events.stale && (
                <p className="mt-1 text-[11px] text-dim" aria-live="polite">
                  Showing cached activity — live refresh pending.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer link to GitHub */}
        <div className="border-t border-line pt-4 text-center">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline"
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            View full GitHub profile ↗
          </a>
        </div>
      </div>
    </SectionShell>
  )
}