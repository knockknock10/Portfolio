import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import HomePage from './pages/HomePage.jsx'
import CaseStudyPage from './pages/CaseStudyPage.jsx'
import OpenSourcePage from './pages/OpenSourcePage.jsx'
import OrganizationDetailPage from './pages/OrganizationDetailPage.jsx'
import ProblemSolvingPage from './pages/ProblemSolvingPage.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * Keeps scroll position in sync with routing:
 *  - hash present and resolvable → scroll to that section
 *  - otherwise → top of page
 */
function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:projectId" element={<CaseStudyPage />} />
        <Route path="/open-source" element={<OpenSourcePage />} />
        <Route path="/open-source/:org" element={<OrganizationDetailPage />} />
        <Route path="/problem-solving" element={<ProblemSolvingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
