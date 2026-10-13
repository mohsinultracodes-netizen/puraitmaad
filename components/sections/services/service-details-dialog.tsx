"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A single native dialog enhances server-rendered details without shipping the catalog twice. */
export function ServiceDetailsDialog({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = root.current, panel = dialog.current, content = host.current;
    if (!element || !panel || !content || typeof panel.showModal !== "function") return;
    let trigger: HTMLElement | null = null;
    let position = 0;
    let saved: { overflow: string; gutter: string } | null = null;
    const restore = () => {
      if (!saved) return;
      document.documentElement.style.overflow = saved.overflow;
      document.documentElement.style.scrollbarGutter = saved.gutter;
      saved = null;
      window.scrollTo({ top: position, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
      content.replaceChildren();
    };
    const open = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("summary[data-service-trigger]") : null;
      if (!target || !element.contains(target)) return;
      const source = target.parentElement?.querySelector<HTMLElement>(".sd-detail");
      if (!source) return;
      event.preventDefault();
      trigger = target;
      position = window.scrollY;
      const clone = source.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
      const heading = clone.querySelector("h4");
      if (heading) { heading.id = "service-dialog-title"; heading.setAttribute("aria-level", "2"); }
      content.replaceChildren(clone);
      panel.showModal();
      saved = { overflow: document.documentElement.style.overflow, gutter: document.documentElement.style.scrollbarGutter };
      document.documentElement.style.scrollbarGutter = "stable";
      document.documentElement.style.overflow = "hidden";
      panel.scrollTop = 0;
      close.current?.focus({ preventScroll: true });
    };
    const dismiss = (event: MouseEvent) => {
      if (event.target !== panel) return;
      const bounds = panel.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) panel.close();
    };
    const cycleFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const stops = [...panel.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')];
      const first = stops[0], last = stops[stops.length - 1];
      if ((!event.shiftKey && document.activeElement === last) || (event.shiftKey && document.activeElement === first)) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      }
    };
    element.addEventListener("click", open);
    panel.addEventListener("close", restore);
    panel.addEventListener("click", dismiss);
    panel.addEventListener("keydown", cycleFocus);
    return () => { element.removeEventListener("click", open); panel.removeEventListener("close", restore); panel.removeEventListener("click", dismiss); panel.removeEventListener("keydown", cycleFocus); if (panel.open) panel.close(); restore(); };
  }, []);

  return <div ref={root} className="sd-catalog">{children}<dialog ref={dialog} className="sd-dialog" aria-labelledby="service-dialog-title"><button ref={close} type="button" className="sd-close" aria-label="Close service details" onClick={() => dialog.current?.close()}>×</button><div ref={host} /></dialog></div>;
}
