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
        {/* Brand mark — Signet O (see components/ui/Logomark). Blue segment
            drawn as an explicit arc path for satori/next-og compatibility. */}
        <svg
          width={120}
          height={120}
          viewBox="0 0 32 32"
          fill="none"
          style={{ marginBottom: 32 }}
        >
          <circle cx="16" cy="16" r="11.5" stroke="#0B1220" strokeWidth="3.6" />
          <path
            d="M16 4.5 A11.5 11.5 0 0 1 27.32 14"
            stroke="#2551D2"
            strokeWidth="3.6"
            strokeLinecap="round"
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
