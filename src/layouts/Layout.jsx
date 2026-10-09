import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Layout({ children }) {
  return (
    <div className="portfolio-stage min-h-screen px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
      >
        Skip to content
      </a>

      <div className="portfolio-window mx-auto w-full max-w-[1440px] overflow-clip">
        <div className="window-chrome" aria-label="Portfolio window">
          <div className="window-traffic-lights" aria-hidden="true">
            <span className="window-light window-light-close" />
            <span className="window-light window-light-minimize" />
            <span className="window-light window-light-expand" />
          </div>
          <span className="window-title">Sanjeev Kumar <span aria-hidden="true">—</span> Portfolio</span>
          <span className="window-chrome-mark" aria-hidden="true">SK</span>
        </div>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  )
}
