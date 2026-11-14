/**
 * The scene behind the glass: flowing contour lines in two colours (blue and coral).
 * Thin lines have hard, high-contrast edges, so the glass in front visibly bends them.
 * Pure SVG; the CSS moves it. The same class as the old shape field lets Motion lean it toward the pointer.
 */
const W = 3200
const H = 1200
const LINES = 12

function wave(i: number): string {
  const base = ((i + 0.5) / LINES) * H
  const amp = 34 + (i % 5) * 13
  const phase = i * 0.9
  const pts: string[] = []
  for (let x = 0; x <= W; x += 10) {
    // Periods of 800 and 400 so the line repeats every 800 and the flow can loop without a seam.
    const y = base + amp * Math.sin((x / 800) * Math.PI * 2 + phase) + (amp * 0.45) * Math.sin((x / 400) * Math.PI * 2 + phase * 1.7)
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`)
  }
  return pts.join(" ")
}

const paths = Array.from({ length: LINES }, (_, i) => ({ d: wave(i), coral: i % 2 === 1, thick: i % 3 === 0, i }))

export function LiquidLines() {
  return (
    <div className="lq-field ll-field" aria-hidden="true">
      <svg className="ll-svg" viewBox={`0 0 ${W / 2} ${H}`} preserveAspectRatio="none">
        {paths.map((p) => (
          <g key={p.i} className={`ll-g ll-g--${p.i % 5}`}>
            <path
              className="ll-line"
              d={p.d}
              fill="none"
              stroke={p.coral ? "var(--c-coral)" : "var(--c-blue)"}
              strokeWidth={p.thick ? 7 : 2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={p.thick ? 0.42 : 0.75}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
