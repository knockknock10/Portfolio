/*
 * Curved Line Between Sections
 * A flowing curved line that connects sections visually
 *
 * @example
 * <CurvedLineBetween />
 * <CurvedLineBetween flipped />
 */

interface CurvedLineBetweenProps {
  /** Flip the curve direction */
  flipped?: boolean
  /** Additional class names */
  className?: string
}

export function CurvedLineBetween({ flipped = false, className = "" }: CurvedLineBetweenProps) {
  return (
    <div
      className={`sk-curved-line sk-curved-line--between-work-oss ${className}`}
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
        <path
          d="M0,150 
             C240,50 480,250 720,150 
             C960,50 1200,250 1440,150"
        />
      </svg>
    </div>
  )
}
