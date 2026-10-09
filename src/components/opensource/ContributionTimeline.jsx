/**
 * Compact, source-linked feed of public pull requests and issues.
 * Full titles wrap on small screens rather than being hidden by ellipses.
 */

function formatDate(value) {
  if (!value) return 'Date unavailable'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function TimelineEvent({ event }) {
  const isPR = event.type === 'PULL_REQUEST'
  const kind = isPR ? 'Pull request' : 'Issue'
  const state = event.state ? event.state.toLowerCase() : null

  return (
    <li className="contribution-row">
      <time className="contribution-date" dateTime={event.date || undefined}>
        {formatDate(event.date)}
      </time>

      <div className="min-w-0 flex-1">
        <div className="contribution-row-meta">
          <span>{kind}</span>
          {state && <span>{state}</span>}
          {event.number != null && <span>#{event.number}</span>}
        </div>

        <a
          href={event.url || (event.repoName ? `https://github.com/${event.repoName}` : 'https://github.com/knockknock10')}
          target="_blank"
          rel="noopener noreferrer"
          className="contribution-title"
        >
          {event.title || event.action || 'Open contribution'} <span aria-hidden="true">↗</span>
        </a>

        {event.repoName && (
          <a
            href={`https://github.com/${event.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contribution-repo"
          >
            {event.repoName}
          </a>
        )}
      </div>
    </li>
  )
}

export default function ContributionTimeline({ events, limit = 20 }) {
  if (!Array.isArray(events) || events.length === 0) {
    return (
      <p className="py-5 text-sm text-muted">
        No public pull requests or issues were returned for this account.
      </p>
    )
  }

  return (
    <ul className="contribution-timeline" role="list" aria-label="Contribution timeline">
      {events.slice(0, limit).map((event) => (
        <TimelineEvent
          key={event.id || `${event.type}-${event.repoName}-${event.number}-${event.date}`}
          event={event}
        />
      ))}
    </ul>
  )
}
