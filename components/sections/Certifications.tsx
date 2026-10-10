"use client"

import { motion, useReducedMotion } from "framer-motion"
import { readDurationToken, useSpringToken } from "@/components/primitives/motionTokens"
import type { Certification } from "@/lib/certifications"

type CertificationsProps = {
  items: Certification[]
  standalone?: boolean
}

function present(value: string | "MISSING"): value is string {
  return value !== "MISSING" && Boolean(value.trim())
}

function dateLabel(value: string): string {
  if (value === "No expiry") return value
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return value
  const date = new Date(value + "T00:00:00Z")
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export function Certifications({ items, standalone = false }: CertificationsProps) {
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
    <section className="certifications-section" id={standalone ? undefined : "certifications"} aria-labelledby="certifications-heading">
      <div className="certifications-inner">
        <header className="certifications-header">
          <p className="certifications-eyebrow">Learning</p>
          <Heading id="certifications-heading" className="certifications-title">Certifications</Heading>
        </header>
        <ul className="certifications-grid">
          {items.map((item, index) => (
            <motion.li
              className="certification-item"
              key={item.title + "-" + item.issuer}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ ...transition, delay: reducedMotion ? 0 : Math.min(index * step, cap) }}
            >
              <div className="certification-topline">
                {present(item.issuer) ? <p className="certification-issuer">{item.issuer}</p> : <span />}
                {present(item.badgeImage) ? (
                  <img className="certification-badge-image" src={item.badgeImage} alt={item.title + " badge"} />
                ) : null}
              </div>
              <h3>{item.title}</h3>
              {present(item.issueDate) ? <p className="certification-date">Issued {dateLabel(item.issueDate)}</p> : null}
              {present(item.expiryDate) ? <p className="certification-date">Expiry {dateLabel(item.expiryDate)}</p> : null}
              {present(item.credentialId) ? <p className="certification-id">{item.credentialId}</p> : null}
              {Array.isArray(item.skillsCovered) && item.skillsCovered.length ? (
                <p className="certification-skills">{item.skillsCovered.join(" · ")}</p>
              ) : null}
              {present(item.credentialUrl) ? (
                <a className="certification-verify" href={item.credentialUrl} target="_blank" rel="noreferrer">
                  Verify <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
