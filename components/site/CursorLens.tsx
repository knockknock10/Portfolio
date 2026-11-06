"use client"

import { useEffect, useRef } from "react"

/**
 * A small glass lens that trails the pointer and grows over links and buttons.
 * Only on devices with a fine pointer; hidden for reduced motion.
 */
export function CursorLens() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lens = ref.current
    if (!lens) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    let tx = -100
    let ty = -100
    let x = -100
    let y = -100
    let frame = 0

    const onMove = (event: PointerEvent) => {
      tx = event.clientX
      ty = event.clientY
      lens.dataset.visible = "true"
      const target = event.target as Element | null
      lens.dataset.active = target?.closest("a, button, [role='tab'], [data-tilt]") ? "true" : "false"
    }
    const onLeave = () => {
      lens.dataset.visible = "false"
    }
    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      lens.style.transform = `translate(${x}px, ${y}px)`
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="gl-lens" ref={ref} aria-hidden="true" data-visible="false" data-active="false" />
}
