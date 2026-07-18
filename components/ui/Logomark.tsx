import type { CSSProperties } from "react";

// Opsfield Systems brand mark — "Signet O".
// A signet-weight monogram ring (the "O" of Opsfield) with a single blue arc
// segment: the operational whole, with the found insight highlighted. Encodes
// the design tokens — ink structure = the situation, blue accent = the finding
// (--label-situation / --label-found in globals.css). No literal iconography.
//
// The ring uses currentColor so a caller sets it via `color` (ink on light
// surfaces, paper on dark ones). The arc stays the blue accent by default.
export default function Logomark({
  size = 32,
  accent = "var(--accent)",
  className,
  style,
}: {
  size?: number;
  accent?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <circle cx="16" cy="16" r="11.5" stroke="currentColor" strokeWidth="3.6" />
      {/* Blue accent segment (~85° of the ring, top). Circumference ≈ 72.26. */}
      <circle
        cx="16"
        cy="16"
        r="11.5"
        stroke={accent}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeDasharray="17 55.3"
        transform="rotate(-64 16 16)"
      />
    </svg>
  );
}
