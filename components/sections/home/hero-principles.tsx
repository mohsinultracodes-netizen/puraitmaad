"use client";

import { useState } from "react";
import { homepage } from "@/content/homepage";

export function HeroPrinciples() {
  const [paused, setPaused] = useState(false);
  return <div className="hp-principles" data-paused={paused} role="region" aria-labelledby="hero-principles-heading">
    <p id="hero-principles-heading" className="sr-only">Our service principles</p>
    <div className="hp-principles-viewport"><div className="hp-principles-track">
      {[0, 1, 2].map(copy => <ul key={copy} aria-hidden={copy > 0 ? true : undefined}>{homepage.principles.map(principle => <li key={principle.label}>{principle.label}<span aria-hidden="true" className="hp-principles-separator">&#8226;</span></li>)}</ul>)}
    </div></div>
    <button className="hp-principles-toggle" type="button" aria-label={paused ? "Resume service principles animation" : "Pause service principles animation"} aria-pressed={paused} onClick={() => setPaused(!paused)}>
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" focusable="false">{paused ? <path d="M5 3 12 8 5 13Z" fill="currentColor" /> : <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" />}</svg>
    </button>
  </div>;
}
