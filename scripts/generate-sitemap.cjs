const fs = require('fs');
const path = require('path');

const siteUrl = process.env.SITE_URL || process.env.VERCEL_URL || 'http://jasa-perijinan-csms.lan';
const baseUrl = siteUrl.replace(/\/+$/, '');

const routes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services/', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/penyusunan-dokumen-csms/', changefreq: 'monthly', priority: 0.7 },
  { url: '/services/review-gap-analysis-csms/', changefreq: 'monthly', priority: 0.7 },
  { url: '/services/pendampingan-verifikasi-audit-hse/', changefreq: 'monthly', priority: 0.7 },
  { url: '/services/digitalisasi-standardisasi-k3ll/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/', changefreq: 'monthly', priority: 0.8 },
  { url: '/csms-elements/kepemimpinan-komitmen/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/kebijaksanaan-sasaran/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/organisasi-tanggungjawab/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/manajemen-risiko/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/perencanaan-prosedur/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/implementasi-pemantauan/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/audit-tinjauan/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/pencapaian-kinerja/', changefreq: 'monthly', priority: 0.7 },
  { url: '/csms-elements/pencapaian-lainnya/', changefreq: 'monthly', priority: 0.7 },
  { url: '/articles/', changefreq: 'weekly', priority: 0.8 },
  { url: '/articles/panduan-sukses-audit-csms-migas/', changefreq: 'monthly', priority: 0.7 },
  { url: '/articles/mengenal-9-elemen-csms/', changefreq: 'monthly', priority: 0.7 },
  { url: '/articles/pentingnya-digitalisasi-k3ll/', changefreq: 'monthly', priority: 0.7 },
  { url: '/about/', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact/', changefreq: 'monthly', priority: 0.9 },
];

const lastmod = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${baseUrl}${r.url}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

const robots = `User-agent: *\nDisallow: /\nSitemap: ${baseUrl}/sitemap.xml`;

const distDir = path.join(__dirname, '../dist');
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), sitemapIndex);
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);

console.log('Sitemap & robots.txt generated successfully!');
console.log('lastmod:', lastmod);