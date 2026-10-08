/**
 * Contribution timeline — chronological feed of PRs, issues, reviews.
 */

const EVENT_STYLES = {
  PULL_REQUEST: { color: 'var(--color-accent, #e6a23c)', icon: '⬿' },
  ISSUE: { color: '#d29922', icon: '◈' },
  REVIEW: { color: '#8957e5', icon: '☷' },
}

function TimelineEvent({ event }) {
  const style = EVENT_STYLES[event.type] || { color: '#6e7681', icon: '•' }
  const date = new Date(event.date)
  const month = date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
  const day = date.toLocaleDateString(undefined, { day: 'numeric' })

  return (
    <li className="relative pl-8 pb-8 last:pb-0">
      <div className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center">
        <span className="size-2 rounded-full" style={{ backgroundColor: style.color }} />
      </div>
      <div className="ml-1 border-l border-line pl-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">{month}</span>
          <span className="font-mono text-[11px] text-accent">{day}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-sm" style={{ color: style.color }} aria-hidden="true">
            {style.icon}
          </span>
          <div className="min-w-0">
            <p className="text-sm text-fg">{event.action}</p>
            <p className="mt-0.5 text-sm text-muted truncate">{event.title}</p>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-dim">
              <a
                href={`https://github.com/${event.repoName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase tracking-[0.18em] hover:text-fg transition-colors"
              >
                {event.repoName}
              </a>
              {event.number && <span className="font-mono">#{event.number}</span>}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function ContributionTimeline({ events, limit = 20 }) {
  if (!events?.length) {
    return (
      <div className="rounded-lg border border-line bg-panel p-6 text-center">
        <p className="text-muted">No recent contributions found.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-0" role="list" aria-label="Contribution timeline">
      {events.slice(0, limit).map((event) => (
        <TimelineEvent key={event.id || `${event.type}-${event.repoName}-${event.number}-${event.date}`} event={event} />
      ))}
    </ul>
  )
}