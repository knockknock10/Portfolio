"use client"

import { motion, useReducedMotion } from "framer-motion"
import { readDurationToken, useSpringToken } from "@/components/primitives/motionTokens"
import type { Internship } from "@/lib/internships"

type InternshipsProps = {
  items: Internship[]
  standalone?: boolean
}

function present(value: string | "MISSING"): value is string {
  return value !== "MISSING" && Boolean(value.trim())
}

function formatDates(start: string, end: string): string | null {
  if (!present(start) && !present(end)) return null
  if (present(start) && present(end)) return start + " — " + end
  return present(start) ? start : end
}

export function Internships({ items, standalone = false }: InternshipsProps) {
  const reducedMotion = Boolean(useReducedMotion())
  const spring = useSpringToken("gentle")
  const duration = readDurationToken("--duration-slow")
  const step = readDurationToken("--duration-section-stagger")
  const cap = readDurationToken("--duration-section-stagger-cap")
  if (!items.length) return null
  const Heading = standalone ? "h1" : "h2"
  const transition = reducedMotion
    ? { duration: 0 }
    : { ...(spring ?? { type: "spring" as const }), duration }

  return (
    <section className="internships-section" id={standalone ? undefined : "internships"} aria-labelledby="internships-heading">
      <div className="internships-inner">
        <header className="internships-header">
          <p className="internships-eyebrow">Experience</p>
          <Heading id="internships-heading" className="internships-title">Internships</Heading>
        </header>
        <div className="internships-timeline-wrap">
          <motion.span
            className="internships-timeline-rail"
            aria-hidden="true"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={transition}
          />
          <ol className="internships-timeline">
          {items.map((item, index) => {
            const dates = formatDates(item.startDate, item.endDate)
            const delay = reducedMotion ? 0 : Math.min(index * step, cap)
            return (
              <motion.li
                className="internships-item"
                key={item.company + "-" + item.role + "-" + item.startDate}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ ...transition, delay }}
              >
                <span className="internships-dot" aria-hidden="true" />
                <div className="internships-content">
                  <div className="internships-topline">
                    <div className="internships-title-role">
                      {present(item.logo) ? <img className="internships-logo" src={item.logo} alt={item.company + " logo"} /> : null}
                      <h3>{item.company}</h3>
                      {present(item.role) ? <span className="internships-role">· {item.role}</span> : null}
                    </div>
                    {dates ? <p className="internships-dates">{dates}</p> : null}
                  </div>
                  <p className="internships-meta">
                    {present(item.location) ? item.location : null}
                    {present(item.location) && present(item.duration) ? " · " : null}
                    {present(item.duration) ? item.duration : null}
                  </p>
                  {present(item.summary) ? <p className="internships-summary">{item.summary}</p> : null}
                  {Array.isArray(item.responsibilities) ? (
                    <ul className="internships-responsibilities">
                      {item.responsibilities.map((responsibility, i) => <li key={responsibility + "-" + i}>{responsibility}</li>)}
                    </ul>
                  ) : null}
                  {Array.isArray(item.stack) ? (
                    <p className="internships-stack">{item.stack.join(" · ")}</p>
                  ) : null}
                  {present(item.link) ? (
                    <a className="internships-link" href={item.link} target="_blank" rel="noreferrer">
                      Company site <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </motion.li>
            )
          })}
          </ol>
        </div>
      </div>
    </section>
  )
}
