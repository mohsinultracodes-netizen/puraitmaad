import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { homepage } from "@/content/homepage";

export function RequestLink({ children = "Request a Service", tone = "light", text = false }: { children?: ReactNode; tone?: "light" | "dark"; text?: boolean }) {
  return <ButtonLink href={homepage.requestHref} variant={text ? "text" : "primary"} tone={tone}>{children}<span aria-hidden="true">→</span></ButtonLink>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="hp-text-link" href={href}>{children}<span aria-hidden="true">→</span></Link>;
}

export function EditorialHeading({ id, eyebrow, children }: { id: string; eyebrow: string; children: ReactNode }) {
  return <div className="hp-heading"><p className="hp-eyebrow">{eyebrow}</p><h2 id={id}>{children}</h2></div>;
}

export function SupportList({ items }: { items: readonly string[] }) {
  return <ul className="hp-support-list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
