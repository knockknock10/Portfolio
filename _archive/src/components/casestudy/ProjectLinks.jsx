/**
 * External links for a project (repo, live site, related repos).
 * Only rendered for URLs that actually exist in the data — never href="#".
 */
export default function ProjectLinks({ links }) {
  if (!links?.length) return null

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-xl bg-panel px-4 py-3.5 text-sm text-muted transition-all duration-200 hover:text-fg hover:border-accent/40"
            style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <span className="min-w-0 truncate font-medium">{link.label}</span>
            <span
              aria-hidden="true"
              className="font-mono text-xs text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
