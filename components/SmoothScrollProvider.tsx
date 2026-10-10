"use client"

import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"

type SmoothScrollProviderProps = {
  children: ReactNode
}

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const pathnameRef = useRef(pathname)
  const [activeLenis, setActiveLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")

    function syncScrollMode() {
      lenisRef.current?.destroy()
      const nextLenis = motionPreference.matches ? null : new Lenis({ autoRaf: true, anchors: true })
      lenisRef.current = nextLenis
      setActiveLenis(nextLenis)
    }

    function onNavigationStart(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]")
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return

      let destination: URL
      try {
        destination = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (destination.origin === window.location.origin && destination.pathname !== window.location.pathname) {
        lenisRef.current?.stop()
      }
    }

    syncScrollMode()
    motionPreference.addEventListener("change", syncScrollMode)
    document.addEventListener("click", onNavigationStart, true)

    return () => {
      document.removeEventListener("click", onNavigationStart, true)
      motionPreference.removeEventListener("change", syncScrollMode)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (pathnameRef.current === pathname) return
    pathnameRef.current = pathname

    const lenis = lenisRef.current
    lenis?.stop()
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    lenis?.scrollTo(0, { immediate: true, force: true })
    lenis?.start()
  }, [pathname])

  return <LenisContext.Provider value={activeLenis}>{children}</LenisContext.Provider>
}
