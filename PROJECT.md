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

The later request form will support Name, Phone/WhatsApp, Email, Location/Area, What do you need, optional preferred date and optional preferred time. Its schema, validation, email template and tests must migrate together. Never fake successful delivery. The current submission lock is client-side protection, not server-side idempotency.

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

The homepage request section preserves the existing ConsultationForm fields,
validation and Resend action temporarily. The dedicated form phase must migrate
fields, validation, email templates and tests together. Homepage requests use
#consultation; the approved shell's /contact#consultation destination remains valid.
Supporting pages, old-route redirects, final legal pages and deployment remain
outside Phase 3. The approved Phase 1 and Phase 2 work remains uncommitted.

## Deferred functionality

Accounts, dashboards, payments, invoices, vendor administration, scheduling automation and service tracking are future work. The first version remains a lightweight service website with real request delivery.

## Customize these first

Replace public contact placeholders in content/site.ts; confirm service areas and hours; review service scope and membership inclusions; supply replacement approved photography; add only genuine testimonials; finalize legal text in its dedicated phase. Server delivery configuration stays separate.
