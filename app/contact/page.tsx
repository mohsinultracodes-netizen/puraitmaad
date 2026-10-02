import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConsultationForm } from "@/components/forms/consultation-form";

const description = "Discuss your property and the level of stewardship you need with Pur Aitmaad, currently launching with selected private properties in Lahore.";
export const metadata = pageMetadata("Request Consultation", description, "/contact");

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Private Consultation" title="Tell us about your property." description="Every property requires a different level of care. Share a few details about yours and we can start with a private conversation about what you need." />
    <section id="consultation" className="home-section" aria-labelledby="consultation-heading">
      <Container className="contact-grid">
        <div><SectionHeading id="consultation-heading">Request a consultation.</SectionHeading><div className="consultation-form"><ConsultationForm /></div></div>
        <aside className="consultation-sidebar" aria-labelledby="conversation-heading">
          <SectionHeading eyebrow="Getting acquainted" id="conversation-heading">A private first conversation.</SectionHeading>
          <ol className="workflow-list"><li>Tell us about the property and what you need.</li><li>We review whether the service is a suitable fit.</li><li>We discuss the level of oversight required.</li><li>Service scope is agreed before ongoing stewardship begins.</li></ol>
          <p className="section-description">Currently launching with selected properties in Lahore.</p>
          <p className="privacy-reminder">Please do not submit sensitive financial information, passwords, alarm codes, safe combinations or details about valuables through this form.</p>
        </aside>
      </Container>
    </section>
  </>;
}
