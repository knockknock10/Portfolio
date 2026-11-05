import { publicUrl } from "@/lib/public-url"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"
import { BackgroundSVG } from "./BackgroundSVG"
import { CurvedLineBetween } from "./CurvedLineBetween"

type ProjectLink = { label: string; href: string; primary?: boolean }

type Project = {
  title: string
  status: string
  role?: string
  summary: string
  tags: string[]
  links: ProjectLink[]
  /** A real screenshot, when one exists. */
  image?: { src: string; alt: string; caption: string; width: number; height: number }
  /** Otherwise: a short list that explains how the project is put together. */
  steps?: { title: string; items: string[] }
}

/*
  Facts here come from lib/portfolio-data.ts and the previous Work section.
  Nothing is invented: if a project has no screenshot, it shows how it works instead.
*/
const projects: Project[] = [
  {
    title: "Aevor",
    status: "In development",
    role: "Platform architecture and engineering",
    summary:
      "A developer platform that turns a GitHub issue into a proposed, validated pull request. Every proposed change is reviewed by a person before publication.",
    tags: ["Go", "Gin", "GORM", "PostgreSQL", "React", "FastAPI", "Docker"],
    links: [
      { label: "Platform code", href: "https://github.com/Aevor/platform", primary: true },
      { label: "Frontend code", href: "https://github.com/Aevor/Frontend" },
    ],
    steps: {
      title: "How it works",
      items: [
        "Read the issue and pull in a bounded amount of repository context",
        "Propose a change as a diff a person can review",
        "Apply the approved change and validate it with the project's own toolchain",
        "Publish only after an explicit review",
      ],
    },
  },
  {
    title: "CommitHub",
    status: "In development",
    role: "Full-stack engineering",
    summary:
      "A GitHub-style collaboration platform I built to understand what happens under the interface: repositories, branches, commits, pull requests, reviews, merge conflicts and access control.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Docker"],
    links: [
      { label: "Live demo", href: "https://knockknock10.github.io/CommitHub/", primary: true },
      { label: "Code", href: "https://github.com/knockknock10/CommitHub" },
    ],
    steps: {
      title: "How it works",
      items: [
        "Model repositories, branches, commits and pull requests",
        "Enforce permissions at the business-operation boundary, with JWT authentication and roles",
        "Keep repository and review activity in sync in real time over WebSockets",
      ],
    },
  },
  {
    title: "Wandera",
    status: "Deployed",
    summary: "A travel-stay listing site where you can browse places, look through photos and read or write reviews.",
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    links: [
      { label: "Live site", href: "https://wandera-bncl.onrender.com", primary: true },
      { label: "Code", href: "https://github.com/knockknock10/Wandera" },
    ],
    image: {
      src: "/images/projects/wandera.webp",
      alt: "Wandera's listings page showing a grid of stays with photos and prices",
      caption: "The listings page",
      width: 1280,
      height: 800,
    },
  },
  {
    title: "NovaFest",
    status: "Completed",
    summary: "A full-stack web project with a React front end and a Node.js, Express and MongoDB back end.",
    tags: ["React", "Tailwind CSS", "Express", "MongoDB"],
    links: [
      { label: "Live site", href: "https://novanest-1.netlify.app/", primary: true },
      { label: "Code", href: "https://github.com/knockknock10/NOVAFEST" },
    ],
    image: {
      src: "/images/projects/novafest.webp",
      alt: "Landing page with a large hero photo of a modern house and a call-to-action",
      caption: "The landing page",
      width: 1400,
      height: 788,
    },
  },
  {
    title: "ConvergenceGuard",
    status: "Early stage",
    summary:
      "An early microservices scaffold organised around inventory, order and payment services. I'm using it to work through where service boundaries should go.",
    tags: ["Microservices", "Inventory", "Orders", "Payments"],
    links: [{ label: "Code", href: "https://github.com/knockknock10/ConvergenceGuard", primary: true }],
    steps: {
      title: "The three services",
      items: [
        "Inventory: owns stock state",
        "Orders: owns the order lifecycle",
        "Payments: owns payment state, with a coordinator proposed to tie the flow together",
      ],
    },
  },
]

export function Work({ repoCount }: { repoCount: number | null }) {
  return (
    <section className="sk-section" id="work" aria-labelledby="work-title">
      <BackgroundSVG variant="blob1" className="sk-moving-svg sk-moving-svg--projects-top" />
      <BackgroundSVG variant="blob2" className="sk-moving-svg sk-moving-svg--projects-middle" />
      <BackgroundSVG variant="blob3" className="sk-moving-svg sk-moving-svg--projects-bottom" />
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Selected work</p>
              <h2 className="sk-h2" id="work-title">
                Things I&apos;ve built
              </h2>
            </div>
            <p className="sk-lede">
              Five projects, each linked to its source code. Where there&apos;s a screenshot it&apos;s the real app;
              where there isn&apos;t, I&apos;ve described how it&apos;s put together.
            </p>
          </div>
        </Reveal>

        <div>
          {projects.map((project) => (
            <Reveal key={project.title}>
              <article className="sk-project">
                <div className="sk-project__body">
                  <h3>{project.title}</h3>
                  <div className="sk-project__meta">
                    <span className="sk-chip">{project.status}</span>
                    {project.role ? <span>{project.role}</span> : null}
                  </div>
                  <p>{project.summary}</p>
                  <ul className="sk-tags" aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <li className="sk-chip" key={tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="sk-project__links">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        className={link.primary ? "sk-btn sk-btn--solid sk-btn--small" : "sk-btn sk-btn--small"}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label} <ArrowUpRight />
                      </a>
                    ))}
                  </div>
                </div>

                {project.image ? (
                  <figure className="sk-project__visual">
                    <img
                      src={publicUrl(project.image.src)}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      loading="lazy"
                    />
                    <figcaption>{project.image.caption}</figcaption>
                  </figure>
                ) : project.steps ? (
                  <div className="sk-project__visual">
                    <div className="sk-steps">
                      <p className="sk-steps__title">{project.steps.title}</p>
                      <ol>
                        {project.steps.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="sk-note">
            {repoCount ? `There are ${repoCount} public repositories in total` : "There are more public repositories"},
            including smaller experiments and my DSA practice.{" "}
            <a
              className="sk-text-link"
              href="https://github.com/knockknock10?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              Browse them on GitHub <ArrowUpRight />
            </a>
          </p>
        </Reveal>
      </div>
      <CurvedLineBetween />
    </section>
  )
}
