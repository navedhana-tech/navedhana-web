// Smoke test against the built site (run `npm run build` first):
// every prerendered route renders an <h1> with no uncaught JS error, and an
// unknown URL shows the 404 page. Exits non-zero on any failure.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { preview } from 'vite';
import puppeteer from 'puppeteer';

const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('dist/ not found. Run "npm run build" first.');
  process.exit(1);
}

// Routes = whatever the prerender step produced, so this list never drifts.
const routes = ['/', ...fs.readdirSync(distDir)
  .filter((d) => fs.existsSync(path.join(distDir, d, 'index.html')))
  .map((d) => `/${d}`)];

const server = await preview({ preview: { port: 4174, strictPort: true }, logLevel: 'silent' });
const base = 'http://localhost:4174';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const failures = [];

async function check(route, expectH1) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  try {
    await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('main h1', { timeout: 10000 });
    const h1 = await page.$eval('main h1', (el) => el.textContent.trim());
    if (!h1) failures.push(`${route}: empty <h1>`);
    if (expectH1 && h1 !== expectH1) failures.push(`${route}: expected "${expectH1}", got "${h1}"`);
    if (errors.length) failures.push(`${route}: ${errors.join('; ')}`);
    console.log(`${errors.length ? '✗' : '✓'} ${route} — ${h1}`);
  } catch (err) {
    failures.push(`${route}: ${err.message}`);
    console.log(`✗ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

try {
  for (const route of routes) await check(route);
  await check('/this-page-does-not-exist', 'Page not found');
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}

if (failures.length) {
  console.error(`\n${failures.length} failure(s):\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`\nAll ${routes.length + 1} checks passed.`);
