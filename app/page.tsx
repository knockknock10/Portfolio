import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Hero } from "@/components/sections/Hero"
import { Research } from "@/components/sections/Research"
import { Internships } from "@/components/sections/Internships"
import { Certifications } from "@/components/sections/Certifications"
import {
  ActivityShowcase,
  FeaturedProjects,
  OpenSourceOrganizations,
  ProfilePortrait,
  SkillsExplorer,
} from "@/components/sections/PortfolioExperience"
import { getContent } from "@/lib/content.server"
import { getSignalsData } from "@/lib/signals"
import { getResearchData } from "@/lib/research"
import { getInternshipsData } from "@/lib/internships"
import { getCertificationsData } from "@/lib/certifications"
import styles from "@/components/sections/HomeAnchors.module.css"

export default async function HomePage() {
  const content = getContent()
  const signalsData = getSignalsData()
  const researchItems = getResearchData()
  const internships = getInternshipsData()
  const certifications = getCertificationsData()
  const heading =
    content.identity.professionalName ??
    content.identity.fullName ??
    content.identity.tagline
  const subhead = content.identity.tagline !== heading ? content.identity.tagline : null
  const bio = [content.identity.shortBio, content.identity.longBio].filter(
    (paragraph): paragraph is string => Boolean(paragraph),
  )
  const portraitInitials =
    content.identity.fullName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2) ?? null

  return (
    <main className="home-page">
      <section
        id="home"
        className={styles.anchorSection}
        aria-labelledby={heading ? "hero-title" : undefined}
        tabIndex={-1}
      >
        <Hero
          heading={heading}
          eyebrow={content.identity.roleTitle}
          subhead={subhead}
          splitName={heading === content.identity.fullName}
        />
      </section>
      <ProfilePortrait tools={content.tools} />
      <FeaturedProjects />
      <Research items={researchItems} />
      <OpenSourceOrganizations />
      <ActivityShowcase data={signalsData} />
      <SkillsExplorer />
      <Internships items={internships} />
      <Certifications items={certifications} />
      <section
        id="about"
        className={styles.anchorSection}
        aria-labelledby="about-heading"
        tabIndex={-1}
      >
        <About
          bio={bio}
          tools={content.tools}
          influences={content.influences}
          portraitInitials={portraitInitials}
        />
      </section>
      <section
        id="contact"
        className={styles.anchorSection}
        aria-labelledby="contact-heading"
        tabIndex={-1}
      >
        <Contact
          email={content.contact.email}
          socials={content.socials}
          availabilityNote={content.identity.availabilityStatement}
        />
      </section>
    </main>
  )
}
