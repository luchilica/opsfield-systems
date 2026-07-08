import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./LegalPageLayout.module.css";

// Shared shell for legal pages (Privacy Policy, Terms of Use, Cookie Policy).
// Pure Server Component — no "use client". Renders inside the site container
// with a 720px text column. The site <main> is provided by app/layout.tsx, so
// this component must NOT render its own <main>.

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
    <div className="container">
      <article className={styles.wrapper}>
        <Link href="/" className={styles.back}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </Link>

        <header className={styles.header}>
          <p className="kicker">Legal</p>
          <h1>{title}</h1>
          <p className={styles.updated}>Last updated · {lastUpdated}</p>
        </header>

        <div className={styles.content}>{children}</div>
      </article>
    </div>
  );
}
