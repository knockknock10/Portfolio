import { Link } from 'react-router-dom'

import Container from '../Container.jsx'
import Button from '../Button.jsx'
import TextLink from '../TextLink.jsx'
import ProjectMeta from './ProjectMeta.jsx'
import TechStack from './TechStack.jsx'

/**
 * Case-study hero: identity, one-line summary, stack, links, back navigation.
 * Uses shared Container to guarantee perfect horizontal alignment with editorial body.
 */
export default function ProjectHero({ project }) {
  return (
    <header style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }}>
      <Container className="pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <TextLink as={Link} to="/" className="-ml-1.5">
            ← Back to selected work
          </TextLink>
          <span aria-hidden="true" className="h-3 w-px bg-white/[0.12]" />
          <span className="font-mono text-xs tracking-[0.2em] text-accent font-semibold">
            {project.number}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            {project.category}
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-fg md:text-5xl lg:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
          {project.summary}
        </p>
        {project.fullTitle && (
          <p className="mt-3 max-w-3xl font-mono text-[13px] leading-relaxed text-dim">
            {project.fullTitle}
          </p>
        )}

        <ProjectMeta project={project} className="mt-6" />

        <TechStack stack={project.stack} className="mt-6 border-t border-white/[0.07] pt-6" />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.github && (
            <Button as="a" href={project.github} external variant="primary">
              View source repository
            </Button>
          )}
          {project.demo && (
            <Button as="a" href={project.demo} external variant="secondary">
              Live site demo
            </Button>
          )}
          {project.githubOrg && (
            <Button as="a" href={project.githubOrg} external variant="secondary">
              GitHub organization
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
