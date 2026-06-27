// Stage 2 — 11 top-level landing sections (placeholders).
// Section IDs and order are fixed by docs/sitemap.md → "Section IDs" / "MVP rule".
// Real content arrives in Stage 3; the form arrives in Stage 4.

import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import WhatWeDiagnose from "@/components/sections/WhatWeDiagnose";
import AIProcessAutomation from "@/components/sections/AIProcessAutomation";
import HowDiagnosticWorks from "@/components/sections/HowDiagnosticWorks";
import DiagnosticScenarios from "@/components/sections/DiagnosticScenarios";
import WhyOpsfield from "@/components/sections/WhyOpsfield";
import DeliveryModel from "@/components/sections/DeliveryModel";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

const PLACEHOLDER = "Section content — Stage 3";

export default function Home() {
  return (
    <>
      {/* 1 */}
      <section id="hero" className="section">
        <Hero />
      </section>

      {/* 2 */}
      <section id="problem-section" className="section">
        <ProblemSection />
      </section>

      {/* 3 */}
      <section id="what-we-diagnose" className="section">
        <WhatWeDiagnose />
      </section>

      {/* 4 */}
      <section id="ai-process-automation" className="section">
        <AIProcessAutomation />
      </section>

      {/* 5 */}
      <section id="how-the-diagnostic-works" className="section">
        <HowDiagnosticWorks />
      </section>

      {/* 6 */}
      <section id="proof-examples" className="section">
        <DiagnosticScenarios />
      </section>

      {/* 7 */}
      <section id="why-opsfield-systems" className="section">
        <WhyOpsfield />
      </section>

      {/* 8 */}
      <section id="delivery-model" className="section">
        <DeliveryModel />
      </section>

      {/* 9 — composite conversion section; form is a nested target */}
      <section id="business-it-diagnostic" className="section">
        <div className="container">
          <h2>Business &amp; IT Diagnostic</h2>
          <p>{PLACEHOLDER}</p>
          <div id="diagnostic-request-form">
            <p>{PLACEHOLDER}</p>
          </div>
        </div>
      </section>

      {/* 10 */}
      <section id="faq" className="section">
        <FAQ />
      </section>

      {/* 11 */}
      <section id="final-cta" className="section">
        <FinalCTA />
      </section>
    </>
  );
}
