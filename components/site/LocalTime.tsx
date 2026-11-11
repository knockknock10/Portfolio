"use client"

import { useEffect, useState } from "react"

/** The current time in Amaravati, ticking each minute, so visitors in other time zones can see when I'm awake. */
export function LocalTime({ zone = "Asia/Kolkata", place = "Amaravati" }: { zone?: string; place?: string }) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 15000)
    return () => window.clearInterval(id)
  }, [])
  const time = now?.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: zone }) ?? "--:--"
  const day = now?.toLocaleDateString("en-GB", { weekday: "long", timeZone: zone }) ?? ""
  return (
    <p className="gl-localtime">
      <span>Local time in {place}</span>
      <strong suppressHydrationWarning>{time}</strong>
      <small suppressHydrationWarning>{day} · IST</small>
    </p>
  )
}
