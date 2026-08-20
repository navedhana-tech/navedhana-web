import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to prerender
const routes = ['/', '/about', '/services', '/ai-agent', '/products', '/insights', '/vegetables', '/contact', '/privacy', '/terms'];

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const PORT = 4173;

const MIME_TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.webp': 'image/webp', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
};

// A real static server, not a proxy — this actually renders the app.
// SPA fallback (serve index.html for any path with no matching file, same
// as render.yaml's `/* -> /index.html` rewrite) is required because on the
// FIRST run, dist/about/, dist/services/, etc. don't exist yet — only
// dist/index.html does, from `vite build`. Puppeteer navigating to
// /about must still get the SPA shell so React Router can render it.
function serveStatic() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      let filePath = path.join(distDir, decodeURIComponent(urlPath));
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = indexPath;
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end();
          return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  console.log('📦 Prerendering routes for SEO...');

  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found. Run "vite build" first.');
    process.exit(1);
  }

  const server = await serveStatic();
  const browser = await puppeteer.launch({
    headless: true,
    // --no-sandbox/--disable-gpu: needed in restricted/CI-like environments
    // where the default sandboxed launch can hang waiting for the DevTools
    // WS endpoint. protocolTimeout raised for the same slow-launch case.
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    protocolTimeout: 60000,
  });

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const url = `http://localhost:${PORT}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      // React/Framer Motion mount after networkidle0's own settling; give the
      // root a moment to actually have children before snapshotting.
      await page.waitForSelector('#root > *', { timeout: 10000 }).catch(() => {});
      const html = await page.content();
      await page.close();

      const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
      const outputPath = path.join(distDir, routePath);
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      fs.writeFileSync(outputPath, html, 'utf-8');
      console.log(`✅ Prerendered: ${route} -> ${routePath} (${(html.length / 1024).toFixed(1)} KB)`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n✨ Prerendering complete!');
  console.log(`   - Total routes: ${routes.length}`);
  console.log('   - Each route now has its own fully-rendered static HTML file');
}

main().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
