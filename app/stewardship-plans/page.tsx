import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { stewardshipPlans, propertyCheck, stewardshipFee, benefitScope } from "@/content/stewardship-plans";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Stewardship Plans", "Flexible property stewardship plans for homeowners in Lahore and overseas Pakistanis, including documented inspections, maintenance oversight, vendor coordination and arrival preparation.", "/stewardship-plans");

export default function StewardshipPlansPage() {
  return (
    <div className="plans-page">
      <PageHero eyebrow="Stewardship Plans" title="The right level of care for your property." description="Whether you're away for a few weeks or spend most of the year overseas, choose a level of stewardship that keeps your property inspected, documented and looked after in your absence." />
      <section className="home-section plans-section" aria-labelledby="plans-heading">
        <Container>
          <SectionHeading eyebrow="Presence. Accountability. Peace of mind." id="plans-heading">A trusted presence, even when you’re away.</SectionHeading>
          <div className="stewardship-plan-grid">
            {stewardshipPlans.map((plan) => (
              <article key={plan.id} className={`stewardship-plan${plan.recommended ? " stewardship-plan-recommended" : ""}`} aria-labelledby={`${plan.id}-heading`}>
                <div className="plan-heading">
                  <p className="eyebrow plan-kicker">{plan.recommended ? "Most popular" : "Ongoing stewardship"}</p>
                  <h3 id={`${plan.id}-heading`}>{plan.name}</h3>
                  <p className="plan-price">From PKR {plan.monthly} <span>/ month</span></p>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <ul className="plan-features">{plan.coreFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                {plan.benefits && <section className="plan-benefits" aria-labelledby={`${plan.id}-benefits-heading`}><h4 id={`${plan.id}-benefits-heading`} className="eyebrow">{plan.benefits.heading}</h4><ul>{plan.benefits.items.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></section>}
                {plan.additional.length > 0 && <div className="plan-additional"><p className="eyebrow">Available separately</p><ul>{plan.additional.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>}
                <ButtonLink className="plan-consultation" href="/contact#consultation" variant={plan.recommended ? "primary" : "secondary"} prefetch={false}>{plan.cta}</ButtonLink>
              </article>
            ))}
          </div>
          <div className="plan-pricing-note editorial-grid">
            <SectionHeading id="pricing-note-heading">Every property is different.</SectionHeading>
            <div className="editorial-copy">
              <p>Final stewardship pricing is confirmed after we understand your property’s size, location, systems, visit requirements and level of oversight required.</p>
              <p>Complimentary benefits cover Pur Aitmaad&apos;s inspection, coordination and oversight time within the stated plan allowances. Third-party labour, materials, repairs, cleaning and other external vendor costs are separate and undertaken with owner approval.</p>
            </div>
          </div>
          <dl className="plan-benefit-scope">{benefitScope.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl>
        </Container>
      </section>
      <section className="home-section solution-section" aria-labelledby="short-term-heading">
        <Container className="editorial-grid">
          <div><SectionHeading eyebrow="Care during your absence" id="short-term-heading">Only away for a short while?</SectionHeading><p className="section-description">Pur Aitmaad can also look after your property during holidays, business travel or other extended absences without requiring an ongoing stewardship plan.</p></div>
          <div className="property-check-offer">
            <h3>Property Check</h3><p className="plan-price">From PKR {propertyCheck.price}</p>
            <ul className="detail-list">{propertyCheck.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <ButtonLink href="/contact#consultation" variant="secondary" prefetch={false}>Arrange a Property Check</ButtonLink>
          </div>
        </Container>
      </section>
      <section className="home-section" aria-labelledby="annual-heading">
        <Container>
          <div className="editorial-grid"><SectionHeading eyebrow="Year-round continuity" id="annual-heading">Prefer continuous stewardship?</SectionHeading><p className="editorial-copy">Annual arrangements are available for owners who want year-round continuity and a consistent understanding of their property.</p></div>
          <dl className="annual-plan-list">{stewardshipPlans.map((plan) => <div key={plan.id}><dt>{plan.name}</dt><dd>From PKR {plan.annual} <span>/ year</span></dd></div>)}</dl>
        </Container>
      </section>
      <section className="home-section plans-fee-section" aria-labelledby="fee-heading">
        <Container>
          <div className="editorial-grid">
            <div><SectionHeading eyebrow="Clear responsibilities" id="fee-heading">What the fee covers.</SectionHeading><p className="section-description">Your monthly fee pays for the presence, accountability and follow-through of property stewardship. External vendor expenses remain separate.</p></div>
            <div className="detail-copy"><p>The monthly fee pays Pur Aitmaad for:</p><ul className="detail-list">{stewardshipFee.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
          </div>
          <ol className="plan-process" aria-label="From observation to documented completion">{stewardshipFee.steps.map((step, index) => <li key={step}><span className="step-number" aria-hidden="true">0{index + 1}</span><p>{step}</p></li>)}</ol>
        </Container>
      </section>
      <section className="home-section closing-section" aria-labelledby="plans-cta-heading">
        <Container>
          <h2 id="plans-cta-heading">Your property deserves more than an occasional check-in.</h2>
          <p className="closing-description">Tell us about your property, how often you’re away and the level of oversight you need. We’ll recommend an appropriate stewardship arrangement.</p>
          <div className="hero-actions plans-closing-actions"><ButtonLink href="/contact#consultation" prefetch={false}>Request a Private Consultation</ButtonLink><ButtonLink href="/services" variant="secondary">Explore Our Services</ButtonLink></div>
        </Container>
      </section>
    </div>
  );
}
