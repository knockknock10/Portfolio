import type { Metadata } from "next"
import { Research } from "@/components/sections/Research"
import { getResearchData } from "@/lib/research"

export const metadata: Metadata = {
  title: "Research",
  description: "Research projects and experience by Sanjeev Kumar.",
}

export default function ResearchPage() {
  const items = getResearchData()
  if (!items.length) {
    return (
      <main className="editorial-page empty-editorial-page">
        <h1>Research</h1>
        <p>Research is coming.</p>
      </main>
    )
  }
  return (
    <main className="editorial-page research-page">
      <Research items={items} standalone />
    </main>
  )
}
