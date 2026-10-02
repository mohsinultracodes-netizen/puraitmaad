import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const loadModule = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadModule.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8").replace(/(["'])@\/([^"']+)\1/g, (_, _quote, target) => JSON.stringify(path.resolve(root, target)));
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
};
const { getSiteUrl, pageMetadata, publicRoutes } = loadModule("../lib/seo.ts");
const sitemap = loadModule("../app/sitemap.ts").default;
const robots = loadModule("../app/robots.ts").default;

test("SEO defaults to the official domain and supports a validated origin override", () => {
  const previous = process.env.SITE_URL;
  try {
    delete process.env.SITE_URL;
    assert.equal(getSiteUrl().origin, "https://puraitmaad.com");
    assert.equal(sitemap().length, 9);
    assert.equal(robots().sitemap, "https://puraitmaad.com/sitemap.xml");
    for (const route of publicRoutes) {
      const expected = new URL(route, "https://puraitmaad.com").href;
      const metadata = pageMetadata("Page", "Description", route);
      assert.equal(metadata.alternates.canonical, expected);
      assert.equal(metadata.openGraph.url, expected);
      assert.ok(sitemap().some((entry) => entry.url === expected));
    }
    // Reserved test domain, never written to configuration or generated production files.
    process.env.SITE_URL = "https://configured.example";
    assert.equal(sitemap().length, 9);
    assert.deepEqual(sitemap().map((entry) => new URL(entry.url).pathname), [...publicRoutes]);
    assert.equal(robots().sitemap, "https://configured.example/sitemap.xml");
    assert.equal(pageMetadata("Services", "Description", "/services").alternates.canonical, "https://configured.example/services");
    for (const invalid of ["http://localhost:3000", "https://127.0.0.1", "https://configured.example/path", "https://configured.example?data=value", "https://user:pass@configured.example"]) {
      process.env.SITE_URL = invalid;
      assert.throws(getSiteUrl);
    }
  } finally {
    if (previous === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = previous;
  }
});
