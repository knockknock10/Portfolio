import TextLink from '../TextLink.jsx'

/**
 * Activity item — compact, accessible, honest about GitHub's limited event window.
 * Data from transformers.toActivityModels
 */

const LABEL_STYLES = {
  PUSH: { bg: 'var(--color-accent, #e6a23c)', fg: 'var(--color-bg, #0a0a0b)', label: 'PUSH' },
  CREATE: { bg: '#3fb950', fg: '#0a0a0b', label: 'CREATE' },
  DELETE: { bg: '#f85149', fg: '#fff', label: 'DELETE' },
  ISSUE: { bg: '#d29922', fg: '#0a0a0b', label: 'ISSUE' },
  'PULL REQUEST': { bg: '#8957e5', fg: '#fff', label: 'PR' },
  COMMENT: { bg: '#2f81f7', fg: '#fff', label: 'COMMENT' },
  REVIEW: { bg: '#a371f7', fg: '#fff', label: 'REVIEW' },
  RELEASE: { bg: '#f778ba', fg: '#fff', label: 'RELEASE' },
  FORK: { bg: '#6e7681', fg: '#fff', label: 'FORK' },
  STAR: { bg: '#d29922', fg: '#0a0a0b', label: 'STAR' },
  PUBLIC: { bg: '#6e7681', fg: '#fff', label: 'PUBLIC' },
}

function ActivityBadge({ type }) {
  const style = LABEL_STYLES[type] || { bg: '#6e7681', fg: '#fff', label: type }
  return (
    <span
      className="inline-flex items-center justify-center min-w-[4rem] h-5 rounded px-2 font-mono text-[10px] font-medium uppercase tracking-[0.1em]"
      style={{ backgroundColor: style.bg, color: style.fg }}
      aria-label={style.label}
    >
      {style.label}
    </span>
  )
}

function RelativeTime({ dateString }) {
  if (!dateString) return <span className="text-dim">Unknown time</span>
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMs / 3_600_000)
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffDays > 0) return <time dateTime={dateString} className="text-dim">{diffDays}d ago</time>
  if (diffHours > 0) return <time dateTime={dateString} className="text-dim">{diffHours}h ago</time>
  if (diffMins > 0) return <time dateTime={dateString} className="text-dim">{diffMins}m ago</time>
  return <time dateTime={dateString} className="text-dim">Just now</time>
}

export default function ActivityItem({ activity }) {
  const repoName = activity.repoName
  const repoUrl = repoName ? `https://github.com/${repoName}` : activity.url

  return (
    <li className="group flex items-start gap-3 py-3 border-t border-line last:border-b border-line first:border-t-0">
      <ActivityBadge type={activity.label} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-fg">{activity.action}</p>
        {activity.detail && <p className="mt-0.5 text-sm text-muted truncate">{activity.detail}</p>}
        <div className="mt-1.5 flex items-center gap-2">
          {repoName && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim hover:text-fg transition-colors"
            >
              {repoName}
            </a>
          )}
          <RelativeTime dateString={activity.createdAt} />
          <a
            href={activity.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-dim hover:text-accent transition-colors"
          >
            View ↗
          </a>
        </div>
      </div>
    </li>
  )
}