import type { ComponentPropsWithoutRef } from "react";

export function Button({ variant = "primary", className = "", type = "button", ...props }: ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "secondary" }) {
  return <button type={type} className={`button button-${variant} ${className}`} {...props} />;
}
