// Stage 2 — 11 top-level landing sections (placeholders).
// Section IDs and order are fixed by docs/sitemap.md → "Section IDs" / "MVP rule".
// Real content arrives in Stage 3; the form arrives in Stage 4.

const PLACEHOLDER = "Section content — Stage 3";

export default function Home() {
  return (
    <>
      {/* 1 */}
      <section id="hero" className="section">
        <div className="container">
          <h1>Diagnostic-First IT &amp; Business Consulting</h1>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>

      {/* 2 */}
      <section id="problem-section" className="section">
        <div className="container">
          <h2>Problem Section</h2>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>

      {/* 3 */}
      <section id="what-we-diagnose" className="section">
        <div className="container">
          <h2>What We Diagnose</h2>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>

      {/* 4 */}
      <section id="ai-process-automation" className="section">
        <div className="container">
          <h2>AI &amp; Process Automation</h2>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>

      {/* 5 */}
      <section id="how-the-diagnostic-works" className="section">
        <div className="container">
          <h2>How the Diagnostic Works</h2>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>

      {/* 6 */}
      <section id="proof-examples" className="section">
        <div className="container">
          <h2>Diagnostic Scenarios</h2>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>

      {/* 7 */}
      <section id="why-opsfield-systems" className="section">
        <div className="container">
          <h2>Why Opsfield Systems</h2>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>

      {/* 8 */}
      <section id="delivery-model" className="section">
        <div className="container">
          <h2>Delivery Model</h2>
          <p>{PLACEHOLDER}</p>
        </div>
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
        <div className="container">
          <h2>FAQ</h2>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>

      {/* 11 */}
      <section id="final-cta" className="section">
        <div className="container">
          <h2>Final CTA</h2>
          <p>{PLACEHOLDER}</p>
        </div>
      </section>
    </>
  );
}
