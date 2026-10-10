import type { Metadata } from "next"
import { Signals } from "@/components/sections/Signals"
import { getSignalsData } from "@/lib/signals"

export const metadata: Metadata = {
  title: "Signals",
  description: "Public GitHub and LeetCode activity for Sanjeev Kumar.",
}

export default function SignalsPage() {
  return (
    <main className="editorial-page signals-page">
      <Signals data={getSignalsData()} standalone />
    </main>
  )
}
