import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all routes
const routes = [
  { path: '/', file: 'src/pages/Home.jsx', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', file: 'src/pages/Services.jsx', priority: '0.9', changefreq: 'weekly' },
  { path: '/ai-agent', file: 'src/pages/AiAgent.jsx', priority: '0.8', changefreq: 'weekly' },
  { path: '/products', file: 'src/pages/Products.jsx', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', file: 'src/pages/About.jsx', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', file: 'src/pages/Contact.jsx', priority: '0.8', changefreq: 'monthly' },
  // /vegetables, /seasonal, /solar are noindexed (side ventures, not
  // promoted) — excluded here since a noindexed URL shouldn't be sitemapped.
  { path: '/privacy', file: 'src/pages/Privacy.jsx', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', file: 'src/pages/Terms.jsx', priority: '0.3', changefreq: 'yearly' },
];

// lastmod = when the page's source last changed in git. Stamping every page
// with the build date made lastmod meaningless, so Google ignored it. If git
// history isn't available (some build containers), lastmod is left out.
const lastModified = (file) => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { cwd: path.join(__dirname, '..') }).toString().trim() || null;
  } catch {
    return null;
  }
};

// Generate sitemap XML
const generateSitemap = (baseUrl, routes) => {
  const urlEntries = routes.map(route => {
    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
${(d => (d ? `    <lastmod>${d}</lastmod>
` : ''))(lastModified(route.file))}    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>
`;
};

// fresh.navedhana.com is not promoted in search (noindexed, see index.html) —
// only www gets a sitemap.
const main = () => {
  const publicDir = path.join(__dirname, '..', 'public');

  const mainSitemap = generateSitemap('https://www.navedhana.com', routes);
  fs.writeFileSync(
    path.join(publicDir, 'sitemap.xml'),
    mainSitemap,
    'utf-8'
  );
  console.log('✅ Generated sitemap.xml for www.navedhana.com');

  console.log('\n📝 Sitemap generated successfully!');
  console.log(`   - Total routes: ${routes.length}`);
};

main();
