import Layout from '../layouts/Layout.jsx'
import Hero from '../sections/Hero.jsx'
import SelectedWorkSection from '../sections/SelectedWorkSection.jsx'
import ProofSection from '../sections/ProofSection.jsx'
import OpenSourceSection from '../sections/OpenSourceSection.jsx'
import ResearchSection from '../sections/ResearchSection.jsx'
import ProblemSolvingSection from '../sections/ProblemSolvingSection.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import ContactSection from '../sections/ContactSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function HomePage() {
  usePageMeta()

  return (
    <Layout>
      <main id="main">
        <Hero />
        <SelectedWorkSection />
        <ProofSection />
        <OpenSourceSection />
        <ResearchSection />
        <ProblemSolvingSection />
        <AboutSection />
        <ContactSection />
      </main>
    </Layout>
  )
}
