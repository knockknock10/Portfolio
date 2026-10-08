/**
 * Editorial section heading: monospace index, tracked title, hairline rule, optional meta.
 */
export default function SectionHeading({ index, title, intent, meta }) {
  return (
    <header>
      <div className="flex items-center gap-4 md:gap-6">
        <span className="font-mono text-xs tracking-[0.1em] text-accent tabular-nums">
          {index}
        </span>
        <h2 className="text-[0.9375rem] font-medium tracking-[0.18em] text-fg uppercase md:text-base">
          {title}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        {meta && (
          <span className="hidden font-mono text-[11px] tracking-[0.14em] text-dim uppercase md:inline">
            {meta}
          </span>
        )}
      </div>
      {intent && (
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted md:mt-6 md:text-base">
          {intent}
        </p>
      )}
    </header>
  )
}
