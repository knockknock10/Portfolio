import type { Metadata } from "next"
import { Signals } from "@/components/sections/Signals"
import { getSignalsData } from "@/lib/signals"

export const metadata: Metadata = {
  title: "Engineering Activity",
  description: "A source-backed snapshot of GitHub contributions and LeetCode problem-solving practice by Sanjeev Kumar.",
}

export default function SignalsPage() {
  return (
    <main className="editorial-page signals-page">
      <Signals data={getSignalsData()} standalone />
    </main>
  )
}
