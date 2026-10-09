import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const originalLoad = Module._load;
Module._load = function (name, ...args) {
  if (name === "server-only") return {};
  return originalLoad.call(this, name, ...args);
};
const load = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const extension of [".ts", ".tsx"]) {
  load.extensions[extension] = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8").replace(/(["'])@\/([^"']+)\1/g, (_, _quote, target) => JSON.stringify(path.resolve(root, target)));
    module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
  };
}
// Simulate Next's static-image module boundary; browser QA uses the actual assets.
load.extensions[".png"] = (module, filename) => { module.exports = { src: `/images/property/${path.basename(filename)}`, width: 1200, height: 800, blurDataURL: "data:image/png;base64,iVBORw0KGgo=" }; };
load.extensions[".webp"] = load.extensions[".png"];
load.extensions[".css"] = () => {};
const render = component => renderToStaticMarkup(createElement(component));
const { FeaturedServices, HomepageHero } = load("../components/sections/home/homepage-opening.tsx");
const { ManagedProcess } = load("../components/sections/home/homepage-process.tsx");
const { ComingHomeStory, PropertyCareFeature, BusinessSupportFeature } = load("../components/sections/home/homepage-care.tsx");
const { MembershipSupportLevels, PrivateAssistanceFeature, VendorCare, SampleScenario, CustomerStories } = load("../components/sections/home/homepage-membership.tsx");
const { HomepageClosing, HomepageRequest } = load("../components/sections/home/homepage-request.tsx");
const { HomepageTestimonials } = load("../components/sections/home/homepage-testimonials.tsx");
const { homepageTestimonialEntries, testimonials } = load("../content/testimonials.ts");
const { featuredServices } = load("../content/services.ts");
const { siteConfig } = load("../content/site.ts");
const { homepage } = load("../content/homepage.ts");
const { operatingPhilosophy } = load("../content/supporting.ts");
const { comingHomeScenario } = load("../content/scenarios.ts");
const { membershipPlans, membershipScope } = load("../content/membership.ts");

test("homepage opening has the new promise and exactly six shared request cards", () => {
  const hero = render(HomepageHero);
  assert.match(hero.replace(/<[^>]*>/g, ""), /Your problem →/);
  assert.match(hero, /our responsibility\./);
  assert.match(hero, /Our service principles/);
  const cards = render(FeaturedServices);
  assert.equal((cards.match(/class="hp-service-card"/g) || []).length, 6);
  for (const service of featuredServices) assert.ok(cards.includes(service.name.replaceAll("&", "&amp;")));
  for (const service of featuredServices) assert.ok(cards.includes(`href="/contact?service=${service.id}#request-service"`));
  assert.match(cards, /href="\/services"/);
});

test("managed process renders five ordered steps and qualified verification", () => {
  const html = render(ManagedProcess);
  for (const title of ["You Ask", "We Source", "We Coordinate", "We Verify", "Done"]) assert.ok(html.includes(`<h3>${title}</h3>`));
  assert.match(html, /Where appropriate, we confirm completion/);
  assert.match(html, /One request\./);
  assert.match(html, /We handle the rest\./);
  assert.equal((html.match(/class="hp-process-stage"/g) || []).length, 5);
  assert.doesNotMatch(html, /hp-process-connector/);
  assert.match(html, /<ol class="hp-process-stages">/);
  assert.equal((html.match(/class="hp-process-path hp-process-path-/g) || []).length, 2);
  assert.equal((html.match(/pointer-events="none"/g) || []).length, 2);
  for (const step of homepage.process) assert.ok(html.includes(step.description));
  assert.doesNotMatch(html, /hp-step-label/);
});

test("homepage follows the consolidated order, retains one scenario and preserves the shared request form", () => {
  const html = render(load("../app/page.tsx").default);
  const sectionIds = ["homepage-heading", "managed-process-heading", "featured-services-heading", "property-care-heading", "coming-home-heading", "membership-heading", "private-service-heading", "business-support-heading", "vendor-care-heading", "homepage-testimonials-heading", "homepage-request-heading", "homepage-closing-heading"];
  const positions = sectionIds.map(id => html.indexOf(`aria-labelledby="${id}"`));
  positions.forEach((position, index) => { assert.ok(position >= 0, sectionIds[index]); if (index) assert.ok(position > positions[index - 1], sectionIds[index]); });
  assert.doesNotMatch(html, /id="emotional-heading"|id="unsure-heading"|id="sample-heading"|id="customer-stories-heading"/);
  assert.equal((html.match(/<form\b/g) || []).length, 1);
  assert.match(html, /Not sure what you need\?/);
  assert.match(html, /Tell us what happened and we/);
  assert.match(html, /Illustrative example/);
});

test("homepage scenarios visibly disclose illustrative status and conditional timing", () => {
  const timeline = render(ComingHomeStory);
  const sample = render(SampleScenario);
  for (const html of [timeline, sample]) assert.match(html, /Illustrative example — actual case studies will be added as available\./);
  assert.match(timeline, /Timing and work depend on the agreed scope and availability/);
  assert.match(sample, /SAMPLE SCENARIO/);
  assert.match(sample, /A hypothetical request/);
});

test("final customer reviews preserve the exact owner-approved quotes, portrait mapping and service labels", () => {
  assert.deepEqual(testimonials, []);
  assert.deepEqual(homepageTestimonialEntries.map(entry => entry.name), ["Zeeshan", "Sara Khan"]);
  const approvedQuotes = [
    "“We were away from home for a few weeks, and Pur Aitmaad took care of everything. From regular home checks to handling maintenance issues, everything was managed smoothly. It was such a relief knowing our home was in safe hands while we were away. Really happy with their service!”",
    "“Pur Aitmaad helped us arrange our Nikkah and find reliable vendors. The whole experience was wonderful! From coordinating everything to taking care of the little details, their team made the process so easy for our family. We were able to enjoy our special day without worrying about the arrangements. Truly grateful for their support!”",
  ];
  for (const [index, entry] of homepageTestimonialEntries.entries()) {
    assert.equal(entry.quote, approvedQuotes[index]);
    assert.equal(entry.image.src, `/images/testimonials/${entry.id}.webp`);
    assert.equal(entry.image.objectPosition, "50% 50%");
    assert.equal(entry.relationshipLabel, ["Property Care", "Personal Assistance"][index]);
    assert.equal(entry.isPlaceholder, false);
  }
  const html = render(HomepageTestimonials);
  assert.equal((html.match(/<figure\b/g) || []).length, 2);
  assert.equal((html.match(/<blockquote\b/g) || []).length, 2);
  const figures = [...html.matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/g)].map(match => match[1]);
  figures.forEach((figure, index) => {
    assert.ok(figure.includes(approvedQuotes[index]));
    assert.ok(figure.includes(homepageTestimonialEntries[index].name));
    assert.ok(figure.includes(encodeURIComponent(homepageTestimonialEntries[index].image.src)));
    assert.ok(!figure.includes(approvedQuotes[1 - index]));
  });
  assert.equal((html.match(/<img\b/g) || []).length, 2);
  assert.equal((html.match(/loading="lazy"/g) || []).length, 2);
  assert.match(html, /alt="Man wearing maroon traditional clothing"/);
  assert.match(html, /alt="Woman wearing teal traditional clothing"/);
  assert.equal((html.match(/class="hp-customer-story-relationship"/g) || []).length, 2);
  assert.doesNotMatch(render(load("../app/page.tsx").default), /Development placeholder|Customer review will be added here|Photo pending/);
  assert.doesNotMatch(html, /<button\b|rating|stars|rel="preload"/i);
});

test("approved customer material fits the same layout with lazy optimized photos and optional factual labels", () => {
  const html = renderToStaticMarkup(createElement(HomepageTestimonials, { entries: [{ id: "fixture", name: "QA fixture", quote: "Supplied fixture quote.", image: { src: "/test-portrait.webp", alt: "QA fixture portrait" }, relationshipLabel: "Supplied fixture label", isPlaceholder: false }] }));
  assert.match(html, /loading="lazy"/);
  assert.match(html, /alt="QA fixture portrait"/);
  assert.match(html, /\/_next\/image\?/);
  assert.match(html, /Supplied fixture label/);
  assert.doesNotMatch(html, /Development placeholder|Photo pending|rel="preload"/);
  assert.equal(renderToStaticMarkup(createElement(HomepageTestimonials, { entries: [] })), "");
});

test("Coming Home keeps its exact illustrative sequence and one restrained request action", () => {
  const html = render(ComingHomeStory);
  assert.match(html, /arrival-ready.png/);
  assert.match(html, /alt="Illustrative arrival scene:/);
  const text = html.replace(/<[^>]*>/g, "").replaceAll("&#x27;", "'");
  for (const copy of [comingHomeScenario.title, comingHomeScenario.ending, comingHomeScenario.disclosure, comingHomeScenario.scopeNote]) assert.ok(text.includes(copy));
  const positions = comingHomeScenario.timeline.map(step => {
    assert.ok(text.includes(step.action));
    return text.indexOf(step.when);
  });
  positions.forEach((position, index) => { assert.ok(position >= 0); if (index) assert.ok(position > positions[index - 1]); });
  assert.equal((html.match(/<li\b/g) || []).length, 5);
  assert.equal((html.match(/<a\b/g) || []).length, 1);
  assert.match(html, /href="#request-service"/);
  assert.ok(html.indexOf("hp-story-copy") < html.indexOf("hp-story-photo"));
  assert.ok(html.indexOf("hp-story-photo") < html.indexOf("arrival-timeline"));
  assert.ok(html.indexOf("arrival-timeline") < html.indexOf("hp-story-ending"));
});

test("homepage membership contains current plan names, no retired prices, and no fake testimonials", () => {
  const html = render(MembershipSupportLevels) + render(PrivateAssistanceFeature);
  for (const name of ["Essential", "Premium", "Private"]) assert.ok(html.includes(`>${name}</h3>`));
  assert.match(html, /Choose Your Plan/);
  assert.doesNotMatch(html, /Speak to us for a tailored plan\./);
  assert.doesNotMatch(html, /PKR|Signature|Private Stewardship|24\/7|Most popular|14,500|24,500|39,500/);
  assert.equal(render(CustomerStories), "");
});

test("support levels retain every approved inclusion, qualification and three plan enquiries", () => {
  const html = render(MembershipSupportLevels);
  const text = html.replace(/<[^>]*>/g, "");
  assert.equal((html.match(/<article\b/g) || []).length, 3);
  for (const plan of membershipPlans) {
    assert.ok(html.includes(`data-plan="${plan.id}"`));
    assert.ok(text.includes(plan.description));
    for (const inclusion of plan.inclusions) assert.ok(text.includes(inclusion));
  }
  assert.ok(text.includes(membershipScope));
  assert.equal((html.match(/<a\b(?=[^>]*class="[^"]*\bplans-request\b)/g) || []).length, 3);
  for (const id of ["essential", "signature", "bespoke"]) assert.ok(html.includes(`href="/contact?plan=${id}"`));
  assert.equal((html.match(/>Request Info<\/a>/g) || []).length, 3);
  assert.doesNotMatch(html, /Most popular|monthly fee|savings|guaranteed/i);
});

test("plans distinguish one-time requests from ongoing membership with two clear actions", () => {
  const html = render(MembershipSupportLevels);
  assert.match(html, /Need help with something once\?/);
  assert.match(html, /Tell us what needs to be handled\. No membership required\./);
  assert.match(html, /Membership is for customers who need ongoing support\./);
  assert.match(html, /href="\/contact#request-service"[^>]*>Request a Service/);
  assert.match(html, /WhatsApp Us/);
  const previous = siteConfig.WHATSAPP;
  try {
    siteConfig.WHATSAPP = "";
    assert.doesNotMatch(render(MembershipSupportLevels), /WhatsApp Us|wa.me/);
    assert.match(render(MembershipSupportLevels), /Request a Service/);
  } finally { siteConfig.WHATSAPP = previous; }
});

test("Trust retains qualified promises and reads explanation, principles, qualification on mobile", () => {
  const html = render(VendorCare);
  const text = html.replace(/<[^>]*>/g, "");
  for (const copy of [homepage.trust.heading, homepage.trust.description, ...homepage.trust.principles, homepage.trust.note]) assert.ok(text.includes(copy));
  assert.match(text, /We aim/);
  assert.match(text, /Depending on the work/);
  assert.ok(html.indexOf("hp-trust-description") < html.indexOf("hp-trust-words"));
  assert.ok(html.indexOf("hp-trust-words") < html.indexOf("hp-trust-note"));
  assert.equal((html.match(/<li\b/g) || []).length, 3);
  assert.doesNotMatch(html, /<a\b|<article\b/);
});

test("homepage features preserve qualified content, truthful photography and one request action each", () => {
  const property = render(PropertyCareFeature);
  const personal = render(PrivateAssistanceFeature);
  const business = render(BusinessSupportFeature);
  const text = html => html.replace(/<[^>]*>/g, "").replaceAll("&amp;", "&").replaceAll("&#x27;", "'");
  for (const [html, content, image] of [
    [property, homepage.property, "property-health.png"],
    [personal, homepage.private, "service-personal-assistance.webp"],
    [business, homepage.business, "service-home-repairs.webp"],
  ]) {
    assert.ok(text(html).includes(content.description));
    assert.ok(html.includes(image));
    assert.equal((html.match(/<img\b/g) || []).length, 1);
    assert.equal((html.match(/<a\b/g) || []).length, 1);
    assert.match(html, /href="#request-service"/);
    assert.ok(html.indexOf("hp-feature-intro") < html.indexOf("hp-feature-media"));
    assert.ok(html.indexOf("hp-feature-media") < html.indexOf("hp-feature-details"));
  }
  assert.ok(text(property).includes(homepage.scope));
  assert.ok(text(business).includes(homepage.business.contexts));
  for (const item of homepage.property.support) assert.ok(text(property).includes(item));
  for (const item of homepage.business.support) assert.ok(text(business).includes(item));
  assert.ok(text(personal).includes(operatingPhilosophy.find(item => item.title === "Discretion").description));
  assert.ok(!text(personal).includes(homepage.private.example));
  assert.match(personal, /alt="Personal delivery being handed over at a residence"/);
  assert.match(business, /alt="Technician working on residential smart-home controls"/);
  assert.doesNotMatch(business, /hp-office-art/);
});

test("homepage contact and closing sections omit placeholder channels", () => {
  const previous = siteConfig.WHATSAPP;
  try {
  siteConfig.WHATSAPP = "";
  for (const html of [render(HomepageRequest), render(HomepageClosing)]) {
    assert.doesNotMatch(html, /href="(?:https:\/\/wa.me|tel:|mailto:)/);
    assert.doesNotMatch(html, /\[YOUR|\[WHATSAPP|coming soon|schema migration/i);
  }
  const request = render(HomepageRequest);
  assert.match(request, /id="request-service"/);
  assert.match(request, /id="consultation"/); // Deliberate compatibility alias only.
  for (const name of ["fullName", "phone", "email", "location", "message", "preferredDate", "preferredTime", "website"]) assert.ok(request.includes(`name="${name}"`));
  assert.doesNotMatch(request, /name="propertyType"|name="overseas"|name="help"|Request Consultation/);
  } finally { siteConfig.WHATSAPP = previous; }
});

test("real configured WhatsApp is available in homepage assistance and final CTA", () => {
  const previous = siteConfig.WHATSAPP;
  try {
    siteConfig.WHATSAPP = "+92 300 1234567";
    assert.match(render(HomepageClosing), /https:\/\/wa.me\/923001234567\?text=/);
    assert.match(render(HomepageRequest), /Chat with Puraitmaad/);
  } finally { siteConfig.WHATSAPP = previous; }
});
