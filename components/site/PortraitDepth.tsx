"use client"

import { useEffect } from "react"

/**
 * Gives the portrait some depth: the photo, its backing shape and the floating notes shift a
 * little against each other as the pointer moves across the hero. Mouse devices only.
 */
export function PortraitDepth() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const hero = document.querySelector<HTMLElement>(".sk-hero")
    const portrait = document.querySelector<HTMLElement>(".sk-portrait")
    if (!hero || !portrait) return

    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let frame = 0

    const step = () => {
      x += (targetX - x) * 0.09
      y += (targetY - y) * 0.09
      portrait.style.setProperty("--dx", x.toFixed(3))
      portrait.style.setProperty("--dy", y.toFixed(3))
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.002 ? requestAnimationFrame(step) : 0
    }
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step)
    }
    const onMove = (event: PointerEvent) => {
      const box = hero.getBoundingClientRect()
      targetX = ((event.clientX - box.left) / box.width - 0.5) * 2
      targetY = ((event.clientY - box.top) / box.height - 0.5) * 2
      kick()
    }
    const onLeave = () => {
      targetX = targetY = 0
      kick()
    }
    hero.addEventListener("pointermove", onMove, { passive: true })
    hero.addEventListener("pointerleave", onLeave)
    return () => {
      hero.removeEventListener("pointermove", onMove)
      hero.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return null
}
