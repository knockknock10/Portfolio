"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { publicUrl } from "@/lib/public-url"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons"
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
  image?: { src: string; alt: string; caption: string; width: number; height: number }
  steps?: { title: string; items: string[] }
}

const projects: Project[] = [
  {
    title: "Aevor",
    status: "In development",
    role: "Platform architecture and engineering",
    summary: "A developer platform that turns a GitHub issue into a proposed, validated pull request. Every proposed change is reviewed by a person before publication.",
    tags: ["Go", "Gin", "GORM", "PostgreSQL", "React", "FastAPI", "Docker"],
    links: [
      { label: "Platform code", href: "https://github.com/Aevor/platform", primary: true },
      { label: "Frontend code", href: "https://github.com/Aevor/Frontend" },
    ],
    steps: {
      title: "The review path",
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
    summary: "A GitHub-style collaboration platform I built to understand what happens under the interface: repositories, branches, commits, pull requests, reviews, merge conflicts and access control.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Docker"],
    links: [
      { label: "Live demo", href: "https://knockknock10.github.io/CommitHub/", primary: true },
      { label: "Code", href: "https://github.com/knockknock10/CommitHub" },
    ],
    steps: {
      title: "The collaboration loop",
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
    summary: "An early microservices scaffold organised around inventory, order and payment services. I'm using it to work through where service boundaries should go.",
    tags: ["Microservices", "Inventory", "Orders", "Payments"],
    links: [{ label: "Code", href: "https://github.com/knockknock10/ConvergenceGuard", primary: true }],
    steps: {
      title: "The service boundaries",
      items: [
        "Inventory owns stock state",
        "Orders owns the order lifecycle",
        "Payments owns payment state; a coordinator is proposed to tie the flow together",
      ],
    },
  },
]

function ProjectVisual({ project }: { project: Project }) {
  const [activeStep, setActiveStep] = useState(0)

  if (project.image) {
    return (
      <figure className="gl-workbench__image">
        <img src={publicUrl(project.image.src)} alt={project.image.alt} width={project.image.width} height={project.image.height} loading="lazy" />
        <figcaption>{project.image.caption}</figcaption>
      </figure>
    )
  }

  const items = project.steps?.items ?? []
  const selected = items[Math.min(activeStep, Math.max(items.length - 1, 0))]

  return (
    <div className="gl-workbench__flow">
      <div className="gl-workbench__flow-head">
        <span>Explore the flow</span>
        <small>{project.steps?.title ?? "Project structure"}</small>
      </div>
      <div className="gl-workbench__flow-list" role="group" aria-label={project.steps?.title ?? "Project steps"}>
        {items.map((item, index) => (
          <button type="button" key={item} className="gl-workbench__flow-step" data-active={index === activeStep}
            aria-pressed={index === activeStep} onClick={() => setActiveStep(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{item.split(/[,:]/)[0]}</span>
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={selected} className="gl-workbench__flow-detail"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.22 }} aria-live="polite">
          {selected}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export function Work({ repoCount }: { repoCount: number | null }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const active = projects[activeIndex]
  const previous = () => setActiveIndex((index) => (index - 1 + projects.length) % projects.length)
  const next = () => setActiveIndex((index) => (index + 1) % projects.length)

  return (
    <section className="sk-section gl-work-section" id="work" aria-labelledby="work-title">
      <BackgroundSVG variant="blob1" className="sk-moving-svg sk-moving-svg--projects-top" />
      <BackgroundSVG variant="blob2" className="sk-moving-svg sk-moving-svg--projects-middle" />
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Selected work · choose a project</p>
              <h2 className="sk-h2" id="work-title">Things I&apos;ve built</h2>
            </div>
            <p className="sk-lede">
              Explore the projects one at a time. Each selection changes the workbench: what it does, how it is put
              together, and where to try or inspect the code.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="gl-workbench">
            <div className="gl-workbench__rail">
              <div className="gl-workbench__rail-top">
                <span>Project index</span>
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
              </div>
              <div className="gl-workbench__project-list" role="tablist" aria-label="Choose a project" aria-orientation="vertical">
                {projects.map((project, index) => (
                  <button type="button" role="tab" id={`work-tab-${index}`} aria-controls="work-stage"
                    aria-selected={activeIndex === index} className="gl-workbench__project-tab" key={project.title}
                    onClick={() => setActiveIndex(index)}>
                    <span className="gl-workbench__project-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="gl-workbench__project-name">{project.title}</span>
                    <span className="gl-workbench__project-status">{project.status}</span>
                    <ArrowUpRight />
                  </button>
                ))}
              </div>
              <p className="gl-workbench__hint">Select a project to inspect its details</p>
            </div>

            <div className="gl-workbench__stage" id="work-stage" role="tabpanel" aria-labelledby={`work-tab-${activeIndex}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.article className="gl-workbench__project" key={active.title} data-tilt
                  initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="gl-workbench__project-top">
                    <span className="gl-workbench__eyebrow">Featured build</span>
                    <span className="gl-workbench__status">{active.status}</span>
                  </div>
                  <div className="gl-workbench__project-copy">
                    <h3>{active.title}</h3>
                    {active.role ? <p className="gl-workbench__role">{active.role}</p> : null}
                    <p className="gl-workbench__summary">{active.summary}</p>
                  </div>
                  <ProjectVisual key={active.title} project={active} />
                  <ul className="gl-workbench__tags" aria-label={`${active.title} technologies`}>
                    {active.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <div className="gl-workbench__footer">
                    <div className="gl-workbench__links">
                      {active.links.map((link) => (
                        <a key={link.href} className={link.primary ? "sk-btn sk-btn--solid sk-btn--small" : "sk-btn sk-btn--small"}
                          href={link.href} target="_blank" rel="noreferrer">
                          {link.label} <ArrowUpRight />
                        </a>
                      ))}
                    </div>
                    <div className="gl-workbench__arrows" aria-label="Project navigation">
                      <button type="button" onClick={previous} aria-label="Previous project"><ArrowLeft /></button>
                      <button type="button" onClick={next} aria-label="Next project"><ArrowRight /></button>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="sk-note gl-workbench__note">
            {repoCount ? `There are ${repoCount} public repositories in total` : "There are more public repositories"},
            including smaller experiments and my DSA practice.{" "}
            <a className="sk-text-link" href="https://github.com/knockknock10?tab=repositories" target="_blank" rel="noreferrer">
              Browse them on GitHub <ArrowUpRight />
            </a>
          </p>
        </Reveal>
      </div>
      <CurvedLineBetween />
    </section>
  )
}
