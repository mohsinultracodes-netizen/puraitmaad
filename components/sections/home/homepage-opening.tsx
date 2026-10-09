import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { ServiceIcon } from "@/components/ui/service-icon";
import { ServicePhotography } from "@/components/ui/service-photography";
import { featuredServicePhotography } from "@/content/service-photography";
import { HomepagePhotography } from "@/components/ui/homepage-photography";
import { homepage } from "@/content/homepage";
import { featuredServices } from "@/content/services";
import { serviceRequestHref } from "@/lib/request-context";
import { EditorialHeading, RequestLink, TextLink } from "./homepage-shared";
import { HeroPrinciples } from "./hero-principles";

export function HomepageHero() {
  return <section className="hp-hero" aria-labelledby="homepage-heading">
    <div className="hp-hero-copy">
      <p className="hp-eyebrow">{homepage.hero.eyebrow}</p>
      <h1 id="homepage-heading"><span>{homepage.hero.lines[0].replace(/\s*→$/, "")} <span className="hp-hero-arrow" aria-hidden="true">→</span></span><span>{homepage.hero.lines[1]}</span></h1>
      <p className="hp-lead">{homepage.hero.description}</p>
      <div className="hp-actions"><RequestLink /><ButtonLink href="/how-it-works" variant="secondary">How It Works</ButtonLink></div>
      <HeroPrinciples />
    </div>
    <div className="hp-hero-visual"><HomepagePhotography slot="hero" /></div>
  </section>;
}

export function FeaturedServices() {
  return <section className="hp-section hp-services" aria-labelledby="featured-services-heading">
    <Container>
      <div className="hp-section-intro"><EditorialHeading eyebrow="Our services" id="featured-services-heading">{homepage.services.heading}</EditorialHeading><p>{homepage.services.description}</p></div>
      <ul className="hp-service-grid">{featuredServices.map(service => { const image = featuredServicePhotography[service.id]; return <li key={service.id}><Link className="hp-service-card" href={serviceRequestHref(service.id)}>{image && <ServicePhotography image={image} sizes="(min-width: 1440px) 389px, (min-width: 1024px) 28vw, (min-width: 640px) 43vw, 90vw" />}<div className="hp-service-content"><ServiceIcon name={service.icon} /><h3>{service.name}</h3><p>{service.description}</p><span className="hp-card-arrow" aria-hidden="true">→</span></div></Link></li>; })}</ul>
      <TextLink href="/services">View all services</TextLink>
    </Container>
  </section>;
}
