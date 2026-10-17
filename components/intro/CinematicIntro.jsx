"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CinematicIntro.module.css";

const SESSION_KEY = "sanjeev-portfolio-intro-seen-v1";
const EXIT_DELAY = 1720;
const EXIT_DURATION = 620;

export default function CinematicIntro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const dismiss = useCallback(() => {
    if (!visible || leaving) return;
    clearTimers();
    setLeaving(true);
    timers.current.push(window.setTimeout(() => setVisible(false), EXIT_DURATION));
  }, [clearTimers, leaving, visible]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // If storage is unavailable, the intro still works for this page view.
    }

    setVisible(true);
    timers.current.push(window.setTimeout(() => setLeaving(true), EXIT_DELAY));
    timers.current.push(
      window.setTimeout(() => setVisible(false), EXIT_DELAY + EXIT_DURATION),
    );

    const onKeyDown = (event) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimers();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [clearTimers, dismiss]);

  useEffect(() => {
    if (!visible) return undefined;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.intro} ${leaving ? styles.leaving : ""}`}
      role="status"
      aria-label="Welcome to Sanjeev Kumar's portfolio"
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.orbThree} />
        <span className={styles.grain} />
      </div>

      <div className={styles.topline}>
        <span className={styles.monogram}>SK<span>.</span></span>
        <span className={styles.toplineLabel}>PORTFOLIO <span> / </span> 2026</span>
      </div>

      <div className={styles.center}>
        <p className={styles.eyebrow}><span className={styles.eyebrowDot} /> SOFTWARE · OPEN SOURCE · APPLIED AI</p>
        <h1 className={styles.greeting}>
          <span className={styles.hello}>Hello<span className={styles.period}>.</span></span>
          <span className={styles.nameLine}>I’m <span className={styles.name}>Sanjeev Kumar</span><span className={styles.period}>.</span></span>
        </h1>
        <p className={styles.subline}>Curiosity into craft. Ideas into impact.</p>
      </div>

      <div className={styles.bottomline}>
        <span className={styles.location}>BUILDING FROM INDIA <span aria-hidden="true">↗</span></span>
        <div className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progress} />
        </div>
        <button className={styles.skip} onClick={dismiss} type="button">
          Skip intro <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
