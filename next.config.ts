import type { NextConfig } from "next";

// Preview isolation: on any non-production deployment, send X-Robots-Tag:
// noindex, nofollow on every route as defense-in-depth alongside meta robots.
// Production sends no such header.
const nextConfig: NextConfig = {
  async headers() {
    if (process.env.SITE_MODE === "production") {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
