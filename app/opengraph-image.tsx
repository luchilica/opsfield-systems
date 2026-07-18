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
        {/* Brand reticle mark (see components/ui/Logomark) */}
        <svg
          width={120}
          height={120}
          viewBox="0 0 32 32"
          fill="none"
          style={{ marginBottom: 32 }}
        >
          <circle cx="16" cy="16" r="12.6" stroke="#0B1220" strokeWidth="2.3" />
          <rect x="14.3" y="9.6" width="3.4" height="12.8" rx="0.5" fill="#2551D2" />
          <rect x="9.6" y="14.3" width="12.8" height="3.4" rx="0.5" fill="#2551D2" />
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
