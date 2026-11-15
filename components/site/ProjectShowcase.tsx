"use client"

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react"
import { publicUrl } from "@/lib/public-url"
import { useLiveGithub } from "./useLiveGithub"
import { Reveal } from "./Reveal"
import { projects } from "./Work"

/**
 * Projects as a switcher: a list of liquid-glass chips on the left, one large glass stage on the right.
 * Pick a project (click, tap, arrow keys) and a droplet slides to it while the stage swaps. The stage tilts with
 * the pointer and a soft highlight follows it. Nothing is pinned, so the page scrolls normally.
 */
export function ProjectShowcase({ repoCount: builtRepoCount }: { repoCount: number | null }) {
  const live = useLiveGithub()
  const repoCount = live?.repoCount ?? builtRepoCount
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const items = useRef<Array<HTMLButtonElement | null>>([])
  const drop = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const place = () => {
      const b = items.current[active]
      const d = drop.current
      if (!b || !d) return
      d.style.setProperty("--dy", `${b.offsetTop}px`)
      d.style.setProperty("--dx", `${b.offsetLeft}px`)
      d.style.setProperty("--dw", `${b.offsetWidth}px`)
      d.style.setProperty("--dh", `${b.offsetHeight}px`)
    }
    place()
    window.addEventListener("resize", place)
    return () => window.removeEventListener("resize", place)
  }, [active])

  const pick = (i: number) => {
    if (i === active) return
    setDir(i > active ? 1 : -1)
    setActive(i)
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = projects.length
    let next = -1
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % n
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active + n - 1) % n
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = n - 1
    if (next < 0) return
    e.preventDefault()
    pick(next)
    items.current[next]?.focus()
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty("--rx", `${((0.5 - py) * 5).toFixed(2)}deg`)
    el.style.setProperty("--ry", `${((px - 0.5) * 7).toFixed(2)}deg`)
    el.style.setProperty("--lx", `${(px * 100).toFixed(1)}%`)
    el.style.setProperty("--ly", `${(py * 100).toFixed(1)}%`)
  }
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg")
    e.currentTarget.style.setProperty("--ry", "0deg")
  }

  const p = projects[active]
  const host = (() => { try { return new URL(p.links[0].href).host } catch { return "" } })()
  const steps = p.steps?.items ?? []

  return (
    <section className="gl-pj" id="work" aria-labelledby="work-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Selected work</p>
              <h2 className="sk-h2" id="work-title">Things I&apos;ve built</h2>
            </div>
            <p className="sk-lede">
              Pick a project to see what it does, how it is put together, and where to try it or read the code.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="gl-pj__grid">
            <div className="gl-pj__list" role="tablist" aria-orientation="vertical" aria-label="Projects" onKeyDown={onKey}>
              <span className="gl-pj__drop" ref={drop} aria-hidden="true" />
              {projects.map((q, i) => (
                <button
                  key={q.title}
                  ref={(el) => { items.current[i] = el }}
                  type="button"
                  role="tab"
                  id={`pj-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="pj-panel"
                  tabIndex={i === active ? 0 : -1}
                  className="gl-pj__chip gl-magnet"
                  data-active={i === active}
                  onClick={() => pick(i)}
                >
                  <span className="gl-pj__no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="gl-pj__name">{q.title}</span>
                  <span className="gl-pj__state">{q.status}</span>
                </button>
              ))}
            </div>

            <div className="gl-pj__stage" onPointerMove={onMove} onPointerLeave={onLeave} data-tilt>
              <div className="gl-pj__panel" id="pj-panel" role="tabpanel" aria-labelledby={`pj-tab-${active}`} key={p.title} data-dir={dir}>
                <div className="gl-pj__vis">
                  {p.image ? (
                    <figure className="gl-pj__browser">
                      <div className="gl-pj__chrome" aria-hidden="true"><span /><span /><span /><em>{host}</em></div>
                      <div className="gl-pj__shot">
                        <img src={publicUrl(p.image.src)} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" />
                      </div>
                      <figcaption>{p.image.caption}</figcaption>
                    </figure>
                  ) : (
                    <div className="gl-pj__flow">
                      <p>{p.steps?.title ?? "How it fits together"}</p>
                      <ol>
                        {steps.map((s, j) => (
                          <li key={s} style={{ ["--j" as string]: j }}>
                            <span>{String(j + 1).padStart(2, "0")}</span>
                            <em>{s}</em>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                <div className="gl-pj__body">
                  <p className="gl-pj__kicker"><span>{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span><b>{p.status}</b></p>
                  <h3 className="gl-pj__title">{p.title}</h3>
                  {p.role ? <p className="gl-pj__role">{p.role}</p> : null}
                  <p className="gl-pj__sum">{p.summary}</p>
                  <ul className="gl-pj__tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className="gl-pj__links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="gl-btn gl-magnet" data-primary={l.primary ? "true" : "false"}>
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {typeof repoCount === "number" ? (
          <p className="gl-pj__note">
            There are {repoCount} public repositories in total, including smaller experiments and my DSA practice.{" "}
            <a href="https://github.com/knockknock10" target="_blank" rel="noreferrer">Browse them on GitHub ↗</a>
          </p>
        ) : null}
      </div>
    </section>
  )
}
