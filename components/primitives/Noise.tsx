"use client"

import { useId } from "react";

export function Noise() {
  const filterId = "grain-" + useId().replace(/:/g, "");

  return (
    <svg className="noise-overlay" aria-hidden="true" focusable="false">
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={"url(#" + filterId + ")"} />
    </svg>
  );
}