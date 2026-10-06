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
load.extensions[".css"] = () => {};
const render = component => renderToStaticMarkup(createElement(component));
const { FeaturedServices, HomepageHero } = load("../components/sections/home/homepage-opening.tsx");
const { ManagedProcess } = load("../components/sections/home/homepage-process.tsx");
const { ComingHomeStory } = load("../components/sections/home/homepage-care.tsx");
const { MembershipAndPrivate, SampleScenario, CustomerStories } = load("../components/sections/home/homepage-membership.tsx");
const { HomepageClosing, HomepageRequest } = load("../components/sections/home/homepage-request.tsx");
const { featuredServices } = load("../content/services.ts");
const { siteConfig } = load("../content/site.ts");

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
});

test("homepage scenarios visibly disclose illustrative status and conditional timing", () => {
  const timeline = render(ComingHomeStory);
  const sample = render(SampleScenario);
  for (const html of [timeline, sample]) assert.match(html, /Illustrative example — actual case studies will be added as available\./);
  assert.match(timeline, /Timing and work depend on the agreed scope and availability/);
  assert.match(sample, /SAMPLE SCENARIO/);
  assert.match(sample, /A hypothetical request/);
});

test("homepage membership contains current plan names, no retired prices, and no fake testimonials", () => {
  const html = render(MembershipAndPrivate);
  for (const name of ["Essential", "Premium", "Private"]) assert.ok(html.includes(`>${name}</h3>`));
  assert.equal((html.match(/Speak to us for a tailored plan\./g) || []).length, 3);
  assert.doesNotMatch(html, /PKR|Signature|Private Stewardship|24\/7|Most popular|14,500|24,500|39,500/);
  assert.equal(render(CustomerStories), "");
});

test("homepage contact and closing sections omit placeholder channels", () => {
  for (const html of [render(HomepageRequest), render(HomepageClosing)]) {
    assert.doesNotMatch(html, /href="(?:https:\/\/wa.me|tel:|mailto:)/);
    assert.doesNotMatch(html, /\[YOUR|\[WHATSAPP|coming soon|schema migration/i);
  }
  const request = render(HomepageRequest);
  assert.match(request, /id="request-service"/);
  assert.match(request, /id="consultation"/); // Deliberate compatibility alias only.
  for (const name of ["fullName", "phone", "email", "location", "message", "preferredDate", "preferredTime", "website"]) assert.ok(request.includes(`name="${name}"`));
  assert.doesNotMatch(request, /name="propertyType"|name="overseas"|name="help"|Request Consultation/);
});

test("real configured WhatsApp is available in homepage assistance and final CTA", () => {
  const previous = siteConfig.WHATSAPP;
  try {
    siteConfig.WHATSAPP = "+92 300 1234567";
    assert.match(render(HomepageClosing), /https:\/\/wa.me\/923001234567\?text=/);
    assert.match(render(HomepageRequest), /Chat with Puraitmaad/);
  } finally { siteConfig.WHATSAPP = previous; }
});
