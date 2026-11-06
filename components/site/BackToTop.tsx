"use client"

import { useEffect, useState } from "react"
import { useLenis } from "@/components/SmoothScrollProvider"

export function BackToTop() {
  const [show, setShow] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      className="gl-top"
      data-show={show}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
