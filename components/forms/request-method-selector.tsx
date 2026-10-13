"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ServiceIcon } from "@/components/ui/service-icon";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import "./request-method-selector.css";

/** Keep the existing form mounted so switching methods preserves its state. */
export function RequestMethodSelector({ children, whatsappHref, formHref, initiallyShowForm = false, context }: {
  children: ReactNode; whatsappHref: string | null; formHref: string; initiallyShowForm?: boolean; context?: string;
}) {
  const [showForm, setShowForm] = useState(initiallyShowForm || !whatsappHref);
  const [enhanced, setEnhanced] = useState(false);
  const formPanel = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    function followLocation() {
      setEnhanced(true);
      if (!whatsappHref) return;
      if (["#request-service", "#consultation"].includes(window.location.hash)) setShowForm(true);
      else if (window.location.hash === "#request-options") setShowForm(false);
      else setShowForm(new URLSearchParams(window.location.search).get("method") === "form");
    }
    followLocation();
    window.addEventListener("hashchange", followLocation);
    window.addEventListener("popstate", followLocation);
    return () => { window.removeEventListener("hashchange", followLocation); window.removeEventListener("popstate", followLocation); };
  }, [whatsappHref]);

  useEffect(() => {
    if (!showForm || !["#request-service", "#consultation"].includes(window.location.hash)) return;
    const frame = requestAnimationFrame(() => formPanel.current?.scrollIntoView({ block: "start", behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [showForm]);

  return <div className="request-journey">
    {whatsappHref && <section id="request-options" className="request-methods" aria-labelledby="request-method-heading" hidden={showForm}>
      <h2 ref={heading} id="request-method-heading" tabIndex={-1}>How would you like to get started?</h2>
      <p className="request-method-lead">Tell us what you need, in whichever way works best for you.</p>
      {context && <p className="request-method-context">Requesting help with {context}.</p>}
      <div className="request-method-grid">
        <div className="request-method-card"><ServiceIcon name="clipboard" /><h3>Submit a Form</h3><p>Share your requirements and we&apos;ll get back to you.</p>
          <a className="button button-primary" href={formHref} aria-controls="request-service" aria-expanded={showForm} onClick={event => {
            event.preventDefault();setShowForm(true);
            window.history.pushState(null, "", formHref);
            requestAnimationFrame(() => {
              formPanel.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
              formPanel.current?.querySelector<HTMLElement>("input:not([type=hidden]):not([tabindex='-1'])")?.focus({ preventScroll: true });
            });
          }}>Fill Out Form <span aria-hidden="true">→</span></a>
        </div>
        <div className="request-method-card"><WhatsAppIcon /><h3>Chat on WhatsApp</h3><p>Have a question or need something handled? Message us directly.</p>
          <a className="button button-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">Start Chat <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <p className="request-method-note">No membership required for one-time requests.</p>
    </section>}
    {!whatsappHref && <span id="request-options" aria-hidden="true" />}
    <details className="request-form-disclosure" open={showForm || !whatsappHref} suppressHydrationWarning onToggle={event => {
      if (whatsappHref) setShowForm(event.currentTarget.open);
    }}>
      <summary className="sr-only" hidden={enhanced || !whatsappHref}>Open your service request form</summary>
      <div ref={formPanel} id="request-service" className="request-form-panel">
      <span className="request-anchor-compat" id="consultation" aria-hidden="true" />
      {whatsappHref && enhanced && <a className="request-back" href="#request-options" onClick={event => {
        event.preventDefault();setShowForm(false);
        const optionsUrl = new URL(window.location.href);optionsUrl.searchParams.delete("method");optionsUrl.hash = "request-options";
        window.history.pushState(null, "", `${optionsUrl.pathname}${optionsUrl.search}${optionsUrl.hash}`);
        requestAnimationFrame(() => { heading.current?.focus({ preventScroll: true });heading.current?.scrollIntoView({ block: "start", behavior: "instant" }); });
      }}>← Back to options</a>}
      {children}
      </div>
    </details>
  </div>;
}
