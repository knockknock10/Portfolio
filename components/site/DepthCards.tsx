"use client"

import { useEffect } from "react"

const CARDS = ".gl-org, .sk-fact, .gl-pr, .gl-cert, .sk-entry, .sk-project, .sk-contact__row"

/**
 * Cards turn in 3D toward the pointer (a few degrees, with the light following), then
 * settle flat. Uses one delegated listener, so cards added later (filters, live data) work too.
 */
export function DepthCards() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    let current: HTMLElement | null = null

    const reset = (element: HTMLElement | null) => {
      if (!element) return
      element.style.setProperty("--card-x", "0deg")
      element.style.setProperty("--card-y", "0deg")
      element.removeAttribute("data-depth")
    }

    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(CARDS) ?? null
      if (card !== current) {
        reset(current)
        current = card
      }
      if (!card) return
      const box = card.getBoundingClientRect()
      const x = (event.clientX - box.left) / box.width - 0.5
      const y = (event.clientY - box.top) / box.height - 0.5
      // Wide cards turn less so text stays readable.
      const limit = box.width > 700 ? 2.2 : box.width > 380 ? 4 : 7
      card.setAttribute("data-depth", "true")
      card.style.setProperty("--card-x", `${(-y * limit * 2).toFixed(2)}deg`)
      card.style.setProperty("--card-y", `${(x * limit * 2).toFixed(2)}deg`)
    }
    const onLeave = () => {
      reset(current)
      current = null
    }
    document.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      document.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])
  return null
}
