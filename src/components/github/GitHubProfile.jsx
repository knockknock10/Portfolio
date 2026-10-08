import TextLink from '../TextLink.jsx'

/**
 * Compact GitHub profile snapshot.
 * Data from /api/github?resource=profile
 */
export default function GitHubProfile({ data, error, loading }) {
  if (loading) {
    return (
      <div className="flex items-center gap-4" aria-hidden="true">
        <div className="size-12 rounded-full bg-line animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-line animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-line animate-pulse" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-line flex items-center justify-center">
          <svg className="size-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted">GitHub profile temporarily unavailable.</p>
          <TextLink href="https://github.com/knockknock10" external className="mt-1">
            View GitHub ↗
          </TextLink>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-4">
      <a href={data.htmlUrl} target="_blank" rel="noopener noreferrer" aria-label={`View @${data.login} on GitHub`}>
        <img
          src={data.avatarUrl}
          alt=""
          className="size-12 rounded-full border border-line"
          width={48}
          height={48}
        />
      </a>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <a
            href={data.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-fg hover:text-accent transition-colors"
          >
            @{data.login}
          </a>
          {data.name && <span className="text-sm text-muted">{data.name}</span>}
        </div>
        {data.bio && <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">{data.bio}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
          {data.location && <span>{data.location}</span>}
          {data.company && <span>{data.company}</span>}
          {data.followers != null && <span>👥 {data.followers.toLocaleString()}</span>}
          {data.publicRepos != null && <span>📦 {data.publicRepos.toLocaleString()}</span>}
        </div>
        <TextLink href={data.htmlUrl} external className="mt-3 text-sm">
          View GitHub profile ↗
        </TextLink>
      </div>
    </div>
  )
}