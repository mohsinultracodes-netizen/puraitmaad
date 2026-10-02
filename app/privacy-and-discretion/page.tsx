import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { ConsultationCta } from "@/components/sections/consultation-cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { discretionPrinciples } from "@/content/privacy-and-discretion";

const description = "Pur Aitmaad's service principles for confidentiality, purposeful property access, documentation and responsible handling of property information.";
export const metadata = pageMetadata("Privacy & Discretion", description, "/privacy-and-discretion");

export default function PrivacyAndDiscretionPage() {
  return (
    <>
      <PageHero eyebrow="Privacy & Discretion" title="Trust requires discretion." description="Looking after someone's property means respecting both the property and the information connected to it." />
      <section className="home-section" aria-labelledby="discretion-approach-heading">
        <Container>
          <SectionHeading eyebrow="Our approach" id="discretion-approach-heading">Careful handling. Clear purpose.</SectionHeading>
          <dl className="discretion-list">{discretionPrinciples.map((principle) => <div className="editorial-grid" key={principle.title}><dt>{principle.title}</dt><dd>{principle.description}</dd></div>)}</dl>
        </Container>
      </section>
      <section className="home-section solution-section" aria-labelledby="discretion-design-heading">
        <Container className="editorial-grid"><SectionHeading eyebrow="Discretion by design" id="discretion-design-heading">Part of how care is considered.</SectionHeading><div className="editorial-copy"><p>Privacy should guide everyday service decisions, rather than be treated as an extra feature.</p><p>That means considering what information is collected, who needs access, what is documented, what is shared and what is retained. These principles guide the scope of agreed activities and communication.</p></div></Container>
      </section>
      <Container><aside className="privacy-distinction"><p>This page explains Pur Aitmaad&apos;s service principles around property privacy and discretion. Website visitor and enquiry data are addressed separately in the <Link href="/privacy-policy" className="policy-inline-link">website Privacy Policy</Link>.</p></aside></Container>
      <ConsultationCta heading="A trusted relationship starts with a private conversation." />
    </>
  );
}
