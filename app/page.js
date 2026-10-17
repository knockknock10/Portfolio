import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Research } from "@/components/sections/Research";
import { Internships } from "@/components/sections/Internships";
import { Certifications } from "@/components/sections/Certifications";
import {
  ActivityShowcase,
  OpenSourceOrganizations,
  SkillsExplorer,
} from "@/components/sections/PortfolioExperience";
import { HomeHero } from "@/components/portfolio/HomeHero";
import FeaturedWork from "@/components/portfolio/FeaturedWork";
import { getContent } from "@/lib/content.server";
import { getSignalsData } from "@/lib/signals";
import { getResearchData } from "@/lib/research";
import { getInternshipsData } from "@/lib/internships";
import { getCertificationsData } from "@/lib/certifications";

export default async function HomePage() {
  const content = getContent();
  const signalsData = getSignalsData();
  const researchItems = getResearchData();
  const internships = getInternshipsData();
  const certifications = getCertificationsData();
  const fullName =
    content.identity.professionalName ||
    content.identity.fullName ||
    "Sanjeev Kumar";
  const bio = [content.identity.shortBio, content.identity.longBio].filter(Boolean);

  return (
    <main className="home-page portfolio-home-page">
      <HomeHero fullName={fullName} socials={content.socials} email={content.contact.email} resumePath={content.resumePath || "/resume.pdf"} />

      <FeaturedWork />

      <section id="research" className="portfolio-anchor" tabIndex={-1}>
        <Research items={researchItems} />
      </section>

      <OpenSourceOrganizations />

      <section id="internships" className="portfolio-anchor" tabIndex={-1}>
        <Internships items={internships} />
      </section>

      <SkillsExplorer />
      <ActivityShowcase data={signalsData} />

      <section id="certifications" className="portfolio-anchor" tabIndex={-1}>
        <Certifications items={certifications} />
      </section>

      <section id="about" className="portfolio-anchor" tabIndex={-1}>
        <About
          bio={bio}
          tools={content.tools}
          influences={content.influences}
          portraitInitials={fullName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        />
      </section>

      <section id="contact" className="portfolio-anchor" tabIndex={-1}>
        <Contact
          email={content.contact.email}
          socials={content.socials}
          availabilityNote={content.identity.availabilityStatement}
        />
      </section>
    </main>
  );
}
