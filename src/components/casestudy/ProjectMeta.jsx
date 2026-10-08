/**
 * Compact project metadata row: category and status, as mono labels.
 */
export default function ProjectMeta({ project, className = '' }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] ${className}`}
    >
      <span className="text-dim">Status</span>
      <span className="text-muted">{project.status}</span>
    </div>
  )
}
