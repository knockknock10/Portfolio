"use client"

import { useEffect, useState } from "react"
import { publicUrl } from "@/lib/public-url"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"

export type CertificateView = {
  title: string
  issuer: string | null
  date: string | null
  credentialId: string | null
  credentialUrl: string | null
  skills: string[]
  verificationStatus: "verified" | "self-reported"
  file: string | null
  isPdf: boolean
}

export function Certificates({ items }: { items: CertificateView[] }) {
  const [open, setOpen] = useState<CertificateView | null>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(null) }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (!items.length) return null

  return (
    <section className="sk-section" id="certificates" aria-labelledby="certs-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div><p className="sk-eyebrow">Certificates</p><h2 className="sk-h2" id="certs-title">Courses and certifications</h2></div>
            <p className="sk-lede">Open a credential to inspect its details or view the certificate file when one is hosted.</p>
          </div>
        </Reveal>
        <Reveal>
          <ul className="gl-certs">
            {items.map(item => {
              const src = item.file ? publicUrl(item.file) : null
              const initials = (item.issuer ?? "Credential").split(/\s+/).map(part => part[0]).join("").slice(0,3).toUpperCase()
              return (
                <li key={item.title + (item.file ?? "")}>
                  <article className="gl-cert" data-tilt>
                    <button type="button" className="gl-cert__preview" onClick={() => setOpen(item)} aria-label={`View details for ${item.title}`}>
                      {src && !item.isPdf ? <img src={src} alt={`${item.title} certificate`} loading="lazy" /> : (
                        <span className={item.isPdf ? "gl-cert__pdf" : "gl-cert__record"} aria-hidden="true">
                          <strong>{item.isPdf ? "PDF" : initials}</strong><small>{item.isPdf ? "Open certificate" : "Credential record"}</small>
                        </span>
                      )}
                      <span className="gl-cert__open" aria-hidden="true">↗</span>
                    </button>
                    <div className="gl-cert__body">
                      <div className="gl-cert__topline"><p>{item.issuer ?? "Issuer not listed"}</p><span>{item.verificationStatus === "verified" ? "Verified" : "Résumé-listed"}</span></div>
                      <h3>{item.title}</h3>
                      {item.date ? <p className="gl-cert__date">{item.date}</p> : null}
                      {item.skills.length ? <ul className="sk-tags" aria-label="Skills covered">{item.skills.slice(0,4).map(skill => <li className="sk-chip" key={skill}>{skill}</li>)}</ul> : null}
                      <button type="button" className="sk-text-link gl-cert__details" onClick={() => setOpen(item)}>View details <ArrowUpRight /></button>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          <p className="gl-certs__note">Credential details are listed from résumé records. Original certificate scans and issuer verification links can be added when available.</p>
        </Reveal>
      </div>
      {open ? (
        <div className="gl-lightbox gl-certificate-viewer" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <div className="gl-lightbox__card gl-certificate-viewer__card" onClick={event => event.stopPropagation()}>
            <div className="gl-lightbox__bar">
              <div><strong>{open.title}</strong><span>{[open.issuer,open.date].filter(Boolean).join(" · ")}</span></div>
              <button type="button" className="sk-btn sk-btn--small" onClick={() => setOpen(null)}>Close</button>
            </div>
            {open.file && open.isPdf ? <iframe className="gl-certificate-viewer__pdf" src={publicUrl(open.file)+"#toolbar=1&view=FitH"} title={open.title+" certificate"} /> :
             open.file ? <img className="gl-certificate-viewer__image" src={publicUrl(open.file)} alt={open.title+" certificate"} /> : (
              <div className="gl-certificate-viewer__details">
                <span className="gl-certificate-viewer__mark" aria-hidden="true">{(open.issuer ?? "Credential").slice(0,1).toUpperCase()}</span>
                <p>This credential is listed in the résumé records for this portfolio. Its original certificate file or public issuer verification link has not yet been added.</p>
                {open.credentialId ? <p><strong>Credential ID:</strong> {open.credentialId}</p> : null}
                {open.skills.length ? <p><strong>Skills:</strong> {open.skills.join(" · ")}</p> : null}
              </div>
            )}
            <div className="gl-certificate-viewer__actions">
              {open.credentialUrl ? <a className="sk-btn sk-btn--small" href={open.credentialUrl} target="_blank" rel="noreferrer">Verify with issuer <ArrowUpRight /></a> : null}
              {open.file ? <a className="sk-btn sk-btn--small" href={publicUrl(open.file)} download>Download certificate ↓</a> : null}
              {open.file ? <a className="sk-text-link" href={publicUrl(open.file)} target="_blank" rel="noreferrer">Open in new tab <ArrowUpRight /></a> : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
