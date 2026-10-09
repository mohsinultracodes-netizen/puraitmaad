import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { EditorialIntro, EditorialSection, RequestClosing, ServiceList, SupportingPage } from "@/components/sections/supporting/editorial";
import { services } from "@/content/services";
import { comingHomeScenario } from "@/content/scenarios";
import { serviceRequestHref } from "@/lib/request-context";
import { ServicePhotography } from "@/components/ui/service-photography";
import { ArrivalTimeline } from "@/components/sections/arrival-timeline";
export const metadata = pageMetadata("Property Care", "Home and property support in Lahore for travelers, overseas owners and vacant properties, with scope agreed around your needs.", "/services/property-care");
const propertyServices = services.filter(service => service.category === "property-care" || ["cleaning", "gardening", "ac-appliances"].includes(service.id));
export default function PropertyCarePage() {
 const story = comingHomeScenario;
 return <SupportingPage><EditorialIntro eyebrow="Property Care" title={<>Your property,<br />even when you&apos;re away.</>} photo="property"><p>One relationship for the checks, preparation and practical details that keep a home looked after in Lahore.</p></EditorialIntro>
 <EditorialSection id="away-heading" title="A point of contact, wherever you are."><p>For travelers and overseas owners, an empty home still needs attention. We coordinate routine inspections, vacant-house checks and agreed follow-up, so you have someone to contact about what needs doing.</p><p>Whether you have one home, multiple properties or need periodic support while living nearby, the arrangement starts with your priorities, access and an agreed scope.</p><Link className="sp-link" href="/membership">Explore ongoing support through Membership <span aria-hidden="true">&nbsp;→</span></Link></EditorialSection>
 <EditorialSection id="property-support-heading" eyebrow="Practical support" title="Care before, during and after your time away." className="sp-wash"><div className="sp-property-photography"><ServicePhotography image="gardening" sizes="(min-width: 1440px) 377px, (min-width: 768px) 28vw, (min-width: 640px) 43vw, 90vw" /><ServicePhotography image="homeRepairs" sizes="(min-width: 1440px) 377px, (min-width: 768px) 28vw, (min-width: 640px) 43vw, 90vw" /></div><ServiceList items={propertyServices} /></EditorialSection>
 <section id="coming-home" className="sp-section" aria-labelledby="coming-home-heading"><Container><div className="sp-arrival-photography"><ServicePhotography image="housekeeping" sizes="(min-width: 1440px) 593px, (min-width: 640px) 43vw, 90vw" /><ServicePhotography image="restocking" sizes="(min-width: 1440px) 593px, (min-width: 640px) 43vw, 90vw" /></div><div className="sp-story"><h2 id="coming-home-heading">“{story.title}”</h2><ArrivalTimeline /><p>{story.ending}</p><p className="sp-small">{story.scopeNote}</p><p className="sp-small">{story.disclosure}</p></div></Container></section>
 <RequestClosing title="A home looked after around your needs." label="Take Care of My Property" href={serviceRequestHref("property-maintenance")}><p>Tell us about your property, your time away and what you would like coordinated. We&apos;ll discuss the practical next step.</p></RequestClosing></SupportingPage>;
}
