import type { Metadata } from "next"
import { FeaturedProjects } from "@/components/sections/PortfolioExperience"

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Six source-linked projects across developer tooling, full-stack engineering and distributed systems.",
}

export default function WorkPage() {
  return (
    <main className="editorial-page work-page">
      <FeaturedProjects />
    </main>
  )
}
