/**
 * SectionHeading — clear section index, title, and intent description.
 * Renders an h2 by default; pass heading="h1" on standalone pages.
 */
export default function SectionHeading({ index, title, intent, meta, heading: Heading = 'h2' }) {
  return (
    <header className="relative">
      <div className="flex flex-wrap items-center gap-3">
        {/* A quiet index keeps the long page easy to scan. */}
        {index && (
          <span className="font-mono text-xs text-dim">
            {index}
          </span>
        )}

        {/* Meta badge if present */}
        {meta && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-dim">
            {meta}
          </span>
        )}
      </div>

      <Heading className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
        {title}
      </Heading>

      {/* Intent paragraph */}
      {intent && (
        <p className="mt-2.5 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed text-muted">
          {intent}
        </p>
      )}
    </header>
  )
}
