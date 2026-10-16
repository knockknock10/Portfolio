import type { Metadata } from "next"
import { ActivityShowcase } from "@/components/sections/PortfolioExperience"
import { getSignalsData } from "@/lib/signals"

export const metadata: Metadata = {
  title: "Engineering Activity",
  description: "GitHub contributions, profile achievements and LeetCode badges and problem-solving progress by Sanjeev Kumar.",
}

export default function SignalsPage() {
  return (
    <main className="editorial-page signals-page">
      <ActivityShowcase data={getSignalsData()} />
    </main>
  )
}
