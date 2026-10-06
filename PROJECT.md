# Puraitmaad — Product and implementation guide

## Product source of truth

Puraitmaad is a premium managed-services and assistance company, initially serving Lahore, Pakistan.

Primary positioning: **Your problem → our responsibility.**
Secondary line: **Done For You.**

The operating model is:
Customer → Puraitmaad → appropriate professional/vendor/resource → Puraitmaad coordinates/manages → verifies where appropriate → closes the request.

Customers explain the problem; Puraitmaad helps identify the appropriate solution, agrees the scope, coordinates the work and follows through. Specialist work may be performed by third-party providers. Requests remain subject to acceptance, availability and agreed scope.

Puraitmaad is not a technician directory, worker marketplace, classifieds platform or cheap handyman service. The experience should communicate calm, capable responsibility and relief from complexity.

The complete approved 68-point specification and subsequent clarification decisions govern the product. The supplied homepage reference governs visual composition. This guide records those decisions; old page copy is migration material, not a competing product specification.

## Service pillars

- **Home Care:** AC and appliance work, electrical, plumbing, carpentry, painting, cleaning, gardening and pest control.
- **Property Care:** inspections, vacant-property checks, pre-arrival preparation, post-travel checks, repairs, restocking and renovation coordination.
- **Personal Assistance:** shopping, pickups, deliveries, returns, gifts, documents, event preparation, errands and legitimate special requests.
- **Business Support:** office maintenance, repairs, cleaning, supplies, furniture, AC, electrical, plumbing, site visits and vendor coordination.

The customer has one primary relationship with Puraitmaad. Do not expose vendor phone numbers, private addresses, internal pricing, notes or ratings.

Use: “If you don't see what you need, ask us. We'll let you know if we can coordinate it.”

## Brand and content

Use the exact editable brand spelling **Puraitmaad**. Preserve the existing approved logo artwork and favicon implementation. Logo redesign is a separate project; make the eventual header adaptable to replacement artwork.

Speak clearly and calmly. Do not fabricate customer counts, history, testimonials, vendor checks, certifications, awards, guarantees or operational capacity. Do not promise that every request will be accepted.

Navigation: Home, Services, How It Works, About, Contact.
Primary CTA: **Request a Service**.

Membership: **Essential / Premium / Private**.
Pricing: **Speak to us for a tailored plan.**
Inclusions are editable and agreed with the customer. Do not publish retired prices, fixed visit allowances, complimentary benefits or emergency-response commitments from the old product.

Both the coming-home timeline and DHA home-preparation example are illustrative. Always retain the disclosure:
**Illustrative example — actual case studies will be added as available.**

Testimonials remain empty and the eventual UI hides that section until genuine, publication-approved entries exist.

## Owner-editable configuration

- `content/site.ts`: brand, tagline, domain, navigation, CTA and all PUBLIC contact values.
- `content/services.ts`: four categories, full service catalog, selected featured services.
- `content/membership.ts`: three plans, editable inclusions and tailored-plan wording.
- `content/scenarios.ts`: hypothetical scenarios with mandatory disclosures.
- `content/testimonials.ts`: genuine approved testimonials only; currently empty.
- `content/photography.ts`: approved sources, image descriptions, crop and responsive settings.

Keep unknown PHONE, WHATSAPP, EMAIL, INSTAGRAM, FACEBOOK, LINKEDIN, ADDRESS, BUSINESS_HOURS and SERVICE_AREAS values as identifiable bracketed placeholders. CITY is Lahore, Pakistan; DOMAIN is https://puraitmaad.com. Do not imply complete coverage of particular neighborhoods.

Use `lib/contact-links.ts` for contact links. It returns null for unsupported or placeholder values. Phone/WhatsApp values require an international country code. Only configured HTTPS Instagram, Facebook and LinkedIn profile URLs are accepted. These checks establish syntactic/configuration safety, not ownership verification.

When a link is null, future UI must render a calm unavailable state and offer the request form. Never render fake tel, mailto, WhatsApp or social destinations. Do not show technical configuration errors to customers.

Never place Resend credentials, delivery recipients or other server secrets in public content modules.

## Design system

Primary canvas #F8F6F0; cream surface #F1EEE6; elevated surface #FCFAF6.
Forest green #193C32; text #203A32; secondary text #59655E.
Muted natural green #718477; warm border #DDD9CF; existing logo gold #C9A66B.
Focus #315F4D on light surfaces; cream on dark surfaces.

Controls use 8px radii; cards use 10px. Content width approximately 1280px.
Mobile gutters 20–24px; desktop section spacing 64–96px.
Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px.

Major headings use DM Serif Display (normal 400). Body, navigation, labels and controls use Geist. Fonts use next/font with robust fallbacks. Body copy is generally 16–18px; mobile form controls are at least 16px.

Use warm, realistic lifestyle imagery, thin borders, minimal shadows and restrained motion. Do not copy the screenshot's photographs unless independently supplied/licensed. Do not use technician portraits in the hero. Keep images centrally replaceable.

Use existing Button, ButtonLink, Container and SectionHeading foundations plus Card, Badge and ServiceIcon. SectionHeading is the existing SectionHeader equivalent; do not duplicate it. Buttons support primary, secondary and text variants plus dark-surface usage.

## Approved page composition (later phases)

Homepage: header; ivory/lifestyle hero and trust indicators; six service cards; differentiator and five-step process; emotional-value section; property/business editorial pair; coming-home scenario; problem-led invitation; membership; Private Service; vendor-care principles; sample scenario; request/contact panel; final dark CTA; footer.

Process: You Ask → We Source → We Coordinate → We Verify → Done.
The reference is a compressed overview. Preserve readable copy and generous spacing at real browser dimensions. Mobile layouts must be intentional, with readable vertical process/timeline sequences and a clear service-request path.

Future final routes:
- /, /services, /services/property-care, /how-it-works, /about, /contact
- /membership
- /privacy-policy, /terms-and-conditions, /cancellation-policy, /service-disclaimer

Migration planned for later phases:
- /stewardship-plans → /membership
- /overseas-owners → /services/property-care
- /arrival-ready → /services/property-care#coming-home
- /privacy-and-discretion → /privacy-policy#privacy-and-discretion

Do not activate redirects or delete old pages before equivalent destinations exist and are verified.

## Technical infrastructure and phase boundary

Next.js App Router, React, TypeScript, Tailwind CSS and Webpack remain the stack.
Read relevant installed Next.js guides in node_modules/next/dist/docs before changes.
Do not install dependencies without a concrete need.

Phase 1 establishes documentation, content models, contact-link safety, tokens, fonts and shared primitives. It does not compose the new homepage, redesign the shell, migrate the form or activate new routes.

Current pages may retain old layouts and property-oriented copy until their planned migration. The old Services page temporarily uses content/legacy-property-services.ts. The existing plans page uses a compatibility adapter backed by the new membership data, with retired prices and allowances removed. No routes/components are deleted.

Preserve:
- Existing working Resend architecture and server action.
- Client/server validation, HTML escaping, honeypot and submission protection.
- Existing favicon assets and metadata.
- Canonical origin handling, robots and sitemap foundations.
- Next.js image architecture and accessibility foundations.
- Production Webpack compatibility.

The Phase 4 request form supports Name, Phone/WhatsApp, Email, Location/Area, What do you need, optional preferred date and optional preferred time. Its schema, validation, email template and tests migrate together. Never fake successful delivery. Browser pending protection and Resend provider idempotency serve different purposes; neither is a deployment-wide spam rate limiter.

## SEO, accessibility and honesty

Target homepage title: Puraitmaad | Premium Home, Property & Business Assistance.
Description: Premium managed home, property and business assistance in Lahore. Tell Puraitmaad what you need and we'll coordinate the rest.

Keep canonical URLs, sitemap and redirects consistent. Preserve Googlebot and Googlebot-Image access to icons. Later phases add OG/Twitter metadata and truthful Organization/Service schema; LocalBusiness awaits real required business details. No fake prices, ratings or reviews.

Target WCAG 2.2 AA: semantic landmarks/headings, visible focus, accessible menu, labeled fields, useful error messages, sufficient contrast, comfortable touch targets and reduced motion. Do not rely on color alone. Fixed mobile controls must not obscure content.

Keep server-rendered content, responsive optimized images, limited client JavaScript and restrained font loading. Avoid layout shift and unnecessary libraries.

Legal pages must distinguish drafts from finalized terms. Do not invent fees, service guarantees or retention policies.

## Validation and workflow

Run:
- npm.cmd run lint
- npx.cmd tsc --noEmit
- node --test tests/*.test.mjs
- npm.cmd run build (next build --webpack)

Test contact placeholders and configured links, content integrity, membership pricing policy, actual form behavior and regressions. Later visual QA covers 375, 390, 430, 768, 1024, 1280, 1440 and 1920px, keyboard access, contrast, images and CTAs.

Keep changes scoped to the authorized phase. Do not commit or push without explicit instruction.

## Phase 3 homepage implementation

The homepage composition lives in app/page.tsx, app/homepage.css and
components/sections/home/. Copy comes from content/homepage.ts and the shared
service, membership, scenario and testimonial collections. Empty testimonials
render no section. Contact actions use the existing safe configuration helpers.

Homepage photographs and crops are centralized separately in homepagePhotography
in content/photography.ts. The business slot deliberately uses a graphic until
an approved office photograph is supplied. Replacement directions are documented
in public/images/property/README.md. No reference photographs were extracted.

The homepage request section now uses the Phase 4 shared ServiceRequestForm,
validation and Resend action. Homepage requests use #request-service; the shell
uses /contact#request-service. A deliberate #consultation alias remains on both
pages for existing bookmarks.
Supporting pages, old-route redirects, final legal pages and deployment remain
outside Phase 3. Phases 1–3 are checkpointed at
1759f835117d740256a1e5e32b2884c8038d1ff1.

## Phase 4 request and contact experience

ServiceRequestForm is the single public form on the homepage and /contact.
Name, location and a free-text request are required. At least one valid phone
number or email is required; both are accepted and any provided value is
validated. Optional date/time preferences use Lahore time and are not confirmed
appointments. Both browser and server validators enforce limits, scalar values,
control-character checks and real dates, including the current Lahore day.

lib/consultation/ retains its internal name to limit migration risk; its schema,
formatter and delivery now represent service requests. The server action remains
in app/contact/actions.ts. Known service IDs from lib/request-context.ts can
prefill an editable request on /contact?service=ID#request-service. Unknown IDs
fall back to the generic form. No query parameter submits a request.

Delivery uses server-only RESEND_API_KEY, RESEND_FROM and RESEND_TO. The existing
local sender/recipient were moved into ignored .env.local without changing them.
Before any later production deployment, configure RESEND_FROM and RESEND_TO in
the hosting environment with the existing approved values. There is intentionally
no hard-coded recipient fallback. Missing or invalid configuration fails safely;
private delivery configuration never comes from content/site.ts. Public contact
placeholders remain hidden until real phone, WhatsApp, email, areas or hours are
configured there.

Notifications include the request and any supplied optional contact/preferences.
HTML is escaped. Reply-To is included only for a validated visitor email.
Provider acceptance with an ID is required for success; no success is fabricated.
Transient provider errors get at most one retry, with a 15-second timeout per
attempt. A server HMAC creates an opaque idempotency key from the submission ID
and exact payload. Hydrated clients reuse a UUID for unchanged retries and create
a fresh one after edits or an explicit new request. Without JavaScript, identical
payloads share a key. Resend's idempotency window is 24 hours; this is bounded
deduplication, not permanent storage or distributed rate limiting.

The honeypot, independent server validation, duplicate/file scalar rejection,
bounded fields, HTML escaping, safe configuration and pending lock are retained.
Deployment-wide request/IP limits and stronger bot controls remain hosting work.
Public channel syntax checks do not verify phone ownership or deliverability.

Idle, pending, success, invalid and generic provider-error states retain values,
show associated field errors, focus an accessible summary and announce status.
Configured WhatsApp gets a working action; unconfigured WhatsApp uses generic
error copy. The mobile bottom CTA stays deferred: the sticky header and in-page
links provide access, while a fixed extra control would compete with the form,
native keyboards and feedback. Native mobile keyboard and safe-area behavior
still needs real-device QA; desktop Chrome emulation is not a physical handset.

Phase 4 QA covers both pages at 375, 390, 430, 768, 1024, 1280, 1440 and 1920px,
with detailed 390/1440 visual review, keyboard completion, long values, native
date/time controls, pending duplicate suppression, success/error and retries.
All browser provider calls are intercepted on a separate temporary QA server;
normal local preview uses the real configuration. No live email is sent in QA.
Temporary scripts, screenshots and results stay ignored under .next.

## Phase 5 supporting pages

The six canonical supporting pages are /services, /services/property-care,
/how-it-works, /about, /contact and /membership. Shared server components and
styles live in components/sections/supporting/. EditorialIntro, EditorialSection,
ServiceList, SupportingPhoto and RequestClosing keep typography, spacing and
conversion paths consistent without imposing one complete page template.
Styles are scoped to supporting-page classes; the approved homepage and shell
remain unchanged. Contact reuses the approved Phase 4 form and assistance panel.
No request validation, server action, delivery, email or contact-helper changes
are part of Phase 5.

Services draws all four categories and service links from content/services.ts.
Featured entries and useful examples retain detail; remaining services use
clean request links. Property Care includes travelers, overseas owners, vacant
and multiple homes, periodic support and the centralized coming-home scenario.
Its #coming-home section keeps the illustrative disclosure and timing caveat.
It also links to Membership so the new recurring-support page is discoverable.
Membership renders only the approved Essential, Premium and Private data; there
are no prices, numerical allowances or added guarantees.

Property and individual service requests use known Phase 4 service IDs.
Membership uses the generic request form: visitors can describe ongoing support
and mention a plan, without introducing a second query schema or changing the
approved backend. Primary navigation remains the same five links; nested
Property Care already activates Services through the existing path logic.

Supporting image slots and independent crops are centralized in
content/supporting-photography.ts. Existing local assets are used for Services
(services-hero.png), Property Care (property-health.png), About (about.png) and
Membership (overseas-owners.png). No photographs were downloaded or extracted
from the reference. Process uses an illustrative quotation and Contact stays
focused on the form rather than repeating a photograph. Preferred replacements:
a premium home/lifestyle detail for Services, an optional daylit maintained
residence/garden for Property Care, quieter architecture/planting for About,
and optional linen/greenery/interior detail for Membership. Process and Contact
photography is optional, not required for completion.

New pages use the shared canonical metadata helper. Phase 6 now includes them in
the sitemap and supplies legal pages, social metadata, schema and legacy redirects.

Responsive QA covers all six pages at 375, 390, 430, 768, 1024, 1280, 1440 and
1920px. Full-page visual review at 390/1440 checks crops, heading hierarchy,
service/process/plan sequences, request form and footer transitions. Temporary
browser scripts and screenshots remain ignored under .next. Physical handset
keyboard and safe-area testing remains a separate real-device check.

## Phase 6 public information architecture

lib/seo.ts defines the eleven canonical public routes: /, /services,
/services/property-care, /how-it-works, /about, /contact, /membership,
/privacy-policy, /terms-and-conditions, /cancellation-policy and
/service-disclaimer. No other legitimate indexable utility pages were found.
robots.txt, sitemap.xml and favicon routes remain public utility assets; they are
not page entries in the sitemap. No priorities or change frequencies are invented.

lib/route-migrations.ts centralizes four permanent redirects. next.config.ts
applies 308 path migration before page rendering. Specific www + old-path rules
precede the host catch-all, reaching the canonical new destination in one app hop.
Legacy page components also use permanentRedirect as a defensive fallback and
contain no retired canonical page content. Query strings are preserved by Next,
with #coming-home and #privacy-and-discretion retained where appropriate.
No DNS or hosting changes are made. Existing hosting redirects HTTP to HTTPS;
HTTP www can consequently require a hosting hop before the app's canonical hop.

All canonical pages have unique titles/descriptions, canonical URLs, Open Graph
and Twitter metadata. The exact approved homepage title and description are kept.
The original brand-only social image is public/images/og-puraitmaad.jpg,
1200×630 JPEG. scripts/generate-social-image.mjs regenerates it using the local
site's loaded DM Serif Display/Geist fonts, untouched favicon symbol, approved
colors and Chrome CDP. No photography was added or downloaded. Regeneration
requires a local preview and an existing Chrome debugging session on port 9227.

Server-rendered JSON-LD uses one Organization plus four Service nodes from the
public configuration and category catalog. Stable canonical @id values link
the services to the organization. Only validated configured public contacts and
social links can appear. JSON-LD escapes '<' and Unicode line separators.
There are no ratings, reviews, prices, invented partners or business history.
LocalBusiness remains deferred while real identifying/contact/address details
are placeholders. Lahore is service context, not a claim of guaranteed coverage
of every neighborhood. No private delivery configuration feeds structured data.

Privacy Policy reflects the seven-field request schema, optional service context,
server processing, Resend delivery, email correspondence, no request database and
the current absence of analytics/newsletter tracking. #privacy-and-discretion
receives the legacy privacy intent. No retention deadline, compliance status,
legal basis or blanket security/confidentiality guarantee is invented.
Terms, Cancellation Policy and Service Disclaimer explicitly display
'Draft — pending business/legal review'. All four legal texts need business and
professional legal review before launch; these drafts are not finalized terms.
All four legal links are exposed in the footer without redesigning the shell.

QA checks actual production HTTP redirects, both Host variants, query/fragment
preservation, all canonical metadata, JSON-LD, icons, sitemap, robots and internal
link/anchor resolution. Legal pages receive browser checks at 375, 390, 430, 768,
1024, 1280, 1440 and 1920px, including full-page 390/1440 visual review. Private
Resend key/recipient values must be absent from tracked source, public bundles
and canonical HTML/metadata/JSON-LD/sitemap/robots. Temporary artifacts stay
ignored under .next. No live email, commit, push or deployment occurs in this phase.

Before deployment: configure the Phase 4 server mail environment, replace public
contact placeholders only with confirmed values, complete business/legal review,
and check the hosting runtime/SSL, redirect behavior, deployed schema and physical
mobile keyboard/safe-area behavior in final QA. Existing photos can later be
replaced only with approved imagery. Search engines refresh cached icons and
social previews on their own schedules; no cache-specific hacks are used.

## Deferred functionality

Accounts, dashboards, payments, invoices, vendor administration, scheduling automation and service tracking are future work. The first version remains a lightweight service website with real request delivery.

## Customize these first

Replace public contact placeholders in content/site.ts; confirm service areas and hours; review service scope and membership inclusions; supply replacement approved photography; add only genuine testimonials; finalize legal text in its dedicated phase. Server delivery configuration stays separate.
