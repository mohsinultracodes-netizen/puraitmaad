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
load.extensions[".css"] = () => {};
let currentPath = "/services/property-care";
const { services, serviceCategories } = load("../content/services.ts");
const { membershipPlans, membershipScope } = load("../content/membership.ts");
const { comingHomeScenario, scenarioDisclosure } = load("../content/scenarios.ts");
const { detailedProcess, operatingPhilosophy } = load("../content/supporting.ts");
const { NavigationItems } = load("../components/navigation/navigation-items.tsx");
const routes = ["services", "services/property-care", "how-it-works", "about", "contact", "membership"];
async function page(route, service) { const component = load(`../app/${route}/page.tsx`).default; return renderToStaticMarkup(route === "contact" ? await component({ searchParams: Promise.resolve({ service }) }) : createElement(component)); }
const escape = value => value.replaceAll("&", "&amp;").replaceAll("'", "&#x27;");
const visible = html => html.replace(/<[^>]*>/g, " ").replaceAll("&amp;", "&").replaceAll("&#x27;", "'");
test("all six supporting routes render one H1, honest copy and safe request paths", async () => {
 for (const route of routes) { const html = await page(route); assert.equal((html.match(/<h1\b/g)||[]).length,1,route); const levels=[...html.matchAll(/<h([1-6])\b/g)].map(m=>Number(m[1])); levels.forEach((level,index)=>{if(index)assert.ok(level<=levels[index-1]+1,route+" heading hierarchy");}); assert.doesNotMatch(visible(html), /Signature|Private Stewardship|Book consultation|founder-led|\bPKR\b|guaranteed|5.star|\[YOUR|\[BUSINESS/); assert.doesNotMatch(html,/href="(?:tel:|mailto:|https:\/\/wa\.me)/); for(const href of html.matchAll(/href="([^" ]+)"/g)){ if(href[1].startsWith('/contact')) assert.match(href[1], /^\/contact(?:\?service=[a-z-]+)?#request-service$/); } }
});
test("Services renders exactly four shared categories and every catalog service as a contextual request", async () => {
 const html = await page("services"); assert.equal((html.match(/class="sp-section sp-category"/g)||[]).length,4); for(const category of serviceCategories) assert.ok(html.includes(`id="${category.id}-heading"`)); for(const service of services){assert.ok(html.includes(escape(service.name))); assert.ok(html.includes(`href="/contact?service=${service.id}#request-service"`)); for(const example of service.examples) assert.ok(html.includes(escape(example)));} assert.match(html,/Explore Property Care/); assert.match(visible(html),/If you don't see what you need, ask us/);
});
test("Property Care covers travel, vacant and multiple homes and preserves the disclosed centralized scenario", async () => {
 const html=await page("services/property-care"),text=visible(html); for(const phrase of ["travelers","overseas owners","multiple properties","vacant-house checks","periodic support"]) assert.ok(text.includes(phrase)); assert.ok(html.includes(escape(comingHomeScenario.title))); assert.ok(html.includes(scenarioDisclosure)); assert.ok(html.includes(comingHomeScenario.scopeNote)); assert.match(html,/id="coming-home"/); assert.match(html,/Take Care of My Property/); assert.match(html,/href="\/contact\?service=property-maintenance#request-service"/);
});
test("Membership renders only approved plans and inclusions without prices or numerical allowances", async () => {
 const html=await page("membership"); for(const plan of membershipPlans){assert.ok(html.includes(`id="plan-${plan.id}"`));assert.ok(html.includes(plan.pricingLabel));for(const inclusion of plan.inclusions)assert.ok(html.includes(inclusion));} assert.ok(html.includes(membershipScope));assert.match(html,/sp-plan sp-private/);assert.doesNotMatch(visible(html),/\bPKR\b|Rs\.|\d+\s*(?:visits|requests)|unlimited|complimentary|guarantee/i);assert.match(html,/Ask About Membership/);
});
test("How It Works explains all stages consistently and labels the practical example", async () => {
 const html=await page("how-it-works");for(const step of detailedProcess){assert.ok(html.includes(step.title)); assert.ok(html.includes(escape(step.connection)));}assert.ok(html.includes(scenarioDisclosure));assert.match(visible(html),/third-party professionals/);assert.match(visible(html),/appointment only once timing has been agreed/);
});
test("About explains the mission, vision and philosophy without fabricated history", async () => {
 const html=await page("about");assert.match(html,/Mission/);assert.match(html,/Vision/);for(const principle of operatingPhilosophy) assert.ok(html.includes(principle.title));assert.doesNotMatch(visible(html),/founder|established in|founded in|years of experience|award|partner|team of \d/i);
});
test("Contact keeps the one shared form, safe panel and editable service prefill", async () => {
 const html=await page("contact","gardening");assert.equal((html.match(/<form\b/g)||[]).length,1);for(const field of ["fullName","phone","email","location","message","preferredDate","preferredTime"]) assert.ok(html.includes(`name="${field}"`));assert.match(html,/Gardening &amp; Outdoor Care/);assert.match(html,/id="request-service"/);assert.match(html,/id="consultation"/);assert.match(html,/Lahore, Pakistan/);assert.doesNotMatch(html,/\[YOUR|\[BUSINESS|href="https:\/\/wa\.me/);assert.doesNotMatch(await page("contact","unknown"),/I'd like help with unknown/);
});
test("nested Property Care activates Services without changing the five-link navigation", () => {
 const html=renderToStaticMarkup(createElement("ul",null,createElement(NavigationItems)));assert.match(html, /<a\b(?=[^>]*href="\/services")(?=[^>]*aria-current="page")[^>]*>/);assert.equal((html.match(/aria-current="page"/g)||[]).length,1);assert.equal((html.match(/<li/g)||[]).length,5);currentPath="/membership";const membership=renderToStaticMarkup(createElement("ul",null,createElement(NavigationItems)));assert.doesNotMatch(membership,/aria-current/);
});
