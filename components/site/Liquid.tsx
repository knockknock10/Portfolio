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

    // Water flow: while the page scrolls, the refraction drifts and swells with the scroll speed, then settles.
    // It only touches the filters while something is moving, so a resting page costs nothing.
    let flowRaf = 0
    let lastY = window.scrollY, speed = 0, shown = 0
    const tL = document.getElementById("gl-turb-l"), dL = document.getElementById("gl-disp-l")
    const tS = document.getElementById("gl-turb-s"), dS = document.getElementById("gl-disp-s")
    const flow = () => {
      const y = window.scrollY
      speed += (Math.min(60, Math.abs(y - lastY)) - speed) * 0.12
      lastY = y
      if (speed < 0.02 && shown === 0) { flowRaf = 0; return }
      const swell = Math.min(1, speed / 28)
      shown = speed < 0.02 ? 0 : 1
      const drift = Math.sin(y / 520) * 0.0016
      tL?.setAttribute("baseFrequency", `${(0.005 + drift).toFixed(5)} ${(0.009 - drift * 0.8).toFixed(5)}`)
      dL?.setAttribute("scale", String(Math.round(96 + swell * 70)))
      tS?.setAttribute("baseFrequency", `${(0.012 - drift * 2).toFixed(5)} ${(0.02 + drift * 2).toFixed(5)}`)
      dS?.setAttribute("scale", String(Math.round(40 + swell * 34)))
      flowRaf = requestAnimationFrame(flow)
    }
    const onScroll = () => { if (!flowRaf && chromium && !reduce) flowRaf = requestAnimationFrame(flow) }
    window.addEventListener("scroll", onScroll, { passive: true })
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (reduce) return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(flowRaf) }

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
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(flowRaf)
    }
  }, [])

  return (
    <svg className="gl-lens-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {/* Refraction: warp the backdrop with slow noise, then soften. Text sits above and is not warped. */}
        <filter id="gl-lens" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence id="gl-turb-l" type="fractalNoise" baseFrequency="0.005 0.009" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="3" result="soft" />
          <feDisplacementMap id="gl-disp-l" in="SourceGraphic" in2="soft" scale="96" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Smaller lens for buttons and chips. */}
        <filter id="gl-lens-s" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence id="gl-turb-s" type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.5" result="soft" />
          <feDisplacementMap id="gl-disp-s" in="SourceGraphic" in2="soft" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
