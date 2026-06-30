import type { Metadata } from "next";
import Link from "next/link";

// Custom 404. Next also auto-injects noindex for 404 responses; this makes the
// intent explicit (noindex, nofollow). No approved 404 copy exists in texts.md,
// so the microcopy below is minimal and functional.
export const metadata: Metadata = {
  title: "Page Not Found | Opsfield Systems",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container section">
      <h1>Page not found</h1>
      <p>The page you’re looking for doesn’t exist or may have moved.</p>
      <p>
        <Link href="/">Back to Home</Link> or{" "}
        <Link href="/#diagnostic-request-form">request a diagnostic</Link>.
      </p>
    </div>
  );
}
