"use client"

import { useCallback, useEffect, useState } from "react"
import { Lightbox } from "@/components/work/Lightbox"
import type { WorkImage } from "@/lib/work"

type CaseLightboxProps = {
  images: WorkImage[]
}

export function CaseLightbox({ images }: CaseLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const close = useCallback(() => setActiveIndex(null), [])
  const navigate = useCallback((index: number) => setActiveIndex(index), [])

  useEffect(() => {
    const openImage = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail
      if (Number.isInteger(detail) && detail >= 0 && detail < images.length) {
        setActiveIndex(detail)
      }
    }
    window.addEventListener("case-image-open", openImage)
    return () => window.removeEventListener("case-image-open", openImage)
  }, [images.length])

  return (
    <Lightbox
      open={activeIndex !== null}
      images={images}
      index={activeIndex ?? 0}
      onClose={close}
      onNavigate={navigate}
    />
  )
}
