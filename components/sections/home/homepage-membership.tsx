import { Container } from "@/components/ui/container";
import { ServiceIcon } from "@/components/ui/service-icon";
import { homepage } from "@/content/homepage";
import { membershipPlans, membershipScope } from "@/content/membership";
import { homePreparationScenario } from "@/content/scenarios";
import { testimonials } from "@/content/testimonials";
import { EditorialHeading, RequestLink, SupportList } from "./homepage-shared";

export function MembershipAndPrivate() {
  return <section className="hp-section hp-membership" aria-labelledby="membership-heading"><Container>
    <div className="hp-section-intro"><EditorialHeading eyebrow="Membership" id="membership-heading">{homepage.membership.heading[0]}<br />{homepage.membership.heading[1]}</EditorialHeading><div><p>{homepage.membership.description}</p><RequestLink text>Ask About Membership</RequestLink></div></div>
    <div className="hp-membership-layout"><div><div className="hp-plan-grid">{membershipPlans.map((plan,index)=><article key={plan.id} aria-labelledby={`membership-${plan.id}`}><span className="hp-plan-number" aria-hidden="true">0{index+1}</span><h3 id={`membership-${plan.id}`}>{plan.name}</h3><p className="hp-plan-description">{plan.description}</p><p className="hp-plan-price">{plan.pricingLabel}</p><SupportList items={plan.inclusions} /></article>)}</div><p className="hp-small hp-membership-scope">{membershipScope}</p></div>
    <aside className="hp-private" aria-labelledby="private-service-heading"><ServiceIcon name="leaf" /><EditorialHeading eyebrow="Private service" id="private-service-heading">{homepage.private.heading[0]}<br />{homepage.private.heading[1]}</EditorialHeading><p>{homepage.private.description}</p><p className="hp-private-example">{homepage.private.example}</p><RequestLink tone="dark" text>Talk to us about Private</RequestLink></aside></div>
  </Container></section>;
}

export function VendorCare() {
  return <section className="hp-section hp-vendor-care" aria-labelledby="vendor-care-heading"><Container className="hp-section-intro"><div><EditorialHeading eyebrow="Care, considered" id="vendor-care-heading">{homepage.trust.heading}</EditorialHeading><ul className="hp-trust-words">{homepage.trust.principles.map(item=><li key={item}>{item}</li>)}</ul></div><div><p>{homepage.trust.description}</p><p className="hp-small">{homepage.trust.note}</p></div></Container></section>;
}

export function SampleScenario() {
  const scenario = homePreparationScenario;
  return <section className="hp-sample" aria-labelledby="sample-heading"><Container><div className="hp-sample-layout"><div><EditorialHeading eyebrow={scenario.label} id="sample-heading">{scenario.title}</EditorialHeading><p className="hp-body-copy">{scenario.requirement}</p><p className="hp-sample-result"><span>Illustrative outcome</span>{scenario.result}</p></div><div><h3>One request, coordinated details.</h3><SupportList items={scenario.coordination} /><p className="hp-small">{scenario.disclosure}</p><p className="hp-small">{scenario.scopeNote}</p></div></div></Container></section>;
}

export function CustomerStories() {
  if (!testimonials.length) return null;
  return <section className="hp-section" aria-labelledby="customer-stories-heading"><Container><EditorialHeading eyebrow="Client stories" id="customer-stories-heading">In our customers’ words.</EditorialHeading><div className="hp-testimonials">{testimonials.map(item=><figure key={item.id}><blockquote>{item.quote}</blockquote><figcaption>{item.displayName}</figcaption></figure>)}</div></Container></section>;
}
