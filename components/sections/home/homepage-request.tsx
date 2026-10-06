import { Container } from "@/components/ui/container";
import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { RequestAssistance } from "@/components/forms/request-assistance";
import { homepage } from "@/content/homepage";
import { getContactLinks } from "@/lib/contact-links";
import { EditorialHeading, RequestLink } from "./homepage-shared";

export function HomepageRequest() {
  const links = getContactLinks();
  return <section className="hp-section hp-request" id="request-service" aria-labelledby="homepage-request-heading"><span className="request-anchor-compat" id="consultation" aria-hidden="true" /><Container>
    <EditorialHeading eyebrow="Let's start with you" id="homepage-request-heading">{homepage.request.heading}</EditorialHeading><p className="hp-request-intro">{homepage.request.description}</p>
    <div className="hp-request-grid"><div className="hp-form-wrap">
      <ServiceRequestForm whatsappHref={links.whatsapp} />
    </div><RequestAssistance /></div>
  </Container></section>;
}

export function HomepageClosing() {
  const links = getContactLinks();
  return <section className="hp-closing" aria-labelledby="homepage-closing-heading"><Container><p className="hp-eyebrow">You ask. We handle.</p><h2 id="homepage-closing-heading">{homepage.closing.heading[0]}<br />{homepage.closing.heading[1]}</h2><p>{homepage.closing.description}</p><div className="hp-actions"><RequestLink tone="dark" />{links.whatsapp && <a className="hp-text-link" href={links.whatsapp}>WhatsApp Us <span aria-hidden="true">→</span></a>}</div></Container></section>;
}
