"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./HomeHero.module.css";

const items = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "open-source", label: "Open Source" },
  { id: "internships", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "signals", label: "Coding" },
  { id: "certifications", label: "Achievements" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SidebarNavigation() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [pinnedOpen, setPinnedOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      const routeSections = {
        "/research": "research",
        "/work": "work",
        "/open-source": "open-source",
        "/experience": "internships",
        "/internships": "internships",
        "/skills": "skills",
        "/problem-solving": "signals",
        "/signals": "signals",
        "/certifications": "certifications",
        "/achievements": "certifications",
        "/about": "about",
        "/contact": "contact",
      };
      const matchedRoute = Object.keys(routeSections).find((route) => pathname === route || pathname.startsWith(route + "/"));
      setActive(matchedRoute ? routeSections[matchedRoute] : "home");
      return undefined;
    }
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;

        const closest = visible.reduce((best, entry) => {
          const distance = Math.abs(entry.boundingClientRect.top - window.innerHeight * 0.3);
          const bestDistance = Math.abs(best.boundingClientRect.top - window.innerHeight * 0.3);
          return distance < bestDistance ? entry : best;
        });
        setActive(closest.target.id);
      },
      { rootMargin: "-12% 0px -64% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  function navigate(event, item) {
    if (pathname !== "/") return;
    const target = document.getElementById(item.id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reduceMotion() ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(window.history.state, "", "#" + item.id);
    setPinnedOpen(false);
  }

  return (
    <aside
      className={`${styles.sidebar} ${pinnedOpen ? styles.sidebarPinned : ""}`}
      aria-label="Portfolio section rail"
      onKeyDown={(event) => {
        if (event.key === "Escape") setPinnedOpen(false);
      }}
    >
      <a
        className={styles.sidebarBrand}
        href={pathname === "/" ? "#home" : "/#home"}
        aria-label="Sanjeev Kumar — Home"
        onClick={(event) => navigate(event, items[0])}
      >
        <span className={styles.sidebarMonogram}>SK</span>
        <span className={styles.sidebarBrandName}>Sanjeev Kumar</span>
      </a>

      <button
        className={styles.sidebarToggle}
        type="button"
        aria-label={pinnedOpen ? "Collapse section navigation" : "Pin section navigation open"}
        aria-expanded={pinnedOpen}
        onClick={() => setPinnedOpen((open) => !open)}
      >
        <span className={styles.sidebarToggleGlyph} aria-hidden="true">
          {pinnedOpen ? "‹" : "›"}
        </span>
      </button>

      <nav className={styles.sidebarLinks} aria-label="Portfolio sections">
        {items.map((item, index) => (
          <a
            key={item.id}
            className={`${styles.sidebarLink} ${active === item.id ? styles.sidebarLinkActive : ""}`}
            href={pathname === "/" ? "#" + item.id : "/#" + item.id}
            aria-current={active === item.id ? "location" : undefined}
            onClick={(event) => navigate(event, item)}
          >
            <span className={styles.sidebarIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.sidebarLabel}>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className={styles.sidebarBottom}>
        <a
          className={styles.sidebarGithub}
          href="https://github.com/knockknock10"
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitHub profile in a new tab"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>
          <span className={styles.sidebarBrandName}>GitHub</span>
        </a>
        <span className={styles.sidebarFooterMark} aria-hidden="true">↗</span>
      </div>
    </aside>
  );
}
