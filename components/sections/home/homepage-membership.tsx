import { Container } from "@/components/ui/container";
import { ServicePhotography } from "@/components/ui/service-photography";
import { homepage } from "@/content/homepage";
import { MembershipPlans } from "@/components/sections/membership-plans";
import { homePreparationScenario } from "@/content/scenarios";
import { testimonials } from "@/content/testimonials";
import { operatingPhilosophy } from "@/content/supporting";
import { EditorialHeading, RequestLink, SupportList } from "./homepage-shared";

export function MembershipSupportLevels() {
  return <MembershipPlans className="hp-membership" />;
}

export function PrivateAssistanceFeature() {
  const discretion = operatingPhilosophy.find(item => item.title === "Discretion");
  return (
    <section className="hp-section hp-private-section" aria-labelledby="private-service-heading">
      <Container className="hp-feature-layout">
        <div className="hp-feature-intro">
          <EditorialHeading eyebrow="Private service" id="private-service-heading">
            {homepage.private.heading[0]}<br />{homepage.private.heading[1]}
          </EditorialHeading>
          <p className="hp-body-copy">{homepage.private.description}</p>
        </div>
        <div className="hp-feature-media">
          <ServicePhotography image="personalAssistance" sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw" />
        </div>
        <div className="hp-feature-details">
          {discretion && <p className="hp-private-discretion">{discretion.description}</p>}
          <RequestLink text>Talk to us about Private</RequestLink>
        </div>
      </Container>
    </section>
  );
}

export function VendorCare() {
  return (
    <section className="hp-section hp-vendor-care" aria-labelledby="vendor-care-heading">
      <Container className="hp-trust-layout">
        <EditorialHeading eyebrow="Care, considered" id="vendor-care-heading">{homepage.trust.heading}</EditorialHeading>
        <p className="hp-trust-description">{homepage.trust.description}</p>
        <ul className="hp-trust-words">{homepage.trust.principles.map(item => <li key={item}>{item}</li>)}</ul>
        <p className="hp-small hp-trust-note">{homepage.trust.note}</p>
      </Container>
    </section>
  );
}

export function SampleScenario() {
  const scenario = homePreparationScenario;
  return <section className="hp-sample" aria-labelledby="sample-heading"><Container><div className="hp-sample-layout"><div><EditorialHeading eyebrow={scenario.label} id="sample-heading">{scenario.title}</EditorialHeading><p className="hp-body-copy">{scenario.requirement}</p><p className="hp-sample-result"><span>Illustrative outcome</span>{scenario.result}</p></div><div><h3>One request, coordinated details.</h3><SupportList items={scenario.coordination} /><p className="hp-small">{scenario.disclosure}</p><p className="hp-small">{scenario.scopeNote}</p></div></div></Container></section>;
}

export function CustomerStories() {
  if (!testimonials.length) return null;
  return <section className="hp-section" aria-labelledby="customer-stories-heading"><Container><EditorialHeading eyebrow="Client stories" id="customer-stories-heading">In our customers’ words.</EditorialHeading><div className="hp-testimonials">{testimonials.map(item=><figure key={item.id}><blockquote>{item.quote}</blockquote><figcaption>{item.displayName}</figcaption></figure>)}</div></Container></section>;
}
