import type { Metadata } from "next";
import AboutShowcase from "@/components/portfolio/AboutShowcase";
import { getContent } from "@/lib/content.server";

export const metadata: Metadata = {
  title: "About",
  description: "About Sanjeev Kumar and the way he approaches software engineering, research and open source.",
};

export default function AboutPage() {
  return (
    <main className="editorial-page about-page">
      <AboutShowcase content={getContent()} standalone />
    </main>
  );
}
