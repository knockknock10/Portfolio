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
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
