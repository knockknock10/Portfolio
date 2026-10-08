/**
 * Compact grouped technology metadata — BACKEND / Go · Gin · GORM style.
 * Secondary to the work itself: no logos, no proficiency claims.
 */
export default function TechStack({ stack, className = '' }) {
  return (
    <dl className={`grid gap-x-8 gap-y-4 sm:grid-cols-2 ${className}`}>
      {stack.map((group) => (
        <div key={group.label}>
          <dt className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
            {group.label}
          </dt>
          <dd className="mt-1.5 text-sm text-muted">
            {group.items.join(' · ')}
          </dd>
        </div>
      ))}
    </dl>
  )
}
