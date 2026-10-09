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
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M5 5l10 10" />
          <path d="M15 5 5 15" />
        </>
      ) : (
        <>
          <path d="M3.5 6.5h13" />
          <path d="M3.5 13.5h13" />
        </>
      )}
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const buttonRef = useRef(null)
  const location = useLocation()

  /* Close mobile menu on route change */
  const prevLocation = useRef(location)
  useEffect(() => {
    if (prevLocation.current !== location) {
      prevLocation.current = location
      setOpen(false)
    }
  }, [location])

  /* Scroll-aware glass depth */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Keyboard dismiss */
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

  const capsuleClass = scrolled ? 'glass-nav-capsule-scrolled' : 'glass-nav-capsule'

  const handleCapsulePointerMove = (event) => {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--glass-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--glass-y', `${event.clientY - rect.top}px`)
  }

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-4 pb-2 transition-all duration-300 w-full">
      <div
        onPointerMove={handleCapsulePointerMove}
        className={`glass-nav mx-auto max-w-6xl rounded-full px-4 sm:px-5 py-2 sm:py-2.5 ${capsuleClass}`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Compact wordmark badge */}
          <Link
            to="/"
            className="group flex items-center gap-2 font-mono text-[11px] sm:text-[13px] font-semibold tracking-[0.14em] text-fg transition-colors duration-200 hover:text-white uppercase min-w-0"
          >
            <span aria-hidden="true" className="nav-monogram">S</span>
            <span className="truncate">{profile.wordmark}</span>
          </Link>

          {/* Desktop nav links */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`glass-nav-link px-3 py-1.5 rounded-full text-[13px] transition-colors duration-200 ${
                    isActive ? 'glass-nav-link-active text-white font-medium' : 'text-muted hover:text-fg'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2.5 md:flex">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-secondary inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] text-muted hover:text-fg font-medium"
              aria-label="GitHub profile"
            >
              <GitHubIcon className="size-3.5" />
              GitHub
            </a>
            <a
              href={profile.links.resume}
              className="glass-btn-primary inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            ref={buttonRef}
            type="button"
            className="mobile-menu-button inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {open && (
          <div
            id="mobile-menu"
            className="glass-mobile-menu mt-3 pt-3 md:hidden"
            aria-hidden={!open}
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`glass-nav-link flex items-center justify-between rounded-xl px-3 py-2 text-[14px] transition-colors duration-200 ${
                      isActive ? 'glass-nav-link-active text-white font-medium' : 'text-muted hover:text-fg'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-cyan/80"
                      />
                    )}
                  </Link>
                )
              })}
              <div className="flex items-center gap-3 pt-3 mt-2 border-t border-white/[0.08]">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn-secondary inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-[13px] text-muted hover:text-fg"
                >
                  <GitHubIcon className="size-3.5" />
                  GitHub
                </a>
                <a
                  href={profile.links.resume}
                  className="glass-btn-primary inline-flex flex-1 items-center justify-center rounded-xl py-2 text-[13px] font-medium text-white"
                >
                  Resume ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
