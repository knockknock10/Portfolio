"use client"

import { useEffect } from "react"

/**
 * Keeps the small reading-progress rule in the header in sync with the page.
 * Motion-heavy counters, pointer tilt, and magnetic button movement are off.
 */
export function Interactions() {
  useEffect(() => {
    const root = document.documentElement
    const updateProgress = () => {
      const max = root.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      root.style.setProperty("--progress", String(progress))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return null
}

// Previous implementation retained verbatim below as inactive line comments:
// "use client"
// 
// import { useEffect } from "react"
// 
// /**
//  * Small, page-wide behaviours that work on plain markup:
//  *  - [data-tilt]      cards lean toward the pointer
//  *  - .sk-btn          buttons are pulled slightly toward the pointer
//  *  - number counters  figures count up once when they scroll into view
//  *  - scroll progress  exposes --progress (0..1) on <html> for the header bar
//  * Everything is skipped for visitors who prefer reduced motion.
//  */
// const COUNTER_SELECTOR = ".sk-fact strong, .sk-oss-totals strong, .sk-practice__numbers strong, [data-count]"
// 
// function parseCount(text: string) {
//   const match = text.trim().match(/^([^0-9]*)([0-9][0-9,]*)(\.\d+)?(.*)$/)
//   if (!match) return null
//   const [, prefix, whole, decimals = "", suffix] = match
//   const value = Number((whole + decimals).replace(/,/g, ""))
//   if (!Number.isFinite(value)) return null
//   return { prefix, value, decimals: decimals ? decimals.length - 1 : 0, suffix, grouped: whole.includes(",") }
// }
// 
// export function Interactions() {
//   useEffect(() => {
//     const root = document.documentElement
//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
//     const cleanups: Array<() => void> = []
// 
//     // Scroll progress
//     const onScroll = () => {
//       const max = root.scrollHeight - window.innerHeight
//       root.style.setProperty("--progress", max > 0 ? String(Math.min(1, window.scrollY / max)) : "0")
//     }
//     onScroll()
//     window.addEventListener("scroll", onScroll, { passive: true })
//     cleanups.push(() => window.removeEventListener("scroll", onScroll))
// 
//     // Counters
//     const counters = Array.from(document.querySelectorAll<HTMLElement>(COUNTER_SELECTOR))
//     if (!reduce && counters.length) {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           for (const entry of entries) {
//             if (!entry.isIntersecting) continue
//             observer.unobserve(entry.target)
//             const el = entry.target as HTMLElement
//             const parsed = parseCount(el.textContent ?? "")
//             if (!parsed) continue
//             const start = performance.now()
//             const duration = 1400
//             const format = (n: number) =>
//               parsed.prefix +
//               n.toLocaleString("en-US", {
//                 minimumFractionDigits: parsed.decimals,
//                 maximumFractionDigits: parsed.decimals,
//                 useGrouping: parsed.grouped,
//               }) +
//               parsed.suffix
//             const step = (now: number) => {
//               const t = Math.min(1, (now - start) / duration)
//               const eased = 1 - Math.pow(1 - t, 4)
//               el.textContent = format(parsed.value * eased)
//               if (t < 1) requestAnimationFrame(step)
//               else el.textContent = format(parsed.value)
//             }
//             requestAnimationFrame(step)
//           }
//         },
//         { threshold: 0.6 },
//       )
//       counters.forEach((el) => observer.observe(el))
//       cleanups.push(() => observer.disconnect())
//     }
// 
//     // Tilt and magnetic pull (pointer devices only)
//     if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
//       const tiltMove = (event: PointerEvent) => {
//         const el = (event.currentTarget as HTMLElement)
//         const rect = el.getBoundingClientRect()
//         const nx = (event.clientX - rect.left) / rect.width - 0.5
//         const ny = (event.clientY - rect.top) / rect.height - 0.5
//         el.style.setProperty("--tilt-x", `${(-ny * 5).toFixed(2)}deg`)
//         el.style.setProperty("--tilt-y", `${(nx * 6).toFixed(2)}deg`)
//       }
//       const tiltLeave = (event: PointerEvent) => {
//         const el = event.currentTarget as HTMLElement
//         el.style.setProperty("--tilt-x", "0deg")
//         el.style.setProperty("--tilt-y", "0deg")
//       }
//       const magnetMove = (event: PointerEvent) => {
//         const el = event.currentTarget as HTMLElement
//         const rect = el.getBoundingClientRect()
//         const dx = event.clientX - (rect.left + rect.width / 2)
//         const dy = event.clientY - (rect.top + rect.height / 2)
//         el.style.transform = `translate(${(dx * 0.14).toFixed(1)}px, ${(dy * 0.2).toFixed(1)}px)`
//       }
//       const magnetLeave = (event: PointerEvent) => {
//         (event.currentTarget as HTMLElement).style.transform = ""
//       }
// 
//       document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
//         el.addEventListener("pointermove", tiltMove)
//         el.addEventListener("pointerleave", tiltLeave)
//         cleanups.push(() => {
//           el.removeEventListener("pointermove", tiltMove)
//           el.removeEventListener("pointerleave", tiltLeave)
//         })
//       })
//       document.querySelectorAll<HTMLElement>(".sk-btn:not(.sk-btn--small)").forEach((el) => {
//         el.addEventListener("pointermove", magnetMove)
//         el.addEventListener("pointerleave", magnetLeave)
//         cleanups.push(() => {
//           el.removeEventListener("pointermove", magnetMove)
//           el.removeEventListener("pointerleave", magnetLeave)
//         })
//       })
//     }
// 
//     return () => cleanups.forEach((fn) => fn())
//   }, [])
// 
//   return null
// }
// 
