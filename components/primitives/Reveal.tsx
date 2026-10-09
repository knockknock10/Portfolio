"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { readDurationToken, readMotionNumber, useSpringToken } from "./motionTokens"

export type RevealVariant = "fade-up" | "scale-in" | "blur-in"

type RevealProps = {
  children: ReactNode
  variant?: RevealVariant
  className?: string
  once?: boolean
}

type RevealMetrics = {
  offsetY: number
  scaleStart: number
  blur: number
  blurClear: number
  scaleRest: number
}

export function Reveal({ children, variant = "fade-up", className, once = true }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const inView = useInView(elementRef, { once, amount: 0.15 })
  const prefersReducedMotion = useReducedMotion()
  const spring = useSpringToken("gentle")
  const noMotionDuration = readDurationToken("--duration-none")
  const [metrics, setMetrics] = useState<RevealMetrics | null>(null)
  const reduced = prefersReducedMotion === true

  useEffect(() => {
    setMetrics({
      offsetY: readMotionNumber("--reveal-offset-y"),
      scaleStart: readMotionNumber("--reveal-scale-start"),
      blur: readMotionNumber("--reveal-blur"),
      blurClear: readMotionNumber("--reveal-blur-clear"),
      scaleRest: readMotionNumber("--scale-rest"),
    })
  }, [])

  const hidden = reduced
    ? { opacity: 0 }
    : variant === "scale-in"
      ? { opacity: 0, scale: metrics?.scaleStart ?? 0 }
      : variant === "blur-in"
        ? { opacity: 0, filter: "blur(" + (metrics?.blur ?? 0) + "px)" }
        : { opacity: 0, y: metrics?.offsetY ?? 0 }

  const visible = reduced
    ? { opacity: inView ? 1 : 0 }
    : variant === "scale-in"
      ? { opacity: inView ? 1 : 0, scale: metrics?.scaleRest ?? 0 }
      : variant === "blur-in"
        ? { opacity: inView ? 1 : 0, filter: "blur(" + (metrics?.blurClear ?? 0) + "px)" }
        : { opacity: inView ? 1 : 0, y: 0 }

  return (
    <motion.div
      ref={elementRef}
      className={["reveal", className].filter(Boolean).join(" ")}
      data-variant={variant}
      animate={inView ? visible : hidden}
      transition={reduced || !spring ? { duration: noMotionDuration } : spring}
    >
      {children}
    </motion.div>
  )
}
