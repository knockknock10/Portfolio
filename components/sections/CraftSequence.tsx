"use client"

import { motion, useMotionValue, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useLenis } from "@/components/SmoothScrollProvider"
import { Reveal, Squircle } from "@/components/primitives"
import type { CraftStep } from "@/lib/content"

export function CraftSequence({ steps }: { steps: CraftStep[] }) {
  const sequenceRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const lenis = useLenis()
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    const element = sequenceRef.current
    if (!element || !lenis || reducedMotion) return

    let animationFrame = 0
    const updateProgress = () => {
      animationFrame = 0
      const bounds = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const progress = (viewportHeight * 0.8 - bounds.top) / (bounds.height + viewportHeight * 0.35)
      scrollYProgress.set(Math.max(0, Math.min(1, progress)))
    }
    const onLenisScroll = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    lenis.on("scroll", onLenisScroll)
    return () => {
      lenis.off("scroll", onLenisScroll)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [lenis, reducedMotion, scrollYProgress])
  return (
    <div className="craft-sequence" ref={sequenceRef}>
      <div className="craft-progress-track" aria-hidden="true">
        {reducedMotion ? null : <motion.span className="craft-progress-fill" style={{ scaleX: scrollYProgress }} />}
      </div>
      <div className="craft-step-list" role="list">
        {steps.slice(0, 4).map((step, index) => (
          <Reveal className="craft-step-reveal" key={step.title + index}>
            <article className="craft-step" role="listitem">
              <Squircle className="craft-step-visual" aria-hidden="true">{String(index + 1).padStart(2, "0")}</Squircle>
              <h3 className="craft-step-title">{step.title}</h3>
              <p className="craft-step-description">{step.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
