import Container from '../Container.jsx'
import CaseStudySection from './CaseStudySection.jsx'
import ProjectHero from './ProjectHero.jsx'
import ProjectLinks from './ProjectLinks.jsx'
import ProjectNavigation from './ProjectNavigation.jsx'
import ArchitectureDiagram from './ArchitectureDiagram.jsx'

function Paragraphs({ items }) {
  return (
    <div className="space-y-4 text-[15px] sm:text-base leading-[1.75] text-muted">
      {items.map((text, i) => (
        <p key={i}>
          {text}
        </p>
      ))}
    </div>
  )
}

function Bullets({ items }) {
  return (
    <ul className="space-y-3.5 text-[15px] sm:text-base leading-[1.75] text-muted">
      {items.map((text, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/80" />
          <span className="min-w-0">{text}</span>
        </li>
      ))}
    </ul>
  )
}

function NumberedList({ items }) {
  return (
    <ol className="space-y-4 text-[15px] sm:text-base leading-[1.75] text-muted">
      {items.map((text, index) => (
        <li key={index} className="flex gap-4">
          <span className="font-mono text-xs font-semibold text-accent mt-0.5 shrink-0">
            {String(index + 1).padStart(2, '0')}.
          </span>
          <span className="min-w-0">{text}</span>
        </li>
      ))}
    </ol>
  )
}

function DecisionList({ items }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div
          key={item.decision}
          className="rounded-xl p-5 md:p-6 bg-panel transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-start gap-2.5">
            <span className="font-mono text-accent text-xs font-semibold mt-0.5">↳</span>
            <h3 className="text-[15px] sm:text-base font-semibold text-fg leading-snug">
              {item.decision}
            </h3>
          </div>
          <p className="mt-2.5 text-[14px] leading-relaxed text-muted pl-5">
            {item.why}
          </p>

          <dl className="mt-4 grid gap-3 pt-4 sm:grid-cols-2 border-t border-white/[0.07] pl-5">
            <div className="rounded-lg bg-panel-raised/60 border border-white/[0.05] p-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent font-medium">
                Tradeoff Accepted
              </dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-muted">{item.tradeoff}</dd>
            </div>
            <div className="rounded-lg bg-panel-raised/60 border border-white/[0.05] p-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim font-medium">
                Engineering Cost
              </dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-muted">{item.cost}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  )
}

function ChallengeList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="rounded-xl p-5 md:p-6 bg-panel"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] text-accent font-semibold">
              {String(index + 1).padStart(2, '0')}.
            </span>
            <h3 className="text-[15px] sm:text-base font-semibold text-fg">{item.title}</h3>
          </div>
          <p className="mt-2.5 text-[14px] leading-relaxed text-muted pl-6">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  )
}

/**
 * Case-study page template with sticky section jump bar and editorial typography.
 */
export default function CaseStudyLayout({ project, previous, next }) {
  const architecture = project.architecture ?? null
  const diagramSpec = architecture?.pipeline
    ? { stages: project.pipeline }
    : architecture?.diagram

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: project.overview?.length && <Paragraphs items={project.overview} />,
    },
    {
      id: 'problem',
      title: 'Problem',
      content: project.problem?.length && <Paragraphs items={project.problem} />,
    },
    {
      id: 'approach',
      title: 'Approach',
      content: project.approach?.length && <Paragraphs items={project.approach} />,
    },
    {
      id: 'architecture',
      title: 'Architecture',
      content: architecture && (
        <div className="space-y-6">
          <p className="leading-relaxed text-muted text-[15px] sm:text-base">
            {architecture.intro}
          </p>
          <ArchitectureDiagram
            diagram={diagramSpec}
            label={`${project.title} architecture diagram`}
          />
        </div>
      ),
    },
    {
      id: 'implementation',
      title: 'Implementation',
      content: project.implementation?.length && <Bullets items={project.implementation} />,
    },
    {
      id: 'decisions',
      title: 'Engineering Decisions',
      content: project.decisions?.length && <DecisionList items={project.decisions} />,
    },
    {
      id: 'challenges',
      title: 'Challenges & Debugging',
      content: project.challenges?.length && <ChallengeList items={project.challenges} />,
    },
    {
      id: 'outcome',
      title: 'Outcome & Metrics',
      content: project.outcome?.length && <Paragraphs items={project.outcome} />,
    },
    {
      id: 'learned',
      title: 'What I Learned',
      content: project.lessons?.length && <NumberedList items={project.lessons} />,
    },
    {
      id: 'links',
      title: 'Repository Links',
      content: project.links?.length && <ProjectLinks links={project.links} />,
    },
  ].filter((section) => section.content)

  let counter = 0

  return (
    <main id="main">
      <ProjectHero project={project} />

      {/* Sticky Table-of-Contents Jump Bar */}
      <nav
        aria-label="Case study sections navigation"
        className="sticky top-16 z-30 bg-bg/85 backdrop-blur-md border-b border-white/[0.07] py-2.5 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <Container className="flex items-center gap-1.5 min-w-max">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim mr-2 shrink-0">
            JUMP TO:
          </span>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-mono text-[11px] text-muted hover:text-accent hover:bg-white/[0.04] px-2.5 py-1 rounded-md transition-colors shrink-0"
            >
              {section.title}
            </a>
          ))}
        </Container>
      </nav>

      {/* Editorial Content Body */}
      <Container className="pb-16 md:pb-24">
        {sections.map((section) => {
          counter += 1
          return (
            <CaseStudySection
              key={section.id}
              id={section.id}
              index={String(counter).padStart(2, '0')}
              title={section.title}
            >
              {section.content}
            </CaseStudySection>
          )
        })}

        <ProjectNavigation previous={previous} next={next} />
      </Container>
    </main>
  )
}
