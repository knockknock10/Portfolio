/**
 * Issue state badge.
 */
const ISSUE_STATE_STYLES = {
  OPEN: { bg: '#d29922', fg: '#0a0a0b', label: 'OPEN', icon: '▸' },
  CLOSED: { bg: '#6e7681', fg: '#fff', label: 'CLOSED', icon: '✕' },
}

function IssueStateBadge({ state }) {
  const style = ISSUE_STATE_STYLES[state] || ISSUE_STATE_STYLES.CLOSED
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em]"
      style={{ backgroundColor: style.bg, color: style.fg }}
      aria-label={style.label}
    >
      <span aria-hidden="true">{style.icon}</span>
      {style.label}
    </span>
  )
}

/**
 * Role badge — distinguishes opened vs assigned.
 */
function RoleBadge({ role }) {
  const styles = {
    opened: { bg: '#3fb950', fg: '#0a0a0b', label: 'OPENED BY ME' },
    assigned: { bg: '#2f81f7', fg: '#fff', label: 'ASSIGNED TO ME' },
    commented: { bg: '#6e7681', fg: '#fff', label: 'COMMENTED' },
  }
  const style = styles[role] || styles.commented
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em]"
      style={{ backgroundColor: style.bg, color: style.fg }}
      aria-label={style.label}
    >
      {style.label}
    </span>
  )
}

/**
 * Single issue contribution item.
 */
export default function IssueItem({ issue }) {
  return (
    <li className="group py-3 border-t border-line last:border-b border-line first:border-t-0">
      <div className="flex items-start gap-3">
        <IssueStateBadge state={issue.state} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <a
              href={issue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fg hover:text-accent transition-colors truncate"
            >
              {issue.title}
            </a>
            <span className="font-mono text-[11px] text-dim shrink-0">#{issue.number}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted">
            <a
              href={`https://github.com/${issue.repoName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] hover:text-fg transition-colors"
            >
              {issue.repoName}
            </a>
            <RoleBadge role={issue.myRole} />
            <RelativeTime dateString={issue.closedAt || issue.updatedAt || issue.createdAt} />
          </div>
          {issue.labels?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {issue.labels.slice(0, 4).map((label) => (
                <span key={label} className="rounded px-1.5 py-0.5 font-mono text-[10px] text-dim bg-panel border border-line">
                  {label}
                </span>
              ))}
              {issue.labels.length > 4 && (
                <span className="rounded px-1.5 py-0.5 font-mono text-[10px] text-dim">+{issue.labels.length - 4}</span>
              )}
            </div>
          )}
        </div>
        <a
          href={issue.url}
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