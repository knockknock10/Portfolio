/**
 * Compact grouped technology metadata — BACKEND / Go · Gin · GORM style.
 * Secondary to the work itself: no logos, no proficiency claims.
 */
export default function TechStack({ stack, className = '' }) {
  return (
    <dl className={`grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {stack.map((group) => (
        <div key={group.label} className="rounded-lg bg-panel-raised/40 border border-white/[0.04] p-3">
          <dt className="font-mono text-[10px] tracking-[0.2em] text-accent font-medium uppercase">
            {group.label}
          </dt>
          <dd className="mt-1.5 font-mono text-[12px] text-fg leading-relaxed">
            {group.items.join(' · ')}
          </dd>
        </div>
      ))}
    </dl>
  )
}
