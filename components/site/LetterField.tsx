"use client"

import { useEffect } from "react"

/**
 * The letters of the hero name lift and warm in colour as the pointer passes near them,
 * then settle back. Fine pointers only; skipped for reduced motion.
 */
export function LetterField() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const letters = Array.from(document.querySelectorAll<HTMLElement>(".sk-hero h1 .gl-letters i"))
    if (!letters.length) return
    const radius = 150
    let x = -1000
    let y = -1000
    let frame = 0

    const paint = () => {
      frame = 0
      for (const letter of letters) {
        const box = letter.getBoundingClientRect()
        const dx = x - (box.left + box.width / 2)
        const dy = y - (box.top + box.height / 2)
        const strength = Math.max(0, 1 - Math.hypot(dx, dy) / radius)
        letter.style.translate = strength ? `0 ${(-strength * 16).toFixed(1)}px` : ""
        letter.style.color = strength > 0.35 ? "var(--accent)" : ""
      }
    }
    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onLeave = () => {
      x = y = -1000
      if (!frame) frame = requestAnimationFrame(paint)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return null
}
