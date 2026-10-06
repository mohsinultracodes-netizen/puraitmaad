import { Container } from "@/components/ui/container";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { ServiceIcon } from "@/components/ui/service-icon";
import { homepage } from "@/content/homepage";
import { siteConfig } from "@/content/site";
import { getContactLinks } from "@/lib/contact-links";
import { EditorialHeading, RequestLink } from "./homepage-shared";

export function HomepageRequest() {
  const links = getContactLinks();
  return <section className="hp-section hp-request" id="consultation" aria-labelledby="homepage-request-heading"><Container>
    <EditorialHeading eyebrow="Let's start with you" id="homepage-request-heading">{homepage.request.heading}</EditorialHeading><p className="hp-request-intro">{homepage.request.description}</p>
    <div className="hp-request-grid"><div className="hp-form-wrap">
      {/* Phase 3 reuses the live consultation schema/action verbatim. Fields and email
          delivery migrate together in the dedicated form phase; no fake new inputs. */}
      <ConsultationForm />
    </div><aside className="hp-assistance-panel" aria-labelledby="assistance-heading"><ServiceIcon name="house" /><h3 id="assistance-heading">{homepage.request.panelTitle}</h3><p>{homepage.request.panelDescription}</p><ol>{homepage.request.next.map((step,index)=><li key={step}><span aria-hidden="true">0{index+1}</span>{step}</li>)}</ol><p className="hp-panel-city">{siteConfig.CITY}</p>
      {links.whatsapp && <a className="hp-text-link" href={links.whatsapp}>Chat with Puraitmaad <span aria-hidden="true">→</span></a>}
      {links.phone && <a className="hp-text-link" href={links.phone}>Call Puraitmaad <span aria-hidden="true">→</span></a>}
      {links.email && <a className="hp-text-link" href={links.email}>Email Puraitmaad <span aria-hidden="true">→</span></a>}
    </aside></div>
  </Container></section>;
}

export function HomepageClosing() {
  const links = getContactLinks();
  return <section className="hp-closing" aria-labelledby="homepage-closing-heading"><Container><p className="hp-eyebrow">You ask. We handle.</p><h2 id="homepage-closing-heading">{homepage.closing.heading[0]}<br />{homepage.closing.heading[1]}</h2><p>{homepage.closing.description}</p><div className="hp-actions"><RequestLink tone="dark" />{links.whatsapp && <a className="hp-text-link" href={links.whatsapp}>WhatsApp Us <span aria-hidden="true">→</span></a>}</div></Container></section>;
}
