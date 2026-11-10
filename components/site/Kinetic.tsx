"use client"

import { useEffect } from "react"

/**
 * Scroll-driven motion that works on existing markup:
 *  - section headings rise word by word as they enter
 *  - floating cards and the portrait ring drift / turn with scroll
 * Skipped entirely for visitors who prefer reduced motion.
 */
export function Kinetic() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cleanups: Array<() => void> = []

    // Split headings into words once.
    const headings = Array.from(document.querySelectorAll<HTMLElement>("main .sk-h2"))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.in = "true"
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.35 },
    )
    headings.forEach((heading) => {
      if (heading.dataset.split) return
      const text = heading.textContent ?? ""
      heading.setAttribute("aria-label", text)
      heading.dataset.split = "true"
      heading.textContent = ""
      text.split(/\s+/).filter(Boolean).forEach((word, index, all) => {
        const outer = document.createElement("span")
        outer.className = "gl-w"
        outer.setAttribute("aria-hidden", "true")
        const inner = document.createElement("span")
        inner.textContent = word
        inner.style.setProperty("--i", String(index))
        outer.appendChild(inner)
        heading.appendChild(outer)
        if (index < all.length - 1) heading.appendChild(document.createTextNode(" "))
      })
      io.observe(heading)
    })
    cleanups.push(() => io.disconnect())

    // Drift and spin.
    const drift = Array.from(document.querySelectorAll<HTMLElement>(".sk-portrait__signal"))
    const ring = document.querySelector<HTMLElement>(".gl-ring")
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (y < window.innerHeight * 1.6) {
          drift.forEach((el, index) => {
            el.style.translate = `0 ${(index % 2 ? -1 : 1) * y * 0.07}px`
          })
        }
        if (ring) ring.style.rotate = `${y * 0.12}deg`
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    cleanups.push(() => window.removeEventListener("scroll", onScroll))

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return null
}
