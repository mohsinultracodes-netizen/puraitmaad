import Image from "next/image";
import { Container } from "@/components/ui/container";
import { homepageTestimonialEntries, testimonialSection, type HomepageTestimonial } from "@/content/testimonials";

export function HomepageTestimonials({ entries = homepageTestimonialEntries }: { entries?: readonly HomepageTestimonial[] }) {
  if (!entries.length) return null;

  return (
    <section className="hp-customer-stories" aria-labelledby="homepage-testimonials-heading">
      <Container>
        <div className="hp-customer-stories-panel">
          <div className="hp-customer-stories-intro">
            <p className="hp-eyebrow">Customer testimonials</p>
            <h2 id="homepage-testimonials-heading">{testimonialSection.heading[0]}<br />{testimonialSection.heading[1]}</h2>
            <p className="hp-customer-stories-description">{testimonialSection.introduction}</p>
            {entries.some(entry => entry.isPlaceholder) && <p className="hp-customer-stories-notice">{testimonialSection.placeholderNotice}</p>}
          </div>
          <div className="hp-customer-stories-grid">
            {entries.map(entry => (
              <figure className="hp-customer-story" key={entry.id}>
                <div className="hp-customer-story-photo">
                  {entry.image ? (
                    <Image src={entry.image.src} alt={entry.image.alt} fill sizes="(min-width: 1024px) 136px, 80px" loading="lazy" style={{ objectPosition: entry.image.objectPosition }} />
                  ) : (
                    <div className="hp-customer-story-placeholder" aria-hidden="true">
                      <span className="hp-customer-story-monogram">{entry.name.split(" ").map(part => part[0]).join("")}</span>
                      <span>Photo pending</span>
                    </div>
                  )}
                </div>
                <div className="hp-customer-story-copy">
                  {entry.isPlaceholder && <p className="hp-customer-story-status">Development placeholder</p>}
                  <blockquote><p>{entry.quote}</p></blockquote>
                  <figcaption>
                    <span className="hp-customer-story-name">{entry.name}</span>
                    {entry.relationshipLabel && <span className="hp-customer-story-relationship">{entry.relationshipLabel}</span>}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
