import TextLink from '../TextLink.jsx'

/**
 * Language color mapping — same palette GitHub uses (approx).
 */
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Dart: '#00B4AB',
  Kotlin: '#7F52FF',
  Swift: '#FA7343',
}

function LanguageBadge({ language }) {
  if (!language) return null
  const color = LANGUAGE_COLORS[language] || '#8b949e'
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {language}
    </span>
  )
}

function RelativeTime({ dateString }) {
  if (!dateString) return <span className="text-dim">Unknown</span>
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / 86_400_000)
  const diffHours = Math.floor(diffMs / 3_600_000)

  if (diffDays > 365) return <span className="text-dim">{Math.floor(diffDays / 365)}y ago</span>
  if (diffDays > 30)  return <span className="text-dim">{Math.floor(diffDays / 30)}mo ago</span>
  if (diffDays > 0)   return <span className="text-dim">{diffDays}d ago</span>
  if (diffHours > 0)  return <span className="text-dim">{diffHours}h ago</span>
  return <span className="text-dim">Just now</span>
}

/**
 * Repository card — compact editorial layout.
 */
export default function RepositoryCard({ repo }) {
  const isPinned = repo.pinned

  return (
    <article
      className={[
        'group rounded-xl border bg-panel p-4 min-w-0',
        'transition-all duration-250',
        isPinned
          ? 'border-accent/25 hover:border-accent/40'
          : 'border-line hover:border-line-hover',
        'hover:-translate-y-0.5',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-start gap-2">
            <h3 className="min-w-0 flex-1 break-words [overflow-wrap:anywhere] font-semibold text-[13px] leading-5 text-fg group-hover:text-accent transition-colors duration-200">
              {repo.fullName}
            </h3>
            {isPinned && (
              <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium text-accent bg-accent/10 border border-accent/20">
                Pinned
              </span>
            )}
          </div>
          {repo.description && (
            <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-muted">
              {repo.description}
            </p>
          )}
        </div>

        {/* GitHub link */}
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            'shrink-0 inline-flex items-center justify-center size-7 rounded-md',
            'border border-line bg-transparent text-muted',
            'transition-all duration-200',
            'hover:border-accent/40 hover:text-accent hover:bg-accent/5',
          ].join(' ')}
          aria-label={`View ${repo.fullName} on GitHub`}
        >
          <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
        </a>
      </div>

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <LanguageBadge language={repo.language} />
        {repo.stars > 0 && (
          <span className="flex items-center gap-1 font-mono text-[11px] text-dim">
            <svg className="size-3" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25Z" />
            </svg>
            {repo.stars.toLocaleString()}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="flex items-center gap-1 font-mono text-[11px] text-dim">
            <svg className="size-3" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0Zm0 9.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0ZM3 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2Zm10.75-5.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0ZM3 3a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V3Zm1.5 1.5v4h9v-4h-9Z" />
            </svg>
            {repo.forks.toLocaleString()}
          </span>
        )}
      </div>

      {repo.pushedAt && (
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-dim">
          <span>Updated</span>
          <RelativeTime dateString={repo.pushedAt} />
        </div>
      )}
    </article>
  )
}