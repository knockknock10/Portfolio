import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Craft } from "@/components/sections/Craft"
import { Hero } from "@/components/sections/Hero"
import { getContent } from "@/lib/content.server"

export default function HomePage() {
  const content = getContent()
  const heading = content.identity.professionalName ?? content.identity.fullName ?? content.identity.tagline
  const subhead = content.identity.tagline !== heading ? content.identity.tagline : null
  const bio = [content.identity.shortBio, content.identity.longBio].filter((paragraph): paragraph is string => Boolean(paragraph))
  return (
    <main className="home-page">
      <Hero heading={heading} eyebrow={content.identity.roleTitle} subhead={subhead} splitName={heading === content.identity.fullName} />
      <Craft steps={content.craftSteps} />
      <About bio={bio} tools={content.tools} influences={content.influences} />
      <Contact email={content.contact.email} socials={content.socials} availabilityNote={content.identity.availabilityStatement} />
    </main>
  )
}
