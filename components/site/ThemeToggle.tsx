"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

/** Applies a theme; uses the View Transitions API for a circular reveal where it exists. */
export function applyTheme(next: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement
  const set = () => {
    root.dataset.theme = next
    try { localStorage.setItem("gl-theme", next) } catch { /* storage can be blocked */ }
    window.dispatchEvent(new CustomEvent("gl-theme", { detail: next }))
  }
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const start = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition
  if (!start || calm || !origin) return set()
  const r = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y))
  const t = start.call(document, set)
  t.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`] },
      { duration: 700, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" },
    )
  }).catch(() => {})
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light")
    const on = (e: Event) => setTheme((e as CustomEvent<Theme>).detail)
    window.addEventListener("gl-theme", on)
    return () => window.removeEventListener("gl-theme", on)
  }, [])
  const next: Theme = theme === "dark" ? "light" : "dark"
  return (
    <button
      type="button"
      className="gl-theme"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={(e) => {
        const b = e.currentTarget.getBoundingClientRect()
        applyTheme(next, { x: b.left + b.width / 2, y: b.top + b.height / 2 })
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  )
}
