import { Link } from 'react-router-dom'
import Card from './Card.jsx'
import ProjectTags from './ProjectTags.jsx'

/**
 * Homepage Project Card — clean, editorial.
 * Each card shows what was built and why — technical depth lives in
 * the case study pages, not in metric panels on the homepage.
 */
export default function ProjectCard({ project, featured = false }) {
  return (
    <Card
      as="article"
      className={[
        'flex flex-col group relative overflow-hidden',
        featured ? 'p-6 sm:p-8' : 'p-6 sm:p-7',
      ].join(' ')}
      interactive
    >
      {/* Category & Status row */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] text-muted">
          {project.category}
        </span>
        <span className="font-mono text-[11px] text-dim">
          {project.status}
        </span>
      </div>

      {/* Title & Summary */}
      <div className="mt-4">
        <h3 className={`font-semibold tracking-[-0.015em] text-white leading-tight group-hover:text-cyan transition-colors duration-200 ${
          featured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'
        }`}>
          {project.title}
        </h3>
        <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
          {project.summary}
        </p>
      </div>

      {/* One key technical detail — the "what was built" line */}
      <p className="mt-4 text-[13px] leading-relaxed text-muted border-l-2 border-white/[0.10] pl-3">
        {project.card.built}
      </p>

      {/* Technology Tags */}
      <ProjectTags tags={project.tags} className="mt-5" />

      {/* Footer Actions */}
      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between gap-3 border-t pt-4 border-white/[0.08]">
          <Link
            to={`/work/${project.id}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan hover:text-white transition-all duration-200"
          >
            <span>Read case study</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-muted hover:text-fg transition-colors"
              >
                Live demo ↗
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-dim hover:text-fg transition-colors duration-200"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}
