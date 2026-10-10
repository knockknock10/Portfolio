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
    (social): social is { platform: string; url: string } => Boolean(social.url && /^https?:\/\//i.test(social.url)),
  ) ?? []
  return (
    <Container className="contact-section" aria-labelledby="contact-heading">
      <Heading id="contact-heading" className="contact-headline">Let's make something.</Heading>
      {email ? <a className="contact-link contact-email" href={"mailto:" + email}>{email}</a> : null}
      {availableSocials.length > 0 ? (
        <nav className="contact-socials" aria-label="Social links">
          {availableSocials.map((social) => (
            <a className="contact-link contact-social-link" key={social.platform} href={social.url} target="_blank" rel="noreferrer">
              {social.platform.replace(/ profile$/i, "")}
            </a>
          ))}
        </nav>
      ) : null}
      {availabilityNote ? <p className="contact-availability">{availabilityNote}</p> : null}
    </Container>
  )
}
