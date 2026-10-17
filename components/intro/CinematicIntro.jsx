"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CinematicIntro.module.css";

const INTRO_HOLD = 2850;
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
      <svg
        className={styles.hello}
        viewBox="0 0 720 250"
        role="img"
        aria-label="hello"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.ink}>
          <path className={styles.h} pathLength="1" d="M 48 174 C 62 148, 76 77, 91 44 C 99 27, 111 34, 108 57 C 103 91, 91 137, 95 158 C 98 177, 119 163, 139 139 C 151 125, 163 113, 177 120 C 191 127, 174 148, 157 146 C 137 143, 144 117, 164 116 C 183 114, 193 134, 207 143 C 222 153, 239 137, 250 124" />
          <path className={styles.e} pathLength="1" d="M 205 143 C 221 145, 238 131, 250 119 C 264 105, 281 113, 271 127 C 261 141, 239 148, 234 135 C 227 118, 248 107, 265 117 C 279 125, 286 144, 303 145 C 320 146, 333 128, 346 112" />
          <path className={styles.firstL} pathLength="1" d="M 298 145 C 314 109, 332 53, 350 34 C 361 22, 370 31, 364 53 C 353 94, 336 133, 340 151 C 343 168, 361 158, 377 141" />
          <path className={styles.secondL} pathLength="1" d="M 369 145 C 385 108, 404 51, 422 34 C 433 23, 441 33, 435 55 C 424 95, 407 134, 411 151 C 415 168, 432 157, 448 141" />
          <path className={styles.o} pathLength="1" d="M 450 139 C 466 119, 484 105, 499 116 C 515 128, 499 153, 480 158 C 460 164, 454 142, 470 124 C 486 106, 507 119, 520 137 C 535 158, 553 160, 575 143 C 596 127, 616 111, 636 119 C 656 128, 640 151, 622 153 C 601 156, 603 128, 625 119 C 645 111, 661 133, 678 145" />
        </g>
      </svg>
    </div>
  );
}
