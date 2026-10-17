"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CinematicIntro.module.css";

const INTRO_HOLD = 3100;
const EXIT_DURATION = 750;

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
      <svg
        className={styles.hello}
        viewBox="0 0 720 250"
        role="img"
        aria-label="hello"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.ink}>
          <path className={styles.h} pathLength="1" d="M 62 176 C 75 138, 91 69, 108 43 C 117 29, 126 39, 121 60 C 111 103, 98 146, 104 163 C 110 180, 129 161, 146 145" />
          <path className={styles.e} pathLength="1" d="M 143 146 C 160 130, 174 111, 190 120 C 203 128, 192 143, 176 147 C 160 150, 156 137, 166 126 C 178 114, 194 122, 206 136 C 216 147, 227 150, 239 141" />
          <path className={styles.firstL} pathLength="1" d="M 239 141 C 260 98, 278 49, 292 35 C 303 25, 311 37, 304 59 C 293 98, 279 138, 286 154 C 292 167, 305 157, 319 144" />
          <path className={styles.secondL} pathLength="1" d="M 319 144 C 341 99, 357 49, 371 35 C 382 25, 390 37, 383 59 C 372 98, 359 138, 365 154 C 371 167, 385 157, 399 144" />
          <path className={styles.o} pathLength="1" d="M 399 144 C 416 123, 436 111, 451 123 C 467 139, 450 160, 431 161 C 412 162, 408 142, 423 127 C 438 112, 456 121, 470 137 C 484 153, 496 151, 508 140" />
        </g>
      </svg>
    </div>
  );
}
