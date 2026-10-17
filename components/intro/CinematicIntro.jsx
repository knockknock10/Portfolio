"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CinematicIntro.module.css";

const INTRO_HOLD = 2100;
const EXIT_DURATION = 650;

export default function CinematicIntro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    setVisible(true);
    timers.current.push(window.setTimeout(() => setLeaving(true), INTRO_HOLD));
    timers.current.push(
      window.setTimeout(() => setVisible(false), INTRO_HOLD + EXIT_DURATION),
    );

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.intro} ${leaving ? styles.leaving : ""}`}
      role="status"
      aria-label="hello"
    >
      <span className={styles.hello}>hello</span>
    </div>
  );
}
