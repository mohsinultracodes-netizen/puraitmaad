import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { supportingPhotography, type SupportingPhotoKey } from "@/content/supporting-photography";
import { requestDestination, serviceRequestHref } from "@/lib/request-context";
import type { Service } from "@/content/services";
import "./supporting.css";

export function SupportingPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`sp-page ${className}`}>{children}</div>;
}
export function SupportingPhoto({ slot }: { slot: SupportingPhotoKey }) {
  const photo = supportingPhotography[slot];
  if (!photo.asset) return null;
  return <div className={`sp-photo sp-photo-${slot}`}><Image src={photo.asset.src} alt={photo.asset.alt} fill sizes="(min-width: 1440px) 540px, (min-width: 768px) 44vw, 100vw" style={{ objectFit: "cover", objectPosition: photo.position }} /></div>;
}
export function EditorialIntro({ eyebrow, title, children, photo }: { eyebrow: string; title: ReactNode; children: ReactNode; photo?: SupportingPhotoKey }) {
  return <section className={`sp-intro ${photo ? "sp-intro-with-photo" : ""}`} aria-labelledby="page-heading"><Container className="sp-intro-grid"><div><p className="eyebrow">{eyebrow}</p><h1 id="page-heading">{title}</h1><div className="sp-intro-copy">{children}</div></div>{photo && <SupportingPhoto slot={photo} />}</Container></section>;
}
export function EditorialSection({ id, title, eyebrow, children, className = "" }: { id: string; title: ReactNode; eyebrow?: string; children: ReactNode; className?: string }) {
  return <section className={`sp-section ${className}`} aria-labelledby={id}><Container className="sp-editorial-grid"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 id={id}>{title}</h2></div><div className="sp-prose">{children}</div></Container></section>;
}
export function ServiceList({ items, detailed = false }: { items: readonly Service[]; detailed?: boolean }) {
  return <ul className="sp-service-list">{items.map((service,index) => <li key={service.id} className={!detailed && index < 2 ? "sp-service-featured" : undefined}><Link href={serviceRequestHref(service.id)} aria-label={`Request ${service.name}`}><span>{service.name}</span><span aria-hidden="true">↗</span></Link>{(detailed || service.examples.length > 0 || index < 2) && <p>{service.examples.length ? service.examples.join(" · ") : service.description}</p>}</li>)}</ul>;
}
export function RequestClosing({ title, children, label = "Request a Service", href = requestDestination }: { title: string; children?: ReactNode; label?: string; href?: string }) {
  return <section className="sp-closing" aria-labelledby="request-next-heading"><Container><div><h2 id="request-next-heading">{title}</h2>{children && <div className="sp-closing-copy">{children}</div>}</div><ButtonLink href={href}>{label}<span aria-hidden="true">→</span></ButtonLink></Container></section>;
}
