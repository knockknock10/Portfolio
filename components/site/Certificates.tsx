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
  file: string | null
  isPdf: boolean
}

export function Certificates({ items }: { items: CertificateView[] }) {
  const [open, setOpen] = useState<CertificateView | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  if (!items.length) return null

  return (
    <section className="sk-section" id="certificates" aria-labelledby="certs-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Certificates</p>
              <h2 className="sk-h2" id="certs-title">
                Courses and certifications
              </h2>
            </div>
            <p className="sk-lede">Open any certificate to see it full size.</p>
          </div>
        </Reveal>

        <Reveal>
          <ul className="gl-certs">
            {items.map((item) => {
              const src = item.file ? publicUrl(item.file) : null
              return (
                <li key={item.title + (item.file ?? "")}>
                  <article className="gl-cert" data-tilt>
                    <button
                      type="button"
                      className="gl-cert__preview"
                      onClick={() => (item.isPdf && src ? window.open(src, "_blank", "noopener") : setOpen(item))}
                      aria-label={`Open ${item.title}`}
                    >
                      {src && !item.isPdf ? (
                        <img src={src} alt={`${item.title} certificate`} loading="lazy" />
                      ) : (
                        <span className="gl-cert__pdf" aria-hidden="true">
                          PDF
                        </span>
                      )}
                    </button>
                    <div className="gl-cert__body">
                      <h3>{item.title}</h3>
                      {item.issuer || item.date ? (
                        <p>{[item.issuer, item.date].filter(Boolean).join(" · ")}</p>
                      ) : null}
                      {item.skills.length ? (
                        <ul className="sk-tags" aria-label="Skills covered">
                          {item.skills.map((skill) => (
                            <li className="sk-chip" key={skill}>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {item.credentialUrl ? (
                        <a className="sk-text-link" href={item.credentialUrl} target="_blank" rel="noreferrer">
                          Verify credential <ArrowUpRight />
                        </a>
                      ) : null}
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>

      {open && open.file && !open.isPdf ? (
        <div className="gl-lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <div className="gl-lightbox__card" onClick={(event) => event.stopPropagation()}>
            <img src={publicUrl(open.file)} alt={`${open.title} certificate`} />
            <div className="gl-lightbox__bar">
              <strong>{open.title}</strong>
              <button type="button" className="sk-btn sk-btn--small" onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
