import { Container } from "@/components/ui/container";
import { HomepagePhotography } from "@/components/ui/homepage-photography";
import { homepage } from "@/content/homepage";
import { EditorialHeading, SupportList } from "./homepage-shared";

export function ManagedProcess() {
  return <section className="hp-process-section hp-section" aria-labelledby="managed-process-heading"><Container>
    <div className="hp-difference"><HomepagePhotography slot="difference" /><div><EditorialHeading eyebrow="How it works" id="managed-process-heading">{homepage.difference.heading}</EditorialHeading><p className="hp-body-copy">{homepage.difference.description}</p><p className="hp-promise">{homepage.difference.promise.map(line => <span key={line}>{line}</span>)}</p></div></div>
    <ol className="hp-process">{homepage.process.map((step,index) => <li key={step.title}><div className="hp-process-marker"><span>{String(index+1).padStart(2,"0")}</span><span aria-hidden="true">{index < 4 ? "→" : "·"}</span></div><h3>{step.title}</h3><p className="hp-step-label">{step.label}</p><p>{step.description}</p></li>)}</ol>
  </Container></section>;
}

export function EmotionalValue() {
  return <section className="hp-section hp-emotional" aria-labelledby="emotional-heading"><Container className="hp-editorial-pair"><HomepagePhotography slot="emotional" /><div className="hp-editorial-copy"><EditorialHeading eyebrow="Why Puraitmaad" id="emotional-heading">{homepage.emotional.heading[0]}<br />{homepage.emotional.heading[1]}</EditorialHeading><p className="hp-body-copy">{homepage.emotional.description}</p><SupportList items={homepage.emotional.points} /></div></Container></section>;
}
