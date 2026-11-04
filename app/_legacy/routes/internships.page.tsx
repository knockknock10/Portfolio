import type { Metadata } from "next"
import Link from "next/link"
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
        <header className="route-intro">
          <p className="route-kicker">Experience</p>
          <h1 className="route-shell-title">Experience, with the details that matter.</h1>
          <p className="route-lede">
            There are no internship records in the current portfolio data yet. I’m keeping this page
            accurate rather than filling it with placeholder roles or invented outcomes.
          </p>
        </header>
        <div className="empty-editorial-actions">
          <Link href="/work">Explore selected work <span aria-hidden="true">↗</span></Link>
          <Link href="/contact">Discuss an opportunity <span aria-hidden="true">↗</span></Link>
        </div>
      </main>
    )
  }
  return (
    <main className="editorial-page internships-page">
      <Internships items={items} standalone />
    </main>
  )
}
