"use client"

import { useEffect, useRef } from "react"

/**
 * A large statement set in the page's own words. As you scroll through it, each word moves
 * from a faint tone to full ink, so the sentence is read at the pace you scroll.
 * Words wrapped in *asterisks* get the accent colour once lit.
 */
export function Statement({ text, label }: { text: string; label: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  let inside = false
  const words = text.split(/\s+/).filter(Boolean).map((raw) => {
    if (raw.startsWith("*")) inside = true
    const marked = inside
    if (raw.endsWith("*")) inside = false
    return { word: raw.replace(/\*/g, ""), marked }
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const spans = Array.from(section.querySelectorAll<HTMLElement>("[data-w]"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((span) => span.style.setProperty("--lit", "1"))
      return
    }
    let frame = 0
    const paint = () => {
      frame = 0
      const box = section.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the block's top reaches 85% of the viewport, 1 when its bottom reaches 40%.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - box.top) / (box.height + vh * 0.45)))
      const total = spans.length
      spans.forEach((span, index) => {
        const lit = Math.min(1, Math.max(0, progress * (total + 6) - index) / 3)
        span.style.setProperty("--lit", lit.toFixed(3))
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="gl-statement" ref={sectionRef} aria-label={label}>
      <div className="sk-wrap">
        <p className="gl-statement__text">
          {words.map((item, index) => (
            <span key={index} data-w data-mark={item.marked ? "true" : undefined}>
              {item.word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
