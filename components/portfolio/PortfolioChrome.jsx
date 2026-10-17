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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [closingZoneVisible, setClosingZoneVisible] = useState(false);

  useEffect(() => {
    const closingRegions = Array.from(document.querySelectorAll(".visitorLine, .site-footer"));
    if (!closingRegions.length) {
      setClosingZoneVisible(false);
      return undefined;
    }
    let frame = 0;
    const updateClosingZone = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const visible = closingRegions.some((element) => {
          const rect = element.getBoundingClientRect();
          return rect.top < window.innerHeight * 0.98 && rect.bottom > 0;
        });
        setClosingZoneVisible(visible);
      });
    };
    const observer = new IntersectionObserver(updateClosingZone, { threshold: 0 });
    closingRegions.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", updateClosingZone, { passive: true });
    window.addEventListener("resize", updateClosingZone);
    updateClosingZone();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateClosingZone);
      window.removeEventListener("resize", updateClosingZone);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setScrollProgress(0);
      return undefined;
    }
    let frame = 0;
    const updateProgress = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const root = document.documentElement;
        const scrollable = root.scrollHeight - window.innerHeight;
        const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
        setScrollProgress(Math.min(1, Math.max(0, amount)));
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

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
      <SidebarNavigation closingZoneVisible={closingZoneVisible} />
      <header className={`${styles.topbar} ${closingZoneVisible ? styles.topbarFooterClear : ""}`}>
        <div className={styles.scrollProgress} aria-hidden="true">
          <span style={{ transform: "scaleX(" + scrollProgress + ")" }} />
        </div>
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
