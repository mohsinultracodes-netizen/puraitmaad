"use client";

import { useEffect } from "react";
import "./scroll-reveals.css";

/** Prepare only offscreen content; opacity never reaches zero, even while waiting. */
export function ScrollReveals({ scope }: { scope: string }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(scope);
    if (!root || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 63.999rem)");
    const targets = [...root.querySelectorAll<HTMLElement>("[data-scroll-reveal]")];
    const completed = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;

    function finish(element: HTMLElement) {
      completed.add(element);
      observer?.unobserve(element);
      element.classList.remove("scroll-reveal-enter", "scroll-reveal-prepared");
      element.style.removeProperty("--reveal-delay");
    }

    function finishAll() {
      targets.forEach(finish);
      observer?.disconnect();
    }

    function revealHash() {
      if (!window.location.hash) return;
      let destination: HTMLElement | null;
      try { destination = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); }
      catch { return; }
      if (!destination || !root?.contains(destination)) return;
      targets.filter(element => element.contains(destination) || destination.contains(element)).forEach(finish);
    }

    function onFocus(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
      targets.filter(element => element.contains(event.target as Node)).forEach(finish);
    }

    function onMotionChange() {
      // Never re-arm completed content when the preference changes back.
      if (motion.matches) finishAll();
    }

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) finishAll();
    }

    try {
      if (motion.matches) return;
      observer = new IntersectionObserver(entries => {
        const entering = entries.filter(entry => entry.isIntersecting)
          .map(entry => entry.target as HTMLElement);
        entering.forEach(element => {
          if (completed.has(element)) return;
          if (element.contains(document.activeElement)) { finish(element); return; }
          completed.add(element);
          observer?.unobserve(element);
          const siblings = targets.filter(item => item.parentElement === element.parentElement);
          const sequence = element.dataset.scrollSequence;
          const index = siblings.indexOf(element);
          // Use document order, not observer callback batches. Services stagger by row.
          const row = siblings.filter(item => Math.abs(item.offsetTop - element.offsetTop) < 2);
          const delay = compact.matches ? 0 : sequence === "arrival" || sequence === "process"
            ? index * 100 : sequence === "services" ? row.indexOf(element) * 90 : 0;
          element.style.setProperty("--reveal-delay", `${delay}ms`);
          element.classList.remove("scroll-reveal-prepared");
          element.classList.add("scroll-reveal-enter");
        });
      }, { rootMargin: `0px 0px -${Math.round(window.innerHeight * .12)}px 0px`, threshold: 0 });

      revealHash();
      targets.forEach(element => {
        // Above-fold and restored-position content stays visible with no hydration entrance.
        if (completed.has(element) || element.getBoundingClientRect().top <= window.innerHeight) finish(element);
        else {
          // Existing transforms belong to the design; don't replace them with image scale.
          const image = element.dataset.scrollReveal === "image" ? element.querySelector("img") : null;
          if (image && getComputedStyle(image).transform !== "none") { finish(element); return; }
          observer?.observe(element);
          element.classList.add("scroll-reveal-prepared");
        }
      });
      root.addEventListener("focusin", onFocus);
      window.addEventListener("hashchange", revealHash);
      window.addEventListener("pageshow", onPageShow);
      motion.addEventListener("change", onMotionChange);
    } catch {
      finishAll();
    }

    return () => {
      finishAll();
      root.removeEventListener("focusin", onFocus);
      window.removeEventListener("hashchange", revealHash);
      window.removeEventListener("pageshow", onPageShow);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [scope]);

  return null;
}
