import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";

const load = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const extension of [".ts", ".tsx"]) {
  load.extensions[extension] = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8").replace(/(["'])@\/([^"']+)\1/g, (_, _quote, target) => JSON.stringify(path.resolve(root, target)));
    module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
  };
}
const { siteConfig, site, navigation, primaryCta } = load("../content/site.ts");
const { phoneHref, emailHref, socialHref, whatsappHref, getContactLinks } = load("../lib/contact-links.ts");
const { services, serviceCategories, featuredServices, serviceIconKeys, servicesForCategory } = load("../content/services.ts");
const { membershipPlans, membershipPricing } = load("../content/membership.ts");
const { comingHomeScenario, homePreparationScenario, scenarioDisclosure } = load("../content/scenarios.ts");
const { testimonials } = load("../content/testimonials.ts");

test("public configuration has exact brand and five-link navigation", () => {
  assert.equal(siteConfig.BRAND_NAME, "Puraitmaad");
  assert.equal(site.name, siteConfig.BRAND_NAME);
  assert.equal(site.url, siteConfig.DOMAIN);
  assert.equal(site.tagline, "Your problem → our responsibility.");
  assert.equal(site.secondaryBrandLine, "Done For You.");
  assert.deepEqual(navigation.map(({ label, href }) => [label, href]), [["Home", "/"], ["Services", "/services"], ["How It Works", "/how-it-works"], ["About", "/about"], ["Contact", "/contact"]]);
  assert.equal(primaryCta.label, "Request a Service");
});

test("unknown contacts never produce working destinations", () => {
  assert.ok(Object.values(getContactLinks()).every(value => value === null));
  for (const value of [null, "", " ", "[YOUR PHONE]", "[YOUR EMAIL]", "[WHATSAPP_NUMBER]", "TBD", "N/A", "javascript:alert(1)", "<script>"]) {
    for (const helper of [phoneHref, emailHref, whatsappHref, socialHref]) assert.equal(helper(value), null, `${helper.name}: ${value}`);
  }
});

test("phone and email links validate configured values without header injection", () => {
  assert.equal(phoneHref("+92 (300) 123-4567"), "tel:+923001234567");
  assert.equal(phoneHref("923001234567"), "tel:+923001234567");
  for (const value of ["03001234567", "+92 XXX XXXXXXX", "0000000000", "123", "+923001234567890123", "+923001234567;ext=2"]) assert.equal(phoneHref(value), null);
  assert.equal(emailHref("hello@puraitmaad.com"), "mailto:hello@puraitmaad.com");
  for (const value of ["you@example.com", "hello@domain.test", "a@b", "a@b.com?bcc=evil@b.com", "a@b.com\r\nBcc:evil@b.com", "a..b@domain.com"]) assert.equal(emailHref(value), null);
});

test("WhatsApp messages round-trip special characters and preserve the service context", () => {
  const general = new URL(whatsappHref("+92 300 1234567"));
  assert.equal(general.origin + general.pathname, "https://wa.me/923001234567");
  assert.equal(general.searchParams.get("text"), "Hi Puraitmaad, I'd like help with a service.");
  const service = "AC & Appliance Repairs / گھر";
  const specific = new URL(whatsappHref("923001234567", service));
  assert.equal(specific.searchParams.get("text"), `Hi Puraitmaad, I'd like to request ${service}.`);
  assert.equal([...specific.searchParams].length, 1);
  assert.equal(new URL(whatsappHref("923001234567", "[SERVICE NAME]")).searchParams.get("text"), general.searchParams.get("text"));
});

test("social links accept real profile-shaped HTTPS URLs and reject unsafe destinations", () => {
  for (const value of ["https://www.instagram.com/puraitmaad/", "https://facebook.com/puraitmaad", "https://www.linkedin.com/company/puraitmaad/"]) assert.equal(socialHref(value), value);
  for (const value of ["http://instagram.com/puraitmaad", "https://instagram.com", "https://instagram.com.evil.test/puraitmaad", "https://user:pass@instagram.com/puraitmaad", "https://instagram.com/your_profile", "https://instagram.com/%5BYOUR%20PROFILE%5D", "https://instagram.com:444/puraitmaad", "https://unrelated.com/profile"]) assert.equal(socialHref(value), null);
});

test("TikTok supports HTTPS profiles and explicit footer-only login destinations", () => {
  assert.equal(socialHref("https://www.tiktok.com/@qa.account"), "https://www.tiktok.com/@qa.account");
  for (const value of ["https://www.facebook.com/login/", "https://www.instagram.com/accounts/login/", "https://www.tiktok.com/login"]) {
    assert.equal(socialHref(value), null);
    assert.equal(socialHref(value, { allowLogin: true }), value);
  }
  for (const value of ["https://www.tiktok.com/", "https://tiktok.com/tag/care", "http://tiktok.com/@care", "https://tiktok.com.evil.test/@care", "https://user:pass@tiktok.com/@care"]) assert.equal(socialHref(value), null);
});

test("service catalog has unique identities, four complete categories and six shared featured objects", () => {
  assert.equal(new Set(services.map(item => item.id)).size, services.length);
  assert.deepEqual(serviceCategories.map(item => item.name), ["Home Care", "Property Care", "Personal Assistance", "Business Support"]);
  for (const category of serviceCategories) assert.ok(servicesForCategory(category.id).length > 0);
  for (const service of services) {
    assert.ok(serviceCategories.some(category => category.id === service.category));
    assert.ok(serviceIconKeys.includes(service.icon));
    assert.ok(service.name && service.description && service.scopeNote && service.cta.label && service.cta.context);
    assert.ok(Array.isArray(service.examples));
  }
  assert.deepEqual(featuredServices.map(item => item.name), ["Gardening & Outdoor Care", "AC & Appliance Repairs", "Renovation Coordination", "Fridge & Restocking", "Property Maintenance", "Office Services"]);
  assert.ok(featuredServices.every(item => services.includes(item)));
  assert.equal(new Set(featuredServices.map(item => item.id)).size, 6);
});

test("membership and legacy adapter expose no prices, allowances or fabricated popularity", () => {
  assert.deepEqual(membershipPlans.map(item => item.name), ["Essential", "Premium", "Private"]);
  for (const plan of membershipPlans) {
    assert.equal(plan.pricingLabel, membershipPricing);
    assert.ok(plan.inclusions.length && plan.scopeNote);
  }
  const serialized = JSON.stringify([membershipPlans, load("../content/stewardship-plans.ts")]);
  assert.doesNotMatch(serialized, /\d|PKR|Signature|Private Stewardship|complimentary|24\/7|most popular/i);
  const oldPage = fs.readFileSync(path.join(root, "app/stewardship-plans/page.tsx"), "utf8");
  assert.doesNotMatch(oldPage, /From PKR|plan\.monthly|plan\.annual|propertyCheck\.price|Most popular/);
});

test("scenarios cannot be mistaken for real customer records and testimonials are empty", () => {
  for (const scenario of [comingHomeScenario, homePreparationScenario]) {
    assert.equal(scenario.kind, "illustrative");
    assert.equal(scenario.disclosure, scenarioDisclosure);
    assert.ok(scenario.scopeNote);
  }
  assert.deepEqual(comingHomeScenario.timeline.map(step => step.when), ["72 HOURS BEFORE", "48 HOURS BEFORE", "24 HOURS BEFORE", "ARRIVAL", "HOME"]);
  assert.equal(homePreparationScenario.coordination.length, 7);
  assert.deepEqual(testimonials, []);
});

test("loading buttons block submission; disabled links have no destination", () => {
  const { Button } = load("../components/ui/button.tsx");
  const { ButtonLink } = load("../components/ui/button-link.tsx");
  const button = renderToStaticMarkup(createElement(Button, { type: "submit", loading: true }, "Send"));
  assert.match(button, /disabled=""/);
  assert.match(button, /aria-busy="true"/);
  assert.match(button, /Sending…/);
  const link = renderToStaticMarkup(createElement(ButtonLink, { href: "/contact", disabled: true }, "Contact"));
  assert.match(link, /aria-disabled="true"/);
  assert.doesNotMatch(link, /href=/);
});

test("every catalog icon renders decorative or accessible standalone SVG", () => {
  const { ServiceIcon } = load("../components/ui/service-icon.tsx");
  for (const name of serviceIconKeys) {
    assert.match(renderToStaticMarkup(createElement(ServiceIcon, { name })), /aria-hidden="true"/);
    const labeled = renderToStaticMarkup(createElement(ServiceIcon, { name, label: "Service" }));
    assert.match(labeled, /aria-label="Service"/);
    assert.match(labeled, /<path d="[^"]+"/);
  }
});
