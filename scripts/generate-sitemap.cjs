const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const configuredUrl = process.env.SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL.replace(/^https?:\\/\\//, '')}` : 'http://jasa-perijinan-csms.lan');
const baseUrl = configuredUrl.replace(/\\/+$/, '');

const rootDir = path.join(__dirname, '..');
const pagesDir = path.join(rootDir, 'src/pages');
const articlesDir = path.join(rootDir, 'src/content/articles');
const distDir = path.join(rootDir, 'dist');

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
}

function toStaticRoute(filePath) {
  const relative = path.relative(pagesDir, filePath).split(path.sep).join('/');
  if (!relative.endsWith('.astro') || relative === '404.astro') return null;

  const routeParts = relative.slice(0, -'.astro'.length).split('/');
  if (routeParts.some((part) => part.startsWith('[') && part.endsWith(']'))) return null;

  if (routeParts[routeParts.length - 1] === 'index') routeParts.pop();
  const route = routeParts.length ? `/${routeParts.join('/')}/` : '/';
  return route;
}

function normalizeLastmod(value) {
  if (!value) return new Date().toISOString().replace(/\\.\\d{3}Z$/, 'Z');
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString().replace(/\\.\\d{3}Z$/, 'Z') : date.toISOString().replace(/\\.\\d{3}Z$/, 'Z');
}

const routeMap = new Map();
for (const filePath of walkFiles(pagesDir)) {
  const route = toStaticRoute(filePath);
  if (!route) continue;
  const depth = route.split('/').filter(Boolean).length;
  routeMap.set(route, {
    url: route,
    changefreq: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1.0 : depth <= 1 ? 0.8 : 0.7,
    lastmod: normalizeLastmod(),
  });
}

const articleFiles = walkFiles(articlesDir).filter((filePath) => filePath.endsWith('.md'));
const publishedArticles = [];
for (const filePath of articleFiles) {
  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  if (data.draft) continue;

  const slug = path.basename(filePath, '.md');
  const route = `/articles/${slug}/`;
  const lastmod = normalizeLastmod(data.updatedDate || data.pubDate);
  routeMap.set(route, { url: route, changefreq: 'monthly', priority: 0.7, lastmod });
  publishedArticles.push({ slug, lastmod });
}

const itemsPerPage = 9;
const totalArticlePages = Math.ceil(publishedArticles.length / itemsPerPage);
for (let page = 2; page <= totalArticlePages; page += 1) {
  const route = `/articles/${page}/`;
  routeMap.set(route, {
    url: route,
    changefreq: 'weekly',
    priority: 0.6,
    lastmod: normalizeLastmod(),
  });
}

const routes = [...routeMap.values()].sort((a, b) => {
  if (a.url === '/') return -1;
  if (b.url === '/') return 1;
  return a.url.localeCompare(b.url);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${route.lastmod}</lastmod>
  </url>`).join('\\n')}
</urlset>`;

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${routes[0]?.lastmod || normalizeLastmod()}</lastmod>
  </sitemap>
</sitemapindex>`;

const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), sitemapIndex);
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);

console.log(`Sitemap generated: ${routes.length} routes`);
console.log(`Base URL: ${baseUrl}`);
