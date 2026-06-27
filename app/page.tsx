import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// Temporary design-system check page (Stage 1). Replaced in Stage 2.
export default function Home() {
  const block = { marginBottom: "var(--space-6)" } as const;
  const row = {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-3)",
  } as const;

  return (
    <main className="container section">
      {/* Headings */}
      <section style={block}>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
      </section>

      {/* Text styles */}
      <section style={block}>
        <p className="lead">Lead paragraph</p>
        <p>Body paragraph</p>
        <p className="small">Small text</p>
        <p className="xsmall">Extra small text</p>
      </section>

      {/* Buttons */}
      <section style={block}>
        <div style={row}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button icon>With Icon</Button>
        </div>
      </section>

      {/* Cards */}
      <section style={{ ...row, marginBottom: 0 }}>
        <Card>Basic card with content</Card>
        <Card as="article">Article card</Card>
        <Card hover={false}>Card without hover</Card>
      </section>
    </main>
  );
}
