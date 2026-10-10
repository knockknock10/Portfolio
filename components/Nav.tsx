"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useLenis } from "@/components/SmoothScrollProvider"
import { Glass, Squircle } from "@/components/primitives"
import { readDurationToken, readMotionNumber, useSpringToken } from "@/components/primitives/motionTokens"

type NavProps = {
  name: string | null
}

type NavItem = {
  label: string
  href: string
  sectionId: string
}

const links: NavItem[] = [
  { label: "Home", href: "/#home", sectionId: "home" },
  { label: "Work", href: "/#work", sectionId: "work" },
  { label: "Craft", href: "/#craft", sectionId: "craft" },
  { label: "About", href: "/#about", sectionId: "about" },
]
const contactLink: NavItem = { label: "Contact", href: "/#contact", sectionId: "contact" }

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Nav({ name }: NavProps) {
  const pathname = usePathname()
  const lenis = useLenis()
  const reducedMotion = useReducedMotion()
  const spring = useSpringToken("gentle")
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(pathname === "/" ? "home" : null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const links: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Open source", href: "/open-source" },
    { label: "Problem solving", href: "/problem-solving" },
    { label: "About", href: "/about" },
    ...(githubUrl ? [{ label: "GitHub", href: githubUrl, external: true }] : []),
  ]

  const routeDuration = readDurationToken("--duration-nav-hide")

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : triggerRef.current

    const menu = menuRef.current
    const focusable = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter(
        (element) =>
          !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
      )

    focusable()[0]?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        setMenuOpen(false)
        return
      }
      if (event.key !== "Tab") return

      const items = focusable()
      if (items.length === 0) {
        event.preventDefault()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      if (
        event.shiftKey &&
        (document.activeElement === first || !menu?.contains(document.activeElement))
      ) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      const restoreTarget = previousFocusRef.current
      if (restoreTarget?.isConnected && !skipFocusRestoreRef.current) restoreTarget.focus()
      skipFocusRestoreRef.current = false
    }
  }, [menuOpen])

  function scrollToSection(sectionId: string) {
    const target = document.getElementById(sectionId)
    if (!target) return

    const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
    const focusTarget = () => target.focus({ preventScroll: true })
    handledHashRef.current = "#" + sectionId

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -scrollMargin,
        duration: reducedMotion ? 0 : readDurationToken("--duration-base"),
        immediate: reducedMotion === true,
        force: true,
        onComplete: focusTarget,
      })
    } else {
      window.scrollTo({
        top: window.scrollY + target.getBoundingClientRect().top - scrollMargin,
        behavior: "auto",
      })
      focusTarget()
    }

    window.history.replaceState(window.history.state, "", "/#" + sectionId)
  }

  function handleSectionNavigation(event: React.MouseEvent<HTMLAnchorElement>, item: NavItem) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    if (pathname !== "/") {
      if (menuOpen) {
        skipFocusRestoreRef.current = true
        setMenuOpen(false)
      }
      return
    }

    event.preventDefault()
    if (menuOpen) {
      skipFocusRestoreRef.current = true
      setMenuOpen(false)
    }
    scrollToSection(item.sectionId)
  }

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null)
      handledHashRef.current = null
      return
    }

    const sections = ["home", "work", "craft", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)
    if (!sections.length) return

    let observer: IntersectionObserver | null = null

    function observeAroundViewportCenter() {
      observer?.disconnect()
      const topInset = Math.round(window.innerHeight * 0.42)
      const bottomInset = Math.round(window.innerHeight * 0.5)
      observer = new IntersectionObserver(
        (entries) => {
          const current = entries.find((entry) => entry.isIntersecting)
          if (current) setActiveSection(current.target.id)
        },
        { rootMargin: "-" + topInset + "px 0px -" + bottomInset + "px 0px", threshold: 0 },
      )
      sections.forEach((section) => observer?.observe(section))
    }

    observeAroundViewportCenter()
    window.addEventListener("resize", observeAroundViewportCenter)
    return () => {
      window.removeEventListener("resize", observeAroundViewportCenter)
      observer?.disconnect()
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== "/") return

    const hash = window.location.hash
    if (!hash) {
      handledHashRef.current = null
      return
    }
    if (!lenis || handledHashRef.current === hash) return

    let sectionId: string
    try {
      sectionId = decodeURIComponent(hash.slice(1))
    } catch {
      return
    }
    if (!["home", "work", "craft", "about", "contact"].includes(sectionId)) return

    const target = document.getElementById(sectionId)
    if (!target) return

    handledHashRef.current = hash
    const frame = window.requestAnimationFrame(() => {
      const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
      lenis.scrollTo(target, {
        offset: -scrollMargin,
        duration: reducedMotion ? 0 : readDurationToken("--duration-base"),
        immediate: reducedMotion === true,
        force: true,
        onComplete: () => target.focus({ preventScroll: true }),
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, lenis, reducedMotion])

  function isCurrent(item: NavItem) {
    return pathname === "/" && activeSection === item.sectionId
  }

  const navTransition =
    reducedMotion || !spring
      ? { duration: readDurationToken("--duration-none") }
      : { ...spring, visualDuration: routeDuration }

  const menuStagger = reducedMotion ? 0 : readDurationToken("--duration-menu-stagger")
  const itemOffset = reducedMotion ? 0 : readMotionNumber("--menu-item-offset")
  const itemVariants = {
    closed: { opacity: 0, y: itemOffset },
    open: {
      opacity: 1,
      y: 0,
      transition:
        reducedMotion || !spring
          ? { duration: readDurationToken("--duration-none") }
          : { ...spring, visualDuration: routeDuration },
    },
  }

  return (
    <>
      <div className="nav-positioner">
        <motion.div
          className="nav-motion-frame"
          animate={{ y: menuOpen ? "-120%" : 0 }}
          transition={navTransition}
          data-menu-open={menuOpen ? "true" : "false"}
        >
          <Glass className="nav-glass-frame" elevation={2}>
            <Squircle
              as="nav"
              radius="var(--radius-squircle)"
              className="nav-pill"
              aria-label="Primary"
            >
              {name ? (
                <Link
                  className="nav-wordmark"
                  href="/#home"
                  scroll={false}
                  aria-label={name + " — Home"}
                  onClick={(event) => handleSectionNavigation(event, links[0])}
                >
                  {name}
                </Link>
              ) : null}

              <div className="nav-desktop-links">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    scroll={false}
                    className="nav-link"
                    aria-current={isCurrent(item) ? "location" : undefined}
                    onClick={(event) => handleSectionNavigation(event, item)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                className="nav-contact-link"
                href={contactLink.href}
                scroll={false}
                aria-current={isCurrent(contactLink) ? "location" : undefined}
                onClick={(event) => handleSectionNavigation(event, contactLink)}
              >
                Contact
              </Link>

              <button
                ref={triggerRef}
                type="button"
                className="nav-mobile-toggle"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu-panel"
                onClick={() => (menuOpen ? setMenuOpen(false) : openMenu())}
              >
                <span
                  className="nav-toggle-lines"
                  aria-hidden="true"
                  data-open={menuOpen ? "true" : "false"}
                >
                  <span />
                  <span />
                </span>
              </button>
            </Squircle>
          </Glass>
        </motion.div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            className="mobile-menu-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reducedMotion ? 1 : 0 }}
            transition={
              reducedMotion || !spring
                ? { duration: readDurationToken("--duration-none") }
                : { ...spring, visualDuration: routeDuration }
            }
          >
            <Glass className="mobile-menu-surface" elevation={3} as="div">
              <div
                id="mobile-menu-panel"
                ref={menuRef}
                className="mobile-menu-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
              >
                <div className="mobile-menu-header">
                  <span className="mobile-menu-wordmark">{name}</span>
                  <button
                    type="button"
                    className="nav-mobile-toggle mobile-menu-close"
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="nav-toggle-lines" aria-hidden="true" data-open="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </div>
                <motion.ul
                  className="mobile-menu-list"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    closed: {},
                    open: { transition: { staggerChildren: menuStagger } },
                  }}
                >
                  {[...links, contactLink].map((item) => (
                    <motion.li key={item.label} variants={itemVariants}>
                      <Link
                        href={item.href}
                        scroll={false}
                        className={
                          item.label === "Contact"
                            ? "mobile-menu-link mobile-menu-contact"
                            : "mobile-menu-link"
                        }
                        aria-current={isCurrent(item) ? "location" : undefined}
                        onClick={(event) => handleSectionNavigation(event, item)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Glass>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
