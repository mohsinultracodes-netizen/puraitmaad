import { ServiceIcon } from "@/components/ui/service-icon";
import { homepage } from "@/content/homepage";
import { siteConfig } from "@/content/site";
import { getContactLinks, publicContactText } from "@/lib/contact-links";
import "./service-request.css";

export function RequestAssistance({ serviceName }: { serviceName?: string }) {
  const links = getContactLinks();
  const areas = publicContactText(siteConfig.SERVICE_AREAS), hours = publicContactText(siteConfig.BUSINESS_HOURS);
  return <aside className="request-assistance" aria-labelledby="assistance-heading"><ServiceIcon name="house" /><h3 id="assistance-heading">{homepage.request.panelTitle}</h3><p>{homepage.request.panelDescription}</p><ol>{homepage.request.next.map((step,index) => <li key={step}><span className="step-number" aria-hidden="true">0{index+1}</span>{step}</li>)}</ol><p className="request-panel-city">{siteConfig.CITY}</p>
    {areas && <p>Service areas: {areas}</p>}{hours && <p>Business hours: {hours}</p>}
    {links.whatsapp && <a className="request-contact-link" href={getContactLinks(undefined, serviceName).whatsapp!}>Chat with Puraitmaad <span aria-hidden="true">→</span></a>}
    {links.phone && <a className="request-contact-link" href={links.phone}>Call Puraitmaad <span aria-hidden="true">→</span></a>}
    {links.email && <a className="request-contact-link" href={links.email}>Email Puraitmaad <span aria-hidden="true">→</span></a>}
  </aside>;
}
