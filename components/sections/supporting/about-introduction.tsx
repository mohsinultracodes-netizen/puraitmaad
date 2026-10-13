import Image from "next/image";
import { Container } from "@/components/ui/container";
import { photography } from "@/content/photography";
import "./about-introduction.css";

const highlights = [
  { title: "Property Oversight", description: "Agreed checks and follow-up." },
  { title: "Arrival Preparation", description: "Thoughtful preparation before you return." },
  { title: "Private Assistance", description: "Practical help, handled thoughtfully." },
  { title: "Clear Coordination", description: "Scope, timing and relevant updates." },
] as const;

export function AboutIntroduction() {
  const photo = photography.servicesHero.asset;
  return <section className="at-introduction" aria-labelledby="page-heading"><Container className="at-panels">
    <div className="at-story">
      <div data-scroll-reveal><p className="at-eyebrow">Our Story</p><h1 id="page-heading">Built on Trust.<br />Driven by Care.</h1></div>
      <div className="at-story-copy" data-scroll-reveal><p>We take care of the things that take up your time.</p><p>One dependable point of contact for the practical needs of your home, property and everyday life.</p><p>You describe what needs to be handled; we clarify the details and coordinate the appropriate next step.</p></div>
    </div>
    <div className="at-overview">
      {photo && <div className="at-photograph" data-scroll-reveal="image"><Image src={photo.src} alt={photo.alt} fill preload placeholder="blur" sizes="(min-width: 1440px) 584px, (min-width: 768px) 44vw, 90vw" style={{ objectFit: "cover", objectPosition: "50% 50%" }} /></div>}
      <div className="at-highlights">{highlights.map(item => <div className="at-highlight" key={item.title} data-scroll-reveal data-scroll-sequence="services"><span className="at-highlight-rule" aria-hidden="true" /><h2>{item.title}</h2><p>{item.description}</p></div>)}</div>
    </div>
  </Container></section>;
}
