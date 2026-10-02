import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode }) {
  return (
    <section className="page-hero" aria-labelledby="page-heading">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-heading">{title}</h1>
        <p className="page-introduction">{description}</p>
        {children}
      </Container>
    </section>
  );
}
