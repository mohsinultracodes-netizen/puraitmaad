"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Native overflow remains swipeable and keyboard accessible before hydration. */
export function SubServiceCarousel({ children, category, count }: { children: ReactNode; category: string; count: number }) {
  const track = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ ready: false, previous: false, next: true, index: 0 });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      const slides = [...element.children] as HTMLElement[];
      const left = element.getBoundingClientRect().left + 8;
      const index = slides.reduce((best, slide, candidate) => Math.abs(slide.getBoundingClientRect().left - left) < Math.abs(slides[best].getBoundingClientRect().left - left) ? candidate : best, 0);
      setState({ ready: true, previous: element.scrollLeft > 2, next: element.scrollLeft < element.scrollWidth - element.clientWidth - 2, index });
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    element.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); element.removeEventListener("scroll", schedule); };
  }, []);
  function navigate(direction: number) {
    const element = track.current;
    if (!element) return;
    const first = element.children[0] as HTMLElement, second = element.children[1] as HTMLElement;
    element.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function show(slide: Element) {
    const element = track.current;
    if (!element) return;
    const bounds = slide.getBoundingClientRect(), view = element.getBoundingClientRect();
    if (bounds.left < view.left + 8 || bounds.right > view.right - 8) element.scrollTo({ left: element.scrollLeft + bounds.left - view.left - 8, behavior: "instant" });
  }
  return <div className="sd-carousel" data-scroll-reveal>
    <ul className="sd-track" ref={track} id={`${category}-carousel`} aria-labelledby={`${category}-heading`} onFocusCapture={event => {
      const slide = (event.target as HTMLElement).closest(".sd-track > li");
      if (slide) show(slide);
    }} onKeyDown={event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      const element = track.current;
      if (!element) return;
      const current = (event.target as HTMLElement).closest(".sd-track > li");
      const index = current ? [...element.children].indexOf(current) : state.index;
      const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : Math.max(0, Math.min(count - 1, index + (event.key === "ArrowRight" ? 1 : -1)));
      event.preventDefault();
      const slide = element.children[next];
      show(slide);
      slide.querySelector<HTMLElement>("summary")?.focus({ preventScroll: true });
    }}>{children}</ul>
    <div className="sd-controls" hidden={!state.ready}>
      <button className="sv-carousel-arrow" type="button" aria-label={`Previous ${category.replaceAll("-", " ")} services`} aria-controls={`${category}-carousel`} disabled={!state.previous} onClick={() => navigate(-1)}><span aria-hidden="true">←</span></button>
      <p className="sv-carousel-position"><span>{String(state.index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}</p>
      <button className="sv-carousel-arrow" type="button" aria-label={`Next ${category.replaceAll("-", " ")} services`} aria-controls={`${category}-carousel`} disabled={!state.next} onClick={() => navigate(1)}><span aria-hidden="true">→</span></button>
    </div>
  </div>;
}
