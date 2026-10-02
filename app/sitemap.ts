import type { MetadataRoute } from "next";
import { getSiteUrl, publicRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  return publicRoutes.map((route) => ({ url: new URL(route, origin).href }));
}
