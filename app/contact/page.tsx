import { ScrollReveals } from "@/components/ui/scroll-reveals";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { EditorialIntro, SupportingPage } from "@/components/sections/supporting/editorial";
import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { RequestAssistance } from "@/components/forms/request-assistance";
import { getRequestService, getRequestPlan } from "@/lib/request-context";
import { getContactLinks } from "@/lib/contact-links";
import { RequestMethodSelector } from "@/components/forms/request-method-selector";
export const metadata = pageMetadata("Request a Service", "Tell Puraitmaad what you need handled at home, at your property or at work in Lahore.", "/contact");
export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
 const params = await searchParams;
 const service = getRequestService(params.service);
 const plan = getRequestPlan(params.plan);
 const links = getContactLinks(undefined, service?.name ?? plan?.cta.context);
 const formParams = new URLSearchParams({ method: "form" });
 if (service) formParams.set("service", service.id);
 if (plan) formParams.set("plan", plan.id);
 return <SupportingPage className="sp-contact"><ScrollReveals scope=".sp-contact" /><EditorialIntro reveal eyebrow="Request a Service" title="Tell us what you need."><p>Describe what needs to be handled and we&apos;ll take it from there.</p></EditorialIntro>
 <section className="sp-contact-section"><Container><RequestMethodSelector whatsappHref={getContactLinks().whatsapp} formHref={`/contact?${formParams}#request-service`} initiallyShowForm={params.method === "form"} context={service?.name ?? plan?.name}>
 <div className="sp-contact-grid"><div><h2 className="sr-only" id="request-details-heading">Your service request</h2><p className="sp-contact-reassurance">You don&apos;t need to know the exact service category. Start with what&apos;s happening; we&apos;ll discuss the practical details with you.</p><ServiceRequestForm key={`${service?.id ?? "general"}:${plan?.id ?? "none"}`} serviceId={service?.id} planId={plan?.id} whatsappHref={links.whatsapp} /></div><RequestAssistance serviceName={service?.name ?? plan?.cta.context} /></div>
 </RequestMethodSelector></Container></section></SupportingPage>;
}
