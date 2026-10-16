"use client"

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react"
import type { SignalStats } from "@/lib/signals"
import { useLenis } from "@/components/SmoothScrollProvider"
import { readDurationToken } from "@/components/primitives/motionTokens"
import styles from "./PortfolioExperience.module.css"

const profile = {
  name: "Sanjeev Kumar",
  role: "Software Engineer · Open Source · Applied AI",
  email: "Sanjeev.kr10111@gmail.com",
  github: "https://github.com/knockknock10",
  linkedin: "https://www.linkedin.com/in/-sanjeev-kr",
  leetcode: "https://leetcode.com/u/knockknock10/",
}

const skillGroups = {
  "Languages": ["Go", "Java", "C", "C++", "JavaScript", "Python", "SQL"],
  "Frontend": ["React", "Vite", "HTML", "CSS", "Tailwind CSS", "Framer Motion"],
  "Backend & APIs": ["Node.js", "Express", "Gin", "REST APIs", "JWT", "OAuth 2.0"],
  "Data & infrastructure": ["PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS", "GitHub Actions", "CI/CD"],
  "AI & research": ["PyTorch", "Hugging Face Transformers", "HuBERT", "Audio ML", "STFT", "SHA-256"],
  "Quality & workflow": ["Git", "Linux", "Jest", "Vitest", "Node test runner", "Code review"],
} as const

const skillCategories = Object.keys(skillGroups) as Array<keyof typeof skillGroups>

type SkillDestination =
  | { kind: "project"; projectName: string }
  | { kind: "section"; sectionId: string }

const skillDestinations: Record<string, SkillDestination> = {
  Go: { kind: "project", projectName: "Aevor Platform" },
  Java: { kind: "section", sectionId: "signals" },
  C: { kind: "section", sectionId: "signals" },
  "C++": { kind: "section", sectionId: "signals" },
  JavaScript: { kind: "project", projectName: "NovaFest" },
  Python: { kind: "section", sectionId: "research" },
  SQL: { kind: "project", projectName: "Aevor Platform" },
  React: { kind: "project", projectName: "CommitHub" },
  Vite: { kind: "project", projectName: "Aevor Frontend" },
  HTML: { kind: "project", projectName: "NovaFest" },
  CSS: { kind: "project", projectName: "NovaFest" },
  "Tailwind CSS": { kind: "project", projectName: "NovaFest" },
  "Framer Motion": { kind: "section", sectionId: "identity" },
  "Node.js": { kind: "project", projectName: "Wandera" },
  Express: { kind: "project", projectName: "Wandera" },
  Gin: { kind: "project", projectName: "Aevor Platform" },
  "REST APIs": { kind: "project", projectName: "Aevor Platform" },
  JWT: { kind: "project", projectName: "CommitHub" },
  "OAuth 2.0": { kind: "project", projectName: "Aevor Platform" },
  PostgreSQL: { kind: "project", projectName: "Aevor Platform" },
  MongoDB: { kind: "project", projectName: "CommitHub" },
  Docker: { kind: "project", projectName: "Aevor Platform" },
  Kubernetes: { kind: "section", sectionId: "open-source" },
  AWS: { kind: "section", sectionId: "open-source" },
  "GitHub Actions": { kind: "section", sectionId: "open-source" },
  "CI/CD": { kind: "section", sectionId: "open-source" },
  PyTorch: { kind: "section", sectionId: "research" },
  "Hugging Face Transformers": { kind: "section", sectionId: "research" },
  HuBERT: { kind: "section", sectionId: "research" },
  "Audio ML": { kind: "section", sectionId: "research" },
  STFT: { kind: "section", sectionId: "research" },
  "SHA-256": { kind: "section", sectionId: "research" },
  Git: { kind: "section", sectionId: "open-source" },
  Linux: { kind: "section", sectionId: "open-source" },
  Jest: { kind: "section", sectionId: "open-source" },
  Vitest: { kind: "project", projectName: "Aevor Frontend" },
  "Node test runner": { kind: "project", projectName: "CommitHub" },
  "Code review": { kind: "project", projectName: "CommitHub" },
}

type Project = {
  name: string
  label: string
  description: string
  detail: string
  repo: string
  live?: string
  frontend?: string
  image?: string
  imageAlt?: string
  stack: string[]
  status: string
  accent: string
  highlights: string[]
}

const projects: Project[] = [
  {
    name: "CommitHub",
    label: "Developer collaboration",
    description: "A Git-inspired collaboration platform built around real repository and review workflows.",
    detail: "CommitHub goes beyond CRUD screens: it models repository trees, branches, commits, pull requests, reviews, merge conflicts, branch protection and team permissions. The implementation includes a React client, Express API, MongoDB persistence, JWT authentication and real-time Socket.io events.",
    repo: "https://github.com/knockknock10/CommitHub",
    image: "https://raw.githubusercontent.com/knockknock10/CommitHub/main/commithub-frontend/src/assets/hero.png",
    imageAlt: "CommitHub frontend hero asset from its source repository",
    live: "https://knockknock10.github.io/CommitHub/",
    frontend: "https://github.com/knockknock10/CommitHub/tree/main/commithub-frontend",
    stack: ["React 19", "React Router", "Vite", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Docker"],
    status: "In development",
    accent: "violet",
    highlights: ["Branch-aware repository workflows", "Pull requests, reviews and merge conflict handling", "Role-based authorization and real-time updates", "557 tests documented in the repository README"],
  },
  {
    name: "Wandera",
    label: "Full-stack web application",
    description: "A travel-stay listing platform for discovering places, browsing photos and sharing reviews.",
    detail: "Wandera is a server-rendered MVC application with user authentication, searchable property listings, Cloudinary image uploads, map views and review permissions enforced on the server.",
    repo: "https://github.com/knockknock10/Wandera",
    live: "https://wandera-bncl.onrender.com",
    image: "https://raw.githubusercontent.com/knockknock10/Wandera/main/public/images/project-air-preview.jpg",
    imageAlt: "Wandera listing-site preview from its repository README",
    stack: ["Node.js", "Express 5", "MongoDB", "Mongoose", "EJS", "Passport", "Cloudinary", "Google Maps", "Bootstrap"],
    status: "Deployed",
    accent: "coral",
    highlights: ["Listing search by title, location and country", "Create, edit and delete listings with ownership checks", "Cloud image uploads and star-rated reviews", "Responsive Bootstrap UI"],
  },
  {
    name: "Aevor Platform",
    label: "Developer tooling · Platform",
    description: "The core API foundation for a review-first developer platform, built around secure GitHub-connected workflows.",
    detail: "The platform repository currently contains a Go API service, GitHub OAuth 2.0 with PKCE, JWT-backed sessions, user endpoints and a Docker Compose PostgreSQL setup. The intended workflow keeps code publication behind an explicit human review gate.",
    repo: "https://github.com/Aevor/platform",
    frontend: "https://github.com/Aevor/Frontend",
    stack: ["Go", "Gin", "GORM", "PostgreSQL", "GitHub OAuth 2.0", "PKCE", "JWT", "Docker"],
    status: "In development",
    accent: "blue",
    highlights: ["GitHub OAuth login and callback flow", "Authenticated current-user endpoint", "Containerized local PostgreSQL setup", "Frontend maintained in a separate repository"],
  },
  {
    name: "Aevor Frontend",
    label: "Frontend engineering",
    description: "The separate web interface repository for the Aevor developer-tooling platform.",
    detail: "This repository is a Vite-powered React application using React Router, with linting and Vitest configured. It is presented separately so the frontend codebase and the Go API can each be explored directly.",
    repo: "https://github.com/Aevor/Frontend",
    image: "https://raw.githubusercontent.com/Aevor/Frontend/main/src/assets/hero.png",
    imageAlt: "Aevor frontend hero asset from its source repository",
    stack: ["React", "React Router", "Vite", "Vitest", "Testing Library", "Oxlint"],
    status: "In development",
    accent: "mint",
    highlights: ["Standalone frontend repository", "Vite development and production build scripts", "Vitest and Testing Library dependencies", "Separate from the Go API service"],
  },
  {
    name: "ConvergenceGuard",
    label: "Distributed systems · Exploration",
    description: "An early-stage microservices scaffold organized around inventory, order and payment service boundaries.",
    detail: "The public repository currently contains service-directory placeholders for inventory, order and payment. This is an early-stage structure, not a finished or production-ready system; the card intentionally reflects the current repository state.",
    repo: "https://github.com/knockknock10/ConvergenceGuard",
    stack: ["Microservice boundaries", "Inventory", "Orders", "Payments"],
    status: "Early stage",
    accent: "amber",
    highlights: ["Explicit service boundaries", "Inventory, order and payment domains", "Foundation for future integration and consistency work", "No completed runtime capabilities claimed"],
  },
  {
    name: "NovaFest",
    label: "Full-stack commerce",
    description: "An e-commerce platform with a React frontend and a Node/Express backend.",
    detail: "NovaFest separates its frontend and backend folders within one repository. The README documents a Vite + React + Tailwind client and a Node.js, Express and MongoDB backend. The landing-page preview is taken from the project's own screenshot asset.",
    repo: "https://github.com/knockknock10/NOVAFEST",
    live: "https://novanest-1.netlify.app/",
    frontend: "https://github.com/knockknock10/NOVAFEST/tree/main/ecommerce-frontend",
    image: "https://raw.githubusercontent.com/knockknock10/NOVAFEST/main/screenshot/landing.png",
    imageAlt: "NovaFest landing-page screenshot stored in the project repository",
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JavaScript"],
    status: "Deployed",
    accent: "pink",
    highlights: ["Separate ecommerce-frontend and ecommerce-backend folders", "Vite + React client", "Node/Express API and MongoDB", "Live Netlify deployment"],
  },
]

const organizations = [
  {
    name: "Kestra",
    handle: "kestra-io",
    summary: "Workflow orchestration integrations",
    contribution: "Plugin work across Snyk, Databricks, Microsoft Fabric and other integrations—working through tests, docs, build feedback and review iterations.",
    repos: ["plugin-snyk", "plugin-databricks", "plugin-microsoft-fabric", "plugin-neo4j"],
    url: "https://github.com/kestra-io",
    workUrl: "https://github.com/knockknock10?tab=repositories",
    logo: "https://github.com/kestra-io.png",
    pullRequests: [
      { label: "plugin-databricks #290 · DBFS trigger", status: "Merged", url: "https://github.com/kestra-io/plugin-databricks/pull/290" },
      { label: "plugin-snyk #27 · issue polling trigger", status: "Open", url: "https://github.com/kestra-io/plugin-snyk/pull/27" },
      { label: "Microsoft Fabric #39 · dataset refresh", status: "Open", url: "https://github.com/kestra-io/plugin-microsoft-fabric/pull/39" },
      { label: "Terraform provider #308 · list import", status: "Merged", url: "https://github.com/kestra-io/terraform-provider-kestra/pull/308" },
    ],
  },
  {
    name: "Apache Software Foundation",
    handle: "apache",
    summary: "Cloud-native integration · Camel K",
    contribution: "Worked in Apache Camel K on network-policy-related engineering, test setup and Kubernetes/Calico validation.",
    repos: ["camel-k"],
    url: "https://github.com/apache/camel-k",
    workUrl: "https://github.com/knockknock10/camel-k",
    logo: "https://github.com/apache.png",
    pullRequests: [
      { label: "Camel K #6866 · NetworkPolicy cleanup", status: "Merged", url: "https://github.com/apache/camel-k/pull/6866" },
    ],
  },
  {
    name: "Wanaku",
    handle: "wanaku-ai",
    summary: "Open-source developer infrastructure",
    contribution: "Contributed test-focused improvements to the Wanaku project, with an emphasis on making behavior easier to validate.",
    repos: ["wanaku-tests"],
    url: "https://github.com/wanaku-ai",
    workUrl: "https://github.com/knockknock10/wanaku-tests",
    logo: "https://github.com/wanaku-ai.png",
    pullRequests: [
      { label: "wanaku-tests #245 · policy lifecycle", status: "Merged", url: "https://github.com/wanaku-ai/wanaku-tests/pull/245" },
    ],
  },
  {
    name: "Podiom",
    handle: "podiom",
    summary: "Open-source application",
    contribution: "Contributed test coverage and reliability-focused improvements to the project.",
    repos: ["Podiom"],
    url: "https://github.com/Podiom",
    workUrl: "https://github.com/knockknock10/Podiom",
    logo: "https://github.com/Podiom.png",
    pullRequests: [
      { label: "Podiom #335 · native activity tests", status: "Merged", url: "https://github.com/Podiom/Podiom/pull/335" },
    ],
  },
  {
    name: "Aevor",
    handle: "Aevor",
    summary: "Developer tooling · Platform and AI",
    contribution: "Building a multi-repository developer-tooling platform, with separate platform, frontend, AI, infrastructure and documentation repositories.",
    repos: ["platform", "Frontend", "ai", "infra", "docs"],
    url: "https://github.com/Aevor",
    workUrl: "https://github.com/Aevor/platform",
    logo: "https://avatars.githubusercontent.com/u/291477028?v=4",
    pullRequests: [
      { label: "platform #105 · pull-request handlers", status: "Merged", url: "https://github.com/Aevor/platform/pull/105" },
      { label: "platform #114 · AI limit package", status: "Merged", url: "https://github.com/Aevor/platform/pull/114" },
    ],
  },
  {
    name: "OpenNSW",
    handle: "OpenNSW",
    summary: "Database and integration testing",
    contribution: "Working on test-focused patches in OpenNSW/core around issue #254. The linked pull requests remain open and are presented as under review, not as merged work.",
    repos: ["core"],
    url: "https://github.com/OpenNSW",
    workUrl: "https://github.com/OpenNSW/core",
    logo: "https://avatars.githubusercontent.com/u/255828504?v=4",
    pullRequests: [
      { label: "core #263 · integration test work", status: "Open", url: "https://github.com/OpenNSW/core/pull/263" },
      { label: "core #265 · database test fix", status: "Open", url: "https://github.com/OpenNSW/core/pull/265" },
    ],
  },
  {
    name: "Ansvisor",
    handle: "ansvisor",
    summary: "AI and developer tooling",
    contribution: "Contributed issue-driven implementation work to the upstream codebase. The highlighted agent-active-brand change was merged; the linked PR provides the review and implementation record.",
    repos: ["ansvisor"],
    url: "https://github.com/ansvisor",
    workUrl: "https://github.com/ansvisor/ansvisor",
    logo: "https://avatars.githubusercontent.com/u/274837157?v=4",
    pullRequests: [
      { label: "ansvisor #970 · agent-active-brand", status: "Merged", url: "https://github.com/ansvisor/ansvisor/pull/970" },
    ],
  },
]

const skillLogos: Record<string, string> = {
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Framer Motion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  Gin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg",
  "OAuth 2.0": "https://cdn.simpleicons.org/openid/6C7A89",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  PyTorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  "Hugging Face Transformers": "https://cdn.simpleicons.org/huggingface/FFD21E",
  HuBERT: "https://cdn.simpleicons.org/huggingface/FFD21E",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  Jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  Vitest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitest/vitest-original.svg",
  "Node test runner": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Code review": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
}

type ProfileIdCardProps = { tools: string[] | null }

export function ProfileIdCard({ tools }: ProfileIdCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [portraitAvailable, setPortraitAvailable] = useState(false)
  const reduceMotion = useReducedMotion()
  const toolCount = tools?.filter(Boolean).length ?? 0
  const tiltX = useSpring(useMotionValue(0), { stiffness: 190, damping: 24, mass: 0.55 })
  const tiltY = useSpring(useMotionValue(0), { stiffness: 190, damping: 24, mass: 0.55 })
  const portraitSrc = "/images/sanjeev-portrait.jpg"

  useEffect(() => {
    // Start with initials, then upgrade to the real photo if the file is present.
    // This avoids ever showing a broken-image glyph on the initial render.
    const image = new Image()
    image.onload = () => setPortraitAvailable(true)
    image.onerror = () => setPortraitAvailable(false)
    image.src = portraitSrc
    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [])

  const handleCardMove = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    tiltX.set((0.5 - y) * 8)
    tiltY.set((x - 0.5) * 11)
    event.currentTarget.style.setProperty("--pointer-x", Math.round(x * 100) + "%")
    event.currentTarget.style.setProperty("--pointer-y", Math.round(y * 100) + "%")
  }, [reduceMotion, tiltX, tiltY])

  const handleCardLeave = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    tiltX.set(0)
    tiltY.set(0)
    event.currentTarget.style.setProperty("--pointer-x", "62%")
    event.currentTarget.style.setProperty("--pointer-y", "35%")
  }, [tiltX, tiltY])

  return (
    <section className={styles.identitySection} id="identity" aria-labelledby="identity-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>A little about the engineer</p>
        <h2 id="identity-heading">The person behind the pull requests.</h2>
        <p>A compact engineering ID card, made to flip, with the details and tools behind the work.</p>
      </div>
      <div className={styles.identityLayout}>
        <motion.div
          className={styles.idCardStage}
          style={{ rotateX: reduceMotion ? 0 : tiltX, rotateY: reduceMotion ? 0 : tiltY }}
          onMouseMove={handleCardMove}
          onMouseLeave={handleCardLeave}
          data-tilt={!reduceMotion}
        >
          <motion.div
            className={styles.idCard}
            animate={reduceMotion ? undefined : { rotateY: flipped ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 100, damping: 19, mass: 0.72 }}
          >
            <div className={styles.idFace + " " + styles.idFront}>
              <div className={styles.idTopline}>
                <span className={styles.idBrand}><span className={styles.idDot} /> ENGINEERING PROFILE</span>
                <span className={styles.idNumber}>SK · CSE · 26</span>
              </div>
              <div className={styles.idMain}>
                <div className={styles.portrait}>
                  {portraitAvailable ? (
                    <img src={portraitSrc} alt="Portrait of Sanjeev Kumar" />
                  ) : (
                    <div className={styles.portraitPlaceholder} aria-label="Portrait photo slot">
                      <span>SK</span>
                      <small>PHOTO SLOT</small>
                    </div>
                  )}
                  <span className={styles.portraitCorner} aria-hidden="true" />
                </div>
                <div className={styles.idIdentity}>
                  <p className={styles.idLabel}>SOFTWARE ENGINEER IN THE MAKING</p>
                  <h3>{profile.name}</h3>
                  <p>Computer Science &amp; Engineering</p>
                  <p>SRM University AP · India</p>
                  <div className={styles.idStatus}><span /> Building · Learning · Contributing</div>
                </div>
              </div>
              <div className={styles.idFooter}>
                <span className={styles.idSpecialism}>BACKEND / OSS / APPLIED AI</span>
                <span className={styles.idBarcode} aria-hidden="true" />
                <button type="button" onClick={() => setFlipped(true)} aria-label="Flip profile card to see skills">Flip card <span aria-hidden="true">↗</span></button>
              </div>
            </div>
            <div className={styles.idFace + " " + styles.idBack}>
              <div className={styles.idTopline}>
                <span className={styles.idBrand}><span className={styles.idDot} /> ENGINEERING TOOLKIT</span>
                <span className={styles.idNumber}>{toolCount || "—"} TOOLS</span>
              </div>
              <div className={styles.idBackContent}>
                <p className={styles.idLabel}>HOW I BUILD</p>
                <h3>From interfaces to infrastructure.</h3>
                <p>Full-stack systems, Go services, open-source maintenance, and applied audio ML.</p>
                <div className={styles.idQuickSkills}>
                  {["Go", "React", "Node.js", "PostgreSQL", "Docker", "PyTorch"].map((item) => {
                    const logo = skillLogos[item]
                    return (
                      <span className={styles.idToolChip} key={item}>
                        <span className={styles.idToolIcon + (logo ? "" : " " + styles.skillLogoFallback)}>
                          <span>{item.slice(0, 2).toUpperCase()}</span>
                          {logo ? <img src={logo} alt="" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement?.classList.add(styles.skillLogoFallback) }} /> : null}
                        </span>
                        {item}
                      </span>
                    )
                  })}
                </div>
                <div className={styles.idQuickLinks}>
                  <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                  <a href={"mailto:" + profile.email}>Email ↗</a>
                </div>
              </div>
              <div className={styles.idFooter}>
                <span className={styles.idSpecialism}>HUMAN-REVIEWED. BUILT WITH CARE.</span>
                <span className={styles.idBarcode} aria-hidden="true" />
                <button type="button" onClick={() => setFlipped(false)} aria-label="Flip profile card to the front">Front <span aria-hidden="true">↗</span></button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div className={styles.identityAside}>
          <p className={styles.identityQuote}>“I learn fastest by building something real, tracing the edge cases, and improving it with feedback.”</p>
          <p className={styles.identityBio}>Third-year B.Tech CSE student focused on backend engineering, developer tooling, open source, and applied AI research.</p>
          <div className={styles.identityLinks}>
            <a href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span><span>Projects &amp; contributions ↗</span></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><span>Connect professionally ↗</span></a>
            <a href={"mailto:" + profile.email}><span>Email</span><span>{profile.email} ↗</span></a>
          </div>
          <p className={styles.idCardHint}><span aria-hidden="true">✦</span> Move your cursor over the ID to tilt it. Flip it to reveal the toolkit.</p>
        </div>
      </div>
    </section>
  )
}

export function FeaturedProjects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const isOpen = selected !== null
  const selectedIndex = selected ? projects.findIndex((project) => project.name === selected.name) : -1
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const close = useCallback(() => setSelected(null), [])
  const openProject = useCallback((project: Project) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelected(project)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    const focusFrame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('[role="dialog"] button')?.focus()
    })

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== "Tab") return
      const dialog = document.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]')
      const focusable = Array.from(
        dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      )
      if (!focusable.length) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && (document.activeElement === first || !dialog?.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus({ preventScroll: true })
    }
  }, [isOpen, close])

  const changeProject = useCallback((direction: -1 | 1) => {
    if (!selected) return
    const currentIndex = projects.findIndex((project) => project.name === selected.name)
    const nextIndex = (currentIndex + direction + projects.length) % projects.length
    const nextProject = projects[nextIndex]
    const nextCard = Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-project-card]"),
    ).find((item) => item.dataset.projectCard === nextProject.name)
    if (nextCard) returnFocusRef.current = nextCard
    setSelected(nextProject)
  }, [selected])

  useEffect(() => {
    const onSkillProjectRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ projectName?: string }>).detail
      const project = projects.find((item) => item.name === detail?.projectName)
      if (!project) return

      // Finish the smooth scroll before opening the drawer so the visitor returns to the project, not the skills section.
      const workSection = document.getElementById("work")
      const card = Array.from(
        document.querySelectorAll<HTMLButtonElement>("[data-project-card]"),
      ).find((item) => item.dataset.projectCard === project.name)
      returnFocusRef.current = card ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
      const openDrawer = () => setSelected(project)

      if (workSection && lenis) {
        const scrollMargin = Number.parseFloat(window.getComputedStyle(workSection).scrollMarginTop) || 0
        lenis.scrollTo(workSection, {
          offset: -scrollMargin,
          duration: reduceMotion ? 0 : readDurationToken("--duration-base"),
          immediate: reduceMotion === true,
          force: true,
          onComplete: openDrawer,
        })
      } else {
        workSection?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        })
        openDrawer()
      }
    }

    window.addEventListener("portfolio:open-project", onSkillProjectRequest)
    return () => window.removeEventListener("portfolio:open-project", onSkillProjectRequest)
  }, [lenis, reduceMotion])

  return (
    <section className={styles.projectsSection} id="work" aria-labelledby="featured-projects-heading">
      <div className={styles.sectionIntro + " " + styles.projectsIntro}>
        <div>
          <p className={styles.eyebrow}>Selected work · Built from the source</p>
          <h2 id="featured-projects-heading">Six repositories. Six different engineering problems.</h2>
          <p>Open a project for its purpose, implementation notes, stack and direct source links. Frontend repositories and live demos are linked where available.</p>
        </div>
        <a className={styles.textLink} href="https://github.com/knockknock10?tab=repositories" target="_blank" rel="noreferrer">All repositories <span>↗</span></a>
      </div>
      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <motion.button
            type="button"
            key={project.name}
            className={styles.projectCard}
            data-accent={project.accent}
            data-project-card={project.name}
            onClick={() => openProject(project)}
            whileHover={reduceMotion ? undefined : { y: -5 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            aria-haspopup="dialog"
            aria-label={"Open project details for " + project.name}
          >
            <span className={styles.projectArt}>
              {project.image ? <img src={project.image} alt={project.imageAlt ?? ""} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none" }} /> : null}
              <span className={styles.projectArtOverlay} />
              <span className={styles.projectIndex}>0{index + 1} / 06</span>
              <span className={styles.projectArtLabel}>{project.label}</span>
              <span className={styles.projectArtName}>{project.name}</span>
              <span className={styles.projectOpen} aria-hidden="true">↗</span>
            </span>
            <span className={styles.projectCardBody}>
              <span className={styles.projectStatus}>{project.status}</span>
              <span className={styles.projectDescription}>{project.description}</span>
              <span className={styles.projectStack}>{project.stack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</span>
              <span className={styles.projectCardAction}>Explore project <span aria-hidden="true">→</span></span>
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div className={styles.projectOverlay} role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
            <motion.aside
              className={styles.projectDrawer}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-drawer-title"
              aria-describedby="project-drawer-description"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className={styles.drawerTop}><span>PROJECT NOTES / {selected.status.toUpperCase()}</span><button type="button" onClick={close} aria-label="Close project details">×</button></div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected.name}
                  className={styles.drawerContent}
                  initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                >
                  <p className={styles.eyebrow}>{selected.label}</p>
                  <h3 id="project-drawer-title">{selected.name}</h3>
                  <p className={styles.drawerDescription} id="project-drawer-description">{selected.detail}</p>
                  <div className={styles.drawerHighlights}>
                    <h4>What’s inside</h4>
                    <ul>{selected.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div className={styles.drawerStack}><h4>Technology</h4><div>{selected.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
                  <div className={styles.drawerActions}>
                    <a href={selected.repo} target="_blank" rel="noreferrer">Open repository <span>↗</span></a>
                    {selected.frontend ? <a href={selected.frontend} target="_blank" rel="noreferrer">Explore frontend <span>↗</span></a> : null}
                    {selected.live ? <a href={selected.live} target="_blank" rel="noreferrer">Live demo <span>↗</span></a> : null}
                  </div>
                  <p className={styles.drawerFootnote}>Details are based on the public repository and README; early-stage work is labelled honestly.</p>
                </motion.div>
              </AnimatePresence>
              <nav className={styles.drawerPager} aria-label="Browse selected projects">
                <button type="button" onClick={() => changeProject(-1)} aria-label={"Previous project: " + projects[(selectedIndex - 1 + projects.length) % projects.length].name}>
                  <span aria-hidden="true">←</span>
                  <span><small>PREVIOUS</small><strong>{projects[(selectedIndex - 1 + projects.length) % projects.length].name}</strong></span>
                </button>
                <span className={styles.drawerPagerPosition}>{selectedIndex + 1} / {projects.length}</span>
                <button type="button" onClick={() => changeProject(1)} aria-label={"Next project: " + projects[(selectedIndex + 1) % projects.length].name}>
                  <span><small>NEXT</small><strong>{projects[(selectedIndex + 1) % projects.length].name}</strong></span>
                  <span aria-hidden="true">→</span>
                </button>
              </nav>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export function OpenSourceOrganizations() {
  return (
    <section className={styles.orgSection} id="open-source" aria-labelledby="org-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Beyond my own repositories</p>
        <h2 id="org-heading">Making upstream software a little better.</h2>
        <p>Open-source work means reading unfamiliar code, testing assumptions, responding to review, and improving software with maintainers—not just opening a pull request.</p>
      </div>
      <div className={styles.orgGrid}>
        {organizations.map((org, index) => (
          <article className={styles.orgCard} key={org.handle}>
            <div className={styles.orgCardTop}>
              <div className={styles.orgLogo}><span>{org.name.slice(0, 2).toUpperCase()}</span><img src={org.logo} alt={org.name + " logo"} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement?.classList.add(styles.orgLogoFallback) }} /></div>
              <div className={styles.orgIdentity}><span>0{index + 1} / CONTRIBUTION</span><h3>{org.name}</h3><p>@{org.handle}</p></div>
              <a className={styles.orgArrow} href={org.url} target="_blank" rel="noreferrer" aria-label={"Visit " + org.name}>↗</a>
            </div>
            <p className={styles.orgSummary}>{org.summary}</p>
            <p className={styles.orgContribution}>{org.contribution}</p>
            <div className={styles.orgRepos}>{org.repos.map((repo) => <span key={repo}>{repo}</span>)}</div>
            <div className={styles.orgProofLinks} aria-label={org.name + " verified pull requests"}>
              {org.pullRequests.map((item) => (
                <a className={styles.orgProofLink} href={item.url} target="_blank" rel="noreferrer" key={item.url}>
                  <span className={styles.orgProofStatus} data-status={item.status.toLowerCase()}>{item.status}</span>
                  <span>{item.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <a className={styles.orgLink} href={org.url} target="_blank" rel="noreferrer">Explore organization <span>↗</span></a>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SkillsExplorer() {
  const categories = skillCategories
  const [active, setActive] = useState<keyof typeof skillGroups>("Languages")
  const [showAll, setShowAll] = useState(false)
  const current = skillGroups[active]
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()
  const allSkills = useMemo(() => categories.flatMap((category) => skillGroups[category]), [categories])
  const exploreSkill = useCallback((skill: string) => {
    const destination = skillDestinations[skill]
    if (destination.kind === "project") {
      window.dispatchEvent(
        new CustomEvent("portfolio:open-project", {
          detail: { projectName: destination.projectName, skill },
        }),
      )
      return
    }

    const target = document.getElementById(destination.sectionId)
    if (target) {
      const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
      if (lenis) {
        lenis.scrollTo(target, {
          offset: -scrollMargin,
          duration: reduceMotion ? 0 : readDurationToken("--duration-base"),
          immediate: reduceMotion === true,
          force: true,
        })
      } else {
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        })
      }
      return
    }
    window.location.assign("/#" + destination.sectionId)
  }, [lenis, reduceMotion])

  return (
    <section className={styles.skillsSection} id="skills" aria-labelledby="skills-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Tools I reach for</p>
        <h2 id="skills-heading">A toolkit shaped by the work.</h2>
        <p>Choose a layer, then select any technology to open the most relevant project drawer or jump to the related research/open-source proof. You stay in one connected page flow.</p>
      </div>
      <div className={styles.skillsPanel}>
        <div className={styles.skillTabs} role="tablist" aria-label="Technology categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              id={"skill-tab-" + categories.indexOf(category)}
              aria-controls="skill-panel"
              aria-selected={active === category}
              className={active === category ? styles.skillTabActive : styles.skillTab}
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={styles.skillContent}
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={"skill-tab-" + categories.indexOf(active)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.skillCategoryTitle}><span>0{categories.indexOf(active) + 1}</span><h3>{active}</h3></div>
            <div className={styles.skillChips}>
              {current.map((skill, index) => (
                <motion.button
                  key={skill}
                  type="button"
                  className={styles.skillChip}
                  aria-label={"Explore " + skill + " in related work"}
                  title={"Open related work for " + skill}
                  onClick={() => exploreSkill(skill)}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.035 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {skill}<span aria-hidden="true">↗</span>
                </motion.button>
              ))}
            </div>
            <p className={styles.skillContext}>{active === "AI & research" ? "Select a model or signal-processing tool to jump to the SemBind-Audio research story." : active === "Data & infrastructure" ? "Select a database or container tool to open the project where it appears, or jump to upstream infrastructure work." : active === "Backend & APIs" ? "Select an API technology to open the relevant service or backend project." : active === "Frontend" ? "Select a UI tool to open the frontend project that uses it." : active === "Quality & workflow" ? "Select a testing or collaboration tool to open a related repository or contribution." : "Select a language to open a related project or the problem-solving activity panel."}</p>
          </motion.div>
        </AnimatePresence>
        <div className={styles.skillsFooter}><span>{allSkills.length} tools across {categories.length} categories</span><button type="button" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>{showAll ? "Show selected layer −" : "View complete toolkit +"}</button></div>
        <AnimatePresence>
          {showAll ? (
            <motion.div className={styles.allSkills} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <div>
                {categories.map((category) => (
                  <div key={category}>
                    <h4>{category}</h4>
                    <div className={styles.allSkillChips}>
                      {skillGroups[category].map((skill) => (
                        <button type="button" key={skill} onClick={() => exploreSkill(skill)}>{skill} ↗</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  )
}

type Badge = { displayName?: string; name?: string; icon?: string; creationDate?: string | number }

export function ActivityShowcase({ data }: { data: SignalStats }) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [badgeStatus, setBadgeStatus] = useState<"loading" | "loaded" | "fallback">("loading")
  const [expandedBadges, setExpandedBadges] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 18000)
    fetch("https://alfa-leetcode-api.onrender.com/knockknock10/badges", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Badge service unavailable")))
      .then((payload: { badges?: Badge[]; data?: { badges?: Badge[] } }) => {
        const found = Array.isArray(payload.badges) ? payload.badges : Array.isArray(payload.data?.badges) ? payload.data.badges : []
        const earned = found.filter((badge) => badge.displayName || badge.name)
        setBadges(earned)
        setBadgeStatus(earned.length ? "loaded" : "fallback")
      })
      .catch(() => setBadgeStatus("fallback"))
      .finally(() => window.clearTimeout(timeout))
    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  // Snapshot fallback from the public LeetCode badges endpoint (refreshed live above).
  // Keep the earned badges visible even while the profile API is cold or unavailable.
  const fallbackBadges: Badge[] = [
    { displayName: "Knight", icon: "https://leetcode.com/static/images/badges/knight.png" },
    { displayName: "100 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/others/100_1080_1080.png" },
    { displayName: "50 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png" },
    { displayName: "100 Days Badge 2025", icon: "https://assets.leetcode.com/static_assets/others/lg25100.png" },
    { displayName: "50 Days Badge 2025", icon: "https://assets.leetcode.com/static_assets/others/lg2550.png" },
    { displayName: "Sep LeetCoding Challenge", icon: "https://leetcode.com/static/images/badges/dcc-2026-9.png" },
    { displayName: "Jul LeetCoding Challenge", icon: "https://leetcode.com/static/images/badges/dcc-2025-7.png" },
    { displayName: "Jun LeetCoding Challenge", icon: "https://leetcode.com/static/images/badges/dcc-2025-6.png" },
  ]
  const shownBadges = badges.length ? badges : fallbackBadges
  const contributions = typeof data.github.contributionsLast365Days === "number" ? data.github.contributionsLast365Days : typeof data.github.contributionCalendar?.totalContributions === "number" ? data.github.contributionCalendar.totalContributions : null

  return (
    <section className={styles.activitySection} id="signals" aria-labelledby="activity-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Proof of practice</p>
        <h2 id="activity-heading">Consistency is built one day at a time.</h2>
        <p>Contribution history, profile achievements and problem-solving progress—each linked back to its source.</p>
      </div>
      <div className={styles.activityGrid}>
        <article className={styles.activityCard + " " + styles.githubActivity}>
          <div className={styles.activityCardHeader}><div><span className={styles.activityEyebrow}>01 / GITHUB</span><h3>Building in public</h3></div><a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">↗</a></div>
          <div className={styles.githubGraph}><img src="https://ghchart.rshah.org/6554d7/knockknock10" alt="GitHub contribution graph for knockknock10" loading="lazy" /></div>
          <div className={styles.graphCaption}><span>Contribution history</span><span>{contributions !== null ? contributions.toLocaleString() + " contributions recorded" : "Live graph from GitHub activity"}</span></div>
          <div className={styles.githubBadgeHeading}><h4>Profile trophies</h4><span>Generated from public GitHub activity</span></div>
          <a className={styles.trophyLink} href={profile.github} target="_blank" rel="noreferrer" aria-label="See GitHub achievements on profile"><img src="https://github-profile-trophy.vercel.app/?username=knockknock10&theme=flat&no-frame=true&no-bg=true&column=4&margin-w=8" alt="GitHub profile achievement trophies" loading="lazy" /></a>
          <div className={styles.activityFooter}><span>Repos · PRs · Reviews · Contributions</span><a href={profile.github} target="_blank" rel="noreferrer">Open GitHub ↗</a></div>
        </article>
        <article className={styles.activityCard + " " + styles.leetcodeActivity}>
          <div className={styles.activityCardHeader}><div><span className={styles.activityEyebrow}>02 / LEETCODE</span><h3>Problem solving</h3></div><a href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="Open LeetCode profile">↗</a></div>
          <div className={styles.leetcodeHero}><div><strong>{typeof data.leetcode.totalSolved === "number" ? data.leetcode.totalSolved : "—"}</strong><span>problems solved</span></div><div className={styles.knightBadge}><img src="https://leetcode.com/static/images/badges/knight.png" alt="LeetCode Knight contest badge" /><span>Knight</span></div></div>
          <div className={styles.difficultyRows}>
            {[["Easy", data.leetcode.easySolved, "easy"], ["Medium", data.leetcode.mediumSolved, "medium"], ["Hard", data.leetcode.hardSolved, "hard"]].map(([label, value, color]) => <div className={styles.difficultyRow} key={String(label)}><span>{String(label)}</span><div><span className={styles["difficultyFill" + String(color)]} style={{ width: (typeof value === "number" ? Math.min(100, (value / Math.max(1, typeof data.leetcode.totalSolved === "number" ? data.leetcode.totalSolved : 1)) * 100) : 0) + "%" }} /></div><strong>{typeof value === "number" ? value : "—"}</strong></div>)}
          </div>
          <div className={styles.leetcodeMiniStats}><div><span>Contest rating</span><strong>{typeof data.leetcode.contestRating === "number" ? Math.round(data.leetcode.contestRating) : "—"}</strong></div><div><span>Acceptance</span><strong>{data.leetcode.acceptanceRate !== "MISSING" ? data.leetcode.acceptanceRate : "—"}</strong></div><div><span>Global rank</span><strong>{typeof data.leetcode.profileRank === "number" ? data.leetcode.profileRank.toLocaleString() : "—"}</strong></div></div>
          <div className={styles.githubBadgeHeading}><h4>Earned badges</h4><span>{badgeStatus === "loaded" ? badges.length + " fetched from profile" : badgeStatus === "loading" ? "Checking public profile…" : "Profile-linked fallback"}</span></div>
          <div id="leetcode-badges" className={styles.leetcodeBadges}>{shownBadges.slice(0, expandedBadges ? shownBadges.length : 6).map((badge, index) => <a href={profile.leetcode} target="_blank" rel="noreferrer" className={styles.leetcodeBadge} key={(badge.displayName ?? badge.name ?? "badge") + index}>{badge.icon ? <img src={badge.icon.startsWith("http") ? badge.icon : "https://leetcode.com" + badge.icon} alt="" loading="lazy" /> : <span className={styles.badgeMonogram}>★</span>}<span>{badge.displayName ?? badge.name}</span></a>)}</div>
          {shownBadges.length > 6 ? <button className={styles.showBadges} type="button" aria-expanded={expandedBadges} aria-controls="leetcode-badges" onClick={() => setExpandedBadges((value) => !value)}>{expandedBadges ? "Show fewer badges −" : "Show all " + shownBadges.length + " badges +"}</button> : null}
          <div className={styles.activityFooter}><span>Contest · Difficulty · Earned badges</span><a href={profile.leetcode} target="_blank" rel="noreferrer">Open LeetCode ↗</a></div>
        </article>
      </div>
    </section>
  )
}

export function VisitorCounter() {
  const [counterUrl, setCounterUrl] = useState<string | null>(null)

  useEffect(() => {
    // A unique query string prevents browser/CDN caching from suppressing page-view hits.
    setCounterUrl(
      "https://hits.sh/kr-sanjeev.netlify.app.svg?label=visitors&color=6554d7&labelColor=ffffff&v=" +
        Date.now(),
    )
  }, [])

  return (
    <div className={styles.visitorLine}>
      <span className={styles.visitorSpark} />
      <span className={styles.visitorMessage}>You’re visitor number</span>
      <a className={styles.visitorBadgeLink} href="https://hits.sh/kr-sanjeev.netlify.app/" target="_blank" rel="noreferrer" aria-label="Open portfolio visit statistics">
        {counterUrl ? (
          <img src={counterUrl} alt="Total portfolio visits, updated on page visit" loading="eager" decoding="async" />
        ) : (
          <span className={styles.visitorBadgePlaceholder} aria-live="polite">counting…</span>
        )}
      </a>
      <span className={styles.visitorEnd}>INCREMENTED ON VISIT</span>
    </div>
  )
}
