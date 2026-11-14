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
    // Buttons lean toward the pointer.
    let pulled: HTMLElement | null = null
    const onLight = (e: PointerEvent) => {
      const t = e.target as Element | null
      const btn = t?.closest<HTMLElement>(".gl-btn")
      if (pulled && pulled !== btn) pulled.style.translate = ""
      pulled = btn ?? null
      if (btn) {
        const r = btn.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height
        btn.style.translate = `${(dx * 8).toFixed(1)}px ${(dy * 6).toFixed(1)}px`
      }
    }
    const onDown = () => { target *= 0.7 }
    const onUp = () => { target = el?.classList.contains("is-link") ? 1.9 : 1 }
    const onLeave = () => {
      root.classList.remove("gl-cur-on")
      if (pulled) { pulled.style.translate = ""; pulled = null }
    }

    const field = document.querySelector<HTMLElement>(".lq-field")
    let fx = 0, fy = 0
    const tick = () => {
      const lagX = tx - x
      const lagY = ty - y
      x += lagX * 0.2
      y += lagY * 0.2
      scale += (target - scale) * 0.18
      // The droplet stretches along its direction of travel, like a bead of water being dragged.
      const speed = Math.min(Math.hypot(lagX, lagY), 70)
      const angle = Math.atan2(lagY, lagX)
      const sx = scale * (1 + speed / 60)
      const sy = scale * (1 - speed / 200)
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle.toFixed(3)}rad) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`
      // The coloured shapes behind the glass lean toward the pointer.
      if (field) {
        fx += ((x / window.innerWidth - 0.5) * 2 - fx) * 0.06
        fy += ((y / window.innerHeight - 0.5) * 2 - fy) * 0.06
        field.style.setProperty("--px", fx.toFixed(4))
        field.style.setProperty("--py", fy.toFixed(4))
      }

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
    window.addEventListener("pointermove", onLight, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    document.documentElement.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointermove", onLight)
      if (pulled) pulled.style.translate = ""
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      heads.forEach((h) => { h.style.translate = "" })
      root.classList.remove("gl-cur-on")
    }
  }, [])

  return <div ref={ring} className="gl-ring-cur" aria-hidden="true" />
}
