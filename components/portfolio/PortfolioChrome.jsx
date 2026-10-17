"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "./SidebarNavigation";
import styles from "./HomeHero.module.css";

const links = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "open-source", label: "Open Source" },
  { id: "internships", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "coding", label: "Coding" },
  { id: "certifications", label: "Achievements" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function PortfolioChrome() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (pathname !== "/") {
      const routeSections = {
        "/research": "research",
        "/work": "work",
        "/open-source": "open-source",
        "/internships": "internships",
        "/experience": "internships",
        "/skills": "skills",
        "/problem-solving": "coding",
        "/certifications": "certifications",
        "/achievements": "certifications",
        "/about": "about",
        "/contact": "contact",
      };
      const matchedRoute = Object.keys(routeSections).find((route) => pathname === route || pathname.startsWith(route + "/"));
      setActive(matchedRoute ? routeSections[matchedRoute] : "home");
      return undefined;
    }
    const targets = links.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!targets.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (!visible.length) return;
      const nearest = visible.reduce((best, entry) => {
        const distance = Math.abs(entry.boundingClientRect.top - window.innerHeight * 0.28);
        const bestDistance = Math.abs(best.boundingClientRect.top - window.innerHeight * 0.28);
        return distance < bestDistance ? entry : best;
      });
      setActive(nearest.target.id);
    }, { rootMargin: "-12% 0px -66% 0px", threshold: 0 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  function navigate(event, id) {
    if (pathname !== "/") return;
    const target = document.getElementById(id);
    if (!target) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", "#" + id);
  }

  return (
    <>
      <SidebarNavigation />
      <header className={styles.topbar}>
        <nav className={styles.topNav} aria-label="Main navigation">
          {links.map((item) => (
            <a
              key={item.id}
              href={pathname === "/" ? "#" + item.id : "/#" + item.id}
              className={active === item.id ? styles.topNavActive : ""}
              aria-current={active === item.id ? "location" : undefined}
              onClick={(event) => navigate(event, item.id)}
            >
              {item.label}
              {active === item.id && <span className={styles.topNavDot} aria-hidden="true" />}
            </a>
          ))}
        </nav>
        <a className={styles.talkButton} href={pathname === "/" ? "#contact" : "/#contact"} onClick={(event) => navigate(event, "contact")}>
          Let’s Talk <span aria-hidden="true">→</span>
        </a>
      </header>
    </>
  );
}
