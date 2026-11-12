"use client"

import { useEffect, useRef } from "react"
import type { ResearchItem } from "@/lib/research"
import { publicUrl } from "@/lib/public-url"
import { CountUp } from "./CountUp"

const isText = (v: string | string[] | undefined | null): v is string => typeof v === "string" && v !== "MISSING"
const STAGES: Array<[string, string]> = [
  ["Audio", "Multichannel input"],
  ["Detection", "Acoustic observations"],
  ["Source track", "Continuity hypotheses"],
  ["Late-arrival tests", "Knowledge-time question"],
]

/** Research as two glass sheets: the paper with its numbers, and the work in progress as a flow that lights up as it enters. */
export function ResearchShowcase({ paper }: { paper: ResearchItem | null; other: ResearchItem[] }) {
  const flow = useRef<HTMLOListElement>(null)
  const pdf = paper && isText(paper.pdf) ? publicUrl("/" + paper.pdf.replace(/^\/+/, "")) : null
  const code = paper && isText(paper.link) ? paper.link : null
  const hasStats = !!paper && isText(paper.abstract) && paper.abstract.includes("2,620")

  useEffect(() => {
    const el = flow.current
    if (!el || !("IntersectionObserver" in window)) { el?.setAttribute("data-in", "true"); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.setAttribute("data-in", "true"); io.disconnect() } }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="gl-rs" id="research" aria-labelledby="research-title">
      <div className="sk-wrap gl-rs__grid">
        <header className="gl-rs__head fx-left">
          <p className="sk-eyebrow">Research &amp; exploration</p>
          <h2 id="research-title">Sound, space and temporal intelligence.</h2>
          <p>From protecting speech content to building audio systems that remember how a scene changes over time. These are the questions I am working through.</p>
        </header>

        <div className="gl-rs__stack">
          {paper ? (
            <article className="gl-rs__paper gl-pane fx-tilt">
              <p className="gl-rs__kicker">
                <span>First-author manuscript</span>
                <span>Submitted, not yet published</span>
                {isText(paper.year) ? <span>{paper.year}</span> : null}
              </p>
              <h3>{paper.title}</h3>
              {hasStats ? (
                <dl className="gl-rs__stats">
                  <div><dt>LibriSpeech utterances</dt><dd><CountUp value={2620} /></dd></div>
                  <div><dt>placement rules compared</dt><dd><CountUp value={5} /></dd></div>
                  <div><dt>target SNRs tested</dt><dd><CountUp value={6} /></dd></div>
                </dl>
              ) : null}
              {isText(paper.abstract) ? <p className="gl-rs__abstract">{paper.abstract}</p> : null}
              <ul className="gl-rs__tags">{(paper.tags ?? []).slice(0, 6).map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="gl-rs__actions">
                {pdf ? <a className="gl-btn gl-btn--solid" href={pdf} target="_blank" rel="noreferrer">Read the paper ↗</a> : null}
                {code ? <a className="gl-btn" href={code} target="_blank" rel="noreferrer">Code ↗</a> : null}
              </div>
            </article>
          ) : null}

          <article className="gl-rs__graph gl-pane fx-right">
            <p className="gl-rs__kicker"><span>Active research</span><span>2026</span></p>
            <h3>Causal-temporal audio knowledge graphs</h3>
            <p className="gl-rs__abstract">
              I am working on tracking sound-source observations across a recording and keeping the relationships between them over time.
              The main audio pipeline and the late-arrival timing tests are being evaluated separately for now.
            </p>
            <ol className="gl-rs__flow" ref={flow} data-in="false">
              {STAGES.map(([name, note], i) => (
                <li key={name} style={{ ["--i" as string]: i }}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <b>{name}</b>
                  <small>{note}</small>
                </li>
              ))}
            </ol>
            <p className="gl-rs__fine">Conceptual flow, not a claim of end-to-end validation.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
