import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { continuation } from "@/content/home-continuation";

export function FinalCta() {
  return (
    <section className="home-section closing-section" aria-labelledby="closing-heading">
      <Container>
        <p className="eyebrow section-eyebrow">Your property. In trusted hands.</p>
        <h2 id="closing-heading">{continuation.closing.heading}</h2>
        <p className="closing-description">{continuation.closing.description}</p>
        <ButtonLink className="section-link" href="/contact#request-service" prefetch={false}>Request a Service</ButtonLink>
        <p className="closing-coverage">{continuation.closing.coverage}</p>
      </Container>
    </section>
  );
}
