import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { serviceCategories } from "@/content/services";
import { serviceDetails, businessSupportOverviewPhoto } from "@/content/service-details";
import { ServiceIcon } from "@/components/ui/service-icon";
import { photography } from "@/content/photography";
import { requestDestination } from "@/lib/request-context";
import { ServicesCarousel } from "./services-carousel";
import "./services.css";

export function ServicesHero() {
  const photo = photography.servicesHero.asset;
  return <section className="sv-hero" aria-labelledby="page-heading"><Container className="sv-hero-grid">
    <div className="sv-hero-copy">
      <p className="eyebrow">Considered care. Everyday support.</p>
      <h1 id="page-heading">Your Property.<br />Your Priorities.<br /><span>Our Care.</span></h1>
      <div className="sv-hero-support" data-scroll-reveal><p>Comprehensive support for your home, property, business &amp; everyday needs.</p><p>Tell us what needs to be handled. We&apos;ll help identify the appropriate next step.</p></div>
      <div className="sv-hero-actions"><ButtonLink href="#explore-services">Explore Our Services <span aria-hidden="true">↓</span></ButtonLink><ButtonLink href={requestDestination} variant="secondary">Discuss Your Needs <span aria-hidden="true">↗</span></ButtonLink></div>
    </div>
    {photo && <div className="sv-hero-art"><div className="sv-hero-photo"><Image src={photo.src} alt={photo.alt} fill preload sizes="(min-width: 1440px) 580px, (min-width: 768px) 46vw, 90vw" placeholder="blur" style={{ objectFit: "cover", objectPosition: "50% 50%" }} /></div><div className="sv-photo-caption"><span aria-hidden="true" />Care in the practical details.</div></div>}
  </Container></section>;
}

export function ServicesShowcase() {
  return <section className="sv-showcase" id="explore-services" aria-labelledby="services-showcase-heading"><Container>
    <div className="sv-showcase-intro" data-scroll-reveal><p className="eyebrow">One relationship. Four ways we help.</p><h2 id="services-showcase-heading">Explore Our Services</h2><p>Home, property, personal and business assistance.<br className="sv-desktop-break" /> Choose the support that fits your needs.</p></div>
  </Container><div data-scroll-reveal>
    <ServicesCarousel labels={serviceCategories.map(category => category.name)}>
      {serviceCategories.map((category, index) => {
        const representative = { "home-care": "gardening", "property-care": "property-inspections", "personal-assistance": "deliveries", "business-support": null }[category.id];
        const photo = category.id === "business-support" ? businessSupportOverviewPhoto : serviceDetails.find(entry => entry.service.id === representative)?.photo;
        return <li className="sv-slide" key={category.id}><a className="sv-category-card" href={`#${category.id}`}>
          <div className={`sv-card-photo${photo ? "" : " sd-empty-photo"}`}>{photo ? <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1440px) 430px, (min-width: 1024px) 32vw, (min-width: 768px) 390px, 84vw" loading="lazy" style={{ objectFit: "cover", objectPosition: photo.position }} /> : <ServiceIcon name="office" />}<span className="sv-card-number" aria-hidden="true">0{index + 1}</span></div>
          <div className="sv-card-copy"><h3>{category.name}</h3><p>{category.description}</p><span className="sv-card-link">Explore {category.name}<span aria-hidden="true">↗</span></span></div>
        </a></li>;
      })}
    </ServicesCarousel>
  </div></section>;
}
