"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { readDurationToken, useSpringToken } from "@/components/primitives/motionTokens"
import type { ResearchItem } from "@/lib/research"

type ResearchProps = {
  items: ResearchItem[]
  standalone?: boolean
}

function available(value: string | "MISSING"): value is string {
  return value !== "MISSING" && Boolean(value.trim())
}

function paperLink(url: string): boolean {
  return /doi\.org|arxiv\.org|\.pdf(?:$|[?#])/i.test(url)
}

function AbstractDisclosure({ abstract }: { abstract: string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="research-abstract-wrap">
      <p className={expanded ? "research-abstract is-expanded" : "research-abstract"}>
        {abstract}
      </p>
      <button
        className="research-read-more"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  )
}

export function Research({ items, standalone = false }: ResearchProps) {
  const reducedMotion = Boolean(useReducedMotion())
  const spring = useSpringToken("gentle")
  const duration = readDurationToken("--duration-slow")
  const stagger = readDurationToken("--duration-section-stagger")
  const staggerCap = readDurationToken("--duration-section-stagger-cap")
  const transition = reducedMotion
    ? { duration: 0 }
    : { ...(spring ?? { type: "spring" as const }), duration, }
  if (!items.length) return null

  const Heading = standalone ? "h1" : "h2"

  return (
    <section className="research-section" id={standalone ? undefined : "research"} aria-labelledby="research-heading" tabIndex={-1}>
      <div className="research-inner">
        <header className="research-header">
          <p className="research-eyebrow">Research</p>
          <Heading id="research-heading" className="research-title">Research</Heading>
        </header>
        <div className="research-list">
          {items.map((item, index) => {
            const status = available(item.status) && ["under review", "in progress"].includes(item.status.toLowerCase())
              ? item.status.toLowerCase() === "under review" ? "Under review" : "In progress"
              : null
            const delay = reducedMotion ? 0 : Math.min(index * stagger, staggerCap)
            return (
              <motion.article
                className="research-row"
                key={item.title + "-" + item.year}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ ...transition, delay }}
              >
                <div className="research-year">
                  {available(item.year) ? item.year : null}
                </div>
                <div className="research-copy">
                  <div className="research-title-line">
                    <h3>{item.title}</h3>
                    {status ? <span className="research-status">{status}</span> : null}
                  </div>
                  {Array.isArray(item.authors) ? (
                    <p className="research-authors">{item.authors.join(", ")}</p>
                  ) : null}
                  {available(item.venue) ? <p className="research-venue">{item.venue}</p> : null}
                  {available(item.abstract) ? <AbstractDisclosure abstract={item.abstract} /> : null}
                  {item.tags.length ? <p className="research-tags">{item.tags.join(" · ")}</p> : null}
                </div>
                <div className="research-actions">
                  {available(item.image) ? <img className="research-image" src={item.image} alt={item.title} /> : null}
                  {available(item.link) ? (
                    <a className="research-link" href={item.link} target="_blank" rel="noreferrer">
                      {paperLink(item.link) ? "Read paper" : "View"}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
