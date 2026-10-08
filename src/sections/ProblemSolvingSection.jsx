import SectionShell from '../components/SectionShell.jsx'
import { sections } from '../data/profile.js'

const config = sections.find((section) => section.id === 'problem-solving')

export default function ProblemSolvingSection() {
  return <SectionShell {...config} />
}
