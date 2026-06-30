import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/layout/SkipLink";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/analytics/CookieConsent";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import AnalyticsClickTracker from "@/components/analytics/AnalyticsClickTracker";
import { siteConfig } from "@/lib/site-config";

// Body + H4 — Inter. Weights 400 (body/lead/small) and 600 (H4).
// Exposed as --font-body; overrides the fallback stack declared in :root.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

// H1–H3 — Inter Tight. Weights 600 (H3) and 700 (H1/H2).
// Exposed as --font-heading; overrides the fallback stack declared in :root.
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// metadataBase lets relative OG/Twitter images and canonical URLs resolve to
// absolute HTTPS URLs. Page-level metadata (homepage, legal pages) overrides
// these defaults.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Opsfield Systems",
  description: "Diagnostic-first IT & business consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${inter.variable}`}>
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent />
        <AnalyticsProvider />
        <AnalyticsClickTracker />
      </body>
    </html>
  );
}
