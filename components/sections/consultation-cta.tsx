import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";

export function ConsultationCta({ heading, description, label = "Request a Private Consultation" }: { heading: string; description?: string; label?: string }) {
  return (
    <section className="home-section closing-section">
      <Container>
        <h2>{heading}</h2>
        {description && <p className="closing-description">{description}</p>}
        <ButtonLink className="section-link" href="/contact#consultation" prefetch={false}>{label}</ButtonLink>
      </Container>
    </section>
  );
}
