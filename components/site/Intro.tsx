"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { WaveField } from "./WaveField"

/**
 * The opening screen. Shown once per browser session (the inline script in the layout sets
 * data-intro="play" on <html>): the name, a counter, a field of ridge lines, then the page
 * lifts away. Click, a key press or the Enter button skips straight in.
 */
export function Intro() {
  const [active, setActive] = useState(true)
  const [percent, setPercent] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [time, setTime] = useState("")
  const leavingRef = useRef(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const finish = useCallback(() => {
    if (leavingRef.current) return
    leavingRef.current = true
    setLeaving(true)
    window.setTimeout(() => {
      document.documentElement.dataset.intro = "done"
      document.documentElement.style.overflow = ""
      setActive(false)
    }, 950)
  }, [])

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") {
      setActive(false)
      return
    }
    document.documentElement.style.overflow = "hidden"
    const clock = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }))
    clock()

    const duration = 2300
    const startedAt = performance.now()
    let frame = 0
    let hold = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setPercent(Math.round(eased * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else hold = window.setTimeout(finish, 650)
    }
    frame = requestAnimationFrame(tick)
    buttonRef.current?.focus({ preventScroll: true })

    const skip = () => finish()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") skip()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("wheel", skip, { passive: true, once: true })
    window.addEventListener("touchstart", skip, { passive: true, once: true })
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(hold)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("wheel", skip)
      window.removeEventListener("touchstart", skip)
      document.documentElement.style.overflow = ""
    }
  }, [finish])

  if (!active) return null

  return (
    <div className="gl-open" data-leaving={leaving ? "true" : undefined} role="dialog" aria-label="Welcome" onClick={finish}>
      <WaveField ink="241, 237, 229" accent="240, 124, 84" />
      <div className="gl-open__top">
        <span>Portfolio · 2026</span>
        <span>
          Amaravati, India{time ? ` · ${time} IST` : ""}
        </span>
      </div>
      <h1 className="gl-open__name" aria-label="Sanjeev Kumar">
        {["Sanjeev", "Kumar"].map((word, line) => (
          <span key={word} aria-hidden="true" className="gl-open__line">
            {[...word].map((letter, index) => (
              <i key={index} style={{ "--i": index + line * 7 } as React.CSSProperties}>
                {letter}
              </i>
            ))}
          </span>
        ))}
      </h1>
      <p className="gl-open__role">Software engineering · Open source · Audio research</p>
      <div className="gl-open__bottom">
        <span className="gl-open__count" aria-hidden="true">
          {String(percent).padStart(3, "0")}
        </span>
        <span className="gl-open__bar" aria-hidden="true">
          <b style={{ transform: `scaleX(${percent / 100})` }} />
        </span>
        <button ref={buttonRef} type="button" className="gl-open__enter" onClick={finish}>
          Enter
          <span aria-hidden="true">↓</span>
        </button>
      </div>
    </div>
  )
}
