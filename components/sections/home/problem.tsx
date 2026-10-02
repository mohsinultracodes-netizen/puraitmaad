import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

export function Problem() {
  return (
    <section className="home-section problem-section" aria-labelledby="problem-heading">
      <Container>
        <p className="eyebrow section-eyebrow">The responsibility of ownership</p>
        <div className="editorial-grid">
          <h2 id="problem-heading">{home.problem.heading}</h2>
          <div className="editorial-copy">
            {home.problem.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
