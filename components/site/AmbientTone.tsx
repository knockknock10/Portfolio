"use client"

import { useEffect } from "react"

const TONES: Record<string, string> = {
  top: "#f1ede5",
  work: "#efebe3",
  research: "#e8e8e5",
  "open-source": "#edefe9",
  experience: "#f1ede5",
  skills: "#ebe9ee",
  certificates: "#f0ece4",
  about: "#f1ede5",
  contact: "#e9e7e3",
}

/** The page colour moves a few shades from one section to the next, so scrolling has a mood. */
export function AmbientTone() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const root = document.documentElement
    const targets = Object.keys(TONES).map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    if (!targets.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && root.dataset.theme !== "dark") root.style.setProperty("--paper", TONES[entry.target.id] ?? TONES.top)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    targets.forEach((el) => observer.observe(el))
    const clear = () => { if (root.dataset.theme === "dark") root.style.removeProperty("--paper") }
    window.addEventListener("gl-theme", clear)
    return () => {
      observer.disconnect()
      window.removeEventListener("gl-theme", clear)
      root.style.removeProperty("--paper")
    }
  }, [])
  return null
}
