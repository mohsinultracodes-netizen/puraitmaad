import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const load = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const extension of [".ts", ".tsx"]) {
  load.extensions[extension] = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8").replace(/(["'])@\/([^"']+)\1/g, (_, _quote, target) => JSON.stringify(path.resolve(root, target)));
    module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
  };
}
load.extensions[".css"] = () => {};
const { SiteFooter } = load("../components/layout/site-footer.tsx");
const { siteConfig } = load("../content/site.ts");

test("footer omits placeholder destinations and displays the confirmed city and request path", () => {
  const html = renderToStaticMarkup(createElement(SiteFooter));
  assert.match(html, /Lahore, Pakistan/);
  assert.match(html, /Request a Service/);
  assert.match(html, /Puraitmaad\. All rights reserved/);
  assert.doesNotMatch(html, /\[YOUR|\[BUSINESS|href="(?:tel:|mailto:|https:\/\/wa\.me)/);
  for (const platform of ["Facebook", "Instagram", "TikTok"]) assert.ok(html.includes(`aria-label="${platform}"`));
  assert.doesNotMatch(html, /Follow us|target="_blank"/);
});

test("footer only links available routes; future service categories remain plain text", () => {
  const html = renderToStaticMarkup(createElement(SiteFooter));
  assert.match(html, /href="\/privacy-policy"/);
  for (const route of ["terms-and-conditions", "cancellation-policy", "service-disclaimer"]) assert.ok(html.includes(`href="/${route}"`));
  assert.doesNotMatch(html, /href="\/services\//);
  for (const label of ["Home Care", "Property Care", "Personal Assistance", "Business Support"]) assert.ok(html.includes(`<li>${label}</li>`));
});

test("footer renders configured contact/social destinations through the safe helpers", () => {
  const previous = { ...siteConfig };
  try {
    Object.assign(siteConfig, { PHONE: "+92 300 1234567", WHATSAPP: "+92 300 1234567", EMAIL: "hello@puraitmaad.com", INSTAGRAM: "https://www.instagram.com/puraitmaad/" });
    const html = renderToStaticMarkup(createElement(SiteFooter));
    assert.match(html, /href="tel:\+923001234567"/);
    assert.match(html, /href="mailto:hello@puraitmaad.com"/);
    assert.match(html, /href="https:\/\/wa.me\/923001234567\?text=/);
    assert.match(html, /href="https:\/\/www.instagram.com\/puraitmaad\/"/);
    assert.match(html, /Social accounts/);
    assert.doesNotMatch(html, /YOUR FACEBOOK|YOUR LINKEDIN/);
  } finally {
    Object.assign(siteConfig, previous);
  }
});

test("footer hides empty and invalid social links without fake destinations", () => {
  const previous = { ...siteConfig };
  try {
    Object.assign(siteConfig, { FACEBOOK: "", INSTAGRAM: "[YOUR INSTAGRAM URL]", TIKTOK: "javascript:alert(1)", LINKEDIN: "" });
    const html = renderToStaticMarkup(createElement(SiteFooter));
    assert.doesNotMatch(html, /Social accounts|footer-social|href="#"/);
    Object.assign(siteConfig, { TIKTOK: "https://www.tiktok.com/@qa.account" });
    const configured = renderToStaticMarkup(createElement(SiteFooter));
    assert.match(configured, /aria-label="TikTok"/);
    assert.doesNotMatch(configured, /aria-label="Facebook"|aria-label="Instagram"/);
    assert.match(configured, /<svg[^>]*width="22"[^>]*aria-hidden="true"[^>]*focusable="false"/);
  } finally { Object.assign(siteConfig, previous); }
});
