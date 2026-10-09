// scripts/prerender.mjs
//
// Runs after `vite build`. For every page, renders the React page to HTML
// and writes dist/<page>/index.html, so the text, title and description are
// in the file itself. Search engines and AI tools that don't run JavaScript
// (most AI crawlers) can then read every page.
//
// Visitors with JavaScript never see this copy: it is hidden until the
// normal app replaces it. Image/video sources are removed from the hidden
// copy so nothing downloads twice.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const { SERVICE_PAGES } = await import(pathToFileURL(path.join(root, "src", "data", "servicePages.js")).href);

const ROUTES = [
  "/",
  "/services",
  "/residential",
  "/projects",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/sms-opt-in",
  "/delete-account",
  ...SERVICE_PAGES.map((p) => p.path),
];

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--seo-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("prerender: index.html is missing the <!--seo--> markers or the empty #root");
}

// keep text and alt text, drop anything that would download or define a form
function stripMedia(html) {
  return html
    .replace(/<(img|source|video|iframe)\b([^>]*?)\s(src|srcset|poster)="[^"]*"/g, "<$1$2")
    .replace(/<(img|source|video|iframe)\b([^>]*?)\s(src|srcset|poster)="[^"]*"/g, "<$1$2")
    .replace(/<(img|source|video|iframe)\b([^>]*?)\s(src|srcset|poster)="[^"]*"/g, "<$1$2")
    .replace(/background-image:\s*url\([^)]*\);?/g, "")
    // forms are defined once, in index.html; keep Netlify from seeing copies
    .replace(/<form([^>]*?)\s(data-netlify|data-netlify-honeypot)="[^"]*"/g, "<form$1")
    .replace(/<form([^>]*?)\s(data-netlify|data-netlify-honeypot)="[^"]*"/g, "<form$1");
}

let ok = 0;
for (const route of ROUTES) {
  const { html, headTags } = await render(route);
  if (!html || html.length < 500) throw new Error(`prerender: ${route} rendered almost nothing`);
  const page = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, headTags)
    .replace('<div id="root"></div>', `<div id="root"><div class="prerendered">${stripMedia(html)}</div></div>`);
  const outDir = route === "/" ? dist : path.join(dist, route.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page);
  ok++;
}
console.log(`prerender: wrote ${ok} pages`);
