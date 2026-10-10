import type { Metadata } from "next"
import Link from "next/link"
import { getContent } from "@/lib/content.server"


export const metadata: Metadata = {
  title: "About",
  description: "How Sanjeev Kumar approaches software engineering, open source, backend systems, and applied AI.",
}

export default function AboutPage() {
  const content = getContent()
  const name =
    content.identity.professionalName ??
    content.identity.fullName ??
    "Sanjeev Kumar"
  const biography = [
    content.identity.shortBio,
    content.identity.longBio,
  ].filter((value): value is string => typeof value === "string" && value.trim().length > 0)
  const skills = (content.skills ?? []).filter(Boolean).slice(0, 18)
  const github = content.socials?.find(
    (item) => /^GitHub(?: profile)?$/i.test(item.platform) && item.url?.startsWith("https://"),
  )?.url

  return (
    <main className="route-shell editorial-page about-page">
      <header className="route-intro">
        <p className="route-kicker">About</p>
        <h1 className="route-shell-title">
          Software engineering, open source, and applied AI.
        </h1>
        <p className="route-lede">
          I’m {name}, a Computer Science student who learns by building, contributing,
          and turning research ideas into working systems.
        </p>
      </header>

      <div className="about-content-grid">
        <section className="route-copy" aria-labelledby="about-story-title">
          <h2 id="about-story-title">The way I work</h2>
          {biography.length > 0 ? (
            biography.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>
              I focus on practical software engineering: understanding a problem, making
              the system reliable, and documenting the decisions behind the implementation.
            </p>
          )}
          <p>
            My current interests include backend and distributed systems, meaningful open-source
            contributions, developer tooling, and applied audio ML research.
          </p>
          {github ? (
            <p className="route-inline-link">
              <Link href={github} target="_blank" rel="noreferrer">
                Explore my work on GitHub <span aria-hidden="true">↗</span>
              </Link>
            </p>
          ) : null}
        </section>

        <aside className="about-skills" aria-labelledby="about-skills-title">
          <h2 id="about-skills-title">Tools I work with</h2>
          {skills.length > 0 ? (
            <ul className="route-tag-list">
              {skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          ) : (
            <p>My focus is on backend systems, open source, and applied AI.</p>
          )}
          <p className="about-education">
            B.Tech Computer Science and Engineering
            <span>SRM University AP</span>
          </p>
        </aside>
      </div>
    </main>
  )
}
