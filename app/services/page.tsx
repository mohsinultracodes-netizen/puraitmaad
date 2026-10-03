import { PropertyPhotography } from "@/components/ui/property-photography";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { ConsultationCta } from "@/components/sections/consultation-cta";
import { services } from "@/content/services";

const description = "Explore property inspections, preventive maintenance and service coordination for private residences, farmhouses and estates in Lahore.";
export const metadata = pageMetadata("Services", description, "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero photographySlot="servicesHero" eyebrow="Our Services" title="Professional care for the property you value." description="Pur Aitmaad provides ongoing property oversight, preventive care and service coordination for owners who want their property properly looked after.">
        <p className="coverage-note">For private residences, farmhouses and estates in Lahore.</p>
      </PageHero>
      <Container>
        {services.map((service) => (
          <section key={service.id} className={`service-detail editorial-grid${service.id === "vendors" || service.id === "vehicles" ? " service-detail-alternate" : ""}`} aria-labelledby={service.id}>
            <div><SectionHeading id={service.id}>{service.title}</SectionHeading>
              {service.id === "inspections" && <div className="service-photography"><PropertyPhotography slot="propertyInspection" /></div>}
              {service.id === "vendors" && <div className="service-photography"><PropertyPhotography slot="vendorCoordination" /></div>}
              {service.id === "vehicles" && <div className="service-photography"><PropertyPhotography slot="vehicleReadiness" /></div>}
              {service.id === "property-health" && <div className="service-photography"><PropertyPhotography slot="propertyHealth" /></div>}
            </div>
            <div className="detail-copy">
              <p>{service.description}</p>
              {service.items && <ul className="detail-list">{service.items.map((item) => <li key={item}>{item}</li>)}</ul>}
              {service.steps && <ol className="workflow-list">{service.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
              {service.note && <p className="detail-note">{service.note}</p>}
              {service.link && <ButtonLink className="section-link" href={service.link.href} variant="secondary" prefetch={false}>{service.link.label}</ButtonLink>}
            </div>
          </section>
        ))}
      </Container>
      <section className="home-section solution-section" aria-labelledby="boundaries-heading">
        <Container className="editorial-grid">
          <div><SectionHeading eyebrow="Responsible boundaries" id="boundaries-heading">Care with a clear scope.</SectionHeading><div className="service-photography"><PropertyPhotography slot="careClearScope" /></div></div>
          <div className="editorial-copy">
            <p>Our role is property stewardship and agreed service coordination. Banking and investment management are outside that scope.</p>
            <p>We do not take custody of cash, jewellery or precious metals, or request financial credentials or safe combinations. Clear boundaries keep the service focused on the care of your property.</p>
          </div>
        </Container>
      </section>
      <ConsultationCta heading="Your property may need a different level of care." description="Stewardship plans can be tailored to property type, size, systems and the level of oversight you need. A consultation helps establish an appropriate scope." />
    </>
  );
}
