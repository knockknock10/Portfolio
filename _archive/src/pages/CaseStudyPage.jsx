import { useParams } from 'react-router-dom'

import Layout from '../layouts/Layout.jsx'
import CaseStudyLayout from '../components/casestudy/CaseStudyLayout.jsx'
import NotFound from './NotFound.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { getProject, getAdjacentProjects } from '../data/projects/index.js'

export default function CaseStudyPage() {
  const { projectId } = useParams()
  const project = getProject(projectId)

  usePageMeta(project?.seo)

  if (!project) return <NotFound />

  const { previous, next } = getAdjacentProjects(project.id)

  return (
    <Layout>
      <CaseStudyLayout project={project} previous={previous} next={next} />
    </Layout>
  )
}
