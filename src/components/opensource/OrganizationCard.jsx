/**
 * Organization card — preserves real names, avatars, stats, and URLs.
 * Solid surface, not translucent. Hover: subtle elevation + accent.
 */
export default function OrganizationCard({ org, onClick }) {
  const handleClick = (e) => {
    e.preventDefault()
    onClick?.(org.login)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e)
    }
  }

  return (
    <article
      className={[
        'group rounded-xl border bg-panel p-5 min-w-0 cursor-pointer',
        'transition-all duration-250',
        'border-line hover:border-line-hover',
        'hover:-translate-y-0.5',
        'hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)]',
      ].join(' ')}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-start gap-3.5">
        {/* Avatar */}
        <a
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={[
            'shrink-0 size-11 rounded-lg overflow-hidden',
            'border border-line bg-panel-raised',
            'flex items-center justify-center',
          ].join(' ')}
          aria-label={`View ${org.name} on GitHub`}
        >
          {org.avatarUrl ? (
            <img
              src={org.avatarUrl}
              alt=""
              className="size-full object-cover"
              width={44}
              height={44}
              loading="lazy"
            />
          ) : (
            <svg className="size-7 text-muted" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          )}
        </a>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 min-w-0">
            <h3 className="font-semibold text-[14px] text-fg group-hover:text-accent transition-colors duration-200 truncate">
              {org.name}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim shrink-0">
              @{org.login}
            </span>
          </div>

          {org.description && (
            <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-muted">
              {org.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
            <span>{org.prCount} PR{org.prCount !== 1 ? 's' : ''}</span>
            <span>{org.issueCount} issue{org.issueCount !== 1 ? 's' : ''}</span>
            <span>{org.repoCount} repo{org.repoCount !== 1 ? 's' : ''}</span>
          </div>

          {org.latestActivity && (
            <div className="mt-2 flex items-center gap-2 text-[12px] text-muted">
              <span className="text-dim">Latest:</span>
              <span className="truncate max-w-[180px]">{org.repositories?.[0] || 'Activity'}</span>
              <RelativeTime dateString={org.latestActivity} />
            </div>
          )}
        </div>

        {/* External link icon */}
        <a
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={[
            'shrink-0 inline-flex items-center justify-center size-7 rounded-md',
            'border border-line bg-transparent text-muted',
            'transition-all duration-200',
            'hover:border-accent/40 hover:text-accent hover:bg-accent/5',
          ].join(' ')}
          aria-label={`View ${org.name} on GitHub`}
        >
          <svg className="size-3.5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
        </a>
      </div>
    </article>
  )
}

function RelativeTime({ dateString }) {
  if (!dateString) return null
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / 86_400_000)
  if (diffDays > 365) return <span className="text-dim">{Math.floor(diffDays / 365)}y ago</span>
  if (diffDays > 30)  return <span className="text-dim">{Math.floor(diffDays / 30)}mo ago</span>
  if (diffDays > 0)   return <span className="text-dim">{diffDays}d ago</span>
  const diffHours = Math.floor(diffMs / 3_600_000)
  if (diffHours > 0)  return <span className="text-dim">{diffHours}h ago</span>
  return <span className="text-dim">Just now</span>
}