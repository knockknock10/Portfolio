/**
 * Quiet, fixed backdrop of flat-colour liquid shapes. The CSS handles their
 * slow organic morphing; there is no pointer tracking or continuous JS loop.
 */
export function LiquidField() {
  return (
    <div className="lq-field" aria-hidden="true">
      <span className="lq-blob lq-blob--a" />
      <span className="lq-blob lq-blob--b" />
      <span className="lq-blob lq-blob--c" />
      <span className="lq-blob lq-blob--d" />
      <span className="lq-blob lq-blob--e" />
    </div>
  )
}

// Previous pointer-following implementation retained verbatim below as inactive line comments:
// "use client"
// 
// import { useEffect, useRef } from "react"
// 
// /**
//  * Fixed backdrop of flat-colour liquid shapes. They drift on their own and lean slightly toward the
//  * pointer, which gives the frosted panels in front of them something to blur and refract.
//  * No gradients: every shape is one solid colour.
//  */
// export function LiquidField() {
//   const ref = useRef<HTMLDivElement>(null)
// 
//   useEffect(() => {
//     const field = ref.current
//     if (!field) return
//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
//     if (reduce.matches) return
// 
//     let tx = 0
//     let ty = 0
//     let x = 0
//     let y = 0
//     let frame = 0
// 
//     const onMove = (event: PointerEvent) => {
//       tx = (event.clientX / window.innerWidth - 0.5) * 2
//       ty = (event.clientY / window.innerHeight - 0.5) * 2
//     }
//     const tick = () => {
//       x += (tx - x) * 0.05
//       y += (ty - y) * 0.05
//       field.style.setProperty("--px", x.toFixed(4))
//       field.style.setProperty("--py", y.toFixed(4))
//       frame = requestAnimationFrame(tick)
//     }
//     window.addEventListener("pointermove", onMove, { passive: true })
//     frame = requestAnimationFrame(tick)
//     return () => {
//       window.removeEventListener("pointermove", onMove)
//       cancelAnimationFrame(frame)
//     }
//   }, [])
// 
//   return (
//     <div className="lq-field" ref={ref} aria-hidden="true">
//       <span className="lq-blob lq-blob--a" />
//       <span className="lq-blob lq-blob--b" />
//       <span className="lq-blob lq-blob--c" />
//       <span className="lq-blob lq-blob--d" />
//       <span className="lq-blob lq-blob--e" />
//     </div>
//   )
// }
// 
