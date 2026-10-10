import type { Metadata } from "next"
import { Internships } from "@/components/sections/Internships"
import { getInternshipsData } from "@/lib/internships"

export const metadata: Metadata = {
  title: "Internships",
  description: "Professional internship experience by Sanjeev Kumar.",
}

export default function InternshipsPage() {
  const items = getInternshipsData()
  if (!items.length) {
    return (
      <main className="editorial-page empty-editorial-page">
        <h1>Internships</h1>
        <p>Internships coming soon.</p>
      </main>
    )
  }
  return (
    <main className="editorial-page internships-page">
      <Internships items={items} />
    </main>
  )
}
