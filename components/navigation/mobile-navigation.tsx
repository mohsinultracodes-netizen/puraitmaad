"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function MobileNavigation({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeAtDesktop = () => {
      if (desktop.matches) {
        if (root.current?.contains(document.activeElement)) {
          document.querySelector<HTMLAnchorElement>(".site-header .wordmark")?.focus();
        }
        setOpen(false);
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    desktop.addEventListener("change", closeAtDesktop);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktop.removeEventListener("change", closeAtDesktop);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);
  return (
    <div ref={root} className="mobile-navigation" onBlur={(event) => {
      // Non-modal disclosure: tabbing out closes the panel; the page stays usable.
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }} onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        event.preventDefault();
        trigger.current?.focus();
      }
    }}>
      <button ref={trigger} type="button" className="menu-toggle" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((current) => !current)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
      <nav id="mobile-menu" aria-label="Primary navigation" hidden={!open} onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}>{children}</nav>
    </div>
  );
}
