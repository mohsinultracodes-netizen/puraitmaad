import type { ComponentPropsWithoutRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonTone = "light" | "dark";

export function Button({ variant = "primary", tone = "light", loading = false, loadingLabel = "Sending…", disabled, children, className = "", type = "button", ...props }: ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant; tone?: ButtonTone; loading?: boolean; loadingLabel?: string }) {
  return <button {...props} type={type} data-tone={tone} disabled={disabled || loading} aria-busy={loading || props["aria-busy"]} className={`button button-${variant} ${className}`}>{loading ? loadingLabel : children}</button>;
}
