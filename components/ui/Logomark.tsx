import type { CSSProperties } from "react";

// Opsfield Systems brand mark — "Diagnostic Reticle".
// The ring is the "O" of Opsfield read as a diagnostic lens/field boundary;
// the plus is the brand cross motif (see PlusMark) captured inside it. Encodes
// the design tokens directly: ink structure = the situation, blue plus = the
// finding (--label-situation / --label-found in globals.css).
//
// The ring uses currentColor so a caller sets it via `color` (ink on light
// surfaces, paper on dark ones). The plus stays the blue accent by default.
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
      <circle
        cx="16"
        cy="16"
        r="12.6"
        stroke="currentColor"
        strokeWidth="2.3"
      />
      <rect x="14.3" y="9.6" width="3.4" height="12.8" rx="0.5" fill={accent} />
      <rect x="9.6" y="14.3" width="12.8" height="3.4" rx="0.5" fill={accent} />
    </svg>
  );
}
