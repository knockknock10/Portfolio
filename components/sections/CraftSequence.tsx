"use client"

import { motion, useReducedMotion, useScroll } from "framer-motion"
import { useRef } from "react"
import { Reveal, Squircle } from "@/components/primitives"
import type { CraftStep } from "@/lib/content"

export function CraftSequence({ steps }: { steps: CraftStep[] }) {
  const sequenceRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sequenceRef, offset: ["start 0.8", "end 0.45"] })
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
