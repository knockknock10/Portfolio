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
            className="flex items-center justify-between gap-4 rounded-lg border border-line bg-panel px-4 py-3 text-sm text-muted transition-colors duration-200 hover:border-line-hover hover:text-fg"
          >
            <span className="min-w-0 truncate">{link.label}</span>
            <span aria-hidden="true" className="font-mono text-xs text-accent">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
