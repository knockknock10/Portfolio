"use client"

import { useEffect } from "react"

const TONES: Record<string, string> = {
  top: "#f5f5f7",
  work: "#f2f4f8",
  research: "#eef1f8",
  "open-source": "#f1f5f4",
  experience: "#f6f4f9",
  skills: "#f0f3f8",
  certificates: "#f6f5f2",
  about: "#f4f6f8",
  contact: "#eef0f5",
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
