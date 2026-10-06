import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { PropertyPhotography } from "@/components/ui/property-photography";
import { home } from "@/content/home";

export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <PropertyPhotography slot="homeHero" />
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{home.hero.eyebrow}</p>
          <h1 id="hero-heading">{home.hero.headline[0]}<br />{home.hero.headline[1]}</h1>
          <p className="hero-description">{home.hero.description}</p>
          <div className="hero-actions">
            <ButtonLink href="/contact#request-service" prefetch={false}>Request a Service</ButtonLink>
            <ButtonLink href="/services" variant="secondary" prefetch={false}>Explore Our Services</ButtonLink>
          </div>
          <p className="coverage-note">{home.hero.coverage}</p>
        </div>
      </Container>
    </section>
  );
}
