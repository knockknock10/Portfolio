"use client"

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { publicUrl } from "@/lib/public-url"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"

// The earlier, static version of this section is kept in _legacy/Certificates.static.tsx.txt

export type CertificateView = {
  title: string
  issuer: string | null
  date: string | null
  sortDate: string | null
  credentialId: string | null
  credentialUrl: string | null
  skills: string[]
  verificationStatus: "verified" | "self-reported"
  /** Badge artwork hosted by the issuer (comes from the Credly sync). */
  badge: string | null
  file: string | null
  isPdf: boolean
}

type Props = { items: CertificateView[]; profileUrl?: string | null; syncedAt?: string | null }

function categoryOf(item: CertificateView) {
  const text = `${item.title} ${item.issuer ?? ""}`.toLowerCase()
  if (/aws|amazon|google cloud|cloud/.test(text)) return "Cloud"
  if (/mongo|sql|database/.test(text)) return "Databases"
  if (/red hat|linux/.test(text)) return "Linux"
  return "Programming"
}

function Tile({ item, src }: { item: CertificateView; src: string | null }) {
  const [badgeFailed, setBadgeFailed] = useState(false)
  const initials = (item.issuer ?? "Credential").split(/\s+/).map((part) => part[0]).join("").slice(0, 3).toUpperCase()
  if (src && !item.isPdf) return <img src={src} alt={`${item.title} certificate`} loading="lazy" />
  if (item.badge && !badgeFailed) {
    return (
      <span className="gl-cert__badge">
        <img src={item.badge} alt={`${item.title} badge`} loading="lazy" onError={() => setBadgeFailed(true)} />
      </span>
    )
  }
  return (
    <span className={item.isPdf ? "gl-cert__pdf" : "gl-cert__record"} aria-hidden="true">
      <strong>{item.isPdf ? "PDF" : initials}</strong>
      <small>{item.isPdf ? "Open certificate" : "Credential record"}</small>
    </span>
  )
}

export function Certificates({ items, profileUrl, syncedAt }: Props) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<CertificateView | null>(null)
  const [filter, setFilter] = useState("All")

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    items.forEach((item) => counts.set(categoryOf(item), (counts.get(categoryOf(item)) ?? 0) + 1))
    return [["All", items.length] as const, ...Array.from(counts.entries()).sort((a, b) => b[1] - a[1])]
  }, [items])

  const shown = filter === "All" ? items : items.filter((item) => categoryOf(item) === filter)
  const verifiedCount = items.filter((item) => item.verificationStatus === "verified").length

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (!items.length) return null

  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 380, damping: 34 }
  const syncedLabel = syncedAt
    ? new Date(syncedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    : null

  return (
    <section className="sk-section" id="certificates" aria-labelledby="certs-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Certificates</p>
              <h2 className="sk-h2" id="certs-title">Courses and certifications</h2>
            </div>
            <p className="sk-lede">
              {items.length} credentials, {verifiedCount} with an issuer link you can check. Filter by area, or open one to see the certificate.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="gl-certbar">
            <LayoutGroup id="cert-filter">
              <div className="gl-certbar__chips" role="group" aria-label="Filter certificates">
                {categories.map(([name, count]) => (
                  <button key={name} type="button" aria-pressed={filter === name} data-on={filter === name} onClick={() => setFilter(name)}>
                    {filter === name ? <motion.span layoutId="cert-chip" className="gl-certbar__pill" transition={spring} /> : null}
                    <span>{name}</span>
                    <em>{count}</em>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            {profileUrl ? (
              <a className="sk-text-link gl-certbar__sync" href={profileUrl} target="_blank" rel="noreferrer">
                Credly profile{syncedLabel ? ` · updated ${syncedLabel}` : ""} <ArrowUpRight />
              </a>
            ) : null}
          </div>

          <motion.ul className="gl-certs" layout={!reduce}>
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((item) => {
                const src = item.file ? publicUrl(item.file) : null
                return (
                  <motion.li
                    key={item.title}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                    transition={spring}
                  >
                    <article className="gl-cert" data-tilt>
                      <button type="button" className="gl-cert__preview" onClick={() => setOpen(item)} aria-label={`View details for ${item.title}`}>
                        <Tile item={item} src={src} />
                        <span className="gl-cert__open" aria-hidden="true">↗</span>
                      </button>
                      <div className="gl-cert__body">
                        <div className="gl-cert__topline">
                          <p>{item.issuer ?? "Issuer not listed"}</p>
                          <span>{item.verificationStatus === "verified" ? "Verified" : "Course record"}</span>
                        </div>
                        <h3>{item.title}</h3>
                        {item.date ? <p className="gl-cert__date">{item.date}</p> : null}
                        {item.skills.length ? (
                          <ul className="sk-tags" aria-label="Skills covered">
                            {item.skills.slice(0, 4).map((skill) => (
                              <li className="sk-chip" key={skill}>{skill}</li>
                            ))}
                          </ul>
                        ) : null}
                        <button type="button" className="sk-text-link gl-cert__details" onClick={() => setOpen(item)}>
                          View details <ArrowUpRight />
                        </button>
                      </div>
                    </article>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>
        </Reveal>
      </div>

      {open ? (
        <div className="gl-lightbox gl-certificate-viewer" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <div className="gl-lightbox__card gl-certificate-viewer__card" onClick={(event) => event.stopPropagation()}>
            <div className="gl-lightbox__bar">
              <div>
                <strong>{open.title}</strong>
                <span>{[open.issuer, open.date].filter(Boolean).join(" · ")}</span>
              </div>
              <button type="button" className="sk-btn sk-btn--small" onClick={() => setOpen(null)}>Close</button>
            </div>
            {open.file && open.isPdf ? (
              <iframe className="gl-certificate-viewer__pdf" src={publicUrl(open.file) + "#toolbar=1&view=FitH"} title={open.title + " certificate"} />
            ) : open.file ? (
              <img className="gl-certificate-viewer__image" src={publicUrl(open.file)} alt={open.title + " certificate"} />
            ) : (
              <div className="gl-certificate-viewer__details">
                {open.badge ? (
                  <img className="gl-certificate-viewer__badge" src={open.badge} alt={open.title + " badge"} />
                ) : (
                  <span className="gl-certificate-viewer__mark" aria-hidden="true">{(open.issuer ?? "C").slice(0, 1).toUpperCase()}</span>
                )}
                {open.credentialId ? <p><strong>Credential ID:</strong> {open.credentialId}</p> : null}
                {open.skills.length ? <p><strong>Skills:</strong> {open.skills.join(" · ")}</p> : null}
              </div>
            )}
            <div className="gl-certificate-viewer__actions">
              {open.credentialUrl ? (
                <a className="sk-btn sk-btn--small" href={open.credentialUrl} target="_blank" rel="noreferrer">
                  Verify with issuer <ArrowUpRight />
                </a>
              ) : null}
              {open.file ? <a className="sk-btn sk-btn--small" href={publicUrl(open.file)} download>Download certificate ↓</a> : null}
              {open.file ? (
                <a className="sk-text-link" href={publicUrl(open.file)} target="_blank" rel="noreferrer">
                  Open in new tab <ArrowUpRight />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
