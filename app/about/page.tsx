import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { ConsultationCta } from "@/components/sections/consultation-cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { approachPrinciples } from "@/content/about";

const description = "Discover Pur Aitmaad's founder-led approach to property stewardship, trust and accountability, initially serving properties in Lahore.";
export const metadata = pageMetadata("About", description, "/about");

export default function AboutPage() {
  return (
    <>
      <PageHero photographySlot="about" eyebrow="About Pur Aitmaad" title="Property care built around trust and accountability." description="Pur Aitmaad was created around a simple idea: property owners should be able to know that someone responsible is paying attention when they cannot be there themselves." />
      <section className="home-section" aria-labelledby="purpose-heading">
        <Container className="editorial-grid">
          <SectionHeading eyebrow="Why Pur Aitmaad exists" id="purpose-heading">Ownership needs ongoing attention.</SectionHeading>
          <div className="editorial-copy"><p>Owning a property and having someone consistently responsible for its condition are different things. Many owners can find a technician or vendor. The harder part is noticing issues and following them through.</p><p>Coordinating work, checking completion, documenting what happened and keeping the owner informed all need attention. Pur Aitmaad is designed around that coordination and accountability problem.</p></div>
        </Container>
      </section>
      <section className="home-section solution-section" aria-labelledby="approach-heading">
        <Container><SectionHeading eyebrow="The Pur Aitmaad approach" id="approach-heading">Simple principles. Consistent care.</SectionHeading><dl className="approach-list">{approachPrinciples.map((principle) => <div key={principle.title}><dt>{principle.title}</dt><dd>{principle.description}</dd></div>)}</dl></Container>
      </section>
      <section className="home-section" aria-labelledby="founder-about-heading">
        <Container className="editorial-grid"><SectionHeading eyebrow="Founder-led" id="founder-about-heading">Personal accountability from the beginning.</SectionHeading><div className="editorial-copy"><p>Pur Aitmaad is launching as a founder-led service in Lahore.</p><p>We are intentionally starting with a limited number of properties so clients can receive direct communication, careful attention and clear accountability.</p></div></Container>
      </section>
      <section className="home-section brand-story-section" aria-labelledby="name-heading">
        <Container><p className="eyebrow section-eyebrow">What the name means to us</p><h2 id="name-heading">Pur Aitmaad</h2><p className="brand-story-copy">The name represents the idea of trust, confidence and being able to rely on someone. For us, that means paying attention, communicating clearly and following through on agreed responsibilities.</p><p className="brand-promise">Your property. In trusted hands.</p></Container>
      </section>
      <section className="home-section" aria-labelledby="growth-heading">
        <Container className="editorial-grid"><SectionHeading eyebrow="Built to grow responsibly" id="growth-heading">A focused beginning. Lasting principles.</SectionHeading><div className="editorial-copy"><p>Our initial focus is private residences, farmhouses and estates in Lahore.</p><p>The principles of observation, coordination, documentation and accountability are designed to serve different types of properties over time. We begin with a clear scope and grow responsibly from there.</p></div></Container>
      </section>
      <ConsultationCta heading="Start with a conversation about your property." />
    </>
  );
}
