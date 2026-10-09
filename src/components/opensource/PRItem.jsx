/**
 * PR state badge — accessible, not color-only.
 */
const PR_STATE_STYLES = {
  OPEN:   { bg: 'rgba(124,131,255,0.15)', fg: '#9BA3FF', border: 'rgba(124,131,255,0.30)', label: 'OPEN',   icon: '▸' },
  MERGED: { bg: 'rgba(137,87,229,0.15)',  fg: '#b47aff', border: 'rgba(137,87,229,0.30)',  label: 'MERGED', icon: '✓' },
  CLOSED: { bg: 'rgba(248,81,73,0.12)',   fg: '#f85149', border: 'rgba(248,81,73,0.30)',   label: 'CLOSED', icon: '✕' },
  DRAFT:  { bg: 'rgba(110,118,129,0.12)', fg: '#8b949e', border: 'rgba(110,118,129,0.30)', label: 'DRAFT',  icon: '✎' },
}

function PRStateBadge({ state, isDraft }) {
  const key = isDraft ? 'DRAFT' : state
  const style = PR_STATE_STYLES[key] || PR_STATE_STYLES.CLOSED
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] shrink-0"
      style={{ backgroundColor: style.bg, color: style.fg, border: `1px solid ${style.border}` }}
      aria-label={style.label}
    >
      <span aria-hidden="true">{style.icon}</span>
      {style.label}
    </span>
  )
}

/**
 * Single PR contribution item.
 */
export default function PRItem({ pr }) {
  // const isMerged = pr.state === 'MERGED'

  return (
    <li className="group py-3 border-t border-line last:border-b border-line first:border-t-0">
      <div className="flex items-start gap-3">
        <PRStateBadge state={pr.state} isDraft={pr.isDraft} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <a
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fg hover:text-accent transition-colors truncate"
            >
              {pr.title}
            </a>
            <span className="font-mono text-[11px] text-dim shrink-0">#{pr.number}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted">
            <a
              href={`https://github.com/${pr.repoName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] hover:text-fg transition-colors"
            >
              {pr.repoName}
            </a>
            <RelativeTime dateString={pr.mergedAt || pr.closedAt || pr.updatedAt || pr.createdAt} />
          </div>
          {pr.labels?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {pr.labels.slice(0, 4).map((label) => (
                <span key={label} className="rounded px-1.5 py-0.5 font-mono text-[10px] text-dim bg-panel border border-line">
                  {label}
                </span>
              ))}
              {pr.labels.length > 4 && (
                <span className="rounded px-1.5 py-0.5 font-mono text-[10px] text-dim">+{pr.labels.length - 4}</span>
              )}
            </div>
          )}
        </div>
        <a
          href={pr.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-dim hover:text-accent transition-colors"
        >
          View ↗
        </a>
      </div>
    </li>
  )
}

function RelativeTime({ dateString }) {
  if (!dateString) return <span className="text-dim">Unknown time</span>
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / 86_400_000)
  if (diffDays > 365) return <time dateTime={dateString} className="text-dim">{Math.floor(diffDays / 365)}y ago</time>
  if (diffDays > 30) return <time dateTime={dateString} className="text-dim">{Math.floor(diffDays / 30)}mo ago</time>
  if (diffDays > 0) return <time dateTime={dateString} className="text-dim">{diffDays}d ago</time>
  const diffHours = Math.floor(diffMs / 3_600_000)
  if (diffHours > 0) return <time dateTime={dateString} className="text-dim">{diffHours}h ago</time>
  return <time dateTime={dateString} className="text-dim">Just now</time>
}