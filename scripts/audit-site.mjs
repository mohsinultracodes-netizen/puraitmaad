import assert from "node:assert/strict";

// Read-only rendered HTML audit against a running local production server.
const origin = "http://localhost:3100";
const productionOrigin = process.env.SITE_URL?.trim() || "https://puraitmaad.com";
const routes = ["/", "/services", "/how-it-works", "/overseas-owners", "/arrival-ready", "/about", "/privacy-and-discretion", "/contact", "/privacy-policy"];
const pages = new Map();
const titles = new Set();
const descriptions = new Set();
for (const route of routes) {
  const response = await fetch(origin + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  pages.set(route, html);
  const expectedUrl = new URL(route, productionOrigin).href;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  assert.equal(new URL(canonical).href, expectedUrl, `Production canonical: ${route}`);
  assert.equal(new URL(ogUrl).href, expectedUrl, `Production Open Graph URL: ${route}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${route}`);
  assert.ok(description && !descriptions.has(description), `Unique description: ${route}`);
  titles.add(title); descriptions.add(description);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, `One H1: ${route}`);
  assert.equal([...html.matchAll(/<main[ >]/g)].length, 1, `One main landmark: ${route}`);
  for (const tag of ["header", "footer"]) assert.ok(html.includes(`<${tag}`), `${tag}: ${route}`);
  for (const property of ["og:title", "og:description", "og:site_name", "og:type", "og:locale"]) assert.ok(html.includes(`property="${property}"`), `${property}: ${route}`);
  const headings = [...html.matchAll(/<h([1-6])[ >]/g)].map((match) => Number(match[1]));
  for (let index = 1; index < headings.length; index++) assert.ok(headings[index] <= headings[index - 1] + 1, `Heading hierarchy: ${route}`);
}
let links = 0;
for (const [route, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), origin + route);
    if (url.origin !== origin) continue;
    assert.ok(pages.has(url.pathname), `Implemented route: ${route} -> ${url.pathname}`);
    if (url.hash) assert.ok(pages.get(url.pathname).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Existing anchor: ${route} -> ${url.pathname}${url.hash}`);
    if (/Request.*Consultation|Plan Your Arrival|Discuss Your Property/.test(match[2].replace(/<[^>]+>/g, ""))) assert.equal(url.pathname + url.hash, "/contact#consultation");
    links++;
  }
}
const robots = await (await fetch(origin + "/robots.txt")).text();
assert.ok(robots.includes("Allow: /"));
assert.ok(!robots.includes("Disallow: /\n"));
assert.ok(robots.includes(`Sitemap: ${new URL("/sitemap.xml", productionOrigin).href}`));
const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
assert.ok(!sitemap.includes("localhost"));
assert.equal([...sitemap.matchAll(/<loc>/g)].length, routes.length);
for (const route of routes) assert.ok(sitemap.includes(`<loc>${new URL(route, productionOrigin).href}</loc>`));
console.log(`Passed: ${pages.size} pages, ${links} internal links/anchors, unique metadata, headings, landmarks, robots and sitemap checks.`);
