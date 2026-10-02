"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

export function MobileNavigation({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <div className="mobile-navigation" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    }}>
      <button ref={trigger} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav id="mobile-menu" aria-label="Mobile navigation" hidden={!open} onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) setOpen(false);
      }}>{children}</nav>
    </div>
  );
}
