import SectionShell from '../components/SectionShell.jsx'
import PendingNote from '../components/PendingNote.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { sections } from '../data/profile.js'
import { projects } from '../data/projects/index.js'

const config = sections.find((section) => section.id === 'work')

export default function SelectedWorkSection() {
  return (
    <SectionShell {...config}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {config.pending && (
        <div className="mt-5">
          <PendingNote>{config.pending}</PendingNote>
        </div>
      )}
    </SectionShell>
  )
}
