type WaveProps = {
  edge: "top" | "bottom"
}

/** A flat, solid-colour wavy edge for dark sections. Colour comes from the .sk-wave CSS fill. */
export function Wave({ edge }: WaveProps) {
  return (
    <svg
      className={edge === "top" ? "sk-wave sk-wave--top" : "sk-wave sk-wave--bottom"}
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 90V52C140 18 292 8 448 34c150 25 270 52 430 36 150-15 250-52 400-50 70 1 122 9 162 20V90Z" />
    </svg>
  )
}
