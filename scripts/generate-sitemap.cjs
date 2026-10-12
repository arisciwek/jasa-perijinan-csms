const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const siteUrl = process.env.SITE_URL || process.env.VERCEL_URL || 'http://jasa-perijinan-csms.lan';
const baseUrl = siteUrl.replace(/\/+$/, '');

const contentDir = path.join(__dirname, '../src/content/articles');

function getArticleLastmod(slug) {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  return data.updatedDate || data.pubDate || new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

const routes = [
  { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/services/', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/services/penyusunan-dokumen-csms/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/services/review-gap-analysis-csms/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/services/pendampingan-verifikasi-audit-hse/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/services/digitalisasi-standardisasi-k3ll/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/kepemimpinan-komitmen/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/kebijaksanaan-sasaran/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/organisasi-tanggungjawab/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/manajemen-risiko/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/perencanaan-prosedur/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/implementasi-pemantauan/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/audit-tinjauan/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/pencapaian-kinerja/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/csms-elements/pencapaian-lainnya/', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/articles/', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
  { url: '/articles/panduan-sukses-audit-csms-migas/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('panduan-sukses-audit-csms-migas') },
  { url: '/articles/mengenal-9-elemen-csms/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('mengenal-9-elemen-csms') },
  { url: '/articles/pentingnya-digitalisasi-k3ll/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('pentingnya-digitalisasi-k3ll') },
  { url: '/articles/dokumen-csms-adalah-pengertian-fungsi-manfaat-bagi-kontraktor/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('dokumen-csms-adalah-pengertian-fungsi-manfaat-bagi-kontraktor') },
  { url: '/articles/9-elemen-csms-dan-dokumen-yang-harus-disiapkan-perusahaan-kontraktor/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('9-elemen-csms-dan-dokumen-yang-harus-disiapkan-perusahaan-kontraktor') },
  { url: '/articles/persyaratan-csms-untuk-mengikuti-tender-di-perusahaan-migas-dan-pertambangan/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('persyaratan-csms-untuk-mengikuti-tender-di-perusahaan-migas-dan-pertambangan') },
  { url: '/articles/cara-membuat-dokumen-csms-dari-nol-untuk-perusahaan-yang-baru-mengikuti-tender/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('cara-membuat-dokumen-csms-dari-nol-untuk-perusahaan-yang-baru-mengikuti-tender') },
  { url: '/articles/manual-k3ll-sop-k3-dan-safe-work-practices-apa-perbedaan-dan-fungsinya/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('manual-k3ll-sop-k3-dan-safe-work-practices-apa-perbedaan-dan-fungsinya') },
    { url: '/articles/gap-analysis-csms-adalah-pengertian-tujuan-dan-tahapan-pelaksanaannya/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('gap-analysis-csms-adalah-pengertian-tujuan-dan-tahapan-pelaksanaannya') },
    { url: '/articles/cara-mengevaluasi-kelengkapan-dokumen-csms-sebelum-mengikuti-tender/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('cara-mengevaluasi-kelengkapan-dokumen-csms-sebelum-mengikuti-tender') },
    { url: '/articles/penyebab-dokumen-csms-tidak-memenuhi-persyaratan-verifikasi-dan-cara-memperbaikinya/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('penyebab-dokumen-csms-tidak-memenuhi-persyaratan-verifikasi-dan-cara-memperbaikinya') },
    { url: '/articles/checklist-review-dokumen-csms-untuk-mempersiapkan-prakualifikasi-vendor/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('checklist-review-dokumen-csms-untuk-mempersiapkan-prakualifikasi-vendor') },
    { url: '/articles/kapan-perusahaan-perlu-melakukan-review-dan-pembaruan-dokumen-csms/', changefreq: 'monthly', priority: 0.7, lastmod: getArticleLastmod('kapan-perusahaan-perlu-melakukan-review-dan-pembaruan-dokumen-csms') },
    { url: '/about/', changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString().replace(/\\.\\d{3}Z$/, 'Z') },
  { url: '/contact/', changefreq: 'monthly', priority: 0.9, lastmod: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${baseUrl}${r.url}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <lastmod>${r.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${routes[0].lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

const robots = `User-agent: *
Disallow: /
Sitemap: ${baseUrl}/sitemap.xml`;

const distDir = path.join(__dirname, '../dist');
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), sitemapIndex);
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);

console.log('Sitemap & robots.txt generated successfully!');
console.log('lastmod:', routes[0].lastmod);