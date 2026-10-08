import Reveal from '../Reveal.jsx'

/**
 * One numbered case-study section (01 Overview, 02 Problem, ...).
 * Index is passed in by the layout so section order stays data-driven.
 */
export default function CaseStudySection({ id, index, title, children }) {
  if (children == null) return null

  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-12 md:py-16">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-10">
          <div className="flex items-baseline gap-3 md:block">
            <span className="font-mono text-xs tracking-[0.2em] text-accent">{index}</span>
            <h2 className="text-lg font-medium tracking-tight text-fg md:mt-3 md:text-xl">
              {title}
            </h2>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </Reveal>
    </section>
  )
}
