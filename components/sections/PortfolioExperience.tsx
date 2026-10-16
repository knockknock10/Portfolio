"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import type { SignalStats } from "@/lib/signals"
import { useLenis } from "@/components/SmoothScrollProvider"
import { readDurationToken } from "@/components/primitives/motionTokens"
import styles from "./PortfolioExperience.module.css"

const profile = {
  name: "Sanjeev Kumar",
  role: "Software Engineer · Open Source · Applied AI",
  email: "Sanjeev.kr10111@gmail.com",
  github: "https://github.com/knockknock10",
  linkedin: "https://www.linkedin.com/in/sanjeev-kumar-ba567133a",
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

function SkillLogo({ name }: { name: string }) {
  const [failed, setFailed] = useState(false)
  const source = skillLogos[name]

  return (
    <span className={styles.skillTechIcon} aria-hidden="true">
      <span className={styles.skillTechFallback}>{name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()}</span>
      {source && !failed ? (
        <img
          src={source}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : null}
    </span>
  )
}


type ProfilePortraitProps = { tools: string[] | null }

export function ProfilePortrait({ tools }: ProfilePortraitProps) {
  const [portraitAvailable, setPortraitAvailable] = useState(false)
  const reduceMotion = useReducedMotion()
  const portraitSrc = "/images/sanjeev-portrait.png"
  const portraitTools = (tools ?? ["Go", "React", "Docker", "PostgreSQL", "PyTorch", "Kubernetes"]).filter(Boolean).slice(0, 7)

  useEffect(() => {
    const image = new Image()
    image.onload = () => setPortraitAvailable(true)
    image.onerror = () => setPortraitAvailable(false)
    image.src = portraitSrc
    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [])

  return (
    <section className={styles.identitySection} id="identity" aria-labelledby="identity-heading" tabIndex={-1}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>A little about the engineer</p>
        <h2 id="identity-heading">The person behind the pull requests.</h2>
        <p>Engineering is the work. The person, the curiosity and the research behind it deserve the frame.</p>
      </div>

      <div className={styles.portraitProfileLayout}>
        <motion.div
          className={styles.portraitFeatureFrame}
          whileHover={reduceMotion ? undefined : { y: -4, scale: 1.008 }}
          transition={{ type: "spring", stiffness: 220, damping: 23 }}
        >
          <div className={styles.portraitFeaturePhoto}>
            {portraitAvailable ? (
              <img src={portraitSrc} alt="Portrait of Sanjeev Kumar" loading="eager" decoding="async" />
            ) : (
              <div className={styles.portraitPlaceholder} aria-label="Portrait image will appear when your photo is added">
                <span>SK</span>
                <small>YOUR PORTRAIT</small>
              </div>
            )}
            <div className={styles.portraitImageWash} aria-hidden="true" />
            <div className={styles.portraitPhotoStamp}>
              <span className={styles.portraitAvailabilityDot} />
              <span>CS ENGINEERING · INDIA</span>
            </div>
            <span className={styles.portraitPhotoIndex}>SK / 001</span>
          </div>
          <div className={styles.portraitFeatureCaption}>
            <span>BUILD WITH CURIOSITY</span>
            <span>BACKEND · OSS · APPLIED AI</span>
          </div>
        </motion.div>

        <div className={styles.portraitProfileCopy}>
          <p className={styles.portraitKicker}>SOFTWARE ENGINEERING · OPEN SOURCE · APPLIED AI</p>
          <h3>Sanjeev Kumar</h3>
          <p className={styles.portraitLead}>I build systems, contribute to upstream projects and investigate how machine learning can solve concrete engineering problems.</p>
          <p className={styles.portraitBio}>Third-year B.Tech Computer Science student at SRM University AP, focused on backend engineering, developer tooling, open-source collaboration and applied audio research.</p>

          <div className={styles.portraitLinks} aria-label="Connect with Sanjeev">
            <a href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span><span>Code & contributions ↗</span></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><span>Connect professionally ↗</span></a>
            <a href={"mailto:" + profile.email}><span>Email</span><span>{profile.email} ↗</span></a>
          </div>

          <div className={styles.portraitToolkit}>
            <div className={styles.portraitToolkitHeader}>
              <span>TOOLS I WORK WITH</span>
              <span>{portraitTools.length} highlights</span>
            </div>
            <div className={styles.portraitToolChips}>
              {portraitTools.map((tool) => (
                <span className={styles.portraitToolChip} key={tool}>
                  <SkillLogo name={tool} />
                  <span>{tool}</span>
                </span>
              ))}
            </div>
            <a className={styles.portraitToolkitLink} href="#skills">Explore the full toolkit <span aria-hidden="true">↓</span></a>
          </div>
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
    <section className={styles.projectsSection} id="work" aria-labelledby="featured-projects-heading" tabIndex={-1}>
      <div className={styles.sectionIntro + " " + styles.projectsIntro}>
        <div>
          <p className={styles.eyebrow}>Selected work · Built from the source</p>
          <h2 id="featured-projects-heading">A few things I’ve been building.</h2>
          <p>Selected builds across developer tooling, applied AI and full-stack systems. Open a project to explore its implementation, technology choices, frontend and source.</p>
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
              <span className={styles.projectIndex}>PROJECT / 0{index + 1}</span>
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

type ContributionFilter = "all" | "merged" | "open"

export function OpenSourceOrganizations() {
  const [contributionFilter, setContributionFilter] = useState<ContributionFilter>("all")
  const [showAllContributions, setShowAllContributions] = useState(false)
  const [orgCarouselIndex, setOrgCarouselIndex] = useState(0)
  const [orgCanScrollNext, setOrgCanScrollNext] = useState(true)
  const orgCarouselRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const contributionGroups = useMemo(
    () => organizations.map((org) => org.pullRequests.map((item) => ({
      ...item,
      organization: org.name,
      handle: org.handle,
      organizationUrl: org.url,
    }))),
    [],
  )

  // Interleave upstreams so the first items represent different organizations,
  // rather than letting the organization with the largest PR history dominate.
  const allContributions = useMemo(() => {
    const rows: Array<{
      label: string
      status: string
      url: string
      organization: string
      handle: string
      organizationUrl: string
    }> = []
    const longestGroup = Math.max(0, ...contributionGroups.map((group) => group.length))
    for (let index = 0; index < longestGroup; index += 1) {
      for (const group of contributionGroups) {
        if (group[index]) rows.push(group[index])
      }
    }
    return rows
  }, [contributionGroups])

  const filteredContributions = useMemo(
    () => allContributions.filter((item) =>
      contributionFilter === "all" || item.status.toLowerCase() === contributionFilter,
    ),
    [allContributions, contributionFilter],
  )
  const visibleContributions = showAllContributions
    ? filteredContributions
    : filteredContributions.slice(0, 4)
  const moveOrganizations = (direction: -1 | 1) => {
    const viewport = orgCarouselRef.current
    const firstCard = viewport?.querySelector<HTMLElement>("[data-org-slide]")
    if (!viewport || !firstCard) return
    const track = firstCard.parentElement
    const gap = track ? Number.parseFloat(window.getComputedStyle(track).columnGap || "15") || 15 : 15
    viewport.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: reducedMotion ? "auto" : "smooth",
    })
  }

  return (
    <section className={styles.orgSection} id="open-source" aria-labelledby="org-heading" tabIndex={-1}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Beyond my own repositories</p>
        <h2 id="org-heading">Making upstream software a little better.</h2>
        <p>Open-source work means learning an unfamiliar codebase, testing assumptions, responding to review and improving software with maintainers. Here are the communities and projects I have contributed to.</p>
      </div>
      <div className={styles.orgCarouselHeader}>
        <div className={styles.orgCarouselHeading}>
          <strong>Upstream communities</strong>
          <span>Drag the row or use the arrows to browse.</span>
        </div>
        <div className={styles.orgCarouselControls}>
          <span>{String(Math.min(orgCarouselIndex + 1, organizations.length)).padStart(2, "0")} / {String(organizations.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => moveOrganizations(-1)} disabled={orgCarouselIndex <= 0} aria-label="Previous organization">←</button>
          <button type="button" onClick={() => moveOrganizations(1)} disabled={!orgCanScrollNext} aria-label="Next organization">→</button>
        </div>
      </div>
      <div
        className={styles.orgCarouselViewport}
        ref={orgCarouselRef}
        role="region"
        tabIndex={0}
        aria-label="Open-source organization carousel"
        onScroll={(event) => {
          const viewport = event.currentTarget
          const firstCard = viewport.querySelector<HTMLElement>("[data-org-slide]")
          if (firstCard) {
            const track = firstCard.parentElement
            const gap = track ? Number.parseFloat(window.getComputedStyle(track).columnGap || "15") || 15 : 15
            setOrgCarouselIndex(Math.round(viewport.scrollLeft / (firstCard.getBoundingClientRect().width + gap)))
          }
          setOrgCanScrollNext(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 3)
        }}
      >
        <div className={styles.orgGrid} data-org-track>
          {organizations.map((org, index) => (
          <motion.article
            className={styles.orgCard}
            key={org.handle}
            initial={reducedMotion ? false : { opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: reducedMotion ? 0 : 0.42, delay: reducedMotion ? 0 : Math.min(index, 5) * 0.045 }}
            whileHover={reducedMotion ? undefined : { y: -4, scale: 1.008 }}
          >
            <div className={styles.orgCardTop}>
              <div className={styles.orgLogo}>
                <span>{org.name.slice(0, 2).toUpperCase()}</span>
                <img
                  src={org.logo}
                  alt={org.name + " logo"}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none"
                    event.currentTarget.parentElement?.classList.add(styles.orgLogoFallback)
                  }}
                />
              </div>
              <div className={styles.orgIdentity}>
                <span>0{index + 1} / UPSTREAM</span>
                <h3>{org.name}</h3>
                <p>@{org.handle}</p>
              </div>
              <a className={styles.orgArrow} href={org.url} target="_blank" rel="noreferrer" aria-label={"Visit " + org.name}>↗</a>
            </div>
            <p className={styles.orgSummary}>{org.summary}</p>
            <p className={styles.orgContribution}>{org.contribution}</p>
            <div className={styles.orgRepos} aria-label="Repositories worked on">
              {org.repos.map((repository) => <span key={repository}>{repository}</span>)}
            </div>
            <a className={styles.orgLink} href={org.url} target="_blank" rel="noreferrer">
              Explore organization <span>↗</span>
            </a>
          </motion.article>
        ))}
        </div>
      </div>

      <div className={styles.contributionFeed} aria-labelledby="contribution-feed-heading">
        <div className={styles.contributionFeedIntro}>
          <div>
            <p className={styles.eyebrow}>The contribution trail</p>
            <h3 id="contribution-feed-heading">A few upstream changes, in context.</h3>
            <p>Browse a small sample, filter by review status, then open the original discussion when you want the implementation details.</p>
          </div>
          <a href="https://github.com/pulls?q=is%3Apr+author%3Aknockknock10" target="_blank" rel="noreferrer">All public PRs ↗</a>
        </div>

        <div className={styles.contributionFilters} role="group" aria-label="Filter contributions by status">
          {([
            ["all", "All", allContributions.length],
            ["merged", "Merged", allContributions.filter((item) => item.status.toLowerCase() === "merged").length],
            ["open", "Open", allContributions.filter((item) => item.status.toLowerCase() === "open").length],
          ] as Array<[ContributionFilter, string, number]>).map(([filter, label, count]) => (
            <button
              key={filter}
              type="button"
              className={contributionFilter === filter ? styles.contributionFilterActive : styles.contributionFilter}
              aria-pressed={contributionFilter === filter}
              onClick={() => {
                setContributionFilter(filter)
                setShowAllContributions(false)
              }}
            >
              {label}<span>{count}</span>
            </button>
          ))}
        </div>

        <ol className={styles.contributionList}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleContributions.map((item, index) => (
              <motion.li
                layout
                key={item.url}
                className={styles.contributionRow}
                initial={reducedMotion ? false : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: reducedMotion ? 0 : 0.2, delay: reducedMotion ? 0 : Math.min(index, 3) * 0.025 }}
              >
                <span className={styles.contributionStatus} data-status={item.status.toLowerCase()}>{item.status}</span>
                <div className={styles.contributionCopy}>
                  <span>{item.organization} · @{item.handle}</span>
                  <a href={item.url} target="_blank" rel="noreferrer">{item.label}<span aria-hidden="true"> ↗</span></a>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
        {filteredContributions.length > 4 ? (
          <button
            type="button"
            className={styles.contributionMore}
            aria-expanded={showAllContributions}
            onClick={() => setShowAllContributions((current) => !current)}
          >
            {showAllContributions ? "Show fewer contributions −" : "View more contributions +" }
            <span>{showAllContributions ? "4 shown" : filteredContributions.length + " available"}</span>
          </button>
        ) : null}
        {filteredContributions.length === 0 ? (
          <p className={styles.contributionEmpty}>No contributions in this status in the curated list. View the full public pull-request history on GitHub.</p>
        ) : null}
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
    <section className={styles.skillsSection} id="skills" aria-labelledby="skills-heading" tabIndex={-1}>
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
                  <SkillLogo name={skill} />
                  <span className={styles.skillChipLabel}>{skill}</span>
                  <span className={styles.skillChipArrow} aria-hidden="true">↗</span>
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
                        <button type="button" key={skill} onClick={() => exploreSkill(skill)}>
                          <SkillLogo name={skill} />
                          <span>{skill}</span>
                          <span className={styles.skillChipArrow} aria-hidden="true">↗</span>
                        </button>
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


type GitHubContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
type GitHubContributionPayload = {
  total?: Record<string, number>
  contributions?: GitHubContributionDay[]
}
type Badge = { displayName?: string; name?: string; icon?: string; creationDate?: string | number }
type TopicLevel = "fundamental" | "intermediate" | "advanced"
type TopicFilter = "all" | TopicLevel
type LeetCodeTopic = { tagName: string; tagSlug: string; problemsSolved: number; level: TopicLevel }

const fallbackTopics: LeetCodeTopic[] = [
  { tagName: "Array", tagSlug: "array", problemsSolved: 231, level: "fundamental" },
  { tagName: "Matrix", tagSlug: "matrix", problemsSolved: 36, level: "fundamental" },
  { tagName: "String", tagSlug: "string", problemsSolved: 86, level: "fundamental" },
  { tagName: "Simulation", tagSlug: "simulation", problemsSolved: 27, level: "fundamental" },
  { tagName: "Enumeration", tagSlug: "enumeration", problemsSolved: 22, level: "fundamental" },
  { tagName: "Sorting", tagSlug: "sorting", problemsSolved: 62, level: "fundamental" },
  { tagName: "Stack", tagSlug: "stack", problemsSolved: 26, level: "fundamental" },
  { tagName: "Queue", tagSlug: "queue", problemsSolved: 3, level: "fundamental" },
  { tagName: "Linked List", tagSlug: "linked-list", problemsSolved: 8, level: "fundamental" },
  { tagName: "Two Pointers", tagSlug: "two-pointers", problemsSolved: 28, level: "fundamental" },
  { tagName: "Tree", tagSlug: "tree", problemsSolved: 21, level: "intermediate" },
  { tagName: "Binary Tree", tagSlug: "binary-tree", problemsSolved: 16, level: "intermediate" },
  { tagName: "Hash Table", tagSlug: "hash-table", problemsSolved: 79, level: "intermediate" },
  { tagName: "Ordered Set", tagSlug: "ordered-set", problemsSolved: 8, level: "intermediate" },
  { tagName: "Graph Theory", tagSlug: "graph", problemsSolved: 7, level: "intermediate" },
  { tagName: "Greedy", tagSlug: "greedy", problemsSolved: 54, level: "intermediate" },
  { tagName: "Binary Search", tagSlug: "binary-search", problemsSolved: 41, level: "intermediate" },
  { tagName: "Depth-First Search", tagSlug: "depth-first-search", problemsSolved: 31, level: "intermediate" },
  { tagName: "Breadth-First Search", tagSlug: "breadth-first-search", problemsSolved: 23, level: "intermediate" },
  { tagName: "Recursion", tagSlug: "recursion", problemsSolved: 12, level: "intermediate" },
  { tagName: "Sliding Window", tagSlug: "sliding-window", problemsSolved: 24, level: "intermediate" },
  { tagName: "Bit Manipulation", tagSlug: "bit-manipulation", problemsSolved: 34, level: "intermediate" },
  { tagName: "Math", tagSlug: "math", problemsSolved: 84, level: "intermediate" },
  { tagName: "Design", tagSlug: "design", problemsSolved: 7, level: "intermediate" },
  { tagName: "Brainteaser", tagSlug: "brainteaser", problemsSolved: 4, level: "intermediate" },
  { tagName: "Database", tagSlug: "database", problemsSolved: 23, level: "intermediate" },
  { tagName: "Data Stream", tagSlug: "data-stream", problemsSolved: 1, level: "advanced" },
  { tagName: "Game Theory", tagSlug: "game-theory", problemsSolved: 3, level: "advanced" },
  { tagName: "Rolling Hash", tagSlug: "rolling-hash", problemsSolved: 1, level: "advanced" },
  { tagName: "Sweep Line", tagSlug: "sweep-line", problemsSolved: 1, level: "advanced" },
  { tagName: "Backtracking", tagSlug: "backtracking", problemsSolved: 9, level: "advanced" },
  { tagName: "Bitmask", tagSlug: "bitmask", problemsSolved: 2, level: "advanced" },
  { tagName: "Quickselect", tagSlug: "quickselect", problemsSolved: 2, level: "advanced" },
  { tagName: "Dynamic Programming", tagSlug: "dynamic-programming", problemsSolved: 76, level: "advanced" },
  { tagName: "Divide and Conquer", tagSlug: "divide-and-conquer", problemsSolved: 10, level: "advanced" },
  { tagName: "Trie", tagSlug: "trie", problemsSolved: 4, level: "advanced" },
  { tagName: "Union-Find", tagSlug: "union-find", problemsSolved: 9, level: "advanced" },
  { tagName: "Binary Indexed Tree", tagSlug: "binary-indexed-tree", problemsSolved: 2, level: "advanced" },
  { tagName: "Segment Tree", tagSlug: "segment-tree", problemsSolved: 10, level: "advanced" },
  { tagName: "Monotonic Stack", tagSlug: "monotonic-stack", problemsSolved: 5, level: "advanced" },
  { tagName: "Monotonic Queue", tagSlug: "monotonic-queue", problemsSolved: 1, level: "advanced" },
  { tagName: "Topological Sort", tagSlug: "topological-sort", problemsSolved: 2, level: "advanced" },
]

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

export function ActivityShowcase({ data }: { data: SignalStats }) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [badgeStatus, setBadgeStatus] = useState<"loading" | "live" | "snapshot">("loading")
  const [topics, setTopics] = useState<LeetCodeTopic[]>(fallbackTopics)
  const [topicStatus, setTopicStatus] = useState<"loading" | "live" | "snapshot">("loading")
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all")
  const [selectedTopic, setSelectedTopic] = useState<LeetCodeTopic>(fallbackTopics[0])
  const [submissions, setSubmissions] = useState<number | null>(null)
  const [liveSolved, setLiveSolved] = useState<number | null>(null)
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null)
  const [liveAcceptance, setLiveAcceptance] = useState<string | null>(null)
  const [badgePeek, setBadgePeek] = useState<string | null>(null)
  const [githubGraphFailed, setGithubGraphFailed] = useState(false)
  const [githubTrophiesFailed, setGithubTrophiesFailed] = useState(false)
  const [githubContributionHistory, setGithubContributionHistory] = useState<GitHubContributionDay[]>([])
  const [githubContributionTotals, setGithubContributionTotals] = useState<Record<string, number>>({})
  const [githubCalendarStatus, setGithubCalendarStatus] = useState<"loading" | "live" | "fallback">("loading")
  const [selectedGitHubYear, setSelectedGitHubYear] = useState<number | null>(null)
  const reducedMotion = Boolean(useReducedMotion())

  useEffect(() => {
    const controller = new AbortController()
    let disposed = false
    const timeout = window.setTimeout(() => controller.abort(), 18000)


    const requestGitHubCalendar = fetch("https://github-contributions-api.jogruber.de/v4/knockknock10?y=all", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub contribution history unavailable")))
      .then((payload: GitHubContributionPayload) => {
        const contributions = Array.isArray(payload.contributions)
          ? payload.contributions.filter((day) =>
              day &&
              /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
              Number.isFinite(day.count) &&
              day.count >= 0 &&
              [0, 1, 2, 3, 4].includes(day.level),
            )
          : []
        const totals = payload.total && typeof payload.total === "object"
          ? Object.fromEntries(
              Object.entries(payload.total).filter(([year, count]) =>
                /^\d{4}$/.test(year) && typeof count === "number" && Number.isFinite(count),
              ),
            )
          : {}
        if (!contributions.length || !Object.keys(totals).length) throw new Error("GitHub history was empty")
        setGithubContributionHistory(contributions)
        setGithubContributionTotals(totals)
        setSelectedGitHubYear((current) => current ?? Math.max(...Object.keys(totals).map(Number)))
        setGithubCalendarStatus("live")
      })
      .catch(() => {
        if (!disposed) setGithubCalendarStatus("fallback")
      })

    const requestTopics = fetch("https://alfa-leetcode-api.onrender.com/knockknock10/skill", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Topic stats unavailable")))
      .then((payload: Record<TopicLevel, Array<{ tagName: string; tagSlug: string; problemsSolved: number }>>) => {
        const levels: TopicLevel[] = ["fundamental", "intermediate", "advanced"]
        const result = levels.flatMap((level) =>
          (Array.isArray(payload[level]) ? payload[level] : [])
            .filter((item) => item && typeof item.tagName === "string" && typeof item.tagSlug === "string" && Number.isFinite(item.problemsSolved))
            .map((item) => ({ ...item, level })),
        )
        if (!result.length) throw new Error("Topic stats were empty")
        setTopics(result)
        setTopicStatus("live")
        setSelectedTopic((current) => result.find((topic) => topic.tagSlug === current.tagSlug) ?? result[0])
      })
      .catch(() => {
        if (!disposed) setTopicStatus("snapshot")
      })

    const requestProfile = fetch("https://alfa-leetcode-api.onrender.com/knockknock10/profile", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("LeetCode profile unavailable")))
      .then((payload: {
        totalSolved?: number
        totalQuestions?: number
        acceptanceRate?: number | string
        totalSubmissions?: Array<{ difficulty?: string; submissions?: number }>
      }) => {
        const count = payload.totalSubmissions?.find((item) => item.difficulty === "All")?.submissions
        if (typeof count === "number" && Number.isFinite(count)) setSubmissions(count)
        if (typeof payload.totalSolved === "number") setLiveSolved(payload.totalSolved)
        if (typeof payload.totalQuestions === "number") setTotalQuestions(payload.totalQuestions)
        if (typeof payload.acceptanceRate === "string" || typeof payload.acceptanceRate === "number") {
          setLiveAcceptance(String(payload.acceptanceRate))
        }
      })
      .catch(() => undefined)

    const requestBadges = fetch("https://alfa-leetcode-api.onrender.com/knockknock10/badges", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("LeetCode badges unavailable")))
      .then((payload: { badges?: Badge[]; data?: { badges?: Badge[] } }) => {
        const found = Array.isArray(payload.badges) ? payload.badges : Array.isArray(payload.data?.badges) ? payload.data.badges : []
        const earned = found.filter((badge) => badge.displayName || badge.name)
        if (earned.length) {
          setBadges(earned)
          setBadgeStatus("live")
        } else {
          setBadgeStatus("snapshot")
        }
      })
      .catch(() => {
        if (!disposed) setBadgeStatus("snapshot")
      })

    Promise.allSettled([requestGitHubCalendar, requestTopics, requestProfile, requestBadges]).finally(() => window.clearTimeout(timeout))
    return () => {
      disposed = true
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  const maxTopicCount = useMemo(() => Math.max(1, ...topics.map((topic) => topic.problemsSolved)), [topics])
  const visibleTopics = useMemo(
    () => (topicFilter === "all" ? topics : topics.filter((topic) => topic.level === topicFilter)),
    [topicFilter, topics],
  )
  const shownBadges = badges.length ? badges : fallbackBadges
  const availableGitHubYears = useMemo(
    () => Object.keys(githubContributionTotals).filter((year) => /^\d{4}$/.test(year)).map(Number).sort((a, b) => b - a),
    [githubContributionTotals],
  )
  const activeGitHubYear = selectedGitHubYear ?? availableGitHubYears[0] ?? new Date().getFullYear()
  const selectedGitHubDays = useMemo(
    () => githubContributionHistory
      .filter((day) => day.date.startsWith(String(activeGitHubYear) + "-"))
      .sort((a, b) => a.date.localeCompare(b.date)),
    [githubContributionHistory, activeGitHubYear],
  )
  const paddedGitHubDays = useMemo(() => {
    if (!selectedGitHubDays.length) return [] as Array<GitHubContributionDay | null>
    const firstWeekday = new Date(selectedGitHubDays[0].date + "T00:00:00Z").getUTCDay()
    return [...Array.from({ length: firstWeekday }, () => null), ...selectedGitHubDays]
  }, [selectedGitHubDays])
  const githubWeekCount = Math.ceil(paddedGitHubDays.length / 7)
  const githubMonthMarkers = useMemo(() => {
    const markers: Array<{ label: string; week: number }> = []
    paddedGitHubDays.forEach((day, index) => {
      if (day && day.date.slice(-2) === "01") {
        const label = new Date(day.date + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
        markers.push({ label, week: Math.floor(index / 7) })
      }
    })
    return markers
  }, [paddedGitHubDays])
  const activeGitHubTotal = githubContributionTotals[String(activeGitHubYear)] ??
    selectedGitHubDays.reduce((total, day) => total + day.count, 0)
  const solvedValue = liveSolved ?? (typeof data.leetcode.totalSolved === "number" ? data.leetcode.totalSolved : null)
  const questionValue = totalQuestions ?? (typeof data.leetcode.totalQuestions === "number" ? data.leetcode.totalQuestions : null)
  const acceptanceRaw = liveAcceptance ?? (data.leetcode.acceptanceRate !== "MISSING" ? data.leetcode.acceptanceRate : "87.2%")
  const acceptanceValue = acceptanceRaw.endsWith("%") ? acceptanceRaw : acceptanceRaw + "%"
  const submissionsValue = submissions ?? 523

  function topicUrl(topic: LeetCodeTopic) {
    return "https://leetcode.com/tag/" + topic.tagSlug + "/"
  }

  return (
    <section className={styles.activitySection} id="signals" aria-labelledby="activity-heading" tabIndex={-1}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Proof of practice</p>
        <h2 id="activity-heading">Practice, measured in patterns.</h2>
        <p>A real snapshot of the topics you work on, plus the activity and badges behind the profile—every metric links back to LeetCode or GitHub.</p>
      </div>

      <div className={styles.activityStack}>
        <article className={styles.activityCard + " " + styles.githubActivity}>
          <div className={styles.activityCardHeader}>
            <div><span className={styles.activityEyebrow}>01 / GITHUB</span><h3>Building in public</h3></div>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">↗</a>
          </div>

          <div className={styles.githubYearExplorer}>
            <div className={styles.githubYearIntro}>
              <div>
                <span className={styles.githubYearKicker}>GITHUB CONTRIBUTION CALENDAR</span>
                <p>Choose a year to inspect the public activity recorded for this profile.</p>
              </div>
              <div className={styles.githubYearTotal}>
                <strong>{githubCalendarStatus === "live" ? activeGitHubTotal.toLocaleString() : "—"}</strong>
                <span>{githubCalendarStatus === "live" ? "contributions in " + activeGitHubYear : "yearly history"}</span>
              </div>
            </div>

            {githubCalendarStatus === "live" && selectedGitHubDays.length ? (
              <>
                <div className={styles.githubYearPicker} role="group" aria-label="Select GitHub contribution year">
                  {availableGitHubYears.map((year) => (
                    <button
                      key={year}
                      type="button"
                      className={activeGitHubYear === year ? styles.githubYearActive : styles.githubYearButton}
                      aria-pressed={activeGitHubYear === year}
                      onClick={() => setSelectedGitHubYear(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <div className={styles.githubCalendarViewport} tabIndex={0} aria-label={"Contribution calendar for " + activeGitHubYear}>
                  <div className={styles.githubCalendarInner}>
                    <div className={styles.githubMonths} aria-hidden="true">
                      {githubMonthMarkers.map((month) => (
                        <span
                          key={month.label + month.week}
                          style={{ left: (month.week / Math.max(1, githubWeekCount)) * 100 + "%" }}
                        >
                          {month.label}
                        </span>
                      ))}
                    </div>
                    <div
                      className={styles.githubCalendarGrid}
                      style={{ gridTemplateColumns: "repeat(" + githubWeekCount + ", minmax(0, 1fr))" }}
                      role="img"
                      aria-label={activeGitHubTotal.toLocaleString() + " GitHub contributions in " + activeGitHubYear + "; daily counts shown as a contribution heatmap."}
                    >
                      {paddedGitHubDays.map((day, index) => day ? (
                        <span
                          key={day.date}
                          className={styles.githubCalendarCell}
                          data-level={day.level}
                          title={day.date + ": " + day.count + (day.count === 1 ? " contribution" : " contributions")}
                          aria-label={day.date + ": " + day.count + (day.count === 1 ? " contribution" : " contributions")}
                        />
                      ) : (
                        <span key={"pad-" + index} className={styles.githubCalendarPad} aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.githubCalendarLegend}>
                  <span>Less</span><i data-level="0" /><i data-level="1" /><i data-level="2" /><i data-level="3" /><i data-level="4" /><span>More</span>
                  <small>Daily commits, pull requests, reviews and other GitHub contributions.</small>
                </div>
              </>
            ) : githubCalendarStatus === "loading" ? (
              <div className={styles.githubCalendarLoading} aria-live="polite">
                <span className={styles.githubLoadingPulse} />
                <span>Loading yearly contribution history from GitHub…</span>
              </div>
            ) : (
              <div className={styles.githubGraphFallback}>
                {githubGraphFailed ? (
                  <div className={styles.activityMediaFallback}>
                    <span className={styles.activityFallbackMark} aria-hidden="true">GH</span>
                    <div><strong>Contribution history unavailable</strong><p>Open GitHub to switch years and view the complete profile calendar.</p></div>
                    <a href={profile.github} target="_blank" rel="noreferrer">Open profile ↗</a>
                  </div>
                ) : (
                  <img
                    src="https://ghchart.rshah.org/6554d7/knockknock10"
                    alt="Fallback GitHub contribution graph for knockknock10 showing recent activity"
                    loading="lazy"
                    onError={() => setGithubGraphFailed(true)}
                  />
                )}
                <p>Year filtering is temporarily unavailable; the fallback graph shows recent activity.</p>
              </div>
            )}
          </div>
          <div className={styles.graphCaption}>
            <span>Contribution history · refreshed by the public profile-data service</span>
            <span><a href={profile.github} target="_blank" rel="noreferrer">Open GitHub ↗</a></span>
          </div>

          <div className={styles.githubBadgeHeading}>
            <h4>GitHub achievements</h4>
            <span>Profile trophies · opens your GitHub</span>
          </div>
          <a className={styles.trophyLink} href={profile.github} target="_blank" rel="noreferrer" aria-label="See GitHub profile achievements">
            {githubTrophiesFailed ? (
              <span className={styles.activityTrophyFallback}>
                <span aria-hidden="true">✦</span>
                <strong>GitHub profile achievements</strong>
                <small>Open your profile to see the latest trophies ↗</small>
              </span>
            ) : (
              <img
                src="https://github-profile-trophy.vercel.app/?username=knockknock10&theme=flat&no-frame=true&no-bg=true&column=4&margin-w=8"
                alt="GitHub profile achievement trophies"
                loading="lazy"
                onError={() => setGithubTrophiesFailed(true)}
              />
            )}
          </a>
          <div className={styles.activityFooter}>
            <span>Commits · PRs · Reviews · Repositories</span>
            <a href={profile.github} target="_blank" rel="noreferrer">View profile ↗</a>
          </div>
        </article>

        <article className={styles.activityCard + " " + styles.leetcodeActivity}>
          <div className={styles.activityCardHeader}>
            <div><span className={styles.activityEyebrow}>02 / LEETCODE</span><h3>Problem-solving profile</h3></div>
            <a href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="Open LeetCode profile">↗</a>
          </div>

          <div className={styles.leetcodeHero}>
            <div><strong>{solvedValue !== null ? solvedValue.toLocaleString() : "—"}{questionValue !== null ? <small> / {questionValue.toLocaleString()}</small> : null}</strong><span>problems solved</span></div>
            <a className={styles.knightBadge} href={profile.leetcode} target="_blank" rel="noreferrer">
              <img src="https://leetcode.com/static/images/badges/knight.png" alt="" />
              <span>Knight</span>
            </a>
          </div>

          <div className={styles.leetcodeSubmissionMetrics}>
            <div className={styles.leetcodeMetricTile}><span>Submissions</span><strong>{submissionsValue.toLocaleString()}</strong><small>Total · all languages</small></div>
            <div className={styles.leetcodeMetricTile}><span>Acceptance</span><strong>{acceptanceValue}</strong><small>Profile acceptance metric</small></div>
          </div>

          <div className={styles.difficultyRows}>
            {[["Easy", data.leetcode.easySolved, "easy"], ["Medium", data.leetcode.mediumSolved, "medium"], ["Hard", data.leetcode.hardSolved, "hard"]].map(([label, value, color]) => (
              <div className={styles.difficultyRow} key={String(label)}>
                <span>{String(label)}</span>
                <div><span className={styles["difficultyFill" + String(color)]} style={{ width: (typeof value === "number" ? Math.min(100, (value / Math.max(1, solvedValue ?? 1)) * 100) : 0) + "%" }} /></div>
                <strong>{typeof value === "number" ? value : "—"}</strong>
              </div>
            ))}
          </div>

          <div className={styles.leetcodeTopicPanel}>
            <div className={styles.topicPanelHeader}>
              <div>
                <span className={styles.topicPanelKicker}>TOPIC MAP</span>
                <h4>Patterns you’ve practiced</h4>
                <p>Choose any circle to inspect its count and open that LeetCode topic.</p>
              </div>
              <span className={styles.topicSource}>{topicStatus === "live" ? "LIVE PROFILE" : topicStatus === "loading" ? "SYNCING" : "PROFILE SNAPSHOT"}</span>
            </div>

            <div className={styles.topicFilters} role="group" aria-label="Filter LeetCode topics by difficulty">
              {([
                ["all", "All topics"],
                ["fundamental", "Fundamental"],
                ["intermediate", "Intermediate"],
                ["advanced", "Advanced"],
              ] as Array<[TopicFilter, string]>).map(([level, label]) => (
                <button
                  key={level}
                  type="button"
                  aria-pressed={topicFilter === level}
                  className={topicFilter === level ? styles.topicFilterActive : styles.topicFilter}
                  onClick={() => {
                    setTopicFilter(level)
                    if (level === "all") {
                      if (!topics.some((topic) => topic.tagSlug === selectedTopic.tagSlug)) setSelectedTopic(topics[0])
                    } else if (selectedTopic.level !== level) {
                      const firstMatchingTopic = topics.find((topic) => topic.level === level)
                      if (firstMatchingTopic) setSelectedTopic(firstMatchingTopic)
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className={styles.leetcodeTopicCloud} role="group" aria-label="LeetCode topics and solved counts">
              {visibleTopics.map((topic, index) => {
                const diameter = Math.round(50 + Math.sqrt(topic.problemsSolved / maxTopicCount) * 62)
                const fill = Math.max(12, Math.round((topic.problemsSolved / maxTopicCount) * 100))
                return (
                  <motion.button
                    key={topic.tagSlug}
                    type="button"
                    className={styles.leetcodeTopicBubble}
                    data-level={topic.level}
                    data-selected={selectedTopic.tagSlug === topic.tagSlug}
                    style={{ width: diameter, height: diameter, "--topic-fill": fill + "%" } as CSSProperties}
                    aria-pressed={selectedTopic.tagSlug === topic.tagSlug}
                    aria-label={topic.tagName + ": " + topic.problemsSolved + " problems solved. Open LeetCode topic"}
                    title={topic.tagName + " · " + topic.problemsSolved + " solved"}
                    onClick={() => setSelectedTopic(topic)}
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.84 }}
                    animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
                    transition={reducedMotion ? { duration: 0 } : { delay: Math.min(index, 18) * 0.012, type: "spring", stiffness: 230, damping: 20 }}
                    whileHover={reducedMotion ? undefined : { y: -3, scale: 1.045 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                  >
                    <span className={styles.topicBubbleName}>{topic.tagName}</span>
                    <strong className={styles.topicBubbleCount}>{topic.problemsSolved}</strong>
                  </motion.button>
                )
              })}
            </div>

            <div className={styles.selectedTopicDetail}>
              <div>
                <span>SELECTED TOPIC</span>
                <strong>{selectedTopic.tagName}</strong>
                <small>{selectedTopic.level} · {selectedTopic.problemsSolved} problems solved</small>
              </div>
              <a href={topicUrl(selectedTopic)} target="_blank" rel="noreferrer">Explore topic ↗</a>
            </div>
            <div className={styles.topicLegend}>
              <span><i data-level="fundamental" /> Fundamental</span>
              <span><i data-level="intermediate" /> Intermediate</span>
              <span><i data-level="advanced" /> Advanced</span>
              <small>Circle size reflects solved count; values are not difficulty completion rates.</small>
            </div>
          </div>

          <div className={styles.leetcodeMiniStats}>
            <div><span>Contest rating</span><strong>{typeof data.leetcode.contestRating === "number" ? Math.round(data.leetcode.contestRating) : "—"}</strong></div>
            <div><span>Global rank</span><strong>{typeof data.leetcode.profileRank === "number" ? data.leetcode.profileRank.toLocaleString() : "—"}</strong></div>
            <div><span>Contest rank</span><strong>{typeof data.leetcode.contestRank === "number" ? data.leetcode.contestRank.toLocaleString() : "—"}</strong></div>
          </div>

          <div className={styles.leetcodeBadgesSection}>
            <div className={styles.githubBadgeHeading}>
              <h4>All earned LeetCode badges</h4>
              <span>{badgeStatus === "live" ? badges.length + " live badges" : badgeStatus === "loading" ? "Loading profile badges…" : "Saved profile snapshot"}</span>
            </div>
            <div className={styles.leetcodeBadges}>
              {shownBadges.map((badge, index) => (
                <button
                  type="button"
                  className={styles.leetcodeBadge}
                  key={(badge.displayName ?? badge.name ?? "badge") + index}
                  onClick={() => setBadgePeek((current) => current === (badge.displayName ?? badge.name) ? null : (badge.displayName ?? badge.name ?? "LeetCode badge"))}
                  aria-expanded={badgePeek === (badge.displayName ?? badge.name)}
                  title={badge.displayName ?? badge.name}
                >
                  <span className={styles.badgeIconWrap}>
                    <span className={styles.badgeMonogram} aria-hidden="true">★</span>
                    {badge.icon ? <img src={badge.icon.startsWith("http") ? badge.icon : "https://leetcode.com" + badge.icon} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none" }} /> : null}
                  </span>
                  <span>{badge.displayName ?? badge.name}</span>
                </button>
              ))}
            </div>
            {badgePeek ? <p className={styles.badgeDetail}><strong>{badgePeek}</strong> · Earned badge on the <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode profile ↗</a></p> : null}
          </div>
          <div className={styles.activityFooter}>
            <span>Submissions · Topics · Badges</span>
            <a href={profile.leetcode} target="_blank" rel="noreferrer">Open LeetCode ↗</a>
          </div>
        </article>
      </div>
    </section>
  )
}


export function VisitorCounter() {
  const [counterUrl, setCounterUrl] = useState<string | null>(null)
  const [counterFailed, setCounterFailed] = useState(false)

  useEffect(() => {
    // A unique query string prevents browser/CDN caching from suppressing page-view hits.
    setCounterUrl(
      "https://hits.sh/kr-sanjeev.netlify.app.svg?label=visitor%20number&color=6554d7&labelColor=ffffff&v=" +
        Date.now(),
    )
  }, [])

  return (
    <div className={styles.visitorLine}>
      <span className={styles.visitorSpark} />
      <span className={styles.visitorMessage}>You are</span>
      <a className={styles.visitorBadgeLink} href="https://hits.sh/kr-sanjeev.netlify.app/" target="_blank" rel="noreferrer" aria-label="Open portfolio visit statistics">
        {counterUrl && !counterFailed ? (
          <img src={counterUrl} alt="Portfolio visitor number, updated on each page visit" loading="eager" decoding="async" onError={() => setCounterFailed(true)} />
        ) : (
          <span className={styles.visitorBadgePlaceholder} aria-live="polite">{counterFailed ? "visit counter unavailable" : "counting…"}</span>
        )}
      </a>
      <span className={styles.visitorEnd}>COUNTER UPDATES ON EVERY VISIT</span>
    </div>
  )
}
