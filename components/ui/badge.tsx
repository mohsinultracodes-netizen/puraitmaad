import type { ComponentPropsWithoutRef } from "react";

/** A visual label, never an automatic verification or certification claim. */
export function Badge({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={`ui-badge ${className}`} />;
}
