"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { readDurationToken, readMotionNumber, useSpringToken } from "@/components/primitives/motionTokens"

type RouteTransitionProps = {
  children: ReactNode
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const spring = useSpringToken("snappy")
  const routeDuration = readDurationToken("--duration-route")
  const routeShift = readMotionNumber("--route-shift")

  const transition = reducedMotion || !spring
    ? { duration: readDurationToken("--duration-none") }
    : { ...spring, visualDuration: routeDuration }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-transition"
        initial={reducedMotion ? false : { opacity: 0, y: routeShift }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -routeShift }}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
