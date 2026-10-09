import { Link } from 'react-router-dom'
import Card from './Card.jsx'
import ProjectTags from './ProjectTags.jsx'

/**
 * Project cards put the problem and engineering work ahead of decoration.
 */
export default function ProjectCard({ project, featured = false }) {
  return (
    <Card
      as="article"
      className={`project-card group flex flex-col ${featured ? 'project-card-featured' : ''}`}
      interactive
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="project-category">{project.category}</span>
        <span className="project-status">{project.status}</span>
      </div>

      <div className="mt-4">
        <h3 className={`project-title group-hover:text-accent ${featured ? 'project-title-featured' : ''}`}>
          {project.title}
        </h3>
        <p className="mt-3 project-summary">{project.summary}</p>
      </div>

      <p className="project-built mt-4">{project.card.built}</p>

      <ProjectTags tags={project.tags} className="mt-5" />

      <div className="project-card-footer mt-auto">
        <Link to={`/work/${project.id}`} className="project-case-link">
          Read case study <span aria-hidden="true">↗</span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-external-link">
              Live demo ↗
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-external-link">
            GitHub ↗
          </a>
        </div>
      </div>
    </Card>
  )
}
