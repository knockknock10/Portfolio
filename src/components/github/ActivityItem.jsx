import TextLink from '../TextLink.jsx'

/**
 * Activity item — compact, accessible, honest about GitHub's limited event window.
 * Data from transformers.toActivityModels
 */

const LABEL_STYLES = {
  PUSH:           { bg: 'rgba(124,131,255,0.12)', fg: '#9BA3FF', border: 'rgba(124,131,255,0.25)', label: 'PUSH' },
  CREATE:         { bg: 'rgba(63,185,80,0.12)',   fg: '#3fb950', border: 'rgba(63,185,80,0.25)',   label: 'CREATE' },
  DELETE:         { bg: 'rgba(248,81,73,0.12)',   fg: '#f85149', border: 'rgba(248,81,73,0.25)',   label: 'DELETE' },
  ISSUE:          { bg: 'rgba(210,153,34,0.12)',  fg: '#d29922', border: 'rgba(210,153,34,0.25)',  label: 'ISSUE' },
  'PULL REQUEST': { bg: 'rgba(137,87,229,0.12)',  fg: '#a371f7', border: 'rgba(137,87,229,0.25)',  label: 'PR' },
  COMMENT:        { bg: 'rgba(47,129,247,0.12)',  fg: '#2f81f7', border: 'rgba(47,129,247,0.25)',  label: 'COMMENT' },
  REVIEW:         { bg: 'rgba(163,113,247,0.12)', fg: '#a371f7', border: 'rgba(163,113,247,0.25)', label: 'REVIEW' },
  RELEASE:        { bg: 'rgba(247,120,186,0.12)', fg: '#f778ba', border: 'rgba(247,120,186,0.25)', label: 'RELEASE' },
  FORK:           { bg: 'rgba(110,118,129,0.12)', fg: '#8b949e', border: 'rgba(110,118,129,0.25)', label: 'FORK' },
  STAR:           { bg: 'rgba(210,153,34,0.12)',  fg: '#d29922', border: 'rgba(210,153,34,0.25)',  label: 'STAR' },
  PUBLIC:         { bg: 'rgba(110,118,129,0.12)', fg: '#8b949e', border: 'rgba(110,118,129,0.25)', label: 'PUBLIC' },
}

function ActivityBadge({ type }) {
  const style = LABEL_STYLES[type] || { bg: 'rgba(110,118,129,0.12)', fg: '#8b949e', border: 'rgba(110,118,129,0.25)', label: type }
  return (
    <span
      className="inline-flex items-center justify-center min-w-[3.5rem] h-5 rounded-md px-2 font-mono text-[10px] font-medium uppercase tracking-[0.1em] shrink-0"
      style={{ backgroundColor: style.bg, color: style.fg, border: `1px solid ${style.border}` }}
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
        <div className="mt-1 flex items-center gap-2.5 text-[12px]">
          {repoName && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-fg transition-colors"
            >
              {repoName}
            </a>
          )}
          <span className="text-dim/60">·</span>
          <RelativeTime dateString={activity.createdAt} />
          <a
            href={activity.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-dim hover:text-accent transition-colors"
          >
            View ↗
          </a>
        </div>
      </div>
    </li>
  )
}