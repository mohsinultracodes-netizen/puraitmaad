import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { continuation } from "@/content/home-continuation";

export function ArrivalReady() {
  return (
    <section className="home-section arrival-section" aria-labelledby="arrival-heading">
      <Container>
        <p className="eyebrow section-eyebrow">Arrival Ready · A signature service</p>
        <div className="arrival-grid">
          <div>
            <h2 id="arrival-heading">{continuation.arrival.heading}</h2>
            <p className="section-description">{continuation.arrival.description}</p>
            <ButtonLink className="section-link" href="/services/property-care#coming-home" variant="secondary" prefetch={false}>Discover Arrival Ready</ButtonLink>
          </div>
          <dl className="arrival-preparations">
            {continuation.arrival.groups.map((group) => (
              <div key={group.title}><dt>{group.title}</dt><dd>{group.description}</dd></div>
            ))}
          </dl>
        </div>
        <p className="arrival-scope">Preparation is tailored to your property and agreed service plan.</p>
      </Container>
    </section>
  );
}
