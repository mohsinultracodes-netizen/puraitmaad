import fs from "node:fs/promises";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

// Preserve the existing mark and windows verbatim; exclude the wordmark/tagline.
const logo = await fs.readFile(new URL("../public/images/pur-aitmaad-logo.svg", import.meta.url), "utf8");
const mark = logo.match(/<g id="mark"[\s\S]*?<\/g>/)?.[0];
const windows = logo.match(/<g fill="#C9A66B">[\s\S]*?<\/g>/)?.[0];
if (!mark || !windows) throw new Error("Original logo symbol not found");
// Square viewBox, centered on the painted bounds with at least 10% padding.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="255 95 720 720"><title>Pur Aitmaad</title>${mark}${windows}</svg>\n`;
await fs.writeFile(new URL("../public/favicon.svg", import.meta.url), svg);
for (const [size, filename] of [[96, "favicon-96x96.png"], [512, "favicon-512x512.png"], [180, "apple-touch-icon.png"]]) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(fileURLToPath(new URL(`../public/${filename}`, import.meta.url)));
}
// ICO directory with PNG frames; supported by modern browsers and Windows.
const sizes = [16, 32, 48, 64, 256];
const frames = await Promise.all(sizes.map(size => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  header[entry] = header[entry + 1] = sizes[index] % 256;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await fs.writeFile(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([header, ...frames]));
