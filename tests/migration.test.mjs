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
const { publicRoutes, socialImage, getSiteUrl } = load("../lib/seo.ts");
const { siteConfig } = load("../content/site.ts");
const { legacyRedirects } = load("../lib/route-migrations.ts");
const { organizationAndServices, serializeJsonLd } = load("../lib/structured-data.ts");
const { legalNavigation, legalDraftLabel } = load("../content/legal.ts");
const { privacyPolicy } = load("../content/privacy-policy.ts");
const config = load("../next.config.ts").default;
const metadata = route => load(route === "/" ? "../app/page.tsx" : `../app${route}/page.tsx`).metadata;
const render = component => renderToStaticMarkup(createElement(component));
const plain = value => value.replace(/<[^>]*>/g," ").replaceAll("&amp;","&");
test("homepage metadata has the exact approved title and description across search and social", () => {
 const m=metadata("/");assert.equal(m.title.absolute,"Puraitmaad | Premium Home, Property & Business Assistance");assert.equal(m.description,"Premium managed home, property and business assistance in Lahore. Tell Puraitmaad what you need and we'll coordinate the rest.");assert.equal(m.openGraph.title,m.title.absolute);assert.equal(m.twitter.title,m.title.absolute);assert.equal(m.alternates.canonical,"https://puraitmaad.com/");
});
test("all eleven canonical routes have unique metadata and matching canonical/social URLs", () => {
 const titles=new Set(),descriptions=new Set();for(const route of publicRoutes){const m=metadata(route),url=new URL(route,getSiteUrl()).href;assert.equal(m.alternates.canonical,url);assert.equal(m.openGraph.url,url);assert.equal(m.twitter.card,"summary_large_image");assert.deepEqual(m.openGraph.images,[socialImage]);assert.deepEqual(m.twitter.images,[socialImage]);titles.add(JSON.stringify(m.title));descriptions.add(m.description);assert.doesNotMatch(JSON.stringify(m),/property stewardship|Private Stewardship|Signature|consultation|stewardship-plans|overseas-owners|arrival-ready/i);}assert.equal(titles.size,11);assert.equal(descriptions.size,11);
});
test("redirect rules use permanent path migration and combine alias host with legacy paths first", async () => {
 const rules=await config.redirects();for(const legacy of legacyRedirects){const local=rules.find(r=>r.source===legacy.source&&!r.has),combined=rules.find(r=>r.source===legacy.source&&r.has);assert.equal(local.destination,legacy.destination);assert.equal(local.permanent,true);assert.equal(combined.destination,'https://puraitmaad.com'+legacy.destination);assert.equal(combined.has[0].value,'www.puraitmaad.com');assert.equal(combined.permanent,true);assert.ok(rules.indexOf(combined)<rules.findIndex(r=>r.source==='/:path*'));const source=fs.readFileSync(path.join(root,'app',legacy.source,'page.tsx'),'utf8');assert.match(source,/permanentRedirect/);assert.ok(source.includes(legacy.destination));assert.doesNotMatch(source,/PageHero|pageMetadata/);}
});
test("legal pages render clear draft labels, contents anchors and one H1", () => {
 for(const {href}of legalNavigation){const html=render(load(`../app${href}/page.tsx`).default);assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.match(html,/aria-label=".*contents"/);assert.match(html,/Contact Puraitmaad/);if(href!=='/privacy-policy')assert.ok(plain(html).includes(legalDraftLabel));assert.doesNotMatch(plain(html),/\d+\s*(?:days|hours|%|PKR)|arbitration|indemnif/i);}
});
test("privacy accurately covers the new form, delivery, optional preferences and discretion anchor", () => {
 const html=render(load('../app/privacy-policy/page.tsx').default),text=plain(html);for(const field of ['Name','Phone / WhatsApp','Email address','Location / Area','Request description','Preferred date','Preferred time'])assert.ok(text.includes(field));assert.match(html,/id="privacy-and-discretion"/);assert.match(text,/Resend/);assert.match(text,/does not add request records to a database/);assert.match(text,/No fixed retention period/);assert.doesNotMatch(text,/Property type|occupancy information|consultation|Pur Aitmaad/);assert.equal(new Set(privacyPolicy.map(s=>s.id)).size,privacyPolicy.length);
});
test("footer exposes exactly the four resolving legal destinations", () => {
 const html=render(load('../components/layout/site-footer.tsx').SiteFooter);for(const link of legalNavigation)assert.ok(html.includes(`href="${link.href}"`));assert.match(html,/footer-legal-links/);assert.doesNotMatch(html,/href="\/(?:stewardship-plans|overseas-owners|arrival-ready|privacy-and-discretion)"/);
});
test("Organization and four Service nodes have canonical IDs and no fabricated or placeholder facts", () => {
 const data=organizationAndServices();assert.equal(data['@graph'].length,5);const org=data['@graph'][0];assert.equal(org['@type'],'Organization');assert.equal(org.name,'Puraitmaad');assert.equal(org['@id'],'https://puraitmaad.com/#organization');assert.equal(org.logo,'https://puraitmaad.com/images/pur-aitmaad-logo.svg');for(const service of data['@graph'].slice(1)){assert.equal(service['@type'],'Service');assert.equal(service.provider['@id'],org['@id']);assert.equal(service.areaServed.name,'Lahore, Pakistan');}assert.doesNotMatch(JSON.stringify(data),/LocalBusiness|aggregateRating|review|priceRange|foundingDate|telephone|contactPoint|sameAs|\[YOUR|\[BUSINESS/);
});
test("structured data only publishes configured public channels and safely serializes hostile strings", () => {
 const previous={...siteConfig};try{Object.assign(siteConfig,{PHONE:'+92 300 1234567',EMAIL:'public@puraitmaad.com',INSTAGRAM:'https://www.instagram.com/puraitmaad/'});const org=organizationAndServices()['@graph'][0];assert.ok(org.contactPoint.some(c=>c.telephone==='+923001234567'));assert.ok(org.contactPoint.some(c=>c.email==='public@puraitmaad.com'));assert.deepEqual(org.sameAs,['https://www.instagram.com/puraitmaad/']);const hostile='</script><script>alert(1)</script>\u2028\u2029';const serialized=serializeJsonLd({name:hostile});assert.ok(!serialized.includes('<'));assert.equal(JSON.parse(serialized).name,hostile);}finally{Object.assign(siteConfig,previous);}
});
test("OG JPEG exists at the referenced path and favicon metadata/assets remain present", async () => {
 const sharp=load('sharp'),image=await sharp(path.join(root,'public',socialImage.url)).metadata();assert.equal(image.width,1200);assert.equal(image.height,630);assert.equal(image.format,'jpeg');const layout=fs.readFileSync(path.join(root,'app/layout.tsx'),'utf8');for(const icon of ['favicon.svg','favicon-96x96.png','favicon-512x512.png','apple-touch-icon.png']){assert.ok(fs.existsSync(path.join(root,'public',icon)));assert.ok(layout.includes(icon));}assert.ok(fs.existsSync(path.join(root,'app/favicon.ico')));assert.match(layout,/application\/ld\+json/);assert.match(layout,/serializeJsonLd/);
});
