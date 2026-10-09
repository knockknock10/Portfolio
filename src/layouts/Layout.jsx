import { useCallback } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Layout({ children }) {
  const handlePointerMove = useCallback((event) => {
    const target = event.currentTarget
    const x = (event.clientX / Math.max(window.innerWidth, 1)) * 100
    const y = (event.clientY / Math.max(window.innerHeight, 1)) * 100
    target.style.setProperty('--ambient-x', `${x}%`)
    target.style.setProperty('--ambient-y', `${y}%`)
  }, [])

  return (
    <div className="app-shell min-h-screen" onPointerMove={handlePointerMove}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <div aria-hidden="true" className="ambient-light" />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
