import { Contact } from "@/components/sections/Contact";
import ResearchShowcase from "@/components/sections/ResearchShowcase";
import AchievementsShowcase from "@/components/portfolio/AchievementsShowcase";
import CodingShowcase from "@/components/portfolio/CodingShowcase";
import AboutShowcase from "@/components/portfolio/AboutShowcase";
import ExperienceShowcase from "@/components/portfolio/ExperienceShowcase";
import SkillsShowcase from "@/components/portfolio/SkillsShowcase";
import OpenSourceShowcase from "@/components/portfolio/OpenSourceShowcase";
import { HomeHero } from "@/components/portfolio/HomeHero";
import FeaturedWork from "@/components/portfolio/FeaturedWork";
import { getContent } from "@/lib/content.server";
import { getSignalsData } from "@/lib/signals";
import { getResearchData } from "@/lib/research";
import { getCertificationsData } from "@/lib/certifications";

export default async function HomePage() {
  const content = getContent();
  const signalsData = getSignalsData();
  const researchItems = getResearchData();
  const certifications = getCertificationsData();
  const fullName =
    content.identity.professionalName ||
    content.identity.fullName ||
    "Sanjeev Kumar";

  return (
    <main className="home-page portfolio-home-page">
      <HomeHero fullName={fullName} socials={content.socials} email={content.contact.email} resumePath={content.resumePath || "/resume.pdf"} />

      <FeaturedWork />

      <section id="research" className="portfolio-anchor" tabIndex={-1}>
        <ResearchShowcase items={researchItems} />
      </section>

      <OpenSourceShowcase />

      <ExperienceShowcase />

      <SkillsShowcase />
      <CodingShowcase data={signalsData} />

      <AchievementsShowcase items={certifications} />

      <AboutShowcase content={content} />

      <Contact
        email={content.contact.email}
        socials={content.socials}
        availabilityNote={content.identity.availabilityStatement}
      />
    </main>
  );
}
