import Reveal from '../Reveal.jsx'

/**
 * One numbered case-study section (01 Overview, 02 Problem, ...).
 * Index is passed in by the layout so section order stays data-driven.
 * Constrains editorial line-length to max-w-3xl for optimal legibility.
 */
export default function CaseStudySection({ id, index, title, children }) {
  if (children == null) return null

  return (
    <section
      id={id}
      className="scroll-mt-24 py-12 md:py-16"
      style={{ borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}
    >
      <Reveal>
        <div className="grid gap-6 md:grid-cols-[11rem_1fr] md:gap-12">
          <div className="flex items-baseline gap-3 md:block">
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent font-semibold">
              {index}
            </span>
            <h2 className="text-lg font-semibold tracking-tight text-fg md:mt-3 md:text-xl">
              {title}
            </h2>
          </div>
          <div className="min-w-0 max-w-3xl">{children}</div>
        </div>
      </Reveal>
    </section>
  )
}
