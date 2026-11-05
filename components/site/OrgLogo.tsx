"use client"

import { useState } from "react"

/** An organisation or owner avatar from GitHub, with the first letter as a fallback if it can't load. */
export function OrgLogo({ owner, name, size = 56 }: { owner: string; name: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className="gl-logo" style={{ width: size, height: size }}>
      {failed ? (
        <span className="gl-logo__fallback" aria-hidden="true">
          {name.slice(0, 1).toUpperCase()}
        </span>
      ) : (
        <img
          src={`https://github.com/${encodeURIComponent(owner)}.png?size=${size * 2}`}
          alt={`${name} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}
