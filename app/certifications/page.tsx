import type { Metadata } from "next";
import AchievementsShowcase from "@/components/portfolio/AchievementsShowcase";
import { getCertificationsData } from "@/lib/certifications";

export const metadata: Metadata = {
  title: "Achievements & Certifications",
  description: "Academic progress, participation milestones and the credential archive for Sanjeev Kumar.",
};

export default function CertificationsPage() {
  return (
    <main className="editorial-page certifications-page">
      <AchievementsShowcase items={getCertificationsData()} />
    </main>
  );
}
