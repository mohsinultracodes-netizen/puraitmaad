"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Slides remain server-rendered children; only native scrolling and controls hydrate. */
export function ServicesCarousel({ children, labels }: { children: ReactNode; labels: readonly string[] }) {
  const track = useRef<HTMLUListElement>(null);
  const activeIndex = useRef(1);
  const [active, setActive] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const slides = [...element.children] as HTMLElement[];
    const position = (index: number) => slides[index].offsetLeft - element.offsetLeft - (element.clientWidth - slides[index].offsetWidth) / 2;
    element.scrollTo({ left: position(1), behavior: "instant" });
    setReady(true);
    const update = () => {
      const center = element.getBoundingClientRect().left + element.clientWidth / 2;
      const index = slides.reduce((best, slide, candidate) => {
        const distance = (item: HTMLElement) => Math.abs(item.getBoundingClientRect().left + item.offsetWidth / 2 - center);
        return distance(slide) < distance(slides[best]) ? candidate : best;
      }, 0);
      if (index !== activeIndex.current) { activeIndex.current = index; setActive(index); }
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(() => {
      element.scrollTo({ left: position(activeIndex.current), behavior: "instant" });
    });
    resize.observe(element);
    element.addEventListener("scroll", schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); resize.disconnect(); element.removeEventListener("scroll", schedule); };
  }, []);

  function move(index: number, instant = false) {
    const element = track.current;
    const slide = element?.children[index] as HTMLElement | undefined;
    if (!element || !slide) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: slide.offsetLeft - element.offsetLeft - (element.clientWidth - slide.offsetWidth) / 2, behavior: reduced || instant ? "instant" : "smooth" });
  }

  return <div className="sv-carousel" data-active={ready ? active : 0}>
    <ul className="sv-carousel-track" id="services-carousel" ref={track} aria-label="Service categories" onFocusCapture={event => {
      const slide = (event.target as HTMLElement).closest(".sv-slide");
      if (slide && track.current) move([...track.current.children].indexOf(slide), true);
    }} onKeyDown={event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const index = event.key === "Home" ? 0 : event.key === "End" ? labels.length - 1 : Math.max(0, Math.min(labels.length - 1, activeIndex.current + (event.key === "ArrowRight" ? 1 : -1)));
      move(index, true);
      (track.current?.children[index].querySelector("a") as HTMLAnchorElement | null)?.focus({ preventScroll: true });
    }}>{children}</ul>
    <div className="sv-carousel-controls" hidden={!ready}>
      <button type="button" className="sv-carousel-arrow" aria-label="Previous service category" aria-controls="services-carousel" disabled={active === 0} onClick={() => move(activeIndex.current - 1)}><span aria-hidden="true">←</span></button>
      <p className="sv-carousel-position" aria-live="polite" aria-atomic="true"><span>{String(active + 1).padStart(2, "0")}</span> / {String(labels.length).padStart(2, "0")}<span className="sr-only">: {labels[active]}</span></p>
      <button type="button" className="sv-carousel-arrow" aria-label="Next service category" aria-controls="services-carousel" disabled={active === labels.length - 1} onClick={() => move(activeIndex.current + 1)}><span aria-hidden="true">→</span></button>
    </div>
  </div>;
}
