import type { Metadata } from "next"
import { Work } from "@/components/sections/Work"

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected projects in developer tooling, full-stack engineering, reliability, and applied AI research.",
}

export default function WorkPage() {
  return <Work variant="full" />
}
