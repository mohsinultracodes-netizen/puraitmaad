import { pageMetadata } from "@/lib/seo";
import { EditorialIntro, EditorialSection, RequestClosing, SupportingPage } from "@/components/sections/supporting/editorial";
import { detailedProcess, coordinationExample } from "@/content/supporting";
import { scenarioDisclosure } from "@/content/scenarios";
export const metadata = pageMetadata("How It Works", "One request. Puraitmaad understands the need, arranges appropriate help and coordinates the practical details with you.", "/how-it-works");
export default function HowItWorksPage() {
 return <SupportingPage><EditorialIntro eyebrow="How it works" title={<>One request.<br />We coordinate the rest.</>}><p>You tell us what needs doing. We bring the moving parts together, so you don&apos;t have to find and manage every provider yourself.</p></EditorialIntro>
 <EditorialSection id="process-heading" eyebrow="From request to follow-through" title="A clearer way to get things handled."><ol className="sp-process">{detailedProcess.map((step,index)=><li key={step.title}><span className="sp-process-number" aria-hidden="true">0{index+1}</span><div><h3>{step.title}</h3><p>{step.description}</p><p className="sp-small">{step.connection}</p></div></li>)}</ol></EditorialSection>
 <EditorialSection id="example-heading" eyebrow="An illustrative request" title="Several needs. One conversation." className="sp-wash sp-example"><blockquote>“{coordinationExample.request}”</blockquote><ol>{coordinationExample.details.map(detail=><li key={detail}>{detail}</li>)}</ol><p className="sp-small">{scenarioDisclosure}</p></EditorialSection>
 <EditorialSection id="informed-heading" title="You stay informed."><p>Specialist work may involve third-party professionals. We discuss the relevant scope and cost with you, coordinate the agreed details and keep you informed about progress and decisions.</p><p>Your preferred dates and times help us understand the request. They become an appointment only once timing has been agreed.</p></EditorialSection>
 <RequestClosing title="Tell us what needs to be handled." /></SupportingPage>;
}
