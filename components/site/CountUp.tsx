"use client"

import { useEffect, useRef } from "react"

/**
 * Renders the final number on the server (so nothing jumps and crawlers see it),
 * then counts up from zero the first time it scrolls into view.
 */
export function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const write = (n: number) => { el.textContent = Math.round(n).toLocaleString("en-US") }
    if (calm || !("IntersectionObserver" in window)) { write(value); shown.current = value; return }

    let raf = 0
    const run = (from: number) => {
      const t0 = performance.now()
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - k, 4)
        const n = from + (value - from) * eased
        write(n); shown.current = n
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      run(shown.current ?? 0)
    }, { threshold: 0.6 })
    if (shown.current === null) { write(0); io.observe(el) } else run(shown.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value, duration])

  return <span ref={ref}>{value.toLocaleString("en-US")}</span>
}
