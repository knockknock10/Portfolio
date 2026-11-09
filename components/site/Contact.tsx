import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"
import { Wave } from "./Wave"
import { BackgroundSVG } from "./BackgroundSVG"

export type ContactLink = { label: string; detail: string; href: string }

type ContactProps = {
  email: string | null
  location: string | null
  links: ContactLink[]
}

export function Contact({ email, location, links }: ContactProps) {
  return (
    <section className="sk-section sk-dark" id="contact" aria-labelledby="contact-title">
      <Wave edge="top" />
      <BackgroundSVG variant="blob1" className="sk-moving-svg sk-moving-svg--projects-top" />
      <div className="sk-wrap">
        <Reveal>
          <p className="sk-eyebrow">Contact</p>
          <h2 className="sk-contact__title" id="contact-title">
            Let&apos;s talk about working together.
          </h2>
          {/* Previous contact copy retained; it advertised full-time availability and promised a reply to every message. */}
          <p className="sk-contact__lede">
            I&apos;m currently looking for software engineering internships. Email is the best way to reach me; my GitHub,
            LinkedIn and résumé are below.
          </p>
          {email ? (
            <a className="sk-email" href={`mailto:${email}`}>
              {email}
            </a>
          ) : null}
        </Reveal>

        <Reveal delay={0.06}>
          <div className="sk-contact__rows">
            {links.map((link) => (
              <a className="sk-contact__row" key={link.href} href={link.href} target="_blank" rel="noreferrer">
                <span>
                  {link.label} <ArrowUpRight />
                </span>
                <small>{link.detail}</small>
              </a>
            ))}
          </div>
          {location ? <p className="sk-contact__where">Based in {location}.</p> : null}
        </Reveal>
      </div>
    </section>
  )
}
