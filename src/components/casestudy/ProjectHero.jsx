import { Link } from 'react-router-dom'

import Button from '../Button.jsx'
import TextLink from '../TextLink.jsx'
import ProjectMeta from './ProjectMeta.jsx'
import TechStack from './TechStack.jsx'

/**
 * Case-study hero: identity, one-line summary, stack, links, back navigation.
 */
export default function ProjectHero({ project }) {
  return (
    <header className="border-b border-line">
      <div className="pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <TextLink as={Link} to="/" className="-ml-1.5">
            ← Back to selected work
          </TextLink>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <span className="font-mono text-xs tracking-[0.2em] text-accent">
            {project.number}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            {project.category}
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-medium tracking-tight text-fg md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {project.summary}
        </p>
        {project.fullTitle && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-dim">
            {project.fullTitle}
          </p>
        )}

        <ProjectMeta project={project} className="mt-6" />

        <TechStack stack={project.stack} className="mt-6 border-t border-line pt-6" />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.github && (
            <Button as="a" href={project.github} external variant="primary">
              View source
            </Button>
          )}
          {project.demo && (
            <Button as="a" href={project.demo} external variant="secondary">
              Live site
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
