import { Container } from "@/components/ui/container";
import { HomepagePhotography } from "@/components/ui/homepage-photography";
import { homepage } from "@/content/homepage";
import { comingHomeScenario } from "@/content/scenarios";
import { EditorialHeading, RequestLink, SupportList } from "./homepage-shared";

export function PropertyAndBusiness() {
  return <section className="hp-section hp-care" aria-label="Care for your property and business"><Container><div className="hp-care-grid">
    <article aria-labelledby="property-care-heading"><HomepagePhotography slot="property" /><div className="hp-care-copy"><EditorialHeading eyebrow={homepage.property.eyebrow} id="property-care-heading">{homepage.property.heading[0]}<br />{homepage.property.heading[1]}</EditorialHeading><p className="hp-body-copy">{homepage.property.description}</p><SupportList items={homepage.property.support} /><p className="hp-small">{homepage.scope}</p><RequestLink>{homepage.property.cta}</RequestLink></div></article>
    <article aria-labelledby="business-support-heading"><HomepagePhotography slot="business" /><div className="hp-care-copy"><EditorialHeading eyebrow={homepage.business.eyebrow} id="business-support-heading">{homepage.business.heading[0]}<br />{homepage.business.heading[1]}</EditorialHeading><p className="hp-body-copy">{homepage.business.description}</p><SupportList items={homepage.business.support} /><p className="hp-small">{homepage.business.contexts}</p><RequestLink>{homepage.business.cta}</RequestLink></div></article>
  </div></Container></section>;
}

export function ComingHomeStory() {
  const story = comingHomeScenario;
  return <section className="hp-section hp-coming-home" aria-labelledby="coming-home-heading"><Container>
    <div className="hp-section-intro"><EditorialHeading eyebrow={story.label} id="coming-home-heading">“{story.title}”</EditorialHeading><p>{story.ending}</p></div>
    <ol className="hp-timeline">{story.timeline.map((step,index)=><li key={step.when}><span className="hp-timeline-dot" aria-hidden="true">{index+1}</span><p className="hp-eyebrow">{step.when}</p><h3>{step.action}</h3></li>)}</ol>
    <div className="hp-story-ending"><div><p className="hp-small">{story.scopeNote}</p><p className="hp-small">{story.disclosure}</p></div><RequestLink>Prepare My Home</RequestLink></div>
  </Container></section>;
}

export function ProblemLedRequest() {
  return <section className="hp-unsure" aria-labelledby="unsure-heading"><Container><div><h2 id="unsure-heading">{homepage.unsure.heading}</h2><p>{homepage.unsure.description}</p></div><RequestLink text>{homepage.unsure.cta}</RequestLink></Container></section>;
}
