import type { NextConfig } from "next";
import { site } from "./content/site";

const nextConfig: NextConfig = {
  async redirects() {
    const canonical = new URL(process.env.SITE_URL?.trim() || site.url);
    const alias = canonical.hostname === "puraitmaad.com"
      ? "www.puraitmaad.com"
      : canonical.hostname === "www.puraitmaad.com" ? "puraitmaad.com" : null;
    return alias ? [{
      source: "/:path*",
      has: [{ type: "host" as const, value: alias }],
      destination: `${canonical.origin}/:path*`,
      permanent: true,
    }] : [];
  },
};

export default nextConfig;
