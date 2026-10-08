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
            className="group flex min-w-0 flex-col gap-1 rounded-lg border border-line bg-panel px-5 py-4 transition-colors duration-200 hover:border-line-hover sm:max-w-[45%]"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              ← Previous
            </span>
            <span className="truncate text-sm font-medium text-fg">
              {previous.number} · {previous.title}
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block sm:max-w-[45%]" />
        )}
        {next && (
          <Link
            to={`/work/${next.id}`}
            className="group flex min-w-0 flex-col gap-1 rounded-lg border border-line bg-panel px-5 py-4 text-left transition-colors duration-200 hover:border-line-hover sm:max-w-[45%] sm:items-end sm:text-right"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              Next →
            </span>
            <span className="truncate text-sm font-medium text-fg">
              {next.number} · {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
