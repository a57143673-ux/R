/**
 * Safsaf custom logomark
 * Italic spine with 3 horizontal bars — matches the uploaded brand design.
 *
 * Props:
 *   size   – controls both width and height (default 32)
 *   color  – stroke color (default "white")
 *   weight – stroke-width (default 2.2)
 */
interface LogoEProps {
  size?: number;
  color?: string;
  weight?: number;
  className?: string;
}

export default function LogoE({ size = 32, color = 'white', weight = 2.2, className = '' }: LogoEProps) {
  // Viewbox 0 0 56 52
  // The spine goes from bottom-left to top, angled ~20° italic
  // Three horizontal bars extend to the right
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Safsaf logo"
    >
      {/* ── Left spine (italic / slanted) ───────────────────
          Starts at bottom-left, curves slightly at top
          going up to the top-right before the horizontal bars.       */}
      <path
        d="M 6 47  Q 6 47 8 44  L 20 8  Q 22 4 26 4"
        stroke={color}
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Top bar ─────────────────────────────────────────
          Extends right from the top of the spine.
          Slight inward taper (right end just slightly lower).        */}
      <line
        x1="26" y1="4"
        x2="52" y2="5"
        stroke={color}
        strokeWidth={weight}
        strokeLinecap="round"
      />

      {/* ── Middle bar ──────────────────────────────────────
          Horizontal, from spine mid-point to the right.              */}
      <line
        x1="16" y1="26"
        x2="48" y2="26"
        stroke={color}
        strokeWidth={weight}
        strokeLinecap="round"
      />

      {/* ── Bottom bar ──────────────────────────────────────
          From the very bottom of the spine extending right.          */}
      <line
        x1="6" y1="47"
        x2="50" y2="47"
        stroke={color}
        strokeWidth={weight}
        strokeLinecap="round"
      />
    </svg>
  );
}
