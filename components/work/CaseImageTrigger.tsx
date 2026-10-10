"use client"

import type { ReactNode } from "react"

type CaseImageTriggerProps = {
  index: number
  className: string
  label: string
  children: ReactNode
}

export function CaseImageTrigger({ index, className, label, children }: CaseImageTriggerProps) {
  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={() => window.dispatchEvent(new CustomEvent("case-image-open", { detail: index }))}
    >
      {children}
    </button>
  )
}
