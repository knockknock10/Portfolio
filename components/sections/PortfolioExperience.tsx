"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { SignalStats } from "@/lib/signals"
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
  },
]

type ProfileIdCardProps = { tools: string[] | null }

export function ProfileIdCard({ tools }: ProfileIdCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [portraitAvailable, setPortraitAvailable] = useState(true)
  const reduceMotion = useReducedMotion()
  const toolCount = tools?.filter(Boolean).length ?? 0

  return (
    <section className={styles.identitySection} id="identity" aria-labelledby="identity-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>A little about the engineer</p>
        <h2 id="identity-heading">The person behind the pull requests.</h2>
        <p>A compact profile card with the essentials up front—and the engineering toolkit on the reverse.</p>
      </div>
      <div className={styles.identityLayout}>
        <motion.div
          className={styles.idCard}
          animate={reduceMotion ? undefined : { rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.8 }}
        >
          <div className={styles.idFace + " " + styles.idFront}>
            <div className={styles.idTopline}><span className={styles.idDot} /> ENGINEERING PROFILE <span>2026</span></div>
            <div className={styles.idMain}>
              <div className={styles.portrait}>
                {portraitAvailable ? (
                  <img src="/images/sanjeev-portrait.jpg" alt="Sanjeev Kumar portrait placeholder" onError={() => setPortraitAvailable(false)} />
                ) : (
                  <div className={styles.portraitPlaceholder}><span>SK</span><small>Add your photo</small></div>
                )}
              </div>
              <div className={styles.idIdentity}>
                <p className={styles.idLabel}>SOFTWARE ENGINEER IN THE MAKING</p>
                <h3>{profile.name}</h3>
                <p>Computer Science & Engineering</p>
                <p>SRM University AP · India</p>
                <div className={styles.idStatus}><span /> Building · Learning · Contributing</div>
              </div>
            </div>
            <div className={styles.idFooter}>
              <span>BACKEND / OSS / APPLIED AI</span>
              <button type="button" onClick={() => setFlipped(true)} aria-label="Flip profile card to see skills">Flip card <span aria-hidden="true">↗</span></button>
            </div>
          </div>
          <div className={styles.idFace + " " + styles.idBack}>
            <div className={styles.idTopline}><span className={styles.idDot} /> ENGINEERING TOOLKIT <span>{toolCount || "—"}+ tools</span></div>
            <div className={styles.idBackContent}>
              <p className={styles.idLabel}>HOW I BUILD</p>
              <h3>From interfaces to infrastructure.</h3>
              <p>Full-stack systems, Go services, open-source maintenance, and applied audio ML.</p>
              <div className={styles.idQuickSkills}>{["Go", "React", "Node.js", "PostgreSQL", "Docker", "PyTorch"].map((item) => <span key={item}>{item}</span>)}</div>
              <div className={styles.idQuickLinks}>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href={"mailto:" + profile.email}>Email ↗</a>
              </div>
            </div>
            <div className={styles.idFooter}>
              <span>HUMAN-REVIEWED. BUILT WITH CARE.</span>
              <button type="button" onClick={() => setFlipped(false)} aria-label="Flip profile card to the front">Back <span aria-hidden="true">↗</span></button>
            </div>
          </div>
        </motion.div>
        <div className={styles.identityAside}>
          <p className={styles.identityQuote}>“I learn fastest by building something real, tracing the edge cases, and improving it with feedback.”</p>
          <p className={styles.identityBio}>Third-year B.Tech CSE student focused on backend engineering, developer tooling, open source, and applied AI research.</p>
          <div className={styles.identityLinks}>
            <a href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span><span>Projects & contributions ↗</span></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><span>Connect professionally ↗</span></a>
            <a href={"mailto:" + profile.email}><span>Email</span><span>{profile.email} ↗</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeaturedProjects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion()
  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close() }
    window.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [selected, close])

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
            onClick={() => setSelected(project)}
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
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className={styles.drawerTop}><span>PROJECT NOTES / {selected.status.toUpperCase()}</span><button type="button" onClick={close} aria-label="Close project details">×</button></div>
              <p className={styles.eyebrow}>{selected.label}</p>
              <h3 id="project-drawer-title">{selected.name}</h3>
              <p className={styles.drawerDescription}>{selected.detail}</p>
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
              <div className={styles.orgLogo}><img src={org.logo} alt={org.name + " logo"} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none" }} /></div>
              <div className={styles.orgIdentity}><span>0{index + 1} / CONTRIBUTION</span><h3>{org.name}</h3><p>@{org.handle}</p></div>
              <a className={styles.orgArrow} href={org.url} target="_blank" rel="noreferrer" aria-label={"Visit " + org.name}>↗</a>
            </div>
            <p className={styles.orgSummary}>{org.summary}</p>
            <p className={styles.orgContribution}>{org.contribution}</p>
            <div className={styles.orgRepos}>{org.repos.map((repo) => <span key={repo}>{repo}</span>)}</div>
            <a className={styles.orgLink} href={org.workUrl} target="_blank" rel="noreferrer">Explore source <span>↗</span></a>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SkillsExplorer() {
  const categories = Object.keys(skillGroups) as Array<keyof typeof skillGroups>
  const [active, setActive] = useState<keyof typeof skillGroups>("Languages")
  const [showAll, setShowAll] = useState(false)
  const current = skillGroups[active]
  const allSkills = useMemo(() => categories.flatMap((category) => skillGroups[category]), [categories])
  return (
    <section className={styles.skillsSection} id="skills" aria-labelledby="skills-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Tools I reach for</p>
        <h2 id="skills-heading">A toolkit shaped by the work.</h2>
        <p>Choose a layer to explore the languages and tools used across my projects, research and open-source contributions.</p>
      </div>
      <div className={styles.skillsPanel}>
        <div className={styles.skillTabs} role="tablist" aria-label="Technology categories">
          {categories.map((category) => <button key={category} type="button" role="tab" aria-selected={active === category} className={active === category ? styles.skillTabActive : styles.skillTab} onClick={() => setActive(category)}>{category}</button>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} className={styles.skillContent} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
            <div className={styles.skillCategoryTitle}><span>0{categories.indexOf(active) + 1}</span><h3>{active}</h3></div>
            <div className={styles.skillChips}>{current.map((skill, index) => <motion.span key={skill} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }}>{skill}</motion.span>)}</div>
            <p className={styles.skillContext}>{active === "AI & research" ? "Used in semantic audio representation, spectrogram analysis and research evaluation." : active === "Data & infrastructure" ? "Applied to containerized services, persistence, deployment workflows and automation." : active === "Backend & APIs" ? "Used to build authenticated APIs, service boundaries and integrations." : active === "Frontend" ? "Used for interactive interfaces, responsive layouts and polished user experiences." : active === "Quality & workflow" ? "Used to test changes, investigate failures and collaborate through source control." : "A practical foundation for problem solving and building maintainable systems."}</p>
          </motion.div>
        </AnimatePresence>
        <div className={styles.skillsFooter}><span>{allSkills.length} tools across {categories.length} categories</span><button type="button" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>{showAll ? "Show selected layer −" : "View complete toolkit +"}</button></div>
        <AnimatePresence>{showAll ? <motion.div className={styles.allSkills} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><div>{categories.map((category) => <div key={category}><h4>{category}</h4><p>{skillGroups[category].join(" · ")}</p></div>)}</div></motion.div> : null}</AnimatePresence>
      </div>
    </section>
  )
}

type Badge = { displayName?: string; name?: string; icon?: string; creationDate?: string | number }

export function ActivityShowcase({ data }: { data: SignalStats }) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [badgeStatus, setBadgeStatus] = useState<"loading" | "loaded" | "fallback">("loading")
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [visitorStatus, setVisitorStatus] = useState<"loading" | "loaded" | "unavailable">("loading")
  const [expandedBadges, setExpandedBadges] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch("https://alfa-leetcode-api.onrender.com/knockknock10/badges", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Badge service unavailable")))
      .then((payload: { badges?: Badge[]; data?: { badges?: Badge[] } }) => {
        const found = Array.isArray(payload.badges) ? payload.badges : Array.isArray(payload.data?.badges) ? payload.data.badges : []
        setBadges(found.filter((badge) => badge.displayName || badge.name))
        setBadgeStatus(found.length ? "loaded" : "fallback")
      })
      .catch(() => setBadgeStatus("fallback"))
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetch("https://api.counterapi.dev/v1/kr-sanjeev-portfolio/visits/up", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Counter unavailable")))
      .then((payload: { count?: number; data?: { count?: number } }) => {
        const count = payload.count ?? payload.data?.count
        if (typeof count === "number" && Number.isFinite(count)) {
          setVisitorCount(count)
          setVisitorStatus("loaded")
        } else {
          setVisitorStatus("unavailable")
        }
      })
      .catch(() => setVisitorStatus("unavailable"))
    return () => controller.abort()
  }, [])

  const fallbackBadge = data.leetcode.badges[0] ?? "Knight"
  const shownBadges = badges.length ? badges : [{ displayName: fallbackBadge, icon: "https://leetcode.com/static/images/badges/knight.png" }]
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
          <div className={styles.leetcodeBadges}>{shownBadges.slice(0, expandedBadges ? shownBadges.length : 6).map((badge, index) => <a href={profile.leetcode} target="_blank" rel="noreferrer" className={styles.leetcodeBadge} key={(badge.displayName ?? badge.name ?? "badge") + index}>{badge.icon ? <img src={badge.icon.startsWith("http") ? badge.icon : "https://leetcode.com" + badge.icon} alt="" loading="lazy" /> : <span className={styles.badgeMonogram}>★</span>}<span>{badge.displayName ?? badge.name}</span></a>)}</div>
          {shownBadges.length > 6 ? <button className={styles.showBadges} type="button" onClick={() => setExpandedBadges((value) => !value)}>{expandedBadges ? "Show fewer badges −" : "Show all " + shownBadges.length + " badges +"}</button> : null}
          <div className={styles.activityFooter}><span>Contest · Difficulty · Earned badges</span><a href={profile.leetcode} target="_blank" rel="noreferrer">Open LeetCode ↗</a></div>
        </article>
      </div>
      <div className={styles.visitorLine}><span className={styles.visitorSpark} />{visitorStatus === "loaded" && visitorCount !== null ? <p>You’re visitor <strong>#{visitorCount.toLocaleString()}</strong> — thanks for stopping by.</p> : visitorStatus === "loading" ? <p>Counting visits as you explore…</p> : <p>Every visit adds to the story. <a href="https://github.com/knockknock10/Portfolio" target="_blank" rel="noreferrer">Built in public, with care ↗</a></p>}<span className={styles.visitorEnd}>MADE TO BE EXPLORED</span></div>
    </section>
  )
}
