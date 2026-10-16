import type { SocialLink } from "@/lib/content"

type ContactProps = {
  email: string | null
  socials: SocialLink[] | null
  availabilityNote: string | null
  headingLevel?: "h1" | "h2"
  asMain?: boolean
}

export function Contact({ email, socials, availabilityNote, headingLevel = "h2", asMain = false }: ContactProps) {
  const Container = asMain ? "main" : "section"
  const Heading = headingLevel
  const availableSocials = socials?.filter(
    (social): social is { platform: string; url: string } =>
      Boolean(social.url && (social.url.startsWith("https://") || social.url.startsWith("http://"))),
  ) ?? []
  const priority = (platform: string) => {
    const normalized = platform.toLowerCase()
    if (normalized.includes("linkedin")) return 0
    if (normalized.includes("github")) return 1
    if (normalized.includes("leetcode")) return 5
    return 3
  }
  const sortedSocials = [...availableSocials].sort((a, b) => priority(a.platform) - priority(b.platform))
  const primarySocials = sortedSocials.filter((social) => !social.platform.toLowerCase().includes("leetcode")).slice(0, 2)
  const primaryPlatforms = new Set(primarySocials.map((social) => social.platform))
  const moreSocials = sortedSocials.filter((social) => !primaryPlatforms.has(social.platform))

  return (
    <Container className="contact-section" aria-labelledby="contact-heading">
      <p className="contact-eyebrow">Have a project or opportunity?</p>
      <Heading id="contact-heading" className="contact-headline">Let's make something.</Heading>
      {email ? (
        <a className="contact-link contact-email" href={"mailto:" + email}>
          {email} <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      {primarySocials.length > 0 ? (
        <nav className="contact-socials" aria-label="Primary social links">
          {primarySocials.map((social) => (
            <a className="contact-link contact-social-link" key={social.platform} href={social.url} target="_blank" rel="noreferrer">
              {social.platform.replace(/ profile$/i, "")} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      ) : null}
      {moreSocials.length > 0 ? (
        <details className="contact-more-links">
          <summary>More profiles <span aria-hidden="true">＋</span></summary>
          <nav className="contact-socials contact-socials-more" aria-label="More social links">
            {moreSocials.map((social) => (
              <a className="contact-link contact-social-link" key={social.platform} href={social.url} target="_blank" rel="noreferrer">
                {social.platform.replace(/ profile$/i, "")} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </details>
      ) : null}
      {availabilityNote ? <p className="contact-availability">{availabilityNote}</p> : null}
    </Container>
  )
}
