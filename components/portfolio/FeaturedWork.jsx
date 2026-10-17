"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./FeaturedWork.module.css";


const featuredProject = {
  id: "aevor-platform",
  name: "Aevor Platform",
  shortName: "Aevor",
  category: "Developer tooling",
  status: "In development",
  description:
    "A developer platform designed around issue-to-pull-request workflows, with a human review gate before changes are published.",
  detail:
    "Aevor is a multi-repository developer-tooling platform. The core platform repository contains a Go API and GitHub-connected authentication; the frontend, AI services, infrastructure and documentation live in separate repositories. The central idea is to make proposed changes reviewable and validated while keeping publication under human control.",
  image:
    "https://raw.githubusercontent.com/Aevor/Frontend/main/src/assets/hero.png",
  imageAlt: "Aevor developer platform interface from its frontend repository",
  repo: "https://github.com/Aevor/platform",
  secondary: "https://github.com/Aevor/Frontend",
  secondaryLabel: "Frontend",
  filters: ["Developer tools"],
  tags: ["Go", "Gin", "PostgreSQL", "React", "Docker"],
  highlights: [
    "Go API foundation with GitHub-connected workflows",
    "Frontend and API maintained in separate repositories",
    "Review-first approach to proposed code changes",
  ],
};

const projects = [
  {
    id: "commithub",
    name: "CommitHub",
    category: "Developer collaboration",
    status: "In development",
    description:
      "A GitHub-inspired collaboration platform for repositories, branches, pull requests, reviews, and merge conflicts.",
    detail:
      "CommitHub explores the real behavior behind a code-hosting product: repository trees, branches, commits, reviews, merge conflict handling, branch protection and role-aware permissions. Its React frontend connects to an Express API with MongoDB persistence and real-time events.",
    image:
      "https://raw.githubusercontent.com/knockknock10/CommitHub/main/commithub-frontend/src/assets/hero.png",
    imageAlt: "CommitHub interface from its source repository",
    repo: "https://github.com/knockknock10/CommitHub",
    live: "https://knockknock10.github.io/CommitHub/",
    filters: ["Full-stack", "Developer tools"],
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    highlights: [
      "Branch-aware repository and pull-request workflows",
      "Review and merge-conflict experiences",
      "Server-side permissions and real-time updates",
    ],
  },
  {
    id: "wandera",
    name: "Wandera",
    category: "Travel · Full-stack",
    status: "Deployed",
    description:
      "A travel-stay listing platform for exploring places, browsing photos, and sharing reviews.",
    detail:
      "Wandera is a server-rendered MVC application with authenticated listing workflows, Cloudinary image uploads, map views and review permissions enforced on the server. Visitors can explore listings, while owners can create and manage their own content.",
    image:
      "https://raw.githubusercontent.com/knockknock10/Wandera/main/public/images/project-air-preview.jpg",
    imageAlt: "Wandera travel listing preview stored in its repository",
    repo: "https://github.com/knockknock10/Wandera",
    live: "https://wandera-bncl.onrender.com",
    filters: ["Full-stack", "Completed"],
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    highlights: [
      "Listing search and server-rendered property pages",
      "Cloud image uploads and map views",
      "Ownership checks and review permissions",
    ],
  },
  {
    id: "convergenceguard",
    name: "ConvergenceGuard",
    category: "Distributed systems",
    status: "Early stage",
    description:
      "An early microservices scaffold organized around inventory, order, and payment service boundaries.",
    detail:
      "The public repository currently establishes the service-directory boundaries for inventory, orders and payments. This is an early-stage foundation rather than a finished production system, so the portfolio presents the architecture being explored without claiming completed runtime capabilities.",
    repo: "https://github.com/knockknock10/ConvergenceGuard",
    filters: ["Systems"],
    tags: ["Microservices", "Inventory", "Orders", "Payments"],
    highlights: [
      "Separate inventory, order and payment boundaries",
      "A foundation for service integration",
      "Scope and maturity represented honestly",
    ],
  },
  {
    id: "novafest",
    name: "NovaFest",
    category: "E-commerce · Full-stack",
    status: "Completed",
    description:
      "A full-stack commerce project with a React storefront and a Node.js, Express, and MongoDB backend.",
    detail:
      "NovaFest separates the Vite/React/Tailwind storefront from its Node.js and Express backend within one repository. It is included as a completed project, with the deployed storefront and source repository available directly from this card.",
    image:
      "https://raw.githubusercontent.com/knockknock10/NOVAFEST/main/screenshot/landing.png",
    imageAlt: "NovaFest storefront screenshot from the project repository",
    repo: "https://github.com/knockknock10/NOVAFEST",
    live: "https://novanest-1.netlify.app/",
    filters: ["Full-stack", "Completed"],
    tags: ["React", "Tailwind CSS", "Express", "MongoDB"],
    highlights: [
      "React storefront built with Vite and Tailwind",
      "Separate Express backend and MongoDB data layer",
      "Deployed storefront and browsable source",
    ],
  },
];

const allProjects = [featuredProject, ...projects];
const filters = ["All projects", "Full-stack", "Developer tools", "Systems", "Completed"];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className={styles.arrow}>{diagonal ? "↗" : "→"}</span>;
}

function ServiceArchitecture() {
  return (
    <div className={styles.architectureArt} aria-label="Illustration of inventory, order, and payment service boundaries">
      <div className={styles.architectureTopline}>
        <span>CONVERGENCEGUARD / SYSTEM MAP</span>
        <span>01 — 03</span>
      </div>
      <svg className={styles.architectureSvg} viewBox="0 0 540 230" role="img" aria-labelledby="cg-diagram-title">
        <title id="cg-diagram-title">Three service boundaries connected through an event flow</title>
        <defs>
          <linearGradient id="cgLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4d83ff" />
            <stop offset="100%" stopColor="#a28cff" />
          </linearGradient>
          <linearGradient id="cgNode" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27334a" />
            <stop offset="100%" stopColor="#141e30" />
          </linearGradient>
        </defs>
        <path d="M270 64 V91 M105 91 H435 M105 91 V115 M270 91 V115 M435 91 V115" fill="none" stroke="url(#cgLine)" strokeWidth="2" strokeLinecap="round" />
        <path d="M262 83 L270 91 L278 83" fill="none" stroke="#7e9cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="178" y="16" width="184" height="48" rx="12" fill="url(#cgNode)" stroke="#748cff" strokeOpacity=".72" />
        <circle cx="198" cy="40" r="5" fill="#7fa0ff" />
        <text x="213" y="37" fill="#f1f5ff" fontSize="12" fontWeight="600">Event coordinator</text>
        <text x="213" y="51" fill="#9eacc6" fontSize="9">proposed flow boundary</text>
        {[
          { x: 16, title: "Inventory", sub: "Stock state", n: "01" },
          { x: 186, title: "Orders", sub: "Order lifecycle", n: "02" },
          { x: 356, title: "Payments", sub: "Payment state", n: "03" },
        ].map((node) => (
          <g key={node.n}>
            <rect x={node.x} y="115" width="168" height="76" rx="13" fill="url(#cgNode)" stroke="#687d9f" strokeOpacity=".7" />
            <text x={node.x + 14} y="137" fill="#8aa6ff" fontSize="9" fontWeight="700" letterSpacing="1.4">{node.n}</text>
            <text x={node.x + 14} y="157" fill="#f2f5ff" fontSize="13" fontWeight="600">{node.title}</text>
            <text x={node.x + 14} y="174" fill="#a7b2c6" fontSize="10">{node.sub}</text>
            <circle cx={node.x + 148} cy="132" r="3" fill="#6ce0ba" />
          </g>
        ))}
        <path d="M100 200 H440" stroke="#5e7498" strokeOpacity=".6" strokeWidth="1" strokeDasharray="3 5" />
        <text x="270" y="218" textAnchor="middle" fill="#a8b5cb" fontSize="10" letterSpacing="1.2">SERVICE BOUNDARIES · EARLY-STAGE DESIGN</text>
      </svg>
      <div className={styles.architectureFooter}>
        <span><i className={styles.legendBlue} /> Service boundaries</span>
        <span><i className={styles.legendMint} /> Integration points to explore</span>
      </div>
    </div>
  );
}

function ProjectArtwork({ project, featured = false }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (project.id === "convergenceguard") return <ServiceArchitecture />;

  return (
    <div className={featured ? styles.featureArtwork : styles.projectArtwork}>
      {!imageFailed && project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt || ""}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className={styles.imageFallback}>
          <span>{project.name}</span>
          <small>{project.category}</small>
        </div>
      )}
      <span className={styles.artEdge} aria-hidden="true" />
      {featured ? (
        <span className={styles.artCaption}>Aevor / platform workspace</span>
      ) : (
        <span className={styles.projectImageNumber} aria-hidden="true">PROJECT / {String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, "0")}</span>
      )}
    </div>
  );
}

function ProjectDetails({ project, onClose, onMove, index, total }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 20);

    function handleKeys(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
    }

    window.addEventListener("keydown", handleKeys);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeys);
    };
  }, [onClose, onMove]);

  return (
    <div className={styles.drawerBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className={styles.detailsDrawer} role="dialog" aria-modal="true" aria-labelledby="work-drawer-title">
        <div className={styles.drawerHeader}>
          <span>PROJECT NOTES / {project.status.toUpperCase()}</span>
          <button type="button" ref={closeButtonRef} onClick={onClose} aria-label="Close project details">×</button>
        </div>
        <div className={styles.drawerImage}>
          <ProjectArtwork project={project} featured={project.id === featuredProject.id} />
        </div>
        <p className={styles.drawerEyebrow}>{project.category}</p>
        <h3 id="work-drawer-title">{project.name}</h3>
        <p className={styles.drawerDescription}>{project.detail}</p>
        <div className={styles.drawerInfo}>
          <h4>Project notes</h4>
          <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className={styles.drawerInfo}>
          <h4>Technology</h4>
          <div className={styles.drawerTags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className={styles.drawerActions}>
          {project.live ? <a href={project.live} target="_blank" rel="noreferrer">Open live project <Arrow diagonal /></a> : null}
          <a href={project.repo} target="_blank" rel="noreferrer">Open repository <Arrow diagonal /></a>
          {project.secondary ? <a href={project.secondary} target="_blank" rel="noreferrer">{project.secondaryLabel || "Related repository"} <Arrow diagonal /></a> : null}
        </div>
        <div className={styles.drawerPager}>
          <button type="button" onClick={() => onMove(-1)}><span aria-hidden="true">←</span><span><small>PREVIOUS</small><strong>Project</strong></span></button>
          <span>{index + 1} / {total}</span>
          <button type="button" onClick={() => onMove(1)}><span><small>NEXT</small><strong>Project</strong></span><span aria-hidden="true">→</span></button>
        </div>
      </aside>
    </div>
  );
}

export default function FeaturedWork() {
  const [activeFilter, setActiveFilter] = useState("All projects");
  const [selected, setSelected] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef(null);
  const visibleProjects = useMemo(
    () => activeFilter === "All projects" ? projects : projects.filter((project) => project.filters.includes(activeFilter)),
    [activeFilter],
  );
  const selectedIndex = selected ? allProjects.findIndex((project) => project.id === selected.id) : -1;

  function scrollToProject(index) {
    const container = carouselRef.current;
    const cards = container?.querySelectorAll("[data-project-card]");
    const card = cards?.[index];
    setActiveCardIndex(index);
    if (!container || !card) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({
      left: Math.max(0, card.offsetLeft - container.offsetLeft - 10),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function moveCarousel(direction) {
    if (!visibleProjects.length) return;
    const next = (activeCardIndex + direction + visibleProjects.length) % visibleProjects.length;
    scrollToProject(next);
  }

  const closeDetails = useCallback(() => setSelected(null), []);
  const moveProject = useCallback((direction) => {
    setSelected((current) => {
      if (!current) return current;
      const index = allProjects.findIndex((project) => project.id === current.id);
      return allProjects[(index + direction + allProjects.length) % allProjects.length];
    });
  }, []);

  return (
    <section id="work" className={styles.workSection} aria-labelledby="work-title" tabIndex={-1}>
      <div className={styles.workBackdrop} aria-hidden="true" />
      <div className={styles.workShade} aria-hidden="true" />



      <div className={styles.workCanvas}>
        <div className={styles.workFeatureLayout}>
          <div className={styles.workIntro}>
            <p className={styles.workEyebrow}><span>02</span><i aria-hidden="true" /> SELECTED WORK <b aria-hidden="true" /></p>
            <h2 id="work-title">Selected <span>Work</span></h2>
            <p className={styles.workLead}>
              Five source-linked projects across developer tooling, collaboration, travel, reliability, and event applications. Open the implementation to assess architecture and code—not just a screenshot.
            </p>
            <a className={styles.allProjectsButton} href="https://github.com/knockknock10?tab=repositories" target="_blank" rel="noreferrer">
              View all projects <Arrow />
            </a>
            <a className={styles.scrollCue} href="#research">
              <span aria-hidden="true">↓</span><span>Scroll to explore</span>
            </a>
          </div>

          <article className={styles.featureCard} aria-labelledby="featured-aevor-title">
            <div className={styles.featureCopy}>
              <div className={styles.featureStatusRow}>
                <span className={styles.featuredBadge}>Featured project</span>
                <span className={styles.statusIndicator}><i /> {featuredProject.status}</span>
              </div>
              <p className={styles.featureLabel}>DEVELOPER TOOLING</p>
              <h3 id="featured-aevor-title">Aevor <span>Platform</span></h3>
              <p className={styles.featureDescription}>{featuredProject.description}</p>
              <div className={styles.featureTags}>{featuredProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className={styles.featureActions}>
                <button type="button" className={styles.featurePrimary} onClick={() => setSelected(featuredProject)}>Explore project <Arrow /></button>
                <a className={styles.featureSecondary} href={featuredProject.repo} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
              </div>
            </div>
            <button type="button" className={styles.featureImageButton} onClick={() => setSelected(featuredProject)} aria-label="Open Aevor Platform project details">
              <ProjectArtwork project={featuredProject} featured />
              <span className={styles.featureImageHint}>OPEN PROJECT <Arrow diagonal /></span>
            </button>
            <div className={styles.featureIndex} aria-hidden="true">01 <span>/ 05</span></div>
          </article>
        </div>

        <div className={styles.projectSectionHeader}>
          <div>
            <p>PROJECT ARCHIVE <span>·</span> 04 MORE BUILDS</p>
            <h3>Built, tested, shipped.</h3>
          </div>
          <div className={styles.projectFilters} role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? styles.filterActive : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setActiveCardIndex(0);
                  carouselRef.current?.scrollTo({ left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.carouselShell} role="region" aria-roledescription="carousel" aria-label="Selected projects">
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
            onClick={() => moveCarousel(-1)}
            aria-label="Previous project"
            disabled={visibleProjects.length < 2}
          >
            <span aria-hidden="true">←</span>
          </button>
          <div
            ref={carouselRef}
            className={styles.projectCarouselViewport}
            aria-live="polite"
            onScroll={() => {
              const container = carouselRef.current;
              const cards = Array.from(container?.querySelectorAll("[data-project-card]") || []);
              if (!container || !cards.length) return;
              const nextIndex = cards.reduce((bestIndex, card, index) => {
                const distance = Math.abs(card.offsetLeft - container.offsetLeft - container.scrollLeft - 4);
                const bestCard = cards[bestIndex];
                const bestDistance = Math.abs(bestCard.offsetLeft - container.offsetLeft - container.scrollLeft - 4);
                return distance < bestDistance ? index : bestIndex;
              }, 0);
              setActiveCardIndex((current) => current === nextIndex ? current : nextIndex);
            }}
          >
            <div className={styles.projectGrid}>
              {visibleProjects.map((project, index) => (
                <article
                  key={project.id}
                  data-project-card
                  data-active={activeCardIndex === index ? "true" : "false"}
                  className={styles.projectCard}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${visibleProjects.length}: ${project.name}`}
                >
                  <button type="button" className={styles.projectArtButton} onClick={() => setSelected(project)} aria-label={`Explore ${project.name} details`}>
                    <ProjectArtwork project={project} />
                    <span className={styles.openProject} aria-hidden="true"><Arrow diagonal /></span>
                  </button>
                  <div className={styles.projectCardBody}>
                    <div className={styles.projectCardEyebrow}><span>{project.category}</span><i data-status={project.status} /></div>
                    <div className={styles.projectCardTitleLine}>
                      <h4>{project.name}</h4>
                      <span className={styles.projectStatusText}>{project.status}</span>
                    </div>
                    <p>{project.description}</p>
                    <div className={styles.projectCardTags}>{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className={styles.projectCardActions}>
                      <button type="button" onClick={() => setSelected(project)}>View project <Arrow /></button>
                      {project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live ↗</a> : <a href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
            onClick={() => moveCarousel(1)}
            aria-label="Next project"
            disabled={visibleProjects.length < 2}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className={styles.carouselPagination} role="group" aria-label="Choose project">
          {visibleProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={activeCardIndex === index ? styles.carouselDotActive : styles.carouselDot}
              onClick={() => scrollToProject(index)}
              aria-label={`Show ${project.name}`}
              aria-pressed={activeCardIndex === index}
            />
          ))}
        </div>

        <div className={styles.moreProjectsBar}>
          <span className={styles.moreProjectsGlyph} aria-hidden="true">⌘</span>
          <div>
            <strong>There’s more in the repository.</strong>
            <p>Smaller experiments, utilities, and ongoing work live alongside these featured builds.</p>
          </div>
          <a href="https://github.com/knockknock10?tab=repositories" target="_blank" rel="noreferrer">Explore GitHub <Arrow diagonal /></a>
        </div>
      </div>

      {selected ? <ProjectDetails project={selected} onClose={closeDetails} onMove={moveProject} index={selectedIndex} total={allProjects.length} /> : null}
    </section>
  );
}
