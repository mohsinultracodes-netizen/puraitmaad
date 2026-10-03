import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { PropertyPhotography } from "@/components/ui/property-photography";
import type { PhotographySlotName } from "@/content/photography";

export function PageHero({ eyebrow, title, description, children, photographySlot }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode; photographySlot?: PhotographySlotName }) {
  return (
    <section className="page-hero" aria-labelledby="page-heading">
      <Container className={photographySlot ? "hero-grid" : undefined}>
        <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-heading">{title}</h1>
        <p className="page-introduction">{description}</p>
        {children}
        </div>
        {photographySlot && <PropertyPhotography slot={photographySlot} />}
      </Container>
    </section>
  );
}
