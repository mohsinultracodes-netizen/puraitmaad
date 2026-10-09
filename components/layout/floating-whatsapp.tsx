"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { contextualWhatsappHref } from "@/lib/contact-links";
import "./floating-whatsapp.css";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const link = useRef<HTMLAnchorElement>(null);
  const [presentation, setPresentation] = useState({ obstructed: false, preparingHome: false });
  useEffect(() => {
    let frame = 0;
    function update() {
      const control = link.current;
      if (!control) return;
      const bounds = control.getBoundingClientRect();
      const intersects = (rect: DOMRect) => rect.width > 0 && rect.height > 0 && rect.left < bounds.right + 8 && rect.right > bounds.left - 8 && rect.top < bounds.bottom + 8 && rect.bottom > bounds.top - 8;
      const editing = document.activeElement?.matches("input, textarea, select");
      const overlap = [...document.querySelectorAll("main a, main button, main input, main textarea, footer a, #mobile-menu:not([hidden])")].some(element => intersects(element.getBoundingClientRect()));
      // Measure actual text lines, so the control can use empty margins without
      // obscuring copy. Ignore whole paragraph boxes that include blank space.
      const textOverlap = [...document.querySelectorAll("main p, main h1, main h2, main h3, main li, main label, footer p, footer li")].some(element => {
        if (!intersects(element.getBoundingClientRect())) return false;
        const text = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        while (text.nextNode()) {
          if (!text.currentNode.textContent?.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(text.currentNode);
          if ([...range.getClientRects()].some(intersects)) return true;
        }
        return false;
      });
      const story = document.querySelector('[aria-labelledby="coming-home-heading"]')?.getBoundingClientRect();
      const preparingHome = Boolean(story && story.top < innerHeight * .6 && story.bottom > innerHeight * .4);
      // Yield to visible CTAs and the mobile keyboard rather than covering them.
      const obstructed = document.activeElement !== control && Boolean(editing || overlap || textOverlap);
      setPresentation(previous => previous.obstructed === obstructed && previous.preparingHome === preparingHome ? previous : { obstructed, preparingHome });
    }
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", schedule);
    document.addEventListener("focusout", schedule);
    const observer = new MutationObserver(schedule);
    const menu = document.getElementById("mobile-menu");
    if (menu) observer.observe(menu, { attributes: true, attributeFilter: ["hidden"] });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", schedule);
      document.removeEventListener("focusout", schedule);
      observer.disconnect();
    };
  }, [pathname]);
  const context = presentation.preparingHome ? "arrival-ready" : pathname === "/services/property-care" ? "property-care" : "general";
  const href = contextualWhatsappHref(context);
  if (!href) return null;
  return <a ref={link} className="button button-primary floating-whatsapp" href={href} aria-label="Chat with us on WhatsApp" data-obstructed={presentation.obstructed} aria-hidden={presentation.obstructed || undefined} tabIndex={presentation.obstructed ? -1 : undefined}><WhatsAppIcon /><span>Chat with us</span></a>;
}
