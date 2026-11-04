import type { Metadata } from "next";
import FeaturedWork from "@/components/portfolio/FeaturedWork";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Projects and source-linked engineering work by Sanjeev Kumar.",
};

export default function WorkPage() {
  return (
    <main className="portfolio-standalone-showcase work-standalone">
      <FeaturedWork />
    </main>
  );
}
