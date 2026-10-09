import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { membershipPlans, membershipScope, membershipSection } from "@/content/membership";
import { planRequestHref } from "@/lib/request-context";
import { contextualWhatsappHref } from "@/lib/contact-links";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import "./membership-plans.css";

export function MembershipPlans({ id = "membership-heading", className = "" }: { id?: string; className?: string }) {
  const whatsapp = contextualWhatsappHref();
  return <section className={`plans-section ${className}`} aria-labelledby={id}>
    <Container>
      <header className="plans-intro">
        <p className="eyebrow">{membershipSection.label}</p>
        <h2 id={id}>{membershipSection.heading}</h2>
        <p>{membershipSection.subtitle}</p>
      </header>
      <div className="plans-comparison">
        {membershipPlans.map((plan, index) => <article className={`plans-card ${index === 1 ? "plans-card-accent" : ""}`} key={plan.id} data-plan={plan.id} aria-labelledby={`plan-${plan.id}`}>
          <h3 id={`plan-${plan.id}`}>{plan.name}</h3>
          <p className="plans-description">{plan.description}</p>
          <ul className="plans-features">{plan.inclusions.map(feature => <li key={feature}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="m3 8 3 3 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span>{feature}</span>
          </li>)}</ul>
          <ButtonLink className="plans-request" href={planRequestHref(plan.id)} prefetch={false} aria-label={`Request info about ${plan.name}`}>{membershipSection.cta}</ButtonLink>
        </article>)}
      </div>
      <p className="plans-invitation">{membershipSection.invitation}</p>
      <p className="plans-scope">{membershipScope}</p>
      <div className="plans-one-time">
        <div><h3>Need help with something once?</h3><p>Tell us what needs to be handled. No membership required.</p><p className="plans-ongoing-note">Membership is for customers who need ongoing support.</p></div>
        <div className="plans-one-time-actions"><ButtonLink href="/contact#request-service" prefetch={false}>Request a Service</ButtonLink>{whatsapp && <ButtonLink href={whatsapp} variant="secondary"><WhatsAppIcon />WhatsApp Us</ButtonLink>}</div>
      </div>
    </Container>
  </section>;
}
