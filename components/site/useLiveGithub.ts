"use client"

import { useEffect, useState } from "react"
import { fetchLiveGithub, type LiveGithub } from "@/lib/live-github"

/**
 * Returns live GitHub figures once they arrive, or null while loading / if GitHub can't be reached.
 * Callers keep rendering the build-time snapshot until this returns data.
 */
export function useLiveGithub(): LiveGithub | null {
  const [live, setLive] = useState<LiveGithub | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    fetchLiveGithub(controller.signal).then(setLive, () => {})
    return () => controller.abort()
  }, [])
  return live
}
