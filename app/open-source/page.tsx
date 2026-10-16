import type { Metadata } from "next"
import { OpenSourceOrganizations } from "@/components/sections/PortfolioExperience"

export const metadata: Metadata = {
  title: "Open Source",
  description: "Organizations and upstream repositories where Sanjeev Kumar contributes to software quality, integrations and developer tooling.",
}

export default function OpenSourcePage() {
  return (
    <main className="editorial-page open-source-page">
      <OpenSourceOrganizations />
    </main>
  )
}
