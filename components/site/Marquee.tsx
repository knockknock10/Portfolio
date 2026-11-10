"use client"

import { useEffect, useRef } from "react"

type Row = { items: string[]; direction: 1 | -1; tone: "solid" | "outline" }

/**
 * Two bands of large type that drift sideways on their own and speed up (and lean)
 * with scroll speed. Top band: projects I've contributed to. Bottom band: what I build with.
 */
export function Marquee({ projects, stack }: { projects: string[]; stack: string[] }) {
  const rows: Row[] = [
    { items: projects, direction: -1, tone: "solid" },
    { items: stack, direction: 1, tone: "outline" },
  ].filter((row) => row.items.length > 0) as Row[]
import { useLiveGithub } from "./useLiveGithub"

type Row = {
  items: string[]
  direction: 1 | -1
  tone: "solid" | "outline"
  label: string
}

/**
 * Two editorial ticker bands: contributed projects and the tools used to build.
 * Motion pauses when the band leaves the viewport, when the tab is hidden, and
 * whenever the visitor enables reduced motion.
 */
export function Marquee({ projects, stack }: { projects: string[]; stack: string[] }) {
  const live = useLiveGithub()
  const currentProjects = live?.upstream.projects.map((project) => project.name) ?? projects
  const projectKey = currentProjects.join("\u001f")
  const stackKey = stack.join("\u001f")

  const rows: Row[] = [
    { items: projectKey ? projectKey.split("\u001f") : [], direction: -1 as const, tone: "solid" as const, label: "Open-source projects" },
    { items: stackKey ? stackKey.split("\u001f") : [], direction: 1 as const, tone: "outline" as const, label: "Technologies used" },
  ].filter((row) => row.items.length > 0)

  const trackRefs = useRef<(HTMLDivElement | null)[]>([])
  const bandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const offsets = rows.map(() => 0)
    let velocity = 0
    let lastY = window.scrollY
    let raf = 0
    let visible = true

    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "200px" })
    if (bandRef.current) observer.observe(bandRef.current)

    const tick = () => {
      const y = window.scrollY
      velocity += (y - lastY - velocity) * 0.18
      lastY = y
      if (visible) {
        const boost = Math.min(Math.abs(velocity), 60)
        rows.forEach((row, index) => {
          const track = trackRefs.current[index]
          if (!track) return
          const half = track.scrollWidth / 2
          offsets[index] += 0.7 + boost * 0.35
          // Keep the offset inside one copy so the loop never shows a seam.
          if (half > 0) offsets[index] = ((offsets[index] % half) + half) % half
          const shift = row.direction === -1 ? -offsets[index] : offsets[index] - half
          track.style.transform = `translate3d(${shift}px,0,0) skewX(${Math.max(-8, Math.min(8, -velocity * 0.12))}deg)`
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [projects.join("|"), stack.join("|")])
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionPreference.matches) return

    const offsets = rows.map(() => 0)
    let velocity = 0
    let lastY = window.scrollY
    let frame = 0
    let inViewport = false

    const schedule = () => {
      if (!frame && inViewport && !document.hidden && !motionPreference.matches) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    const tick = () => {
      frame = 0
      const boost = Math.min(Math.abs(velocity), 60)

      rows.forEach((row, index) => {
        const track = trackRefs.current[index]
        if (!track) return

        const half = track.scrollWidth / 2
        if (half <= 0) return

        offsets[index] = (offsets[index] + 0.7 + boost * 0.35) % half
        const shift = row.direction === -1 ? -offsets[index] : offsets[index] - half
        const skew = Math.max(-6, Math.min(6, -velocity * 0.1))
        track.style.transform = `translate3d(${shift}px, 0, 0) skewX(${skew}deg)`
      })

      velocity *= 0.88
      schedule()
    }

    const onScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastY
      lastY = scrollY
      velocity = Math.max(-60, Math.min(60, velocity + delta * 0.45))
      schedule()
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
      } else {
        lastY = window.scrollY
        schedule()
      }
    }

    const onMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
        trackRefs.current.forEach((track) => track?.style.removeProperty("transform"))
      } else {
        schedule()
      }
    }

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            inViewport = Boolean(entry?.isIntersecting)
            if (inViewport) schedule()
            else if (frame) {
              window.cancelAnimationFrame(frame)
              frame = 0
            }
          }, { rootMargin: "160px" })
        : null

    if (bandRef.current) {
      if (observer) observer.observe(bandRef.current)
      else inViewport = true
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", onVisibilityChange)
    motionPreference.addEventListener("change", onMotionPreferenceChange)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      motionPreference.removeEventListener("change", onMotionPreferenceChange)
    }
  }, [projectKey, stackKey])

  if (!rows.length) return null

  return (
    <div className="gl-marquee" ref={bandRef} aria-label="Projects I have contributed to and technologies I use" role="group">
      {rows.map((row, index) => (
        <div className="gl-marquee__row" key={index} aria-hidden={index > 0 ? "true" : undefined}>
          <div className="gl-marquee__track" data-tone={row.tone} ref={(el) => { trackRefs.current[index] = el }}>
            {[0, 1].map((copy) =>
              row.items.map((item) => (
                <span key={`${copy}-${item}`}>
    <div className="gl-marquee">
      {rows.map((row, index) => (
        <div className="gl-marquee__row" key={row.tone} role="group" aria-label={row.label}>
          <div
            className="gl-marquee__track"
            data-tone={row.tone}
            ref={(element) => {
              trackRefs.current[index] = element
            }}
          >
            {[0, 1].map((copy) =>
              row.items.map((item) => (
                <span key={`${copy}-${item}`} aria-hidden={copy === 1 ? true : undefined}>
                  {item}
                  <b aria-hidden="true">/</b>
                </span>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
