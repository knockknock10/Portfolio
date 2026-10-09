"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { content } from "@/lib/content"
import { LiquidBackdrop, MagneticButton, Noise } from "@/components/primitives"
import { readDurationToken, readMotionNumber, useSpringToken } from "@/components/primitives/motionTokens"

const parentVariants = {
  hidden: {},
  visible: {},
}

const lineContainerVariants = {
  hidden: {},
  visible: {},
}

export function Hero() {
  const router = useRouter()
  const reducedMotion = useReducedMotion()
  const spring = useSpringToken("gentle")
  const [scrolled, setScrolled] = useState(false)

  const heading =
    content.identity.professionalName ??
    content.identity.fullName ??
    content.identity.tagline

  const eyebrow = content.identity.roleTitle
  const subhead = content.identity.tagline !== heading ? content.identity.tagline : null
  const headlineLines =
    heading && heading === content.identity.fullName && heading.includes(" ")
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

  useEffect(() => {
    const threshold = readMotionNumber("--hero-scroll-threshold")

    const updateScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    updateScroll()
    window.addEventListener("scroll", updateScroll, { passive: true })
    return () => window.removeEventListener("scroll", updateScroll)
  }, [])

  if (!heading && !eyebrow && !subhead) return null

  return (
    <main className="hero" aria-labelledby={heading ? "hero-title" : undefined}>
      <LiquidBackdrop className="hero-backdrop" />
      <Noise />

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

      <motion.div
        className="hero-scroll-cue"
        aria-hidden="true"
        initial={false}
        animate={
          scrolled
            ? {
                opacity: 0,
                y: reducedMotion ? 0 : readMotionNumber("--hero-scroll-cue-offset"),
              }
            : { opacity: 1, y: 0 }
        }
        transition={transition}
      >
        <span />
      </motion.div>
    </main>
  )
}
