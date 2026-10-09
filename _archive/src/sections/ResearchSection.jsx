import { Link } from 'react-router-dom'

import SectionShell from '../components/SectionShell.jsx'
import Card from '../components/Card.jsx'
import ArchitectureDiagram from '../components/casestudy/ArchitectureDiagram.jsx'
import { sections } from '../data/profile.js'
import { getProject } from '../data/projects/index.js'

const config = sections.find((section) => section.id === 'research')
const sembind = getProject('sembind-audio')

/**
 * Research highlight — SemBind-Audio with its real pipeline, linking to the
 * full case study. All content comes from the project data file.
 */
export default function ResearchSection() {
  return (
    <SectionShell {...config}>
      <Card as="article" className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-xs tracking-[0.1em] text-accent tabular-nums">
            {sembind.number}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
            {sembind.category}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {sembind.status}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-fg">
          {sembind.title}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
          {sembind.fullTitle}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          {sembind.summary}
        </p>

        <div className="mt-6 border-t border-line pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            Pipeline
          </p>
          <div className="mt-4">
            <ArchitectureDiagram
              diagram={{ stages: sembind.pipeline }}
              label="SemBind-Audio pipeline"
            />
          </div>
        </div>

        <div className="mt-6 border-t border-line pt-4">
          <Link
            to={`/work/${sembind.id}`}
            className="text-sm text-accent underline-offset-4 transition-colors duration-200 hover:underline"
          >
            Read the case study →
          </Link>
        </div>
      </Card>
    </SectionShell>
  )
}
