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
 * Scroll-aware motion for the existing page:
 * - section headings reveal word by word as they enter the viewport
 * - the portrait details drift gently with scroll position
 *
 * The content remains ordinary text until this effect runs, so the page still
 * reads correctly without JavaScript and for visitors who prefer reduced motion.
 */
export function Kinetic() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionPreference.matches) return

    const headings = Array.from(document.querySelectorAll<HTMLElement>("main .sk-h2"))
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue
                const heading = entry.target as HTMLElement
                heading.dataset.in = "true"
                observer?.unobserve(heading)
              }
            },
            { threshold: 0.35 },
          )
        : null

    headings.forEach((heading) => {
      if (heading.dataset.split) {
        observer?.observe(heading)
        return
      }

      const words = (heading.textContent ?? "").trim().split(/\s+/).filter(Boolean)
      if (!words.length) return

      // Keep one accessible name while hiding the presentational word wrappers.
      heading.setAttribute("aria-label", words.join(" "))
      heading.dataset.split = "true"
      heading.replaceChildren()

      words.forEach((word, index) => {
        const mask = document.createElement("span")
        mask.className = "gl-w"
        mask.setAttribute("aria-hidden", "true")

        const text = document.createElement("span")
        text.textContent = word
        text.style.setProperty("--i", String(index))
        mask.appendChild(text)
        heading.appendChild(mask)

        if (index < words.length - 1) heading.appendChild(document.createTextNode(" "))
      })

      if (observer) observer.observe(heading)
      else heading.dataset.in = "true"
    })

    const floatingCards = Array.from(document.querySelectorAll<HTMLElement>(".sk-portrait__signal"))
    const ring = document.querySelector<HTMLElement>(".gl-ring")
    let frame = 0

    const updateScrollMotion = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        if (motionPreference.matches) return

        const scrollY = window.scrollY
        if (scrollY < window.innerHeight * 1.6) {
          floatingCards.forEach((element, index) => {
            const direction = index % 2 === 0 ? 1 : -1
            element.style.translate = `0 ${direction * scrollY * 0.07}px`
          })
        }

        if (ring) ring.style.rotate = `${scrollY * 0.12}deg`
      })
    }

    const handleMotionPreference = () => {
      if (motionPreference.matches) {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
        floatingCards.forEach((element) => element.style.removeProperty("translate"))
        ring?.style.removeProperty("rotate")
      } else {
        updateScrollMotion()
      }
    }

    updateScrollMotion()
    window.addEventListener("scroll", updateScrollMotion, { passive: true })
    motionPreference.addEventListener("change", handleMotionPreference)

    return () => {
      observer?.disconnect()
      window.removeEventListener("scroll", updateScrollMotion)
      motionPreference.removeEventListener("change", handleMotionPreference)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
