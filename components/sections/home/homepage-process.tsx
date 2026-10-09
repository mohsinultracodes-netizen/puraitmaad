import { Container } from "@/components/ui/container";
import { HomepagePhotography } from "@/components/ui/homepage-photography";
import { homepage } from "@/content/homepage";
import { EditorialHeading, SupportList } from "./homepage-shared";
import { ProcessIllustration } from "./process-illustration";
import { ProcessJourneyPath } from "./process-journey-path";

export function ManagedProcess() {
  return <section className="hp-process-section hp-section" aria-labelledby="managed-process-heading"><Container>
    <div className="hp-process-intro">
      <p className="hp-process-pill">How it works</p>
      <h2 id="managed-process-heading">One request.<br />We handle the rest.</h2>
      <p>Tell us what you need and Puraitmaad coordinates the people, details and follow-through.</p>
    </div>
    <div className="hp-process-journey">
      <ProcessJourneyPath />
      <ol className="hp-process-stages">{homepage.process.map((step,index) => <li className="hp-process-stage" key={step.title}>
        <div className="hp-process-art"><ProcessIllustration step={index} /></div>
        <div className="hp-process-stage-copy">
          <p className="hp-process-number">Step {String(index+1).padStart(2,"0")}</p>
          <h3>{step.title}</h3>
          <p className="hp-process-description">{step.description}</p>
        </div>
      </li>)}</ol>
    </div>
  </Container></section>;
}

export function EmotionalValue() {
  return <section className="hp-section hp-emotional" aria-labelledby="emotional-heading"><Container className="hp-editorial-pair"><HomepagePhotography slot="emotional" /><div className="hp-editorial-copy"><EditorialHeading eyebrow="Why Puraitmaad" id="emotional-heading">{homepage.emotional.heading[0]}<br />{homepage.emotional.heading[1]}</EditorialHeading><p className="hp-body-copy">{homepage.emotional.description}</p><SupportList items={homepage.emotional.points} /></div></Container></section>;
}
