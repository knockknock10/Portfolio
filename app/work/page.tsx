import type { Metadata } from "next"
import { WorkGallery } from "@/components/work/WorkGallery"

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected projects in developer tooling, full-stack engineering, reliability, and applied AI research.",
}

import { getWorkProjects } from "@/lib/work"

export default function WorkPage() {
  const projects = getWorkProjects()

  return (
    <main className="work-page">
      <header className="work-page-header">
        <h1 className="work-page-title">Work</h1>
      </header>
      <WorkGallery projects={projects} />
    </main>
  )
}
