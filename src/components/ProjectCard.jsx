import { Link } from 'react-router-dom'
import Card from './Card.jsx'
import ProjectTags from './ProjectTags.jsx'

/**
 * Homepage project card — links to the full case study and the source repo.
 * Every field comes from the project data file; nothing is hard-coded here.
 */
export default function ProjectCard({ project }) {
  return (
    <Card as="article" className="flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs tracking-[0.1em] text-accent tabular-nums">
          {project.number}
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-dim uppercase">
          {project.category}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-fg">
        {project.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.summary}</p>

      <dl className="mt-4 space-y-3 border-t border-line pt-4">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
            Problem
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{project.card.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
            Built
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{project.card.built}</dd>
        </div>
      </dl>

      <ProjectTags tags={project.tags} className="mt-5" />

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <Link
            to={`/work/${project.id}`}
            className="text-sm text-accent underline-offset-4 transition-colors duration-200 hover:underline"
          >
            Read case study →
          </Link>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim transition-colors duration-200 hover:text-fg"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </Card>
  )
}
