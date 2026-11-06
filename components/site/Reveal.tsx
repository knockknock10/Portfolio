"use client"

import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Content is visible on first paint for readers, search crawlers, reduced-motion
 * users and full-page captures. Layout provides hierarchy without hiding
 * sections until a scroll observer fires.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>
}

// Previous scroll-triggered reveal implementation retained below, inactive:
// "use client"
// import { motion, useReducedMotion } from "framer-motion"
// import type { ReactNode } from "react"
// type RevealProps = {
//   children: ReactNode
//   delay?: number
//   className?: string
// }
// export function Reveal({ children, delay = 0, className }: RevealProps) {
//   const reduceMotion = useReducedMotion()
//   if (reduceMotion) return <div className={className}>{children}</div>
//   return (
//     <motion.div
//       className={className}
//       initial={{ opacity: 0, y: 22 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "0px 0px -8% 0px" }}
//       transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
//     >
//       {children}
//     </motion.div>
//   )
// }
