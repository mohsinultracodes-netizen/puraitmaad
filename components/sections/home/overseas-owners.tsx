import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { continuation } from "@/content/home-continuation";

export function OverseasOwners() {
  return (
    <section className="home-section overseas-section" aria-labelledby="overseas-heading">
      <Container>
        <p className="eyebrow section-eyebrow">For owners abroad</p>
        <div className="editorial-grid">
          <div><h2 id="overseas-heading">{continuation.overseas.heading}</h2><p className="overseas-location">Local oversight. Lahore, Pakistan.</p></div>
          <div className="editorial-copy">
            {continuation.overseas.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ButtonLink className="section-link" href="/services/property-care" variant="secondary" prefetch={false}>For Overseas Owners</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
