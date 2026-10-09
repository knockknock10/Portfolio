import SectionShell from '../components/SectionShell.jsx'
import PendingNote from '../components/PendingNote.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { sections } from '../data/profile.js'
import { projects } from '../data/projects/index.js'

const config = sections.find((section) => section.id === 'work')

export default function SelectedWorkSection() {
  const [featuredProject, ...otherProjects] = projects

  return (
    <SectionShell {...config}>
      <div className="space-y-6">
        {/* Featured Project Card — Aevor Developer Tooling & Systems */}
        {featuredProject && (
          <ProjectCard project={featuredProject} featured={true} />
        )}

        {/* Supporting Projects Grid — CommitHub Full-Stack & SemBind Research */}
        <div className="grid gap-6 md:grid-cols-2">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {config.pending && (
        <div className="mt-5">
          <PendingNote>{config.pending}</PendingNote>
        </div>
      )}
    </SectionShell>
  )
}
