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
  if (name === "server-only") return {}; if (name === "next/navigation") return { usePathname: () => currentPath };
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
let currentPath = "/services/property-care";
const { services, serviceCategories } = load("../content/services.ts");
const { membershipPlans, membershipScope } = load("../content/membership.ts");
const { comingHomeScenario, scenarioDisclosure } = load("../content/scenarios.ts");
const { detailedProcess } = load("../content/supporting.ts");
const { NavigationItems } = load("../components/navigation/navigation-items.tsx");
const routes = ["services", "services/property-care", "how-it-works", "about", "contact", "membership"];
async function page(route, service) { const component = load(`../app/${route}/page.tsx`).default; return renderToStaticMarkup(route === "contact" ? await component({ searchParams: Promise.resolve({ service }) }) : createElement(component)); }
const escape = value => value.replaceAll("&", "&amp;").replaceAll("'", "&#x27;");
const visible = html => html.replace(/<[^>]*>/g, " ").replaceAll("&amp;", "&").replaceAll("&#x27;", "'");
test("all six supporting routes render one H1, honest copy and safe request paths", async () => {
 for (const route of routes) { const html = await page(route); assert.equal((html.match(/<h1\b/g)||[]).length,1,route); const levels=[...html.matchAll(/<h([1-6])\b/g)].map(m=>Number(m[1])); levels.forEach((level,index)=>{if(index)assert.ok(level<=levels[index-1]+1,route+" heading hierarchy");}); assert.doesNotMatch(visible(html), /Signature|Private Stewardship|Book consultation|founder-led|\bPKR\b|guaranteed|5.star|\[YOUR|\[BUSINESS/); assert.doesNotMatch(html,/href="(?:tel:|mailto:)/); for(const href of html.matchAll(/href="([^" ]+)"/g)){ if(href[1].startsWith('/contact')) assert.match(href[1], /^\/contact(?:(?:\?service=[a-z-]+)?#request-service|\?plan=(?:essential|signature|bespoke))$/); if(href[1].startsWith('https://wa.me/')) assert.match(href[1], /^https:\/\/wa\.me\/\d+\?text=/); } }
});
test("Services renders all catalog cards with server-readable details and service-specific requests", async () => {
 const html = await page("services"); assert.equal((html.match(/class="sp-section sp-category"/g)||[]).length,4); for(const category of serviceCategories) assert.ok(html.includes(`id="${category.id}-heading"`)); for(const service of services){assert.ok(html.includes(`<h3>${escape(service.name)}</h3>`)); assert.ok(html.includes(`<p>${escape(service.description)}</p>`));} assert.equal((html.match(/class="sp-category-request" href="\/contact#request-service"/g)||[]).length,4); assert.equal((html.match(/<ul class="sd-track"/g)||[]).length,4); assert.match(html,/Explore Property Care/); assert.match(visible(html),/If you don't see what you need, ask us/);
});
test("service details preserve catalog scope and flag unspecified inclusions for review", () => {
 const { serviceDetails, businessSupportOverviewPhoto } = load("../content/service-details.ts");
 assert.equal(serviceDetails.length,services.length);
 assert.equal(new Set(serviceDetails.map(entry=>entry.service.id)).size,services.length);
 assert.equal(serviceDetails.filter(entry=>entry.photo?.src.startsWith("/images/services/")).length,32);
 assert.equal(serviceDetails.filter(entry=>!entry.photo).length,0);
 assert.equal(serviceDetails.find(entry=>entry.service.id==='business-electrical').photo.src,'/images/services/service-workplace-electrical.webp');
 assert.equal(serviceDetails.find(entry=>entry.service.id==='business-plumbing').photo.src,'/images/services/service-workplace-plumbing.webp');
 assert.equal(businessSupportOverviewPhoto.src,'/images/services/service-business-support.webp');
 assert.ok(fs.existsSync(path.join(root,'public',businessSupportOverviewPhoto.src)));
 const newImages = { documents: "documents", "event-preparation": "event-preparation", "special-requests": "special-requests", "office-services": "office-services", "business-repairs": "workplace-repairs", "business-cleaning": "workplace-cleaning", supplies: "supplies", furniture: "furniture", "business-ac": "workplace-ac", "site-visits": "site-visits" };
 for(const [id,filename] of Object.entries(newImages)) assert.equal(serviceDetails.find(entry=>entry.service.id===id).photo.src,`/images/services/service-${filename}.webp`);
 for(const entry of serviceDetails){
  assert.equal(entry.service,services.find(service=>service.id===entry.service.id));
  assert.deepEqual(entry.inclusions,entry.service.examples);
  assert.equal(entry.inclusionsNeedReview,entry.inclusions.length===0);
  assert.equal(entry.categoryTitle,serviceCategories.find(category=>category.id===entry.service.category).name);
  if(entry.photo) { assert.ok(entry.photo.width>0 && entry.photo.height>0 && entry.photo.alt); assert.ok(fs.existsSync(path.join(root,"public",entry.photo.src))); assert.doesNotMatch(entry.photo.src,/services-hero/); }
  else assert.ok(entry.contextualPhoto);
 }
});
test("all service cards have native details fallbacks and share one accessible enhanced dialog", async () => {
 const { whatsappHref } = load("../lib/contact-links.ts");
 const html=await page("services");
 assert.equal((html.match(/<dialog\b/g)||[]).length,1);
 assert.match(html,/aria-label="Close service details"/);
 assert.equal((html.match(/<details\b/g)||[]).length,services.length);
 for(const service of services){
  assert.ok(html.includes(`data-service-trigger="${service.id}"`));
  assert.ok(html.includes(`id="service-${service.id}"`));
  const destination = whatsappHref(undefined,service.name) ?? `/contact?service=${service.id}#request-service`;
  assert.ok(html.includes(`href="${escape(destination)}"`));
 }
});
test("Property Care covers travel, vacant and multiple homes and preserves the disclosed centralized scenario", async () => {
 const html=await page("services/property-care"),text=visible(html); for(const phrase of ["travelers","overseas owners","multiple properties","vacant-house checks","periodic support"]) assert.ok(text.includes(phrase)); assert.ok(html.includes(escape(comingHomeScenario.title))); assert.ok(html.includes(scenarioDisclosure)); assert.ok(html.includes(comingHomeScenario.scopeNote)); assert.match(html,/id="coming-home"/); assert.match(html,/Take Care of My Property/); assert.match(html,/href="\/contact\?service=property-maintenance#request-service"/);
});
test("Membership renders only approved plans and inclusions without prices or numerical allowances", async () => {
 const html=await page("membership"); for(const plan of membershipPlans){assert.ok(html.includes(`id="plan-${plan.id}"`));assert.ok(html.includes(`href="/contact?plan=${({essential:"essential",premium:"signature",private:"bespoke"})[plan.id]}"`));for(const inclusion of plan.inclusions)assert.ok(html.includes(inclusion));} assert.ok(html.includes(membershipScope));assert.match(html,/plans-comparison/);assert.doesNotMatch(visible(html),/\bPKR\b|Rs\.|\d+\s*(?:visits|requests)|unlimited|complimentary|guarantee/i);assert.equal((html.match(/>Request Info<\/a>/g)||[]).length,3);
});
test("How It Works explains all stages consistently and labels the practical example", async () => {
 const html=await page("how-it-works");for(const step of detailedProcess){assert.ok(html.includes(step.title)); assert.ok(html.includes(escape(step.connection)));}assert.ok(html.includes(scenarioDisclosure));assert.match(visible(html),/third-party professionals/);assert.match(visible(html),/appointment only once timing has been agreed/);
});
test("About retains the story and contact action without the removed editorial sections", async () => {
 const html=await page("about");assert.match(visible(html),/Built on Trust/);assert.match(visible(html),/What would you like us to handle/);assert.doesNotMatch(html,/relationship-heading|sp-mission|philosophy-heading|sp-principles/);assert.doesNotMatch(visible(html),/founder|established in|founded in|years of experience|award|partner|team of \d/i);
});
test("Contact keeps the one shared form, safe panel and editable service prefill", async () => {
 const html=await page("contact","gardening");assert.equal((html.match(/<form\b/g)||[]).length,1);for(const field of ["fullName","phone","email","location","message","preferredDate","preferredTime"]) assert.ok(html.includes(`name="${field}"`));assert.match(html,/Gardening &amp; Outdoor Care/);assert.match(html,/id="request-service"/);assert.match(html,/id="consultation"/);assert.match(html,/Lahore, Pakistan/);assert.doesNotMatch(html,/\[YOUR|\[BUSINESS/);assert.match(html,/href="https:\/\/wa\.me\/\d+\?text=/);assert.doesNotMatch(await page("contact","unknown"),/I'd like help with unknown/);
});
test("nested Property Care activates Services without changing the five-link navigation", () => {
 const html=renderToStaticMarkup(createElement("ul",null,createElement(NavigationItems)));assert.match(html, /<a\b(?=[^>]*href="\/services")(?=[^>]*aria-current="page")[^>]*>/);assert.equal((html.match(/aria-current="page"/g)||[]).length,1);assert.equal((html.match(/<li/g)||[]).length,5);currentPath="/membership";const membership=renderToStaticMarkup(createElement("ul",null,createElement(NavigationItems)));assert.doesNotMatch(membership,/aria-current/);
});
