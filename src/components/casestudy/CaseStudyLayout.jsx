import Container from '../Container.jsx'
import CaseStudySection from './CaseStudySection.jsx'
import ProjectHero from './ProjectHero.jsx'
import ProjectLinks from './ProjectLinks.jsx'
import ProjectNavigation from './ProjectNavigation.jsx'
import ArchitectureDiagram from './ArchitectureDiagram.jsx'

function Paragraphs({ items }) {
  return (
    <div className="space-y-4">
      {items.map((text) => (
        <p key={text} className="leading-relaxed text-muted">
          {text}
        </p>
      ))}
    </div>
  )
}

function Bullets({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((text) => (
        <li key={text} className="flex gap-3 leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
          <span className="min-w-0">{text}</span>
        </li>
      ))}
    </ul>
  )
}

function NumberedList({ items }) {
  return (
    <ol className="space-y-4">
      {items.map((text, index) => (
        <li key={text} className="flex gap-4 leading-relaxed text-muted">
          <span className="font-mono text-xs text-accent">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0">{text}</span>
        </li>
      ))}
    </ol>
  )
}

function DecisionList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.decision} className="rounded-lg border border-line bg-panel p-5 md:p-6">
          <h3 className="text-sm font-medium text-fg">{item.decision}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.why}</p>
          <dl className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                Tradeoff
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{item.tradeoff}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                Cost
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{item.cost}</dd>
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
        <div key={item.title} className="rounded-lg border border-line bg-panel p-5 md:p-6">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-sm font-medium text-fg">{item.title}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * Case-study page template. Section order is fixed (01–10) but numbering is
 * assigned from the sections that actually have data — missing sections are
 * omitted rather than rendered empty.
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
          <p className="leading-relaxed text-muted">{architecture.intro}</p>
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
      title: 'Challenges',
      content: project.challenges?.length && <ChallengeList items={project.challenges} />,
    },
    { id: 'outcome', title: 'Outcome', content: project.outcome?.length && <Paragraphs items={project.outcome} /> },
    {
      id: 'learned',
      title: 'What I Learned',
      content: project.lessons?.length && <NumberedList items={project.lessons} />,
    },
    {
      id: 'links',
      title: 'Links',
      content: project.links?.length && <ProjectLinks links={project.links} />,
    },
  ].filter((section) => section.content)

  let counter = 0

  return (
    <main id="main">
      <ProjectHero project={project} />
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
