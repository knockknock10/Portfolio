import Link from "next/link"
import { Hero } from "@/components/sections/Hero"
import { getContent } from "@/lib/content.server"
import { getWorkProjects } from "@/lib/work"

const externalFocus = [
  {
    number: "01",
    title: "Open source",
    description:
      "Contribute to real codebases, work through review feedback, and learn how production projects are maintained.",
    label: "Browse GitHub",
    href: "https://github.com/knockknock10",
  },
  {
    number: "02",
    title: "Applied AI research",
    description:
      "Build and evaluate SemBind-Audio, a semantic-aware audio watermarking project with explicit reporting of its current limitations.",
    label: "Read the research code",
    href: "https://github.com/knockknock10/SemBind_Audio",
  },
  {
    number: "03",
    title: "Problem solving",
    description:
      "Practice data structures and algorithms, and keep learning through consistent implementation rather than unverified scoreboards.",
    label: "Open LeetCode",
    href: "https://leetcode.com/u/knockknock10/",
  },
]

export default function HomePage() {
  const content = getContent()
  const projects = getWorkProjects().slice(0, 3)
  const heading =
    content.identity.professionalName ??
    content.identity.fullName ??
    "Sanjeev Kumar"
  const subhead =
    content.identity.tagline ??
    "I build developer tools, contribute to open source, and turn research ideas into working systems."

  return (
    <main className="home-page">
      <Hero
        heading={heading}
        eyebrow={content.identity.roleTitle}
        subhead={subhead}
        splitName={heading === content.identity.fullName}
      />

      <div className="home-content">
        <section className="home-section home-work-section" id="work" aria-labelledby="home-work-title">
          <div className="home-section-heading">
            <div>
              <p className="home-kicker">Selected work</p>
              <h2 id="home-work-title">Built to solve real problems.</h2>
            </div>
            <Link className="home-text-link" href="/work">
              View all projects <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="home-project-grid">
              {projects.map((project, index) => (
                <article className="home-project-card" key={project.slug}>
                  <div className={"home-project-art home-project-art-" + project.slug} aria-hidden="true">
                    <span className="home-project-art-index">0{index + 1}</span>
                    <span className="home-project-art-orbit" />
                    <span className="home-project-art-mark">{(project.title ?? "P").slice(0, 1)}</span>
                    <span className="home-project-art-category">{project.category ?? "Project"}</span>
                  </div>

                  <div className="home-project-body">
                    <div className="home-project-meta">
                      <span>{project.category ?? "Project"}</span>
                      {project.status ? <span>{project.status}</span> : null}
                    </div>
                    <h3><Link href={"/work/" + project.slug}>{project.title}</Link></h3>
                    <p>{project.description ?? "A project built through iterative engineering and evaluation."}</p>

                    {project.tags?.length ? (
                      <ul className="home-project-tags" aria-label={"Technologies used for " + project.title}>
                        {project.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
                      </ul>
                    ) : null}

                    <div className="home-project-links">
                      <Link href={"/work/" + project.slug}>
                        Case study <span aria-hidden="true">→</span>
                      </Link>
                      {project.repositoryUrl ? (
                        <Link href={project.repositoryUrl} target="_blank" rel="noreferrer">
                          Source <span aria-hidden="true">↗</span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="home-empty-state">
              Project details are being prepared. In the meantime, explore the source repositories on GitHub.
            </p>
          )}
        </section>

        <section className="home-section home-focus-section" aria-labelledby="home-focus-title">
          <div className="home-section-heading home-section-heading-stacked">
            <p className="home-kicker">Beyond the build</p>
            <h2 id="home-focus-title">How I keep growing as an engineer.</h2>
          </div>

          <div className="home-focus-grid">
            {externalFocus.map((item) => (
              <article className="home-focus-card" key={item.number}>
                <span className="home-focus-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href} target="_blank" rel="noreferrer">
                  {item.label} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="home-bottom-cta" aria-labelledby="home-contact-title">
          <div>
            <p className="home-kicker">Have something interesting in mind?</p>
            <h2 id="home-contact-title">Let’s make useful things.</h2>
            <p>
              I’m interested in software engineering internships, thoughtful open-source work,
              and applied AI problems worth investigating.
            </p>
          </div>
          <Link className="home-cta-link" href="/contact">
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
    </main>
  )
}
