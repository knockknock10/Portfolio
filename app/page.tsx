import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Craft } from "@/components/sections/Craft"
import { Hero } from "@/components/sections/Hero"
import { Work } from "@/components/sections/Work"
import { Signals } from "@/components/sections/Signals"
import { Research } from "@/components/sections/Research"
import { getContent } from "@/lib/content.server"
import { getCraftData } from "@/lib/craft"
import { getSignalsData } from "@/lib/signals"
import { getResearchData } from "@/lib/research"
import styles from "@/components/sections/HomeAnchors.module.css"

export default function HomePage() {
  const content = getContent()
  const craftSteps = getCraftData()
  const signalsData = getSignalsData()
  const researchItems = getResearchData()
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
      <section
        id="work"
        className={styles.anchorSection}
        aria-labelledby="work-preview-heading"
        tabIndex={-1}
      >
        <Work variant="preview" />
      </section>
      <Signals data={signalsData} />
      <Research items={researchItems} />
      <section
        id="craft"
        className={styles.anchorSection}
        aria-labelledby="craft-heading"
        tabIndex={-1}
      >
        <Craft steps={craftSteps} />
      </section>
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
