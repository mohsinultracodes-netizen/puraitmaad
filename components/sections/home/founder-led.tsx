import { Container } from "@/components/ui/container";
import { continuation } from "@/content/home-continuation";

export function FounderLed() {
  return (
    <section className="home-section founder-section" aria-labelledby="founder-heading">
      <Container>
        <p className="eyebrow section-eyebrow">Founder-led care</p>
        <div className="editorial-grid">
          <h2 id="founder-heading">{continuation.founder.heading}</h2>
          <div className="editorial-copy">
            {continuation.founder.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
