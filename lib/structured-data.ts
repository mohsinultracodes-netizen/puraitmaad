import { siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { getContactLinks, publicContactText } from "@/lib/contact-links";
import { getSiteUrl } from "./seo";

export function organizationAndServices() {
  const origin = getSiteUrl();
  const url = origin.href, organizationId = `${url}#organization`;
  const links = getContactLinks();
  const sameAs = [links.instagram, links.facebook, links.linkedin].filter(Boolean);
  const contactPoint = [
    ...(links.phone ? [{ "@type": "ContactPoint", telephone: links.phone.slice(4), contactType: "customer service" }] : []),
    ...(links.email ? [{ "@type": "ContactPoint", email: decodeURIComponent(links.email.slice(7)), contactType: "customer service" }] : []),
  ];
  const area = publicContactText(siteConfig.CITY);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": organizationId, name: siteConfig.BRAND_NAME, url,
        logo: new URL("/images/pur-aitmaad-logo.svg", origin).href,
        ...(sameAs.length ? { sameAs } : {}), ...(contactPoint.length ? { contactPoint } : {}) },
      ...serviceCategories.map(category => ({ "@type": "Service", "@id": `${url}services#${category.id}`,
        name: category.name, description: category.description, serviceType: category.name,
        url: new URL(category.id === "property-care" ? "/services/property-care" : `/services#${category.id}`, origin).href,
        provider: { "@id": organizationId },
        ...(area ? { areaServed: { "@type": "City", name: area } } : {}) })),
    ],
  };
}
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
