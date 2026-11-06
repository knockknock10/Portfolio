"use client"

import { useEffect } from "react"

/**
 * Light, pointer-aware movement for the liquid backdrop, portrait, profile and
 * research cards. Every effect is skipped when the visitor prefers reduced motion.
 */
export function Interactions() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const cleanups: Array<() => void> = []

    const updateProgress = () => {
      const max = root.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      root.style.setProperty("--progress", String(progress))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    cleanups.push(() => window.removeEventListener("scroll", updateProgress))
    cleanups.push(() => window.removeEventListener("resize", updateProgress))

    if (!reduceMotion && finePointer) {
      const field = document.querySelector<HTMLElement>(".lq-field")
      if (field) {
        const moveField = (event: PointerEvent) => {
          const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5
          const y = event.clientY / Math.max(window.innerHeight, 1) - 0.5
          field.style.setProperty("--px", (x * 2).toFixed(3))
          field.style.setProperty("--py", (y * 2).toFixed(3))
        }
        const resetField = () => {
          field.style.setProperty("--px", "0")
          field.style.setProperty("--py", "0")
        }
        window.addEventListener("pointermove", moveField, { passive: true })
        window.addEventListener("pointerleave", resetField)
        cleanups.push(() => window.removeEventListener("pointermove", moveField))
        cleanups.push(() => window.removeEventListener("pointerleave", resetField))
      }

      const tiltNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"))
      const tiltMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return
        const element = event.currentTarget as HTMLElement
        const rect = element.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        element.style.setProperty("--tilt-x", `${(-y * 3.2).toFixed(2)}deg`)
        element.style.setProperty("--tilt-y", `${(x * 3.8).toFixed(2)}deg`)
        element.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`)
        element.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`)
      }
      const tiltLeave = (event: PointerEvent) => {
        const element = event.currentTarget as HTMLElement
        element.style.setProperty("--tilt-x", "0deg")
        element.style.setProperty("--tilt-y", "0deg")
        element.style.setProperty("--mx", "50%")
        element.style.setProperty("--my", "50%")
      }
      tiltNodes.forEach((element) => {
        element.addEventListener("pointermove", tiltMove)
        element.addEventListener("pointerleave", tiltLeave)
      })
      cleanups.push(() => tiltNodes.forEach((element) => {
        element.removeEventListener("pointermove", tiltMove)
        element.removeEventListener("pointerleave", tiltLeave)
      }))

      const magneticNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"))
      const magnetMove = (event: PointerEvent) => {
        const element = event.currentTarget as HTMLElement
        const rect = element.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        element.style.translate = `${(dx * 0.055).toFixed(1)}px ${(dy * 0.075).toFixed(1)}px`
      }
      const magnetLeave = (event: PointerEvent) => {
        const element = event.currentTarget as HTMLElement
        element.style.translate = "0 0"
      }
      magneticNodes.forEach((element) => {
        element.addEventListener("pointermove", magnetMove)
        element.addEventListener("pointerleave", magnetLeave)
      })
      cleanups.push(() => magneticNodes.forEach((element) => {
        element.removeEventListener("pointermove", magnetMove)
        element.removeEventListener("pointerleave", magnetLeave)
      }))
    }

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  return null
}
