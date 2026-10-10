"use client"

import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import { Glass } from "@/components/primitives"
import { readDurationToken, useSpringToken } from "@/components/primitives/motionTokens"
import type { WorkImage } from "@/lib/work"

type LightboxProps = {
  open: boolean
  images: WorkImage[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ open, images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(index)
  const reducedMotion = useReducedMotion()
  const spring = useSpringToken("snappy")
  const duration = readDurationToken("--duration-base")
  const transition = reducedMotion || !spring
    ? { duration: readDurationToken("--duration-none") }
    : { ...spring, visualDuration: duration }
  const activeImage = images[index]

  useEffect(() => {
    activeIndexRef.current = index
  }, [index])

  useEffect(() => {
    if (!open || images.length === 0) return

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialogRef.current?.querySelector<HTMLButtonElement>(".work-lightbox-control")?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault()
        const direction = event.key === "ArrowRight" ? 1 : -1
        onNavigate((activeIndexRef.current + direction + images.length) % images.length)
        return
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => element.offsetParent !== null)
        if (focusable.length === 0) {
          event.preventDefault()
          dialogRef.current.focus()
          return
        }

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [open, images.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {open && activeImage ? (
        <motion.div
          className="work-lightbox-backdrop"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.projectTitle}
            className="work-lightbox-dialog"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={transition}
          >
            <div className="work-lightbox-chrome">
              <Glass className="work-lightbox-control-shell">
                <button
                  type="button"
                  className="work-lightbox-control"
                  aria-label="Close image viewer"
                  onClick={onClose}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </Glass>
            </div>

            <div className="work-lightbox-image">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                priority
                style={{ objectFit: "contain" }}
              />
            </div>

            {images.length > 1 ? (
              <div className="work-lightbox-navigation">
                <Glass className="work-lightbox-control-shell">
                  <button
                    type="button"
                    className="work-lightbox-control"
                    aria-label="Previous image"
                    onClick={() => onNavigate((index - 1 + images.length) % images.length)}
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                </Glass>
                <Glass className="work-lightbox-control-shell">
                  <button
                    type="button"
                    className="work-lightbox-control"
                    aria-label="Next image"
                    onClick={() => onNavigate((index + 1) % images.length)}
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </Glass>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
