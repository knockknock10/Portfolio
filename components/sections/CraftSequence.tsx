"use client"

import { motion, useMotionValue, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useLenis } from "@/components/SmoothScrollProvider"
import type { CraftStep } from "@/lib/craft"
import styles from "@/components/craft/CraftSequence.module.css"
import { readDurationToken, readMotionNumber, useSpringToken } from "@/components/primitives/motionTokens"

export function CraftSequence({ steps }: { steps: CraftStep[] }) {
  const sequenceRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const lenis = useLenis()
  const progress = useMotionValue(0)
  const spring = useSpringToken("gentle")
  const animationDuration = readDurationToken("--duration-base")
  const stagger = animationDuration * (2 / 7)
  const revealOffset = readMotionNumber("--reveal-offset-y")

  useEffect(() => {
    const element = sequenceRef.current
    if (!element || !lenis || reducedMotion) return

    let frame = 0
    const updateProgress = () => {
      frame = 0
      const bounds = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const nextProgress =
        (viewportHeight * 0.8 - bounds.top) / (bounds.height + viewportHeight * 0.35)
      progress.set(Math.max(0, Math.min(1, nextProgress)))
    }
    const onLenisScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    lenis.on("scroll", onLenisScroll)
    return () => {
      lenis.off("scroll", onLenisScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [lenis, progress, reducedMotion])

  return (
    <div className={styles.sequence} ref={sequenceRef}>
      <div className={styles.stepList} role="list" aria-label="CommitHub process">
        {steps.slice(0, 4).map((step, index) => (
          <motion.article
            className={styles.stepReveal}
            key={step.number + "-" + step.title}
            role="listitem"
            initial={reducedMotion ? false : { opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={
              reducedMotion
                ? { duration: readDurationToken("--duration-none") }
                : spring
                  ? { ...spring, visualDuration: animationDuration, delay: index * stagger }
                  : { duration: readDurationToken("--duration-none") }
            }
          >
            {step.image ? (
              <img className={styles.stepImage} src={step.image} alt={step.description} />
            ) : null}
            <p className={styles.stepNumber} aria-hidden="true">
              {String(step.number).padStart(2, "0")}
            </p>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </motion.article>
        ))}
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <motion.span
          className={styles.progressFill}
          style={{ scaleX: reducedMotion ? 1 : progress }}
        />
      </div>
    </div>
  )
}
