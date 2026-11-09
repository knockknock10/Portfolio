"use client"

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useState, type MouseEvent } from "react"
import { useLenis } from "@/components/SmoothScrollProvider"

export type NavLink = { id: string; label: string }

type HeaderProps = {
  name: string
  links: NavLink[]
  resumeHref: string
  email: string | null
}

export function Header({ name, links, resumeHref, email }: HeaderProps) {
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Track which section is under the middle of the viewport.
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-42% 0px -52% 0px" },
    )
    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      if (window.scrollY < 240) setActive(null)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [links])

  // Freeze page scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return
    lenis?.stop()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      lenis?.start()
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen, lenis])

  const goTo = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      setMenuOpen(false)
      // Let the scroll lock release before moving.
      window.setTimeout(() => {
        if (lenis) lenis.scrollTo(target, { offset: -76, duration: reduceMotion ? 0 : 1.4 })
        else target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
        window.history.replaceState(null, "", `#${id}`)
      }, 30)
    },
    [lenis, reduceMotion],
  )

  const pillTarget = hovered ?? active
  const pillTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.9 }

  /*
   * Previous mobile-menu animation retained as a reference, intentionally inactive:
   * initial={{ clipPath: "circle(0% at calc(100% - 56px) 36px)" }}
   * animate={{ clipPath: "circle(150% at calc(100% - 56px) 36px)" }}
   * exit={{ clipPath: "circle(0% at calc(100% - 56px) 36px)" }}
   * transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
   */
  return (
    <header className="sk-header">
      <div className="sk-header__inner">
        <a className="sk-mark" href="#top" onClick={(event) => goTo(event, "top")}>
          {name}
        </a>

        <nav className="sk-nav" aria-label="Sections" onMouseLeave={() => setHovered(null)}>
          <LayoutGroup id="sk-nav">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-pill={pillTarget === link.id}
                aria-current={active === link.id ? "true" : undefined}
                onClick={(event) => goTo(event, link.id)}
                onMouseEnter={() => setHovered(link.id)}
                onFocus={() => setHovered(link.id)}
                onBlur={() => setHovered(null)}
              >
                {pillTarget === link.id ? (
                  <motion.span layoutId="sk-nav-pill" className="sk-nav__pill" transition={pillTransition} />
                ) : null}
                <span>{link.label}</span>
              </a>
            ))}
          </LayoutGroup>
        </nav>

        <div className="sk-header__actions">
          <a className="sk-resume-link" href={resumeHref} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <button
            type="button"
            className="sk-menu-button"
            aria-expanded={menuOpen}
            aria-controls="sk-sheet"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="sk-sheet"
            className="sk-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}

          >
            <div className="sk-sheet__top">
              <a className="sk-mark" href="#top" onClick={(event) => goTo(event, "top")}>
                {name}
              </a>
              <button type="button" className="sk-menu-button" onClick={() => setMenuOpen(false)}>
                Close
              </button>
            </div>
            <nav className="sk-sheet__links" aria-label="Sections">
              {links.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={(event) => goTo(event, link.id)}>
                  {link.label}
                </a>
              ))}
            </nav>
            <p className="sk-sheet__foot">
              <a href={resumeHref} target="_blank" rel="noreferrer">
                Résumé (PDF)
              </a>
              {email ? (
                <>
                  {" · "}
                  <a href={`mailto:${email}`}>{email}</a>
                </>
              ) : null}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
