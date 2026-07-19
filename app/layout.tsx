import type { Metadata } from "next";
import { Mulish, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/layout/SkipLink";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/analytics/CookieConsent";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import AnalyticsClickTracker from "@/components/analytics/AnalyticsClickTracker";
import { siteConfig } from "@/lib/site-config";

// v2 brand face — Mulish, weight-driven hierarchy (900 display/wordmark, 800
// sub-heads, 700 UI, 600 emphasis, 400–500 body). Self-hosted by next/font
// (no third-party font requests). Exposed as --font-sans.
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

// v2 mono — JetBrains Mono for eyebrows, data labels, badges, form labels and
// metric readouts. Exposed as --font-mono.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
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
    <html lang="en-US">
      <body className={`${mulish.variable} ${jetbrainsMono.variable}`}>
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
