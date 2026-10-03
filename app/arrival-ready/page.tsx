import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { ConsultationCta } from "@/components/sections/consultation-cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { arrivalPreparations, arrivalSequence } from "@/content/arrival-ready";

const description = "Plan agreed property checks, cleaning coordination and arrival preparation in Lahore with Pur Aitmaad's Arrival Ready service.";
export const metadata = pageMetadata("Arrival Ready", description, "/arrival-ready");

export default function ArrivalReadyPage() {
  return (
    <>
      <PageHero photographySlot="arrivalReady" eyebrow="Arrival Ready" title={<>Come home.<br />We&apos;ll handle the preparation.</>} description="Before you return, Pur Aitmaad can coordinate the agreed preparation of your property so you arrive with fewer things to manage.">
        <ButtonLink className="section-link" href="/contact#consultation" prefetch={false}>Plan Your Arrival</ButtonLink>
      </PageHero>
      <section className="home-section" aria-labelledby="before-arrival-heading">
        <Container className="editorial-grid">
          <SectionHeading eyebrow="Before you arrive" id="before-arrival-heading">A smoother return starts before you land.</SectionHeading>
          <div className="editorial-copy"><p>After weeks or months away, returning to a property can involve many small tasks: checking the systems, arranging cleaning and making sure everyday essentials are considered.</p><p>Pur Aitmaad can coordinate agreed preparations before your return, so these tasks do not all begin after arrival.</p></div>
        </Container>
      </section>
      <section className="home-section arrival-section" aria-labelledby="preparation-heading">
        <Container>
          <SectionHeading eyebrow="What can be prepared" id="preparation-heading">The practical details, considered.</SectionHeading>
          <div className="preparation-columns">
            {arrivalPreparations.map((group) => <div key={group.title}><h3>{group.title}</h3><ul className="visibility-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
          </div>
          <p className="arrival-scope">Exact preparation depends on your property and agreed service scope. Vehicle readiness is included only where agreed in your plan.</p>
        </Container>
      </section>
      <section className="home-section" aria-labelledby="arrival-process-heading">
        <Container>
          <SectionHeading eyebrow="How Arrival Ready works" id="arrival-process-heading">Preparation with a clear plan.</SectionHeading>
          <ol className="process-list">{arrivalSequence.map((step, index) => <li key={step.title}><span className="step-number" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
          <p className="arrival-scope">Timing and completion can depend on property condition and third-party availability. Outstanding items are communicated rather than assumed complete.</p>
        </Container>
      </section>
      <section className="home-section solution-section" aria-labelledby="arrival-overseas-heading">
        <Container className="editorial-grid">
          <SectionHeading eyebrow="For overseas owners" id="arrival-overseas-heading">Spend your first day enjoying your property — not managing it.</SectionHeading>
          <div><p className="editorial-copy">For owners returning to Lahore from abroad, arrival preparation can be part of a wider arrangement for local property oversight, documentation and updates while you are away.</p><ButtonLink className="section-link" href="/overseas-owners" variant="secondary">For Overseas Owners</ButtonLink></div>
        </Container>
      </section>
      <ConsultationCta heading="Tell us when you're coming home." />
    </>
  );
}
