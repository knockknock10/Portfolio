"use client"

import { useEffect } from "react"

/**
 * Liquid glass layer.
 *  - An SVG lens filter that refracts whatever sits behind glass (Chromium; other browsers keep the blur).
 *  - A specular highlight that follows the pointer across buttons, tabs and the nav.
 *  - A short squash-and-stretch wobble when a glass control is released.
 * All of it is off for reduced motion and for touch-only devices where hover does not exist.
 */
const GLASS = ".gl-btn, .gl-cp__tabs button, .sk-nav, .sk-menu-button, .sk-resume-link, .gl-top, .gl-cp__chips li, .gl-cp__badges a, .gl-oss__wall a"

export function Liquid() {
  useEffect(() => {
    const root = document.documentElement
    const chromium = /Chrome\//.test(navigator.userAgent) && typeof CSS !== "undefined" && CSS.supports("backdrop-filter", "url(#gl-lens)")
    if (chromium) root.setAttribute("data-lens", "1")

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (reduce) return

    let current: HTMLElement | null = null
    const move = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(GLASS) ?? null
      if (current && current !== el) {
        current.style.removeProperty("--lx")
        current.style.removeProperty("--ly")
      }
      current = el
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty("--lx", `${(e.clientX - r.left).toFixed(0)}px`)
      el.style.setProperty("--ly", `${(e.clientY - r.top).toFixed(0)}px`)
    }
    const release = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(GLASS)
      if (!el) return
      el.classList.remove("gl-jelly")
      void el.offsetWidth // restart the animation
      el.classList.add("gl-jelly")
      window.setTimeout(() => el.classList.remove("gl-jelly"), 900)
    }
    if (fine) window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerup", release, { passive: true })
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", release)
    }
  }, [])

  return (
    <svg className="gl-lens-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {/* Refraction: warp the backdrop with slow noise, then soften. Text sits above and is not warped. */}
        <filter id="gl-lens" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.009" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="64" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Smaller lens for buttons and chips. */}
        <filter id="gl-lens-s" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.5" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
