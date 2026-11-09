"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowUpRight } from "./icons"

type PaperViewerProps = {
  pdf: string
  title: string
  children: ReactNode
  className?: string
  ariaLabel?: string
}

export function PaperViewer({ pdf, title, children, className = "sk-btn sk-btn--light sk-btn--small", ariaLabel }: PaperViewerProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      if (triggerRef.current) triggerRef.current.focus()
      else previousFocus?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        data-tilt
        aria-haspopup="dialog"
        aria-label={ariaLabel ?? `Read ${title} in the on-page paper reader`}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      {open ? (
        <div
          className="gl-paper-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`Read ${title}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="gl-paper-viewer__card">
            <header className="gl-paper-viewer__header">
              <div>
                <p>RESEARCH PAPER · PDF READER</p>
                <h3>{title}</h3>
              </div>
              <button ref={closeRef} type="button" className="sk-btn sk-btn--small" onClick={() => setOpen(false)}>
                Close
              </button>
            </header>
            <iframe
              className="gl-paper-viewer__frame"
              src={pdf + "#toolbar=1&navpanes=0&view=FitH"}
              title={title + " full paper"}
              loading="lazy"
            />
            <footer className="gl-paper-viewer__footer">
              <span>PDF preview uses your browser&apos;s built-in document viewer.</span>
              <div>
                <a className="sk-text-link" href={pdf} target="_blank" rel="noreferrer">
                  Open in new tab <ArrowUpRight />
                </a>
                <a className="sk-text-link" href={pdf} download="SemBind.pdf">
                  Download PDF ↓
                </a>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  )
}
