
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
import { DEFAULT_GITHUB_USERNAME } from '../../shared/github-config.js'

const PAGE_TITLE = 'Sanjeev Kumar — Open Source'

const PAGE_DESCRIPTION =
  'Open-source contributions across organizations — verified pull requests, issues, and reviews with direct GitHub links.'

function PageHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-12 pt-28 sm:px-8 md:pb-16 md:pt-36 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Open Source
        </p>

        <div className="mt-4 max-w-4xl">
          <h1 className="text-4xl font-medium tracking-tight text-fg md:text-5xl lg:text-6xl">
            I contribute to codebases that exist outside my laptop.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted md:text-base">
            A verified record of repositories, organizations, pull requests,
            issues, and recent open-source work.
          </p>
        </div>
      </div>
    </header>
  )
}

function LoadingState() {
  return (
    <Layout>
      <main id="main" aria-busy="true" aria-live="polite">
        <PageHeader />

        <section
          className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-28"
          aria-label="Loading open-source data"
        >
          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-hidden="true"
          >
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="rounded-xl border border-line bg-panel p-5"
              >
                <div className="animate-pulse">
                  <div className="mb-4 size-12 rounded-xl border border-line bg-line/40" />

                  <div className="h-4 w-3/4 rounded bg-line/50" />

                  <div className="mt-3 h-3 w-1/2 rounded bg-line/40" />

                  <div className="mt-6 h-3 w-2/3 rounded bg-line/40" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}

function ErrorState() {
  const githubUsername =
    import.meta.env.VITE_GITHUB_USERNAME || DEFAULT_GITHUB_USERNAME

  return (
    <Layout>
      <main id="main">
        <PageHeader />

        <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-xl rounded-xl border border-line bg-panel p-8 text-center md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Temporarily unavailable
            </p>

            <h2 className="mt-3 text-xl font-medium tracking-tight text-fg">
              Open-source data could not be loaded.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              The page itself is still available. You can open the GitHub
              profile directly or return to the portfolio.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Back to home
              </Link>

              {githubUsername ? (
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Open GitHub ↗
                </a >
              ) : null}
            </div >
          </div >
        </section >
      </main >
    </Layout >
  )
}

function FilteredTimeline({ events }) {
  const { filteredEvents } = useFilters()

  const safeEvents = Array.isArray(filteredEvents)
    ? filteredEvents
    : Array.isArray(events)
      ? events
      : []

  return <ContributionTimeline events={safeEvents} />
}

function OrganizationSection({
  organizations,
  onOrganizationClick,
}) {
  const safeOrganizations = Array.isArray(organizations)
    ? organizations
    : []

  return (
    <section aria-labelledby="organizations-heading">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Open source
          </p>

          <h2
            id="organizations-heading"
            className="mt-2 text-2xl font-medium tracking-tight text-fg md:text-3xl"
          >
            Organizations I&apos;ve contributed to
          </h2>
        </div>

        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
          {safeOrganizations.length}{' '}
          {safeOrganizations.length === 1
            ? 'organization'
            : 'organizations'}
        </span>
      </div>

      {safeOrganizations.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {safeOrganizations.map((organization) => {
            const login = organization?.login

            const key =
              login ||
              organization?.id ||
              organization?.name

            if (!key) {
              return null
            }

            return (
              <OrganizationCard
                key={key}
                org={organization}
                onClick={onOrganizationClick}
              />
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-line bg-panel p-8 text-center">
          <p className="text-sm text-muted">
            No organizations found with verified contributions.
          </p>
        </div>
      )}
    </section>
  )
}

function TimelineSection({ events }) {
  const safeEvents = Array.isArray(events) ? events : []

  if (safeEvents.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="timeline-heading"
      className="border-t border-line pt-10 md:pt-12"
    >
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Recent work
          </p>

          <h2
            id="timeline-heading"
            className="mt-2 text-2xl font-medium tracking-tight text-fg md:text-3xl"
          >
            Contribution timeline
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Pull requests, issues, reviews, and other verified public
            activity, filtered by the controls below.
          </p>
        </div>

        <div className="shrink-0">
          <FilterBar />
        </div>
      </div>

      <FilteredTimeline events={safeEvents} />
    </section>
  )
}

function OpenSourceContent() {
  const navigate = useNavigate()

  const {
    organizations,
    summary,
    timeline,
  } = useOpenSource()

  usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })

  const organizationData = organizations?.data
  const summaryData = summary?.data
  const timelineData = timeline?.data

  const organizationsLoading = Boolean(
    organizations?.loading
  )

  const organizationsError = Boolean(
    organizations?.error
  )

  const handleOrganizationClick = (login) => {
    if (!login) {
      return
    }

    navigate(
      `/open-source/${encodeURIComponent(login)}`
    )
  }

  if (organizationsLoading) {
    return <LoadingState />
  }

  if (organizationsError) {
    return <ErrorState />
  }

  const organizationsList = Array.isArray(organizationData)
    ? organizationData
    : []

  const timelineList = Array.isArray(timelineData)
    ? timelineData
    : []

  return (
    <Layout>
      <main id="main">
        <PageHeader />

        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-28">
          <section aria-labelledby="summary-heading">
            <div className="mb-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Proof of work
              </p>

              <h2
                id="summary-heading"
                className="mt-2 text-2xl font-medium tracking-tight text-fg md:text-3xl"
              >
                Open-source activity, backed by GitHub.
              </h2>
            </div>

            <SummaryCounts counts={summaryData} />
          </section>

          <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
            <FilterProvider
              organizations={organizationsList}
              events={timelineList}
            >
              <OrganizationSection
                organizations={organizationsList}
                onOrganizationClick={handleOrganizationClick}
              />

              <TimelineSection events={timelineList} />
            </FilterProvider>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default function OpenSourcePage() {
  return <OpenSourceContent />
}
