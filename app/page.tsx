import { Hero } from "@/components/sections/Hero"
import { getContent } from "@/lib/content.server"

export default function HomePage() {
  const content = getContent()
  const heading =
    content.identity.professionalName ??
    content.identity.fullName ??
    content.identity.tagline
  const subhead = content.identity.tagline !== heading ? content.identity.tagline : null

  return (
    <Hero
      heading={heading}
      eyebrow={content.identity.roleTitle}
      subhead={subhead}
      splitName={heading === content.identity.fullName}
    />
  )
}
