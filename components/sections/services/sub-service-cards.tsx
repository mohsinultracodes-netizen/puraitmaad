import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { serviceDetails, serviceCoordination } from "@/content/service-details";
import type { ServiceCategory } from "@/content/services";
import { serviceRequestHref } from "@/lib/request-context";
import { whatsappHref } from "@/lib/contact-links";
import "./sub-service-cards.css";
import { SubServiceCarousel } from "./sub-service-carousel";
import { ServiceIcon } from "@/components/ui/service-icon";

export function SubServiceCards({ category }: { category: ServiceCategory }) {
  const entries = serviceDetails.filter(entry => entry.service.category === category);
  return <SubServiceCarousel category={category} count={entries.length}>{entries.map(entry => {
    const { service, photo } = entry;
    const whatsapp = whatsappHref(undefined, service.name);
    const photograph = (detail = false) => <div className={`${detail ? "sd-detail-photo" : "sd-photo"}${photo ? "" : " sd-empty-photo"}`}>{photo ? <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={detail ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1440px) 390px, (min-width: 1024px) 28vw, (min-width: 640px) 43vw, 90vw"} loading="lazy" style={{ objectFit: "cover", objectPosition: photo.position }} /> : <ServiceIcon name={service.icon} />}</div>;
    return <li key={service.id}><details className="sd-card" id={`service-${service.id}`}>
      <summary data-service-trigger={service.id}>{photograph()}<div className="sd-card-copy"><h3>{service.name}</h3><p>{service.description}</p><span className="sd-view">View Details <span aria-hidden="true">↗</span></span></div></summary>
      <div className="sd-detail">{photograph(true)}<div className="sd-detail-copy"><p className="eyebrow">{entry.categoryTitle}</p><h4>{service.name}</h4><p>{entry.detailedDescription}</p>
        <h5>What the service may include</h5>{entry.inclusions.length ? <ul>{entry.inclusions.map(item => <li key={item}>{item}</li>)}</ul> : <p>Specific inclusions are discussed around your request and confirmed as part of the agreed scope.</p>}
        <h5>How your request is coordinated</h5><ol>{serviceCoordination.map(item => <li key={item}>{item}</li>)}</ol>
        <p className="sd-scope">{service.scopeNote}</p><p className="sd-scope">Timing and work depend on the agreed scope and availability.</p>
        <ButtonLink href={whatsapp ?? serviceRequestHref(service.id)} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noopener noreferrer" : undefined}>Request This Service <span aria-hidden="true">→</span></ButtonLink>
      </div></div>
    </details></li>;
  })}</SubServiceCarousel>;
}
