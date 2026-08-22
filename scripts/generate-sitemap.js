import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all routes
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/ai-agent', priority: '0.8', changefreq: 'weekly' },
  { path: '/products', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/insights', priority: '0.5', changefreq: 'monthly' },
  // /vegetables, /seasonal, /solar are noindexed (side ventures, not
  // promoted) — excluded here since a noindexed URL shouldn't be sitemapped.
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Generate sitemap XML
const generateSitemap = (baseUrl, routes) => {
  const currentDate = getCurrentDate();

  const urlEntries = routes.map(route => {
    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
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
