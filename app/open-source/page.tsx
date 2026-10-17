import type { Metadata } from "next";
import OpenSourceShowcase from "@/components/portfolio/OpenSourceShowcase";

export const metadata: Metadata = {
  title: "Open Source",
  description: "Source-linked upstream contributions and open-source work by Sanjeev Kumar.",
};

export default function OpenSourcePage() {
  return (
    <main className="portfolio-standalone-showcase open-source-standalone">
      <OpenSourceShowcase />
    </main>
  );
}
