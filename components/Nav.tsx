"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Glass, Squircle } from "@/components/primitives"
import { readDurationToken, readMotionNumber, useSpringToken } from "@/components/primitives/motionTokens"

type NavProps = {
  name: string | null
  githubUrl: string | null
}

type NavItem = {
  label: string
  href: string
  external?: boolean
}

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Nav({ name, githubUrl }: NavProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const spring = useSpringToken("gentle")
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const previousYRef = useRef(0)

  const links: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Open source", href: "/open-source" },
    { label: "About", href: "/about" },
    ...(githubUrl ? [{ label: "GitHub", href: githubUrl, external: true }] : []),
  ]

  const routeDuration = readDurationToken("--duration-nav-hide")

  useEffect(() => {
    previousYRef.current = window.scrollY

    function onScroll() {
      const nextY = window.scrollY
      const delta = nextY - previousYRef.current

      if (menuOpen || nextY <= 16) {
        setHidden(false)
      } else if (delta > 4 && nextY > 96) {
        setHidden(true)
      } else if (delta < -4) {
        setHidden(false)
      }

      previousYRef.current = nextY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [menuOpen])

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
      if (restoreTarget?.isConnected) restoreTarget.focus()
    }
  }, [menuOpen])

  function isCurrent(href: string, external = false) {
    if (external) return false
    if (href === "/") return pathname === "/"
    if (href === "/work") return pathname === "/work" || pathname.startsWith("/work/")
    return pathname === href
  }

  function openMenu() {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    setMenuOpen(true)
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
          animate={{ y: menuOpen || hidden ? "-120%" : 0 }}
          transition={navTransition}
          data-menu-open={menuOpen ? "true" : "false"}
        >
          <Glass className="nav-glass-frame" elevation={2}>
            <Squircle
              as="nav"
              radius="var(--radius-squircle)"
              className="nav-pill"
              aria-label="Main navigation"
            >
              {name ? (
                <Link className="nav-wordmark" href="/" aria-label={name + " — Home"}>
                  {name}
                </Link>
              ) : null}

              <div className="nav-desktop-links">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="nav-link"
                    aria-current={isCurrent(item.href, item.external) ? "page" : undefined}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                className="nav-contact-link"
                href="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
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
                onClick={() => setMenuOpen((open) => !open)}
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
                  {links.map((item) => (
                    <motion.li key={item.label} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className="mobile-menu-link"
                        aria-current={isCurrent(item.href, item.external) ? "page" : undefined}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li variants={itemVariants}>
                    <Link
                      href="/contact"
                      className="mobile-menu-link mobile-menu-contact"
                      aria-current={pathname === "/contact" ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </motion.li>
                </motion.ul>
              </div>
            </Glass>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
