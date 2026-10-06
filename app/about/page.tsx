import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { EditorialIntro, EditorialSection, RequestClosing, SupportingPage } from "@/components/sections/supporting/editorial";
import { operatingPhilosophy } from "@/content/supporting";
export const metadata = pageMetadata("About", "Puraitmaad brings practical home, property and everyday responsibilities together under one relationship in Lahore.", "/about");
export default function AboutPage() {
 return <SupportingPage><EditorialIntro eyebrow="About Puraitmaad" title={<>We take care of the things<br />that take up your time.</>} photo="about"><p>One dependable point of contact for the practical needs of your home, property and everyday life.</p></EditorialIntro>
 <EditorialSection id="relationship-heading" title="Life doesn&apos;t come with one number to call."><p>One day it&apos;s an AC technician. Another day it&apos;s an electrician. Then a gardener, cleaner, painter, plumber, supplier or contractor.</p><p>Puraitmaad brings those moving parts together under one relationship. You describe what needs to be handled; we clarify the details and coordinate the appropriate next step.</p></EditorialSection>
 <section className="sp-section sp-wash" aria-label="Our mission and vision"><Container className="sp-mission"><div><p className="eyebrow">Mission</p><h2>Make everyday responsibilities easier.</h2><p>Give people one dependable point of contact for practical needs.</p></div><div><p className="eyebrow">Vision</p><h2>The name you think of when something needs handling.</h2><p>Build Puraitmaad into the company people think of when they need something handled but don&apos;t know who to call.</p></div></Container></section>
 <EditorialSection id="philosophy-heading" eyebrow="How we approach the work" title="Care in the practical details."><dl className="sp-principles">{operatingPhilosophy.map(item=><div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl></EditorialSection>
 <RequestClosing title="What would you like us to handle?" label="Tell Us What You Need" /></SupportingPage>;
}
