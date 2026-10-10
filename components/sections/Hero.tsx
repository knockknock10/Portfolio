"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useRouter } from "next/navigation"
import { LiquidBackdrop, MagneticButton } from "@/components/primitives"
import { readDurationToken, readMotionNumber, useSpringToken } from "@/components/primitives/motionTokens"

type HeroProps = {
  heading: string | null
  eyebrow: string | null
  subhead: string | null
  splitName: boolean
}

const parentVariants = {
  hidden: {},
  visible: {},
}

const lineContainerVariants = {
  hidden: {},
  visible: {},
}

export function Hero({ heading, eyebrow, subhead, splitName }: HeroProps) {
  const router = useRouter()
  const reducedMotion = useReducedMotion()
  const spring = useSpringToken("gentle")

  const headlineLines =
    heading && splitName && heading.includes(" ")
      ? heading.split(/\s+/)
      : heading
        ? [heading]
        : []

  const transition =
    reducedMotion || !spring
      ? { duration: readDurationToken("--duration-none") }
      : {
          ...spring,
          visualDuration: readDurationToken("--duration-base"),
        }

  const movement = reducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: readMotionNumber("--hero-reveal-offset") }

  const riseVariants = {
    hidden: movement,
    visible: { opacity: 1, y: 0, transition },
  }

  const maskVariants = {
    hidden: { y: reducedMotion ? 0 : "110%" },
    visible: { y: 0, transition },
  }

  const staggeredParentVariants = {
    ...parentVariants,
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : readDurationToken("--duration-hero-stagger"),
      },
    },
  }

  const staggeredLineVariants = {
    ...lineContainerVariants,
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : readDurationToken("--duration-hero-line-stagger"),
      },
    },
  }


  if (!heading && !eyebrow && !subhead) return null

  return (
    <section className="hero" aria-labelledby={heading ? "hero-title" : undefined}>
      <LiquidBackdrop className="hero-backdrop" />

      <div className="hero-inner">
        <motion.div
          className="hero-copy"
          variants={staggeredParentVariants}
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion || spring ? "visible" : "hidden"}
        >
          {eyebrow ? (
            <motion.p className="hero-eyebrow" variants={riseVariants}>
              {eyebrow}
            </motion.p>
          ) : null}

          {heading ? (
            <motion.h1
              id="hero-title"
              className="hero-title"
              aria-label={heading}
              variants={staggeredLineVariants}
            >
              {headlineLines.map((line, index) => (
                <span className="hero-title-mask" key={index}>
                  <motion.span className="hero-title-line" variants={maskVariants}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          ) : null}

          {subhead ? (
            <motion.p className="hero-subhead" variants={riseVariants}>
              {subhead}
            </motion.p>
          ) : null}

          <motion.div className="hero-actions" variants={riseVariants}>
            <MagneticButton onClick={() => router.push("/work")}>View Work</MagneticButton>
            <Link href="/contact" className="hero-secondary-link">
              Get in touch
            </Link>
          </motion.div>
        </motion.div>

          <aside className="hero-visual" aria-label="Current focus and selected projects">
            <div className="hero-visual-art" aria-hidden="true">
              <div className="hero-visual-art-orb hero-visual-art-orb-one" />
              <div className="hero-visual-art-orb hero-visual-art-orb-two" />
              <div className="hero-visual-art-orb hero-visual-art-orb-three" />
              <div className="hero-visual-art-topline">
                <span><span className="hero-live-indicator" />BUILDING IN PUBLIC</span>
                <span>VOL. 03</span>
              </div>
              <div className="hero-visual-art-title">
                Ideas into
                <span>systems.</span>
              </div>
              <div className="hero-visual-art-bottom">
                <span>ENGINEERING NOTES</span>
                <span>2026 ↗</span>
              </div>
            </div>

            <div className="hero-activity-panel">
              <div className="hero-panel-heading">
                <span>Currently exploring</span>
                <span className="hero-panel-count">03</span>
              </div>
              <Link className="hero-focus-item" href="/work/aevor">
                <span className="hero-focus-icon hero-focus-icon-aevor" aria-hidden="true">A</span>
                <span className="hero-focus-copy">
                  <span className="hero-focus-kicker">DEVELOPER TOOLING</span>
                  <strong>Aevor</strong>
                </span>
                <span className="hero-focus-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="hero-focus-item" href="/work/sembind-audio">
                <span className="hero-focus-icon hero-focus-icon-research" aria-hidden="true">∿</span>
                <span className="hero-focus-copy">
                  <span className="hero-focus-kicker">APPLIED AI RESEARCH</span>
                  <strong>SemBind-Audio</strong>
                </span>
                <span className="hero-focus-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="hero-focus-item" href="/open-source">
                <span className="hero-focus-icon hero-focus-icon-open" aria-hidden="true">⌘</span>
                <span className="hero-focus-copy">
                  <span className="hero-focus-kicker">COMMUNITY & CODE</span>
                  <strong>Open source</strong>
                </span>
                <span className="hero-focus-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className="hero-visual-caption">LEARN DEEPLY. SHIP OFTEN. STAY CURIOUS.</p>
          </aside>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </motion.div>
    </section>
  )
}
