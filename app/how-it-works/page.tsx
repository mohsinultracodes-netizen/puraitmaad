import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { ConsultationCta } from "@/components/sections/consultation-cta";
import { stewardshipProcess } from "@/content/how-it-works";

const description = "Understand Pur Aitmaad's property stewardship process, from inspection and documentation to owner approval, coordination and verification.";
export const metadata = pageMetadata("How It Works", description, "/how-it-works");

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="How It Works" title="From observation to resolution." description="Property stewardship works best when every issue has a clear process and nothing is simply assumed to be complete." />
      <section className="home-section process-section" aria-labelledby="process-heading">
        <Container>
          <SectionHeading eyebrow="An accountable process" id="process-heading">Each step has a purpose.</SectionHeading>
          <ol className="process-list">
            {stewardshipProcess.map((step, index) => <li key={step.title}><span className="step-number" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
          </ol>
        </Container>
      </section>
      <section className="home-section solution-section" aria-labelledby="verification-heading">
        <Container className="editorial-grid">
          <SectionHeading eyebrow="Follow-through matters" id="verification-heading">Arranging the work isn&apos;t the same as knowing it was done properly.</SectionHeading>
          <div className="editorial-copy"><p>Scheduling a vendor is one part of the process. We follow the agreed work through, check completion and record relevant evidence before considering the item closed.</p><p>That gives the owner a documented outcome rather than an assumption. Specialist technical assessment or certification remains the responsibility of an appropriate specialist where required.</p></div>
        </Container>
      </section>
      <section className="home-section" aria-labelledby="control-heading">
        <Container className="editorial-grid">
          <SectionHeading eyebrow="Owner control" id="control-heading">Informed decisions. Agreed approvals.</SectionHeading>
          <div className="editorial-copy"><p>You remain informed about observations, proposed work and outcomes. Approvals are requested according to the service arrangement agreed with you.</p><p>The scope of oversight and communication is established at the beginning, so responsibilities are clear before coordination starts.</p></div>
        </Container>
      </section>
      <ConsultationCta heading="A clearer way to look after property." label="Request Consultation" />
    </>
  );
}
