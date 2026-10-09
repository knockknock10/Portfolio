import { Link } from 'react-router-dom'

/**
 * Previous / next case-study navigation, wrapping to the ends of the list.
 */
export default function ProjectNavigation({ previous, next }) {
  return (
    <nav aria-label="Project navigation" className="border-t border-line py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {previous ? (
          <Link
            to={`/work/${previous.id}`}
            className="group flex min-w-0 flex-col gap-1 rounded-xl bg-panel px-5 py-4 transition-all duration-200 sm:max-w-[45%]"
            style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              ← Previous
            </span>
            <span className="truncate text-sm font-semibold text-fg group-hover:text-accent transition-colors">
              {previous.number} · {previous.title}
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block sm:max-w-[45%]" />
        )}
        {next && (
          <Link
            to={`/work/${next.id}`}
            className="group flex min-w-0 flex-col gap-1 rounded-xl bg-panel px-5 py-4 text-left transition-all duration-200 sm:max-w-[45%] sm:items-end sm:text-right"
            style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Next →
            </span>
            <span className="truncate text-sm font-semibold text-fg group-hover:text-accent transition-colors">
              {next.number} · {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
