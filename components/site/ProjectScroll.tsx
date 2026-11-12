"use client"

import { useEffect, useRef, useState } from "react"
import { publicUrl } from "@/lib/public-url"
import { useLenis } from "@/components/SmoothScrollProvider"
import { useLiveGithub } from "./useLiveGithub"
import { Reveal } from "./Reveal"
import { projects } from "./Work"

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const N = projects.length

/**
 * Projects, one at a time, driven by scroll. On wide screens the stage pins to the
 * viewport and each project takes its turn: text and visual move at different speeds,
 * the numeral drifts behind, and the flow steps light up as you scroll through them.
 * On phones, or with reduced motion, it falls back to a plain stacked list.
 */
export function ProjectScroll({ repoCount: builtRepoCount }: { repoCount: number | null }) {
  const live = useLiveGithub()
  const repoCount = live?.repoCount ?? builtRepoCount
  const lenis = useLenis()
  const track = useRef<HTMLDivElement>(null)
  const layers = useRef<Array<HTMLElement | null>>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)")
    let raf = 0
    let cur = 0, target = 0
    let on = false

    const measure = () => {
      const el = track.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = Math.max(1, el.offsetHeight - window.innerHeight)
      target = clamp(-r.top / total) * (N - 1)
    }

    const paint = () => {
      cur += (target - cur) * 0.14
      if (Math.abs(target - cur) < 0.0004) cur = target
      let nearest = 0, best = 9
      layers.current.forEach((layer, i) => {
        if (!layer) return
        const d = cur - i
        const a = Math.abs(d)
        if (a < best) { best = a; nearest = i }
        const fade = clamp(1 - (a - 0.26) / 0.26)
        const sgn = d < 0 ? 1 : -1
        const out = clamp((a - 0.26) / 0.26)
        const e = out * out * (3 - 2 * out) // smoothstep
        layer.style.opacity = String(fade)
        layer.style.visibility = fade <= 0.001 ? "hidden" : "visible"
        layer.style.pointerEvents = fade > 0.6 ? "auto" : "none"
        const text = layer.querySelector<HTMLElement>("[data-part=text]")
        const vis = layer.querySelector<HTMLElement>("[data-part=vis]")
        const ghost = layer.querySelector<HTMLElement>("[data-part=ghost]")
        if (text) text.style.transform = `translate3d(0, ${(sgn * e * 70).toFixed(1)}px, 0)`
        if (vis) vis.style.transform = `translate3d(0, ${(sgn * e * 150).toFixed(1)}px, 0) scale(${(1 - e * 0.06).toFixed(3)})`
        if (ghost) ghost.style.transform = `translate3d(${(d * -120).toFixed(1)}px, ${(d * -60).toFixed(1)}px, 0)`
        const local = clamp((d + 0.3) / 0.6)
        layer.style.setProperty("--k", local.toFixed(3))
        const steps = layer.querySelectorAll<HTMLElement>("[data-step]")
        if (steps.length) {
          const idx = Math.min(steps.length - 1, Math.floor(local * steps.length))
          steps.forEach((s, j) => { s.dataset.on = String(j <= idx); s.dataset.current = String(j === idx) })
        }
      })
      setActive((p) => (p === nearest ? p : nearest))
      raf = cur === target ? 0 : requestAnimationFrame(paint)
    }

    const kick = () => {
      measure()
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const start = () => {
      if (on) return
      on = true
      kick()
      cur = target
      window.addEventListener("scroll", kick, { passive: true })
      window.addEventListener("resize", kick)
    }
    const stop = () => {
      if (!on) return
      on = false
      cancelAnimationFrame(raf); raf = 0
      window.removeEventListener("scroll", kick)
      window.removeEventListener("resize", kick)
      layers.current.forEach((l) => {
        if (!l) return
        l.removeAttribute("style")
        l.querySelectorAll<HTMLElement>("[data-part]").forEach((p) => p.removeAttribute("style"))
        l.querySelectorAll<HTMLElement>("[data-step]").forEach((s) => { s.dataset.on = "true"; s.dataset.current = "false" })
      })
    }
    const sync = () => (wide.matches ? start() : stop())
    sync()
    wide.addEventListener("change", sync)
    return () => { wide.removeEventListener("change", sync); stop() }
  }, [])

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const total = el.offsetHeight - window.innerHeight
    const y = el.getBoundingClientRect().top + window.scrollY + (i / (N - 1)) * total
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y, behavior: "smooth" })
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--rx", `${(-((e.clientY - r.top) / r.height - 0.5) * 7).toFixed(2)}deg`)
    e.currentTarget.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width - 0.5) * 9).toFixed(2)}deg`)
  }
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg")
    e.currentTarget.style.setProperty("--ry", "0deg")
  }

  return (
    <section className="gl-ps" id="work" aria-labelledby="work-title" style={{ ["--n" as string]: N }}>
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Selected work · scroll to explore</p>
              <h2 className="sk-h2" id="work-title">Things I&apos;ve built</h2>
            </div>
            <p className="sk-lede">
              Five projects, one at a time. Keep scrolling and each one takes the stage: what it does, how it is put
              together, and where to try or inspect the code.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="gl-ps__track" ref={track}>
        <div className="gl-ps__stage">
          {projects.map((p, i) => {
            const host = (() => { try { return new URL(p.links[0].href).host } catch { return "" } })()
            const steps = p.steps?.items ?? []
            return (
              <article key={p.title} className="gl-ps__layer" ref={(el) => { layers.current[i] = el }} aria-label={p.title}>
                <div className="gl-ps__ghost" data-part="ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                <div className="gl-ps__text" data-part="text">
                  <p className="gl-ps__meta">
                    <span>{String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
                    <b>{p.status}</b>
                  </p>
                  <h3 className="gl-ps__title" data-long={p.title.length > 10 ? "true" : "false"}>{p.title}</h3>
                  {p.role ? <p className="gl-ps__role">{p.role}</p> : null}
                  <p className="gl-ps__summary">{p.summary}</p>
                  <ul className="gl-ps__tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className="gl-ps__links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer" data-primary={l.primary ? "true" : "false"}>
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="gl-ps__visualwrap" data-part="vis">
                  <div className="gl-ps__visual" onPointerMove={onMove} onPointerLeave={onLeave}>
                    {p.image ? (
                      <figure className="gl-ps__browser">
                        <div className="gl-ps__chrome" aria-hidden="true"><span /><span /><span /><em>{host}</em></div>
                        <div className="gl-ps__shot">
                          <img src={publicUrl(p.image.src)} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" />
                        </div>
                        <figcaption>{p.image.caption}</figcaption>
                      </figure>
                    ) : (
                      <div className="gl-ps__flow">
                        <p className="gl-ps__flowhead">{p.steps?.title ?? "How it fits together"}</p>
                        <ol>
                          {steps.map((s, j) => (
                            <li key={s} data-step data-on="true" data-current="false">
                              <span>{String(j + 1).padStart(2, "0")}</span>
                              <p>{s}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}

          <ol className="gl-ps__ticks" aria-label="Projects">
            {projects.map((p, i) => (
              <li key={p.title}>
                <button type="button" data-active={i === active} onClick={() => goTo(i)} aria-label={`Go to ${p.title}`}>
                  <span>{p.title}</span><i aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {typeof repoCount === "number" ? (
        <div className="sk-wrap">
          <p className="gl-ps__note">
            There are {repoCount} public repositories in total, including smaller experiments and my DSA practice.{" "}
            <a href="https://github.com/knockknock10" target="_blank" rel="noreferrer">Browse them on GitHub ↗</a>
          </p>
        </div>
      ) : null}
    </section>
  )
}
