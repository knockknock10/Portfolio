import type { Metadata } from "next"
import { WorkGallery } from "@/components/work/WorkGallery"
import { WorkStatsStrip } from "@/components/work/WorkStatsStrip"
import { getWorkData } from "@/lib/work"


export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected projects in developer tooling, full-stack engineering, reliability, and applied AI research.",
}

export default function WorkPage() {
  const data = getWorkData()

  return (
    <main className="work-page">
      <header className="work-page-header">
        <h1 className="work-page-title">Work</h1>
      </header>
      <WorkStatsStrip stats={data.stats} />
      <ContributionHeatmap calendar={data.contributionCalendar} />
      <WorkGallery items={data.items} />
    </main>
  )
}
