# Production SEO configuration

The official production origin is `https://puraitmaad.com`, centralized in `content/site.ts` alongside the brand name, descriptor and tagline. Root `metadataBase`, page canonicals, Open Graph URLs, sitemap and robots all use `getSiteUrl()` from `lib/seo.ts`.

The value must contain only the HTTPS origin: no path, query, fragment, credentials or custom port. Invalid values fail validation rather than publishing development URLs.

The existing optional `SITE_URL` environment variable overrides that fallback. `.env.example` documents the official value; no local environment file is required. Set any override **before running the production build**, and rebuild after changing it because these outputs are generated during the build. `.env.local` remains ignored by Git. The site origin is public configuration, not a secret; no `NEXT_PUBLIC_*` variable is needed.

Without an override, all nine public pages have canonical and Open Graph URLs under the official origin. `/sitemap.xml` contains those nine URLs, and `/robots.txt` permits crawling and advertises `https://puraitmaad.com/sitemap.xml`. Local development URLs are never used for production metadata.

Before launch, verify the generated URLs, choose hosting and enquiry delivery, finalize public contact details, and update the Privacy Policy to match actual provider, processing and retention arrangements. No enquiry delivery or analytics is enabled by these changes.
