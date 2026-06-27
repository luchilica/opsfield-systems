// 11 top-level landing sections in the order fixed by docs/sitemap.md.
// Section 9 (Business & IT Diagnostic) holds the nested #diagnostic-request-form;
// the form body itself arrives in the next Stage 4 prompt.

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
import BusinessITDiagnostic from "@/components/sections/BusinessITDiagnostic";

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
        <BusinessITDiagnostic />
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
