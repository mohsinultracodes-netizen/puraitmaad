import type { ReactNode } from "react";

// Existing SectionHeader equivalent; retain the name to avoid duplicate primitives.
export function SectionHeading({ eyebrow, children, id, as: Heading = "h2", className = "" }: { eyebrow?: string; children: ReactNode; id?: string; as?: "h2" | "h3"; className?: string }) {
  return <div className={className || undefined}>{eyebrow && <p className="eyebrow section-eyebrow">{eyebrow}</p>}<Heading id={id}>{children}</Heading></div>;
}
