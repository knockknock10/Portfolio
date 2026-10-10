import { ContributionHeatmap } from "@/components/work/ContributionHeatmap"
import { WorkGallery } from "@/components/work/WorkGallery"
import { WorkStatsStrip } from "@/components/work/WorkStatsStrip"
import { getWorkData } from "@/lib/work"

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
