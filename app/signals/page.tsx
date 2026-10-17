import type { Metadata } from "next";
import CodingShowcase from "@/components/portfolio/CodingShowcase";
import { getSignalsData } from "@/lib/signals";

export const metadata: Metadata = {
  title: "Coding & Engineering Activity",
  description: "Saved problem-solving progress, contest history and coding activity by Sanjeev Kumar.",
};

export default function SignalsPage() {
  return (
    <main className="editorial-page signals-page">
      <CodingShowcase data={getSignalsData()} standalone />
    </main>
  );
}
