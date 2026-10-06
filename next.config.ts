import type { NextConfig } from "next";
import { site } from "./content/site";
import { legacyRedirects } from "./lib/route-migrations";

const nextConfig: NextConfig = {
  async redirects() {
    const canonical = new URL(process.env.SITE_URL?.trim() || site.url);
    const alias = canonical.hostname === "puraitmaad.com"
      ? "www.puraitmaad.com"
      : canonical.hostname === "www.puraitmaad.com" ? "puraitmaad.com" : null;
    const migrations = legacyRedirects.map(rule => ({ ...rule, permanent: true }));
    return [...(alias ? [
      ...migrations.map(rule => ({ ...rule, has: [{ type: "host" as const, value: alias }], destination: `${canonical.origin}${rule.destination}` })),
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: alias }],
        destination: `${canonical.origin}/:path*`,
        permanent: true,
      },
    ] : []), ...migrations];
  },
};

export default nextConfig;
