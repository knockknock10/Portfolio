import Link from "next/link"
import { getContent } from "@/lib/content.server"

export default function ContactPage() {
  const content = getContent()
  const name =
    content.identity.professionalName ??
    content.identity.fullName ??
    "Sanjeev Kumar"
  const email = content.contact.email
  const socials = (content.socials ?? []).filter(
    (item): item is { platform: string; url: string } =>
      Boolean(item.url && /^https?:\/\//i.test(item.url)),
  )

  return (
    <main className="route-shell editorial-page contact-page">
      <header className="route-intro contact-intro">
        <p className="route-kicker">Contact</p>
        <h1 className="route-shell-title">Let’s build something useful.</h1>
        <p className="route-lede">
          I’m {name}. I’m interested in software engineering opportunities,
          thoughtful open-source collaboration, and applied AI projects.
        </p>
      </header>

      <section className="contact-panel" aria-labelledby="contact-heading">
        <div>
          <h2 id="contact-heading">Start a conversation</h2>
          <p>
            Share what you’re working on, an opportunity, or a problem you think is worth solving.
          </p>
        </div>
        {email ? (
          <a className="contact-email-link" href={"mailto:" + email}>
            <span>{email}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p className="contact-missing">
            Email is not configured yet. You can reach me through one of the public profiles below.
          </p>
        )}
      </section>

      {socials.length > 0 ? (
        <nav className="contact-social-links" aria-label="Contact and professional profiles">
          {socials.map((item) => (
            <Link key={item.platform} href={item.url} target="_blank" rel="noreferrer">
              {item.platform.replace(/ profile$/i, "")}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      ) : null}

      <p className="contact-back-link">
        <Link href="/work">Back to selected work <span aria-hidden="true">→</span></Link>
      </p>
    </main>
  )
}
