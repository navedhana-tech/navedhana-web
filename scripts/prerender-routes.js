import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to prerender
const routes = ['/', '/about', '/vegetables', '/software', '/seasonal'];

// This script creates static HTML files for each route
// It should be run after the Vite build
const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

console.log('📦 Prerendering routes for SEO...');

// Read the main index.html
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found. Run "npm run build" first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Create HTML files for each route
routes.forEach(route => {
  const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
  const outputPath = path.join(distDir, routePath);
  const outputDir = path.dirname(outputPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Copy index.html to route path
  fs.writeFileSync(outputPath, indexHtml, 'utf-8');
  console.log(`✅ Prerendered: ${route} -> ${routePath}`);
});

console.log('\n✨ Prerendering complete!');
console.log(`   - Total routes: ${routes.length}`);
console.log('   - All routes now have static HTML files');
