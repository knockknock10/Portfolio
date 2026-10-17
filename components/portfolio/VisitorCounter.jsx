"use client";

import { useEffect, useState } from "react";
import styles from "./VisitorCounter.module.css";

export default function VisitorCounter() {
  const [counterUrl, setCounterUrl] = useState(null);
  const [counterFailed, setCounterFailed] = useState(false);

  useEffect(() => {
    setCounterUrl(
      "https://hits.sh/kr-sanjeev.netlify.app.svg?label=visitor%20number&color=6554d7&labelColor=ffffff&v=" +
        Date.now(),
    );
  }, []);

  return (
    <div className={styles.visitorLine}>
      <span className={styles.visitorSpark} aria-hidden="true" />
      <span className={styles.visitorMessage}>You are</span>
      <a
        className={styles.visitorBadgeLink}
        href="https://hits.sh/kr-sanjeev.netlify.app/"
        target="_blank"
        rel="noreferrer"
        aria-label="Open portfolio visit statistics"
      >
        {counterUrl && !counterFailed ? (
          <img
            src={counterUrl}
            alt="Portfolio visitor counter"
            loading="eager"
            decoding="async"
            onError={() => setCounterFailed(true)}
          />
        ) : (
          <span className={styles.visitorBadgePlaceholder} role="status">
            {counterFailed ? "counter unavailable" : "counting…"}
          </span>
        )}
      </a>
    </div>
  );
}
