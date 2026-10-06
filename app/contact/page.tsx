import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { EditorialIntro, SupportingPage } from "@/components/sections/supporting/editorial";
import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { RequestAssistance } from "@/components/forms/request-assistance";
import { getRequestService } from "@/lib/request-context";
import { getContactLinks } from "@/lib/contact-links";
export const metadata = pageMetadata("Request a Service", "Tell Puraitmaad what you need handled at home, at your property or at work in Lahore.", "/contact");
export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
 const service = getRequestService((await searchParams).service);
 const links = getContactLinks(undefined, service?.name);
 return <SupportingPage className="sp-contact"><EditorialIntro eyebrow="Request a Service" title="Tell us what you need."><p>Describe what needs to be handled and we&apos;ll take it from there.</p></EditorialIntro>
 <section id="request-service" className="sp-contact-section" aria-labelledby="request-details-heading"><h2 className="sr-only" id="request-details-heading">Your service request</h2><span className="request-anchor-compat" id="consultation" aria-hidden="true" /><Container className="sp-contact-grid"><div><p className="sp-contact-reassurance">You don&apos;t need to know the exact service category. Start with what&apos;s happening; we&apos;ll discuss the practical details with you.</p><ServiceRequestForm key={service?.id ?? "general"} serviceId={service?.id} whatsappHref={links.whatsapp} /></div><RequestAssistance serviceName={service?.name} /></Container></section></SupportingPage>;
}
