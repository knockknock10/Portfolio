import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"
import { Wave } from "./Wave"

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
      <div className="sk-wrap">
        <Reveal>
          <p className="sk-eyebrow">Contact</p>
          <h2 className="sk-contact__title" id="contact-title">
            Let&apos;s talk about working together.
          </h2>
          <p className="sk-contact__lede">
            I&apos;m open to software engineering internships and full-time roles. The quickest way to reach me is email,
            and I reply to every message.
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
