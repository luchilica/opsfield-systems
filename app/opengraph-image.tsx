import { ImageResponse } from "next/og";

// Open Graph image — PLACEHOLDER. design.md requires replacement with approved
// brand assets before production deployment. Colors are the design tokens:
// --bg-page (#F8FAFC), --text-primary (#0B1220), --text-secondary (#475569).
// Applies site-wide via the file convention; Next injects og:image tags.

export const alt =
  "Opsfield Systems — Diagnostic-First IT & Business Consulting";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F8FAFC",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "0 96px",
        }}
      >
        {/* Brand mark — Signet O (see components/ui/Logomark). Gradient stroke
            only; next-og/satori does not render SVG filters. */}
        <svg
          width={120}
          height={120}
          viewBox="0 0 32 32"
          fill="none"
          style={{ marginBottom: 32 }}
        >
          <defs>
            <linearGradient id="ogRing" x1="1" y1="0" x2="0.25" y2="0.9">
              <stop offset="0" stopColor="#5C86FF" />
              <stop offset="0.22" stopColor="#2551D2" />
              <stop offset="0.46" stopColor="#0B1220" />
              <stop offset="1" stopColor="#0B1220" />
            </linearGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="11.5"
            stroke="url(#ogRing)"
            strokeWidth="3.6"
          />
        </svg>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#0B1220",
            letterSpacing: "-0.02em",
          }}
        >
          Opsfield Systems
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 40,
            fontWeight: 400,
            color: "#475569",
          }}
        >
          Diagnostic-First IT & Business Consulting
        </div>
      </div>
    ),
    { ...size },
  );
}
