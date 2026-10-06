import Link from "next/link";
import { Container } from "@/components/ui/container";
import { legalDraftLabel, type LegalSection } from "@/content/legal";
import { requestDestination } from "@/lib/request-context";
import "./legal-page.css";
export function LegalPage({ title, description, sections, draft = false }: { title: string; description: string; sections: readonly LegalSection[]; draft?: boolean }) {
  return <div className="legal-page"><Container><header className="legal-intro"><p className="eyebrow">Puraitmaad / Information</p><h1>{title}</h1><p>{description}</p>{draft && <p className="legal-draft">{legalDraftLabel}</p>}</header><div className="legal-layout"><nav aria-label={`${title} contents`} className="legal-contents"><p className="eyebrow">On this page</p><ul>{sections.map(section=><li key={section.id}><Link href={`#${section.id}`}>{section.title}</Link></li>)}</ul></nav><article className="legal-copy" aria-label={title}>{sections.map(section=><section id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}><h2 id={`${section.id}-heading`}>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}{section.note && <p className="legal-note">{section.note}</p>}</section>)}<p className="legal-question">Have a question? <Link href={requestDestination}>Contact Puraitmaad</Link>.</p></article></div></Container></div>;
}
