import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

export function Solution() {
  return (
    <section className="home-section solution-section" aria-labelledby="solution-heading">
      <Container>
        <p className="eyebrow section-eyebrow">The Pur Aitmaad approach</p>
        <div className="editorial-grid">
          <h2 id="solution-heading">{home.solution.heading}</h2>
          <p className="editorial-copy">{home.solution.description}</p>
        </div>
        <ol className="stewardship-steps">
          {home.solution.steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
