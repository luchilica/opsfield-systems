import type { CSSProperties } from "react";

// The brand plus/cross motif (design.md v2). Decorative geometry — NOT a logo.
// Rendered from currentColor so callers set scale + color.
export default function PlusMark({
  size = 24,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8z" fill="currentColor" />
    </svg>
  );
}
