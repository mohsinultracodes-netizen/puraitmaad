import Image from "next/image";
import { Container } from "@/components/ui/container";
import { HomepagePhotography } from "@/components/ui/homepage-photography";
import { ServicePhotography } from "@/components/ui/service-photography";
import { homepage } from "@/content/homepage";
import { comingHomeScenario } from "@/content/scenarios";
import { photography } from "@/content/photography";
import { EditorialHeading, RequestLink, SupportList } from "./homepage-shared";
import { ArrivalTimeline } from "@/components/sections/arrival-timeline";

export function PropertyCareFeature() {
  return (
    <section className="hp-section hp-property-feature" aria-labelledby="property-care-heading">
      <Container className="hp-feature-layout">
        <div className="hp-feature-intro">
          <EditorialHeading eyebrow={homepage.property.eyebrow} id="property-care-heading">
            {homepage.property.heading[0]}<br />{homepage.property.heading[1]}
          </EditorialHeading>
          <p className="hp-body-copy">{homepage.property.description}</p>
        </div>
        <div className="hp-feature-media"><HomepagePhotography slot="property" /></div>
        <div className="hp-feature-details">
          <SupportList items={homepage.property.support} />
          <p className="hp-small">{homepage.scope}</p>
          <RequestLink tone="dark">{homepage.property.cta}</RequestLink>
        </div>
      </Container>
    </section>
  );
}

export function BusinessSupportFeature() {
  return (
    <section className="hp-section hp-business-feature" aria-labelledby="business-support-heading">
      <Container className="hp-feature-layout">
        <div className="hp-feature-intro">
          <EditorialHeading eyebrow={homepage.business.eyebrow} id="business-support-heading">
            {homepage.business.heading[0]}<br />{homepage.business.heading[1]}
          </EditorialHeading>
          <p className="hp-body-copy">{homepage.business.description}</p>
        </div>
        <div className="hp-feature-media">
          <ServicePhotography image="electrical" sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw" />
        </div>
        <div className="hp-feature-details">
          <SupportList items={homepage.business.support} />
          <p className="hp-small">{homepage.business.contexts}</p>
          <RequestLink>{homepage.business.cta}</RequestLink>
        </div>
      </Container>
    </section>
  );
}

export function ComingHomeStory() {
  const story = comingHomeScenario;
  const arrival = photography.arrivalReady.asset;
  return (
    <section className="hp-section hp-coming-home" aria-labelledby="coming-home-heading">
      <Container>
        <div className="hp-story-intro">
          <div className="hp-story-copy">
            <div className="hp-heading"><h2 id="coming-home-heading">“{story.title}”</h2></div>
            <p className="hp-body-copy">{story.ending}</p>
          </div>
          {arrival && <div className="hp-photo hp-story-photo">
            <Image src={arrival.src} alt={arrival.alt} fill sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw" loading="lazy" placeholder="blur" style={{ objectFit: "cover", objectPosition: "50% 50%" }} />
          </div>}
        </div>
        <ArrivalTimeline />
        <div className="hp-story-ending">
          <div><p className="hp-small">{story.scopeNote}</p><p className="hp-small">{story.disclosure}</p></div>
          <RequestLink text>Prepare My Home</RequestLink>
        </div>
      </Container>
    </section>
  );
}

export function ProblemLedRequest() {
  return <section className="hp-unsure" aria-labelledby="unsure-heading"><Container><div><h2 id="unsure-heading">{homepage.unsure.heading}</h2><p>{homepage.unsure.description}</p></div><RequestLink text>{homepage.unsure.cta}</RequestLink></Container></section>;
}
