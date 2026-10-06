import type { Metadata } from "next";
import { site } from "@/content/site";

export const publicRoutes = ["/", "/services", "/services/property-care", "/how-it-works", "/about", "/contact", "/membership", "/privacy-policy", "/terms-and-conditions", "/cancellation-policy", "/service-disclaimer"] as const;
export const socialImage = { url: "/images/og-puraitmaad.jpg", width: 1200, height: 630, alt: "Puraitmaad — Your problem → our responsibility. Premium home, property & business assistance. Lahore, Pakistan." };

export function getSiteUrl(): URL {
  const configured = process.env.SITE_URL?.trim() || site.url;
  const url = new URL(configured);
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.pathname !== "/" || url.search || url.hash || !url.hostname.includes(".") || /(^|\.)localhost$|\.(local|test|invalid)$|^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)) {
    throw new Error("SITE_URL must be the confirmed public HTTPS origin, without a path, credentials, port, query or fragment.");
  }
  return url;
}

export function pageMetadata(title: string, description: string, route: typeof publicRoutes[number]): Metadata {
  const origin = getSiteUrl();
  const url = new URL(route, origin).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      type: "website",
      locale: "en_PK",
      url,
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [socialImage] },
  };
}
