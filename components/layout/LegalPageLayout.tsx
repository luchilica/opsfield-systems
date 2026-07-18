import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./LegalPageLayout.module.css";

// Shared shell for legal pages (Privacy Policy, Terms of Use, Cookie Policy).
// Pure Server Component — no "use client". Full-width, expensive-SaaS document
// layout: a sticky sidebar (title + meta) beside a wide content column. The
// site <main> is provided by app/layout.tsx, so this must NOT render its own
// <main>. It also does NOT use the global .container — the legal page spans a
// wider max so it reads full-screen.

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className={styles.page}>
      <article className={styles.wrapper}>
        <aside className={styles.side}>
          <Link href="/" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </Link>

          <header className={styles.header}>
            <p className="kicker">Legal</p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.updated}>Last updated · {lastUpdated}</p>
          </header>
        </aside>

        <div className={styles.content}>{children}</div>
      </article>
    </div>
  );
}
