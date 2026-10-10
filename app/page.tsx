import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Craft } from "@/components/sections/Craft"
import { Hero } from "@/components/sections/Hero"
import { getContent } from "@/lib/content.server"
import { getCraftData } from "@/lib/craft"

export default function HomePage() {
  const content = getContent()
  const craftSteps = getCraftData()
  const heading = content.identity.professionalName ?? content.identity.fullName ?? content.identity.tagline
  const subhead = content.identity.tagline !== heading ? content.identity.tagline : null
  const bio = [content.identity.shortBio, content.identity.longBio].filter((paragraph): paragraph is string => Boolean(paragraph))
  const portraitInitials = content.identity.fullName
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2) ?? null
  return (
    <main className="home-page">
      <Hero heading={heading} eyebrow={content.identity.roleTitle} subhead={subhead} splitName={heading === content.identity.fullName} />
      <Craft steps={craftSteps} />
      <About bio={bio} tools={content.tools} influences={content.influences} portraitInitials={portraitInitials} />
      <Contact email={content.contact.email} socials={content.socials} availabilityNote={content.identity.availabilityStatement} />
    </main>
  )
}
