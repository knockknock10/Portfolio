"use client"

import { useEffect, useState } from "react"
import { useLenis } from "@/components/SmoothScrollProvider"

type Item = { id: string; label: string }

/**
 * A slim section index fixed to the right edge on wide screens. The current
 * section is marked, hovering reveals the names, and a click scrolls there.
 */
export function SideRail({ sections }: { sections: Item[] }) {
  const lenis = useLenis()
  const [active, setActive] = useState(sections[0]?.id ?? "")

  useEffect(() => {
    const targets = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el))
    if (!targets.length || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  const go = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    if (lenis) lenis.scrollTo(target, { offset: -76, duration: 1.3 })
    else target.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="gl-rail" aria-label="Sections">
      <ol>
        {sections.map((section, index) => (
          <li key={section.id}>
            <button type="button" data-active={active === section.id} onClick={() => go(section.id)}>
              <span className="gl-rail__label">{section.label}</span>
              <span className="gl-rail__mark">{String(index + 1).padStart(2, "0")}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
