import type { Metadata } from "next"
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
        <h1>Certifications</h1>
        <p>Certifications coming soon.</p>
      </main>
    )
  }
  return (
    <main className="editorial-page certifications-page">
      <Certifications items={items} standalone />
    </main>
  )
}
