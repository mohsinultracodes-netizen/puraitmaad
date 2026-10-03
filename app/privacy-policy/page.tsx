import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { privacyPolicy } from "@/content/privacy-policy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy Policy", "How Pur Aitmaad handles website and consultation information, including email delivery, privacy principles and enquiry uses.", "/privacy-policy");

export default function PrivacyPolicyPage() {
  return <>
    <PageHero eyebrow="Website privacy" title="Privacy Policy" description="How information provided through this website is handled.">
      <p className="coverage-note">Last updated: October 2026</p>
    </PageHero>
    <Container className="policy-layout">
      <nav aria-label="Privacy Policy contents" className="policy-contents"><p className="eyebrow">On this page</p><ul>{privacyPolicy.map((section) => <li key={section.id}><Link href={`#${section.id}`}>{section.title}</Link></li>)}</ul></nav>
      <article className="policy-copy" aria-label="Website Privacy Policy">
        {privacyPolicy.map((section) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}><h2 id={`${section.id}-heading`}>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}{section.note && <p>{section.note}</p>}</section>)}
        <p className="policy-service-link">For our property service principles, read <Link href="/privacy-and-discretion">Privacy &amp; Discretion</Link>.</p>
      </article>
    </Container>
  </>;
}
