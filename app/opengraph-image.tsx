import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Open Graph / social share card (1200×630) — the preview shown when the site
// link is pasted into Slack, iMessage, LinkedIn, etc. Dark brand composition:
// Signet-O logo + name + tagline on the left, a duotone team-at-work photo
// bleeding in from the right. The blue duotone is baked into public/og/team.jpg
// (satori's CSS filters are unreliable). Applies site-wide via the file
// convention; Next injects og:image / twitter:image tags. Twitter card re-exports
// this from twitter-image.tsx so both stay in sync.

export const alt =
  "Opsfield Systems — Diagnostic-First IT & Business Development";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function Image() {
  // process.cwd() is the Next.js project root. Inlined as a data URI so the
  // asset is bundled into the ImageResponse (well under the 500KB budget: ~38KB).
  const teamData = await readFile(join(process.cwd(), "public/og/team.jpg"));
  const teamSrc = `data:image/jpeg;base64,${teamData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0B1220",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand-blue bloom, top-right (matches the site's dark sections). */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 680,
            height: 680,
            borderRadius: 680,
            display: "flex",
            background:
              "radial-gradient(closest-side, rgba(37,81,210,0.38), rgba(37,81,210,0))",
          }}
        />

        {/* Team-at-work photo, bleeding in from the right. */}
        <img
          src={teamSrc}
          width={540}
          height={630}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 540,
            height: 630,
            objectFit: "cover",
          }}
        />
        {/* Fade the photo's left edge into the dark background. */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 720,
            height: 630,
            display: "flex",
            background:
              "linear-gradient(90deg, #0B1220 0%, rgba(11,18,32,0.72) 26%, rgba(11,18,32,0) 58%)",
          }}
        />

        {/* Left content column. */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 720,
            height: 630,
            padding: "0 76px",
          }}
        >
          {/* Logo lockup: Signet-O ring (blue arc → white on dark) + wordmark. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <svg width={72} height={72} viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="ogRing" x1="1" y1="0" x2="0.25" y2="0.9">
                  <stop offset="0" stopColor="#8FB0F5" />
                  <stop offset="0.3" stopColor="#4F7CE8" />
                  <stop offset="0.62" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#FFFFFF" />
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
                fontSize: 40,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Opsfield Systems
            </div>
          </div>

          <div
            style={{
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8FB0F5",
              marginBottom: 22,
            }}
          >
            B2B IT & Operations Advisory
          </div>

          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              color: "#FFFFFF",
            }}
          >
            Diagnostic-First IT & Business Development
          </div>

          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              fontWeight: 400,
              lineHeight: 1.3,
              color: "#9AA7BD",
            }}
          >
            Find the bottleneck before you commit budget.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
