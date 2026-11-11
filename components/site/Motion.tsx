"use client"

import { useEffect, useRef } from "react"

/**
 * Pointer ring + scroll-velocity feel.
 * - A thin ring trails the pointer with a little lag, grows over anything
 *   clickable and shrinks while pressed. The real cursor is left alone.
 * - Section heads drift slightly against the scroll (parallax), and the
 *   horizontal marquee leans into the scroll speed via --vel.
 * Everything is off for touch screens and for prefers-reduced-motion.
 */
export function Motion() {
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || calm) return

    const root = document.documentElement
    const el = ring.current
    let tx = -100, ty = -100, x = -100, y = -100
    let scale = 1, target = 1
    let raf = 0
    let lastY = window.scrollY, vel = 0
    const heads = Array.from(document.querySelectorAll<HTMLElement>(".sk-head"))

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      root.classList.add("gl-cur-on")
      const t = e.target as Element | null
      const hit = t?.closest("a, button, summary, [role=button], [data-tilt], .gl-cert__preview")
      const text = t?.closest("input, textarea, select")
      target = text ? 0 : hit ? 1.9 : 1
      el?.classList.toggle("is-link", !!hit && !text)
    }
    const onDown = () => { target *= 0.7 }
    const onUp = () => { target = el?.classList.contains("is-link") ? 1.9 : 1 }
    const onLeave = () => root.classList.remove("gl-cur-on")

    const tick = () => {
      x += (tx - x) * 0.2
      y += (ty - y) * 0.2
      scale += (target - scale) * 0.18
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`

      const dy = window.scrollY - lastY
      lastY = window.scrollY
      vel += (dy - vel) * 0.12
      root.style.setProperty("--vel", Math.max(-40, Math.min(40, vel)).toFixed(2))

      const vh = window.innerHeight
      for (const h of heads) {
        const r = h.getBoundingClientRect()
        if (r.bottom < -80 || r.top > vh + 80) continue
        const off = (r.top + r.height / 2 - vh / 2) / vh
        h.style.translate = `0 ${(off * -22).toFixed(1)}px`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    document.documentElement.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      heads.forEach((h) => { h.style.translate = "" })
      root.classList.remove("gl-cur-on")
    }
  }, [])

  return <div ref={ring} className="gl-ring-cur" aria-hidden="true" />
}
