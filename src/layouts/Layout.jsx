import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Layout({ children }) {
  return (
    <div className="app-shell min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
