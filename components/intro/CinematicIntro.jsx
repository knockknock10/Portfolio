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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
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
        viewBox="0 0 520 210"
        role="img"
        aria-label="hello"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.ink}>
          <path className={styles.h} pathLength="1" d="M 28 158 C 43 134, 59 65, 72 42 C 79 27, 91 32, 86 50 C 76 87, 63 126, 66 148 C 68 162, 82 151, 100 132 C 111 121, 119 120, 127 133 C 134 144, 135 150, 148 146" />
          <path className={styles.e} pathLength="1" d="M 148 146 C 164 127, 183 112, 200 122 C 213 130, 202 145, 187 147 C 172 149, 169 136, 180 126 C 192 116, 208 128, 222 140 C 232 149, 242 151, 254 143" />
          <path className={styles.eCrossbar} pathLength="1" d="M 171 136 C 182 135, 194 135, 203 133" />
          <path className={styles.firstL} pathLength="1" d="M 254 143 C 269 111, 283 57, 296 38 C 304 25, 315 31, 309 50 C 299 83, 281 128, 285 147 C 288 161, 302 153, 315 142" />
          <path className={styles.secondL} pathLength="1" d="M 315 142 C 330 110, 344 56, 357 38 C 365 25, 376 31, 370 50 C 360 83, 342 128, 346 147 C 349 161, 363 153, 376 142" />
          <path className={styles.o} pathLength="1" d="M 376 142 C 389 128, 406 116, 420 127 C 435 139, 420 155, 406 156 C 392 157, 389 144, 401 132 C 414 119, 426 130, 438 142 C 449 153, 461 150, 474 139" />
        </g>
      </svg>
    </div>
  );
}
