import type { Metadata } from "next"
import Link from "next/link"
import { Certifications } from "@/components/sections/Certifications"
import { getCertificationsData } from "@/lib/certifications"

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certifications and credentials held by Sanjeev Kumar.",
}

export default function CertificationsPage() {
  const items = getCertificationsData()
  if (!items.length) {
    return (
      <main className="editorial-page empty-editorial-page">
        <header className="route-intro">
          <p className="route-kicker">Credentials</p>
          <h1 className="route-shell-title">A record worth keeping precise.</h1>
          <p className="route-lede">
            No certification records are present in the current portfolio data. This page will show
            verified credentials and links when those details are added—never placeholder badges.
          </p>
        </header>
        <div className="empty-editorial-actions">
          <Link href="/work">Explore selected work <span aria-hidden="true">↗</span></Link>
          <Link href="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
        </div>
      </main>
    )
  }
  return (
    <main className="editorial-page certifications-page">
      <Certifications items={items} standalone />
    </main>
  )
}
