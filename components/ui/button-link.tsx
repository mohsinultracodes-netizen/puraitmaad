import Link from "next/link";
import type { ComponentProps } from "react";
import type { ButtonTone, ButtonVariant } from "./button";

export function ButtonLink({
  variant = "primary",
  className = "",
  tone = "light",
  disabled = false,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; tone?: ButtonTone; disabled?: boolean }) {
  // A disabled link has no destination or click handler, including via keyboard.
  if (disabled) return <span role="link" aria-disabled="true" data-tone={tone} className={`button button-${variant} ${className}`}>{children}</span>;
  return <Link data-tone={tone} className={`button button-${variant} ${className}`} {...props}>{children}</Link>;
}
