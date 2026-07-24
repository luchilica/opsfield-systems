"use client";

import { useT } from "@/i18n/useT";
import { Link } from "@/i18n/navigation";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useT();

  return (
    <div className="container section" style={{ textAlign: "center", paddingTop: "6rem" }}>
      <h1>{t("Something went wrong")}</h1>
      <p style={{ marginTop: "1rem", color: "var(--ink-500)" }}>
        {t("An unexpected error occurred. Please try again or return to the homepage.")}
      </p>
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "0.75rem 1.5rem",
            background: "var(--blue-500)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {t("Try again")}
        </button>
        <Link
          href="/"
          style={{
            padding: "0.75rem 1.5rem",
            border: "1px solid var(--ink-100)",
            borderRadius: "8px",
            textDecoration: "none",
            color: "inherit",
            fontWeight: 600,
          }}
        >
          {t("Back to Home")}
        </Link>
      </div>
    </div>
  );
}
