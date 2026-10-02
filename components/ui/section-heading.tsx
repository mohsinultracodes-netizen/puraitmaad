import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, children, id }: { eyebrow?: string; children: ReactNode; id?: string }) {
  return <div>{eyebrow && <p className="eyebrow section-eyebrow">{eyebrow}</p>}<h2 id={id}>{children}</h2></div>;
}
