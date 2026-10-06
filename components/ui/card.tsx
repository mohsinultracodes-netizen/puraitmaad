import type { ComponentPropsWithoutRef } from "react";

export function Card({ className = "", tone = "light", ...props }: ComponentPropsWithoutRef<"div"> & { tone?: "light" | "dark" }) {
  return <div {...props} data-tone={tone} className={`ui-card ${className}`} />;
}
