import type { Metadata } from "next";
import CodingShowcase from "@/components/portfolio/CodingShowcase";
import { getSignalsData } from "@/lib/signals";

export const metadata: Metadata = {
  title: "Coding & Problem Solving",
  description: "Saved LeetCode progress, contest history, practice activity and problem-solving resources.",
};

export default function ProblemSolvingPage() {
  return (
    <main className="editorial-page problem-solving-page">
      <CodingShowcase data={getSignalsData()} standalone />
    </main>
  );
}
