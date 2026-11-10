"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * A progressive reveal: content remains visible without JavaScript, while
 * supported browsers animate each block once as it enters the viewport.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      element.dataset.visible = "true"
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          element.dataset.visible = "true"
          observer.unobserve(element)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const style = { "--reveal-delay": `${Math.max(0, delay)}s` } as CSSProperties

  return (
    <div ref={ref} className={["sk-reveal", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </div>
  )
}
