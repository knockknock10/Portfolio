/*
 * Background SVG Component
 * Decorative floating SVGs for section backgrounds
 * 
 * Variants:
 * - blob1, blob2, blob3: Large organic floating shapes (for work/projects sections)
 * - circle, square, triangle: Small decorative shapes (for open source, skills sections)
 * - waveTop, waveBottom: Wave patterns for section edges
 * 
 * @example
 * <BackgroundSVG variant="blob1" className="sk-moving-svg sk-moving-svg--projects-top" />
 * <BackgroundSVG variant="circle" className="sk-deco-svg sk-deco-svg--circle sk-deco-svg--right-top" />
 */

interface BackgroundSVGProps {
  /** The type of SVG to render */
  variant: "blob1" | "blob2" | "blob3" | "circle" | "square" | "triangle" | "waveTop" | "waveBottom"
  /** Additional class names for positioning and styling */
  className?: string
}

export function BackgroundSVG({ variant, className = "" }: BackgroundSVGProps) {
  const svgs = {
    blob1: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,71.1,32.6C60,43.7,49.1,53,37.2,60.7C25.3,68.4,12.4,74.5,-0.7,75.7C-13.8,76.9,-26.9,73.2,-39.1,66.3C-51.3,59.4,-62.6,49.3,-70.9,36.6C-79.2,23.9,-84.5,8.6,-82.6,-5.7C-80.7,-20,-71.6,-33.3,-60.3,-43.7C-49,-54.1,-35.5,-61.6,-21.6,-65.6C-7.7,-69.6,6.6,-70.1,20.5,-68.3L44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>
    ),
    blob2: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M41.3,-70.6C53.9,-63.3,64.6,-53.1,72.2,-41.1C79.8,-29.1,84.3,-15.3,83.4,-2.1C82.5,11.1,76.2,23.7,67.5,34.3C58.8,44.9,47.7,53.5,35.7,60.6C23.7,67.7,10.8,73.3,-2.2,77.1C-15.2,80.9,-29.3,82.9,-42.1,78.2C-54.9,73.5,-66.4,62.1,-74.3,48.6C-82.2,35.1,-86.5,19.5,-85.8,4.3C-85.1,-10.9,-79.4,-25.7,-70.3,-38.1C-61.2,-50.5,-48.7,-60.5,-35.4,-67.3C-22.1,-74.1,-8,-77.7,3.9,-83.8L41.3,-70.6Z"
          transform="translate(100 100)"
        />
      </svg>
    ),
    blob3: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M47.7,-73.2C61.5,-66.8,71.8,-54.2,79.3,-40.1C86.8,-26,91.5,-10.4,89.2,4.3C86.9,19,77.6,32.8,66.7,44.5C55.8,56.2,43.3,65.8,29.7,71.8C16.1,77.8,1.4,80.2,-12.9,78.6C-27.2,77,-40.5,71.4,-52.6,63.1C-64.7,54.8,-75.6,43.8,-81.8,30.4C-88,17,-89.5,1.2,-86.1,-12.8C-82.7,-26.8,-74.4,-39.1,-63.9,-48.8C-53.4,-58.5,-40.7,-65.6,-27.6,-72.7C-14.5,-79.8,-1,-86.9,12.2,-86.2L47.7,-73.2Z"
          transform="translate(100 100)"
        />
      </svg>
    ),
    circle: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
    square: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
    triangle: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <polygon points="50,25 80,80 20,80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <polygon points="50,40 70,70 30,70" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
    waveTop: (
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    ),
    waveBottom: (
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        />
      </svg>
    ),
  }

  return (
    <div className={className} aria-hidden="true">
      {svgs[variant]}
    </div>
  )
}
