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

  if (!rows.length) return null

  return (
    <div className="gl-marquee" ref={bandRef} aria-label="Projects I have contributed to and technologies I use" role="group">
      {rows.map((row, index) => (
        <div className="gl-marquee__row" key={index} aria-hidden={index > 0 ? "true" : undefined}>
          <div className="gl-marquee__track" data-tone={row.tone} ref={(el) => { trackRefs.current[index] = el }}>
            {[0, 1].map((copy) =>
              row.items.map((item) => (
                <span key={`${copy}-${item}`}>
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
