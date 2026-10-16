import Link from "next/link"
import { ContributionHeatmap } from "@/components/work/ContributionHeatmap"
import { WorkGallery } from "@/components/work/WorkGallery"
import { WorkStatsStrip } from "@/components/work/WorkStatsStrip"
import { getWorkData } from "@/lib/work"

type WorkProps = {
  variant: "preview" | "full"
}

export function Work({ variant }: WorkProps) {
  const data = getWorkData()

  if (variant === "full") {
    return (
      <main className="work-page">
        <header className="work-page-header">
          <h1 className="work-page-title">Work</h1>
        </header>
        <div className="work-page-activity-link">
          <Link href="/signals">Explore activity signals <span aria-hidden="true">→</span></Link>
        </div>
        <WorkStatsStrip stats={data.stats} />
        <ContributionHeatmap calendar={data.contributionCalendar} />
        <WorkGallery items={data.items} variant="full" />
      </main>
    )
  }

  return (
    <div className="work-preview">
      <header className="work-preview-header">
        <div className="work-preview-heading-copy">
          <p className="work-preview-eyebrow">Selected work · Projects & repositories</p>
          <h2 id="work-preview-heading" className="section-heading">Built to be useful.</h2>
          <p className="work-preview-intro">
            Developer tools, full-stack products, and applied research—chosen for the engineering
            problems behind them, not just the screenshots.
          </p>
        </div>
        <Link className="work-preview-all" href="/work">
          Explore all work <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <WorkGallery items={data.items} variant="preview" />
    </div>
  )
}
