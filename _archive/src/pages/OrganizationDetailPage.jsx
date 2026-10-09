import { Link, useParams } from 'react-router-dom'

import Layout from '../layouts/Layout.jsx'
import Container from '../components/Container.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

import PRItem from '../components/opensource/PRItem.jsx'
import IssueItem from '../components/opensource/IssueItem.jsx'
import { useOrganizationDetail } from '../hooks/useOpenSource.js'

export default function OrganizationDetailPage() {
  const { org } = useParams()
  const { org: orgData, prs, issues } = useOrganizationDetail(org)

  usePageMeta({
    title: orgData.data ? `Sanjeev Kumar — ${orgData.data.name} Contributions` : 'Sanjeev Kumar — Organization',
    description: orgData.data?.description
      ? `Contributions to ${orgData.data.name}: verified PRs, issues, and repositories.`
      : `Open-source contributions to ${org} with direct GitHub links.`,
  })

  if (orgData.loading) {
    return (
      <Layout>
        <main id="main">
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }}>
            <Container className="pb-12 pt-20 md:pb-16 md:pt-28">
              <Link
                to="/open-source"
                className="text-sm text-accent underline-offset-4 hover:underline mb-4 inline-block font-medium"
              >
                ← Back to Open Source
              </Link>
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{org}</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg md:text-5xl">
                Organization Contributions
              </h1>
            </Container>
          </div>
          <Container className="py-16 md:py-24 lg:py-28" aria-hidden="true">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl bg-panel p-5 animate-pulse"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <div className="size-12 rounded-xl bg-panel-raised mb-4" />
                  <div className="h-4 w-3/4 bg-line rounded" />
                  <div className="mt-2 h-3 w-1/2 bg-line rounded" />
                </div>
              ))}
            </div>
          </Container>
        </main>
      </Layout>
    )
  }

  if (orgData.error || !orgData.data) {
    return (
      <Layout>
        <main id="main">
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }}>
            <Container className="pb-12 pt-20 md:pb-16 md:pt-28">
              <Link
                to="/open-source"
                className="text-sm text-accent underline-offset-4 hover:underline mb-4 inline-block font-medium"
              >
                ← Back to Open Source
              </Link>
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{org}</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg md:text-5xl">
                Organization not found
              </h1>
            </Container>
          </div>
          <Container className="py-16 md:py-24 lg:py-28 text-center">
            <p className="text-muted">Unable to load organization data.</p>
            <Link to="/open-source" className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline">
              Back to Open Source
            </Link>
          </Container>
        </main>
      </Layout>
    )
  }

  const organization = orgData.data
  const prList = prs.data ?? []
  const issueList = issues.data ?? []

  return (
    <Layout>
      <main id="main">
        {/* Organization Header */}
        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }}>
          <Container className="pb-12 pt-20 md:pb-16 md:pt-28">
            <Link
              to="/open-source"
              className="text-sm text-accent underline-offset-4 hover:underline mb-5 inline-block font-medium"
            >
              ← Back to Open Source
            </Link>
            <div className="flex items-start gap-4 sm:gap-6">
              <a
                href={organization.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 size-16 rounded-xl overflow-hidden bg-panel-raised flex items-center justify-center"
                style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
                aria-label={`View ${organization.name} on GitHub`}
              >
                {organization.avatarUrl ? (
                  <img
                    src={organization.avatarUrl}
                    alt=""
                    className="size-full object-cover"
                    width={64}
                    height={64}
                  />
                ) : (
                  <svg className="size-10 text-muted" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                )}
              </a>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-fg">{organization.name}</h1>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">@{organization.login}</span>
                </div>
                {organization.description && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{organization.description}</p>
                )}
                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={organization.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent underline-offset-4 hover:underline"
                  >
                    <svg className="size-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                    </svg>
                    <span>View organization on GitHub ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-14 md:py-20 lg:py-24">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            <div
              className="rounded-xl bg-panel p-4 flex flex-col justify-between"
              style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <span className="font-semibold text-fg text-lg">{prList.length.toLocaleString()}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mt-1">Pull Requests</span>
            </div>
            <div
              className="rounded-xl bg-panel p-4 flex flex-col justify-between"
              style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <span className="font-semibold text-fg text-lg">{prList.filter(p => p.state === 'MERGED').length.toLocaleString()}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mt-1">Merged PRs</span>
            </div>
            <div
              className="rounded-xl bg-panel p-4 flex flex-col justify-between"
              style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <span className="font-semibold text-fg text-lg">{issueList.length.toLocaleString()}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mt-1">Issues Handled</span>
            </div>
            <div
              className="rounded-xl bg-panel p-4 flex flex-col justify-between"
              style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <span className="font-semibold text-fg text-lg">{organization.publicRepos?.length ?? 0}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim mt-1">Public Repos</span>
            </div>
          </div>

          {/* Pull Requests */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase font-medium">
                Pull Requests ({prList.length})
              </h2>
              <a
                href={`https://github.com/${organization.login}?q=author%3Aknockknock10+type%3Apr`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-accent underline-offset-4 hover:underline"
              >
                View all on GitHub ↗
              </a>
            </div>
            {prList.length > 0 ? (
              <ul className="space-y-0" role="list" aria-label="Pull requests">
                {prList.map((pr) => (
                  <PRItem key={pr.id} pr={pr} />
                ))}
              </ul>
            ) : (
              <div
                className="rounded-xl bg-panel p-6 text-center"
                style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
              >
                <p className="text-muted text-sm">No pull requests found in this organization.</p>
              </div>
            )}
          </section>

          {/* Issues */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase font-medium">
                Issues ({issueList.length})
              </h2>
              <a
                href={`https://github.com/${organization.login}?q=author%3Aknockknock10+type%3Aissue`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-accent underline-offset-4 hover:underline"
              >
                View all on GitHub ↗
              </a>
            </div>
            {issueList.length > 0 ? (
              <ul className="space-y-0" role="list" aria-label="Issues">
                {issueList.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} />
                ))}
              </ul>
            ) : (
              <div
                className="rounded-xl bg-panel p-6 text-center"
                style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
              >
                <p className="text-muted text-sm">No issues found in this organization.</p>
              </div>
            )}
          </section>

          {/* Repositories contributed to */}
          {organization.publicRepos?.length > 0 && (
            <section className="border-t border-white/[0.07] pt-10">
              <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase font-medium mb-5">
                Public Repositories ({organization.publicRepos.length})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {organization.publicRepos.slice(0, 6).map((repo) => (
                  <article
                    key={repo.nameWithOwner}
                    className="rounded-xl bg-panel p-4 flex flex-col justify-between"
                    style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-fg truncate text-[14px]">{repo.name}</h3>
                          {repo.description && (
                            <p className="mt-1 line-clamp-2 text-xs text-muted leading-relaxed">
                              {repo.description}
                            </p>
                          )}
                        </div>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center justify-center size-7 rounded-md border border-line text-muted hover:border-accent hover:text-accent transition-colors"
                          aria-label={`View ${repo.nameWithOwner} on GitHub`}
                        >
                          <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {repo.language && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]"
                          style={{
                            backgroundColor: `${(repo.languageColor || '#8b949e')}20`,
                            color: repo.languageColor || '#8b949e',
                          }}
                        >
                          <span className="size-1.5 rounded-full" style={{ backgroundColor: repo.languageColor || '#8b949e' }} />
                          {repo.language}
                        </span>
                      )}
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1 font-mono text-[11px] text-dim">
                          <svg className="size-3" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25Z" />
                          </svg>
                          {repo.stars.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>
    </Layout>
  )
}