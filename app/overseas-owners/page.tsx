import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { ConsultationCta } from "@/components/sections/consultation-cta";
import { overseasVisibility, overseasExample } from "@/content/overseas-owners";

const description = "Local property oversight in Lahore for owners living outside Pakistan, with inspections, maintenance coordination, documentation and updates.";
export const metadata = pageMetadata("For Overseas Owners", description, "/overseas-owners");

export default function OverseasOwnersPage() {
  return (
    <>
      <PageHero eyebrow="For Overseas Owners" title={<>Your property in Lahore.<br />Looked after while you&apos;re away.</>} description="Distance shouldn't mean losing visibility into the condition and care of your property.">
        <ButtonLink className="section-link" href="/contact#consultation" prefetch={false}>Discuss Your Property</ButtonLink>
      </PageHero>
      <section className="home-section" aria-labelledby="distance-heading">
        <Container className="editorial-grid">
          <SectionHeading eyebrow="Ownership from a distance" id="distance-heading">A clearer picture, beyond informal updates.</SectionHeading>
          <div className="editorial-copy"><p>When you are abroad, it can be difficult to know the current condition of your property. Informal updates may leave questions about maintenance needs or whether agreed work has been completed.</p><p>Coordinating technicians across countries takes time. Routine maintenance can be delayed, and preparing the property before returning to Pakistan becomes another task to arrange remotely.</p></div>
        </Container>
      </section>
      <section className="home-section solution-section" aria-labelledby="oversight-heading">
        <Container className="editorial-grid">
          <div><SectionHeading eyebrow="Local oversight" id="oversight-heading">Someone responsible on the ground.</SectionHeading><p className="section-description">Pur Aitmaad provides agreed local oversight in Lahore through inspections, coordination, documentation and updates. Approved work is followed through so you can make decisions with greater visibility.</p></div>
          <div><h3>What you can stay informed about</h3><ul className="visibility-list">{overseasVisibility.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </Container>
      </section>
      <section className="home-section" aria-labelledby="update-heading">
        <Container>
          <SectionHeading eyebrow="From issue to update" id="update-heading">An observation followed through.</SectionHeading>
          <figure className="example-process"><figcaption>Example process — not a real customer case</figcaption><ol className="workflow-list">{overseasExample.map((step) => <li key={step}>{step}</li>)}</ol></figure>
        </Container>
      </section>
      <section className="home-section arrival-section" aria-labelledby="return-heading">
        <Container className="editorial-grid">
          <SectionHeading eyebrow="Arrival Ready" id="return-heading">Coming back to Lahore?</SectionHeading>
          <div><p className="editorial-copy">Pur Aitmaad can coordinate agreed preparation before your return, helping reduce the maintenance and household preparation you need to arrange during your first days back.</p><ButtonLink className="section-link" href="/arrival-ready" variant="secondary" prefetch={false}>Explore Arrival Ready</ButtonLink></div>
        </Container>
      </section>
      <section className="home-section" aria-labelledby="coverage-heading">
        <Container className="editorial-grid"><SectionHeading eyebrow="Current coverage" id="coverage-heading">Launching in Lahore.</SectionHeading><p className="editorial-copy">Pur Aitmaad is currently launching its property stewardship service in Lahore, Pakistan, for private residences, farmhouses and estates.</p></Container>
      </section>
      <ConsultationCta heading="Stay connected to your property, wherever you are." />
    </>
  );
}
