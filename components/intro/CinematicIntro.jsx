"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CinematicIntro.module.css";

const INTRO_HOLD = 2300;
const EXIT_DURATION = 700;

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
    setVisible(true);
    timers.current.push(window.setTimeout(() => setLeaving(true), INTRO_HOLD));
    timers.current.push(
      window.setTimeout(() => setVisible(false), INTRO_HOLD + EXIT_DURATION),
    );

    return clearTimers;
  }, [clearTimers]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismiss]);

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
      aria-label="Hello. Welcome to Sanjeev Kumar's portfolio."
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.halo} />
        <span className={styles.hairline} />
      </div>

      <div className={styles.wordmark} aria-label="Hello">
        <span className={styles.hello}>hello</span>
        <span className={styles.helloPeriod} aria-hidden="true">.</span>
      </div>

      <div className={styles.signature}>
        <span className={styles.signatureRule} />
        <p className={styles.name}>Sanjeev Kumar</p>
        <p className={styles.descriptor}>Software · Open source · Applied AI</p>
      </div>

      <button className={styles.skip} onClick={dismiss} type="button">
        Skip <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
