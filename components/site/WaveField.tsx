"use client"

import { useEffect, useRef } from "react"

/**
 * A field of ridge lines in perspective, drawn on a canvas behind the hero. Each line is a
 * slice of a moving surface (think of a recording's waveform stacked in depth). The pointer
 * disturbs it with ripples and scrolling tilts the camera. Plain lines, no fills or gradients.
 * Pauses when off-screen or hidden; draws a single still frame for reduced motion.
 */
export function WaveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const context = canvas?.getContext("2d")
    if (!canvas || !host || !context) return
    const ctx = context

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    let width = 0
    let height = 0
    let dpr = 1
    let rows = 30
    let cols = 110
    let frame = 0
    let running = false
    let time = 0
    let scroll = 0
    // Pointer in canvas space, eased so the ripple glides rather than jumps.
    let px = -1
    let py = -1
    let sx = -1
    let sy = -1
    let energy = 0

    const resize = () => {
      const box = host.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = box.width
      height = box.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const small = width < 720
      rows = small ? 20 : 30
      cols = small ? 56 : 110
      if (!running) draw()
    }

    const surface = (u: number, z: number, t: number) => {
      const envelope = 0.3 + 0.7 * Math.exp(-(((u - 0.68) / 0.3) ** 2))
      const wave =
        Math.sin(u * 9 + t * 0.55 + z * 5) * 0.5 +
        Math.sin(u * 21 - t * 0.8 + z * 11) * 0.26 +
        Math.sin(u * 47 + t * 1.25 + z * 3) * 0.1
      return wave * envelope
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const horizon = height * 0.34
      const floor = height * 0.98
      const span = floor - horizon
      const tilt = Math.min(scroll / 900, 1) * 0.12 // camera lowers a little as the page scrolls

      for (let r = 0; r < rows; r += 1) {
        const z = r / (rows - 1) // 0 far, 1 near
        const depth = z * z * 0.85 + z * 0.15
        const baseY = horizon + span * (depth + tilt * z)
        const spread = 0.55 + depth * 0.9
        const amp = (10 + depth * 120) * (height / 900 + 0.35)
        let touched = 0

        ctx.beginPath()
        for (let c = 0; c <= cols; c += 1) {
          const u = c / cols
          let h = surface(u, z, time)
          if (sx >= 0) {
            const du = u * width - sx
            const dy = baseY - sy
            const d2 = (du * du + dy * dy * 2.2) / (width * width * 0.012)
            const bump = Math.exp(-d2) * energy
            h += bump * Math.sin(time * 5 - Math.sqrt(d2) * 5) * 1.0
            touched = Math.max(touched, bump)
          }
          const x = width * (0.5 + (u - 0.5) * spread * 1.6)
          const y = baseY - h * amp
          if (c === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const alpha = 0.05 + depth * 0.26
        if (touched > 0.32) {
          ctx.strokeStyle = `rgba(210, 68, 30, ${Math.min(0.75, alpha + touched * 0.35)})`
        } else {
          ctx.strokeStyle = `rgba(16, 22, 29, ${alpha})`
        }
        ctx.lineWidth = 0.7 + depth * 1.1
        ctx.stroke()
      }
    }

    const loop = () => {
      frame = 0
      time += 0.012
      sx += (px - sx) * 0.12
      sy += (py - sy) * 0.12
      energy += ((px >= 0 ? 0.55 : 0) - energy) * 0.06
      draw()
      if (running) frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (reduce || running || document.hidden) return
      running = true
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const observer = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()), { threshold: 0 })
    observer.observe(host)
    const onVisibility = () => (document.hidden ? stop() : start())
    const onScroll = () => {
      scroll = window.scrollY
    }
    const onMove = (event: PointerEvent) => {
      const box = host.getBoundingClientRect()
      px = event.clientX - box.left
      py = event.clientY - box.top
      if (sx < 0) {
        sx = px
        sy = py
      }
    }
    const onLeave = () => {
      px = py = -1
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("scroll", onScroll, { passive: true })
    if (fine) {
      host.addEventListener("pointermove", onMove, { passive: true })
      host.addEventListener("pointerleave", onLeave)
    }
    resize()
    draw()

    return () => {
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("scroll", onScroll)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="gl-wavefield" aria-hidden="true" />
}
