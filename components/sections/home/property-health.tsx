import { Container } from "@/components/ui/container";
import { continuation } from "@/content/home-continuation";

export function PropertyHealth() {
  const { health } = continuation;
  return (
    <section className="home-section health-section" aria-labelledby="health-heading">
      <Container className="health-grid">
        <div>
          <p className="eyebrow section-eyebrow">Property Health</p>
          <h2 id="health-heading">{health.heading}</h2>
          <p className="section-description">{health.description}</p>
        </div>
        <figure className="property-report">
          <figcaption>Illustrative Property Health Report</figcaption>
          <dl>
            {health.items.map((item) => (
              <div className="report-row" key={item.name}>
                <dt>{item.name}</dt>
                <dd><span className={`report-status status-${item.tone}`}>{item.status}</span></dd>
              </div>
            ))}
          </dl>
          <p className="report-note">An example of reporting presentation, not a live property record.</p>
        </figure>
      </Container>
    </section>
  );
}
