import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all routes
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/vegetables', priority: '0.9', changefreq: 'weekly' },
  { path: '/software', priority: '0.9', changefreq: 'weekly' },
  { path: '/seasonal', priority: '0.8', changefreq: 'monthly' },
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

// Generate sitemaps for both domains
const main = () => {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Generate sitemap for www.navedhana.com
  const mainSitemap = generateSitemap('https://www.navedhana.com', routes);
  fs.writeFileSync(
    path.join(publicDir, 'sitemap.xml'),
    mainSitemap,
    'utf-8'
  );
  console.log('✅ Generated sitemap.xml for www.navedhana.com');

  // Generate sitemap for fresh.navedhana.com
  const freshSitemap = generateSitemap('https://fresh.navedhana.com', routes);
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-fresh.xml'),
    freshSitemap,
    'utf-8'
  );
  console.log('✅ Generated sitemap-fresh.xml for fresh.navedhana.com');

  console.log('\n📝 Sitemaps generated successfully!');
  console.log(`   - Total routes: ${routes.length}`);
  console.log(`   - Domains: www.navedhana.com, fresh.navedhana.com`);
};

main();
