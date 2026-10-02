import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

export function CoreServices() {
  return (
    <section id="core-services" className="home-section services-section" aria-labelledby="services-heading">
      <Container>
        <p className="eyebrow section-eyebrow">Core services</p>
        <div className="editorial-grid services-introduction">
          <h2 id="services-heading">Care that considers<br />the whole property.</h2>
          <p className="editorial-copy">For private residences, farmhouses and estates in Lahore. The scope of care is agreed around your property and the support you need.</p>
        </div>
        <dl className="service-list">
          {home.services.map((service, index) => (
            <div className="service-entry" key={service.title}>
              <dt><span className="service-number" aria-hidden="true">0{index + 1}</span><span>{service.title}</span></dt>
              <dd>{service.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
