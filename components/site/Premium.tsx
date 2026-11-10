"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLenis } from "@/components/SmoothScrollProvider"

type Item = { id: string; label: string; hint?: string; run: () => void }

type PremiumProps = {
  sections: { id: string; label: string }[]
  email: string | null
  resumeHref: string
  github: string | null
  linkedin: string | null
}

/**
 * Page-wide polish for pointer devices:
 *  - glass cards carry a soft specular highlight that follows the pointer (--mx / --my)
 *  - the header slides away while scrolling down and returns on scroll up
 *  - the colour blobs drift slightly with scroll (--sy)
 *  - Ctrl/⌘ + K opens a quick-jump menu; "c" style shortcuts are intentionally not used
 *  - a toast confirms copied text
 */
export function Premium({ sections, email, resumeHref, github, linkedin }: PremiumProps) {
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [index, setIndex] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const flash = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const jump = useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return
      if (lenis) lenis.scrollTo(target, { offset: -76, duration: 1.3 })
      else target.scrollIntoView({ behavior: "smooth" })
      window.history.replaceState(null, "", `#${id}`)
    },
    [lenis],
  )

  const items = useMemo<Item[]>(() => {
    const list: Item[] = sections.map((s) => ({ id: `go-${s.id}`, label: s.label, hint: "Go to section", run: () => jump(s.id) }))
    if (email) {
      list.push({
        id: "copy-email",
        label: "Copy email address",
        hint: email,
        run: () => {
          navigator.clipboard?.writeText(email).then(
            () => flash("Email copied"),
            () => flash(email),
          )
        },
      })
    }
    list.push({ id: "resume", label: "Open résumé", hint: "PDF", run: () => window.open(resumeHref, "_blank", "noreferrer") })
    if (github) list.push({ id: "github", label: "GitHub", hint: "knockknock10", run: () => window.open(github, "_blank", "noreferrer") })
    if (linkedin) list.push({ id: "linkedin", label: "LinkedIn", hint: "Profile", run: () => window.open(linkedin, "_blank", "noreferrer") })
    return list
  }, [sections, email, resumeHref, github, linkedin, jump, flash])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((i) => `${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q)) : items
  }, [items, query])

  // Keyboard: open / close the menu.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      } else if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    setQuery("")
    setIndex(0)
    lenis?.stop()
    const t = window.setTimeout(() => inputRef.current?.focus(), 30)
    return () => {
      window.clearTimeout(t)
      lenis?.start()
    }
  }, [open, lenis])

  // Header hide/show, scroll parallax, pointer light.
  useEffect(() => {
    const root = document.documentElement
    const header = document.querySelector<HTMLElement>(".sk-header")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (header) {
          const goingDown = y > lastY + 4
          const goingUp = y < lastY - 4
          if (y < 160 || goingUp) header.removeAttribute("data-hidden")
          else if (goingDown) header.setAttribute("data-hidden", "true")
        }
        if (!reduce) root.style.setProperty("--sy", String(Math.round(y * 0.08)))
        lastY = y
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    let cleanupPointer = () => {}
    if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const sel =
        ".gl-workbench__rail, .gl-workbench__stage, .gl-practice-feature, .gl-practice-platform, .gl-research-entry, .gl-research-card, .gl-experience-item, .gl-skill, .gl-org, .gl-pr, .gl-graph, .sk-fact, .sk-contact__row, .sk-practice, .gl-cert"
      const onMove = (event: PointerEvent) => {
        const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(sel)
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`)
        el.style.setProperty("--my", `${event.clientY - rect.top}px`)
      }
      document.addEventListener("pointermove", onMove, { passive: true })
      cleanupPointer = () => document.removeEventListener("pointermove", onMove)
    }

    // Copy-on-click for email links marked by the contact section.
    const onClick = (event: MouseEvent) => {
      const a = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a.sk-email")
      if (!a || event.metaKey || event.ctrlKey || event.shiftKey) return
      const address = a.getAttribute("href")?.replace(/^mailto:/, "")
      if (!address || !navigator.clipboard) return
      navigator.clipboard.writeText(address).then(() => flash("Email copied"), () => {})
    }
    document.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("click", onClick)
      cleanupPointer()
    }
  }, [flash])

  const choose = (item: Item | undefined) => {
    if (!item) return
    setOpen(false)
    window.setTimeout(item.run, 120)
  }

  return (
    <>
      <button type="button" className="gl-kbd" onClick={() => setOpen(true)} aria-label="Open quick menu">
        <span>Quick menu</span>
        <kbd>⌘ / Ctrl K</kbd>
      </button>

      {open ? (
        <div className="gl-palette" role="dialog" aria-modal="true" aria-label="Quick menu" onMouseDown={() => setOpen(false)}>
          <div className="gl-palette__panel" onMouseDown={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              className="gl-palette__input"
              placeholder="Jump to a section or link"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setIndex(0)
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  setIndex((i) => Math.min(i + 1, visible.length - 1))
                } else if (e.key === "ArrowUp") {
                  e.preventDefault()
                  setIndex((i) => Math.max(i - 1, 0))
                } else if (e.key === "Enter") choose(visible[index])
              }}
            />
            <ul className="gl-palette__list">
              {visible.length === 0 ? <li className="gl-palette__empty">Nothing matches.</li> : null}
              {visible.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    data-active={i === index}
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => choose(item)}
                  >
                    <span>{item.label}</span>
                    <small>{item.hint}</small>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="gl-toast" role="status" aria-live="polite" data-show={toast ? "true" : "false"}>
        {toast}
      </div>
    </>
  )
}
