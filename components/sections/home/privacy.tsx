import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { continuation } from "@/content/home-continuation";

export function Privacy() {
  return (
    <section className="home-section privacy-section" aria-labelledby="privacy-heading">
      <Container>
        <p className="eyebrow section-eyebrow">Privacy &amp; Discretion</p>
        <div className="editorial-grid">
          <h2 id="privacy-heading">{continuation.privacy.heading}</h2>
          <div>
            <p className="editorial-copy">{continuation.privacy.description}</p>
            <dl className="privacy-principles">
              {continuation.privacy.principles.map((principle) => (
                <div key={principle.title}><dt>{principle.title}</dt><dd>{principle.description}</dd></div>
              ))}
            </dl>
            <ButtonLink className="section-link" href="/privacy-and-discretion" variant="secondary" prefetch={false}>Privacy &amp; Discretion</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
