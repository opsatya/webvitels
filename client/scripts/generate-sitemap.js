const fs = require('fs');
const path = require('path');

/**
 * Generate a sitemap.xml file for better SEO
 * This script creates a sitemap.xml file based on the routes in your application
 */

// Configuration
const BASE_URL = 'https://webvitels.com';
const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');
const LAST_MOD_DATE = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

// Define your site's routes and their metadata
const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: LAST_MOD_DATE
  },
  {
    path: '/projects',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: LAST_MOD_DATE
  },
  {
    path: '/service',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: LAST_MOD_DATE
  },
  {
    path: '/contact',
    changefreq: 'yearly',
    priority: '0.7',
    lastmod: LAST_MOD_DATE
  }
  // Add more routes as needed
];

// Generate the sitemap XML content
function generateSitemapXml() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

// Write the sitemap to the public directory
function writeSitemap() {
  const sitemapXml = generateSitemapXml();
  
  try {
    fs.writeFileSync(OUTPUT_FILE, sitemapXml);
    console.log(`Sitemap generated successfully at ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error writing sitemap:', error);
  }
}

// Execute the sitemap generation
writeSitemap();
