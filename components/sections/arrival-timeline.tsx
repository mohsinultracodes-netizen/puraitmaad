import { comingHomeScenario } from "@/content/scenarios";
import "./arrival-timeline.css";

/** Illustrative sequence only; the surrounding section retains its scope and disclosure. */
export function ArrivalTimeline() {
  return <ol className="arrival-timeline">
    {comingHomeScenario.timeline.map((step, index) => <li key={step.when}>
      <span className="arrival-timeline-marker" aria-hidden="true">{index + 1}</span>
      <div className="arrival-timeline-card">
        <p className="eyebrow arrival-timeline-timing">{step.when}</p>
        <h3>{step.action}</h3>
      </div>
    </li>)}
  </ol>;
}
