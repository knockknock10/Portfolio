import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './Container.jsx'
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
  const buttonRef = useRef(null)

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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          className="shrink-0 font-mono text-[13px] font-medium tracking-[0.2em] text-fg transition-colors duration-200 hover:text-accent"
        >
          {profile.wordmark}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-fg"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
          <span aria-hidden="true" className="h-4 w-px bg-line" />
          <a
            href={profile.links.resume}
            className="text-sm text-muted transition-colors duration-200 hover:text-fg"
          >
            Resume
          </a>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
      </Container>

      <div id="mobile-menu" className={open ? 'border-t border-line md:hidden' : 'hidden'}>
        <Container className="flex flex-col py-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[15px] text-muted transition-colors duration-200 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-6 py-3.5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] text-muted transition-colors duration-200 hover:text-fg"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
            <a
              href={profile.links.resume}
              className="text-[15px] text-muted transition-colors duration-200 hover:text-fg"
            >
              Resume
            </a>
          </div>
        </Container>
      </div>
    </header>
  )
}
