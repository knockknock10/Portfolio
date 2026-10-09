import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigation, profile } from '../data/profile.js'

function GitHubIcon({ className = 'size-4' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      {open ? <><path d="M5 5l10 10" /><path d="M15 5 5 15" /></> : <><path d="M3.5 6.5h13" /><path d="M3.5 13.5h13" /></>}
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const buttonRef = useRef(null)
  const location = useLocation()
  const previousLocation = useRef(location)

  useEffect(() => {
    if (previousLocation.current !== location) {
      previousLocation.current = location
      setOpen(false)
    }
  }, [location])

  useEffect(() => {
    const onScroll = () => {
      if (location.pathname !== '/') return
      const marker = window.innerHeight * 0.34
      const candidates = ['work', 'research', 'problem-solving', 'about']
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((element) => ({ id: element.id, top: element.getBoundingClientRect().top }))
      const current = candidates
        .filter((section) => section.top <= marker)
        .sort((a, b) => b.top - a.top)[0] ?? candidates[0]
      if (current) setActiveSection((previous) => previous === current.id ? previous : current.id)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const isActive = (item) => {
    const isHashLink = item.href.startsWith('/#')
    return isHashLink
      ? location.pathname === '/' && activeSection === item.href.slice(2)
      : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
  }

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header-inner mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <Link to="/" className="site-wordmark shrink-0" aria-label="Sanjeev Kumar home">
          Sanjeev Kumar<span aria-hidden="true">.</span>
        </Link>

        <nav aria-label="Primary" className="site-nav hidden items-center gap-5 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`site-nav-link ${isActive(item) ? 'site-nav-link-active' : ''}`}
              aria-current={isActive(item) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions hidden items-center gap-4 sm:flex">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="site-header-link inline-flex items-center gap-2">
            <GitHubIcon className="size-3.5" />
            GitHub
          </a>
          <a href={profile.links.resume} className="site-resume-link">Resume <span aria-hidden="true">↗</span></a>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="site-menu-button inline-flex size-10 items-center justify-center rounded-lg lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="site-mobile-menu lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-5 py-4 sm:px-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`site-mobile-link ${isActive(item) ? 'site-nav-link-active' : ''}`}
                aria-current={isActive(item) ? 'page' : undefined}
              >
                {item.label}
                {isActive(item) && <span aria-hidden="true">↗</span>}
              </Link>
            ))}
            <div className="mt-2 flex gap-4 border-t border-line pt-4 sm:hidden">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="site-header-link inline-flex items-center gap-2">
                <GitHubIcon className="size-3.5" /> GitHub
              </a>
              <a href={profile.links.resume} className="site-header-link">Resume ↗</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
