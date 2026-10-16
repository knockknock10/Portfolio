import Link from "next/link"
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
import { Internships } from "@/components/sections/Internships"
import { getInternshipsData } from "@/lib/internships"
import { Certifications } from "@/components/sections/Certifications"
import { getCertificationsData } from "@/lib/certifications"
import { getRecentPublicPullRequests } from "@/lib/github.server"
import styles from "@/components/sections/HomeAnchors.module.css"

export default async function HomePage() {
  const content = getContent()
  const craftSteps = getCraftData()
  const signalsData = getSignalsData()
  const researchItems = getResearchData()
  const internships = getInternshipsData()
  const certifications = getCertificationsData()
  const recentPullRequests = await getRecentPublicPullRequests()
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
      <section
        id="open-source"
        className={styles.anchorSection + " home-oss-section"}
        aria-labelledby="home-oss-heading"
        tabIndex={-1}
      >
        <div className="home-oss-inner">
          <header className="home-oss-header">
            <div>
              <p className="home-oss-eyebrow">Open source · Upstream work</p>
              <h2 id="home-oss-heading">Make the tools better for everyone.</h2>
              <p>
                Real issue-driven engineering: tracing bugs, improving integrations, writing tests,
                and working through review feedback in public repositories.
              </p>
            </div>
            <Link className="home-oss-all-link" href="/open-source">
              Explore contributions <span aria-hidden="true">↗</span>
            </Link>
          </header>
          <div className="home-oss-grid">
            {recentPullRequests.available && recentPullRequests.items.length > 0
              ? recentPullRequests.items.slice(0, 3).map((item) => (
                  <article className="home-oss-card" key={item.url}>
                    <div className="home-oss-card-meta">
                      <span>{item.repository}</span>
                      <span className={"home-oss-status" + (item.merged ? " is-merged" : item.state === "open" ? " is-open" : "")}>
                        {item.merged ? "Merged" : item.state === "open" ? "Open" : "Closed"}
                      </span>
                    </div>
                    <h3>
                      <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                    </h3>
                    <p>Issue-driven contribution · code review · upstream collaboration</p>
                    <a className="home-oss-card-link" href={item.url} target="_blank" rel="noreferrer">
                      View pull request <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                ))
              : [
                  {
                    title: "Kestra · Databricks plugin",
                    description: "Integration work, CI feedback, and reliability improvements for workflow tooling.",
                    url: "https://github.com/kestra-io/plugin-databricks",
                  },
                  {
                    title: "Apache Camel K",
                    description: "Cloud-native integration work across tests, build workflows, and issue-driven maintenance.",
                    url: "https://github.com/apache/camel-k",
                  },
                  {
                    title: "Ansvisor",
                    description: "Developer tooling built to practise shipping reliable software and improving workflows.",
                    url: "https://github.com/knockknock10/ansvisor",
                  },
                ].map((item) => (
                  <article className="home-oss-card" key={item.url}>
                    <div className="home-oss-card-meta"><span>Selected work</span><span>Open source</span></div>
                    <h3><a href={item.url} target="_blank" rel="noreferrer">{item.title}</a></h3>
                    <p>{item.description}</p>
                    <a className="home-oss-card-link" href={item.url} target="_blank" rel="noreferrer">
                      Explore repository <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                ))}
          </div>
        </div>
      </section>
      <Signals data={signalsData} />
      <Research items={researchItems} />
      <Internships items={internships} />
      <Certifications items={certifications} />
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
