import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { ServiceIcon } from "@/components/ui/service-icon";
import { HomepagePhotography } from "@/components/ui/homepage-photography";
import { homepage } from "@/content/homepage";
import { featuredServices } from "@/content/services";
import { EditorialHeading, RequestLink, TextLink } from "./homepage-shared";

export function HomepageHero() {
  return <section className="hp-hero" aria-labelledby="homepage-heading">
    <div className="hp-hero-copy">
      <p className="hp-eyebrow">{homepage.hero.eyebrow}</p>
      <h1 id="homepage-heading"><span>{homepage.hero.lines[0].replace(/\s*→$/, "")} <span className="hp-hero-arrow" aria-hidden="true">→</span></span><span>{homepage.hero.lines[1]}</span></h1>
      <p className="hp-lead">{homepage.hero.description}</p>
      <div className="hp-actions"><RequestLink /><ButtonLink href="/how-it-works" variant="secondary">How It Works</ButtonLink></div>
      <div className="hp-principles"><p className="sr-only">Our service principles</p><ul>{homepage.principles.map(principle => <li key={principle.label}>{principle.label}</li>)}</ul></div>
    </div>
    <div className="hp-hero-visual"><HomepagePhotography slot="hero" /><p className="hp-image-note">{homepage.hero.imageNote}</p></div>
  </section>;
}

export function FeaturedServices() {
  return <section className="hp-section hp-services" aria-labelledby="featured-services-heading">
    <Container>
      <div className="hp-section-intro"><EditorialHeading eyebrow="Our services" id="featured-services-heading">{homepage.services.heading}</EditorialHeading><p>{homepage.services.description}</p></div>
      <ul className="hp-service-grid">{featuredServices.map(service => <li key={service.id}><Link className="hp-service-card" href={homepage.requestHref} aria-label={`Request ${service.name}`}><ServiceIcon name={service.icon} /><h3>{service.name}</h3><p>{service.description}</p><span className="hp-card-arrow" aria-hidden="true">→</span></Link></li>)}</ul>
      <TextLink href="/services">View all services</TextLink>
    </Container>
  </section>;
}
