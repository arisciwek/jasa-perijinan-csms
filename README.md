# Jasa Perijinan CSMS

Website konsultan CSMS & perijinan untuk kontraktor sektor migas, tambang, manufaktur, konstruksi, dan petrokimia. Dibangun dengan Astro 3 + TypeScript + Tailwind CSS.

## Tech Stack

- **Framework**: Astro 3 (SSG)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 3
- **Content**: Astro Content Collections (Markdown + frontmatter)
- **Build**: Static site generation → `dist/`
- **Deploy**: Vercel / Nginx (static files)

## Quick Start

```bash
# Install dependencies
npm ci

# Development server
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.astro, Footer.astro
│   ├── SEOMeta.astro, StructuredData.astro
│   ├── RelatedArticles.astro
│   └── blocks/          # 33 content block components
├── content/
│   ├── config.ts        # Zod schemas for collections
│   ├── block-schema.ts  # Content block type definitions
│   ├── articles/        # 13 articles (Markdown + frontmatter)
│   └── pages/           # 18 pages (home, about, services, etc.)
├── layouts/
│   ├── BaseLayout.astro
│   ├── PageLayout.astro
│   └── ArticleLayout.astro
├── pages/
│   ├── index.astro                 # Homepage
│   ├── about.astro
│   ├── contact.astro
│   ├── csms-elements.astro         # 9 elements overview
│   ├── csms-elements/*.astro       # 9 element detail pages
│   ├── services.astro              # Services overview
│   ├── services/*.astro            # 4 service detail pages
│   ├── articles/
│   │   ├── index.astro             # Articles listing + pagination
│   │   ├── [page].astro            # Paginated listing
│   │   └── [slug].astro            # Article detail
│   ├── about.astro
│   └── 404.astro
├── utils/
│   └── related.ts          # Related articles algorithm
└── config/
    └── site.ts             # Site config (services, elements, contacts)

public/
└── images/                 # SVG assets per page
    ├── home/, services/, articles/, csms-elements/
scripts/
├── generate-sitemap.cjs    # Sitemap generation
```

## Content Collections

### Articles (`src/content/articles/`)
13 articles, semua dengan **structured content blocks** + **mid-content CTA**.

Frontmatter schema:
```yaml
---
id: 9                    # numeric ID (optional)
ulid: "01J9Z8Y7X6W5V4U3T2S1R0Q9P9"  # unique identifier
type: "article"
title: "Gap Analysis CSMS Adalah: ..."
description: "Penjelasan lengkap mengenai..."
pubDate: "2026-10-13T08:00:00Z"
updatedDate: "2026-10-13T08:00:00Z"
author: "Tim Konsultan CSMS"
category: "Review & Gap Analysis CSMS"
tags: ["CSMS", "Gap Analysis", "Verifikasi"]
draft: false
image: "/images/articles/gap-analysis-csms.svg"
relatedService: 2
contentBlocks:
  - id: "01K7B8M2Q4R6T9V1W3X5Y7Z8AB"
    type: "quick-answer"
    data:
      title: "Apa itu Gap Analysis CSMS?"
      answer: "Gap Analysis CSMS adalah evaluasi..."
  - id: "01K7B8M2Q4R6T9V1W3X5Y7Z8AE"
    type: "article-lead"
    data:
      text: "Gap Analysis CSMS adalah langkah strategis..."
      label: "Inti pembahasan"
  - id: "01K7B8M2Q4R6T9V1W3X5Y7Z8AF"
    type: "section-header"
    data:
      title: "Pengertian Gap Analysis CSMS..."
      number: 1
      description: "Gap Analysis CSMS merupakan proses..."
  - id: "01K7B8M2Q4R6T9V1W3X5Y7Z8AG"
    type: "content-card"
    data:
      title: "Apa yang Dimaksud dengan Gap Analysis CSMS?"
      items:
        - "Evaluasi mendalam untuk mengukur kepatuhan..."
        - "Berbeda dengan audit formal..."
  - id: "01K7B8M2Q4R6T9V1W3X5Y7Z8B6"
    type: "service-cta"
    data:
      title: "Butuh Pendampingan Gap Analysis CSMS?"
      description: "Tim kami siap melakukan Gap Analysis..."
      label: "Jadwalkan Konsultasi"
      href: "/services/review-gap-analysis-csms"
      note: "Konsultasi awal gratis"
  - id: "01K7B8M2Q4R6T9V1W3X5Y7Z8AC"
    type: "process-timeline"
    data:
      title: "Tahapan Umum Gap Analysis CSMS"
      steps:
        - title: "Pahami persyaratan"
          description: "Identifikasi kriteria CSMS..."
        - title: "Inventarisasi bukti"
          description: "Kumpulkan kebijakan, prosedur..."
---
```

### Pages (`src/content/pages/`)
18 halaman statis (home, about, contact, services, csms-elements, 9 element detail, 4 service detail).

Frontmatter schema:
```yaml
---
type: "page"
title: "9 Elemen Utama Contractor Safety Management System (CSMS)"
description: "Penjelasan 9 elemen CSMS..."
image: "/images/csms-elements/csms-elements.svg"
contentBlocks:
  - id: "csms-element-directory"
    type: "csms-element-grid"
    data:
      title: "Daftar 9 Elemen Utama CSMS"
      elements:
        - id: 1
          title: "Kepemimpinan & Komitmen"
          description: "..."
          href: "/csms-elements/kepemimpinan-komitmen"
---
```

## Content Block Types (33 Types)

### Article-Specific Blocks
| Type | Description | Key Props |
|------|-------------|-----------|
| `quick-answer` | Ringkasan jawaban cepat | `title`, `answer` |
| `article-lead` | Paragraf pembuka artikel | `text`, `label?` |
| `section-header` | Header section dengan nomor | `title`, `number?`, `description?`, `eyebrow?` |
| `content-card` | Card konten dengan bullet items | `title`, `items[]`, `description?`, `variant?` |
| `checklist-card` | Checklist dengan detail per item | `title`, `items[{label, detail?, required?}]`, `note?` |
| `numbered-steps` | Langkah berurutan | `title`, `steps[{title, description}]`, `intro?` |
| `document-list` | Daftar dokumen | `title`, `items[{name, purpose?, mandatory?}]`, `intro?` |
| `comparison-table` | Tabel perbandingan | `title`, `headers[]`, `rows[][]`, `intro?`, `note?` |
| `info-callout` | Kotak info/warning/success | `title`, `text`, `variant?` (info/warning/success) |
| `article-body` | Body artikel terstruktur (sections → subsections) | `introParagraphs[]`, `sections[{title, intro?, subsections[{title, paragraphs[]}]}]` |
| `process-timeline` | Timeline proses | `title`, `steps[{title, description}]` |

### Homepage & Service Blocks
| Type | Description |
|------|-------------|
| `hero` | Hero section dengan eyebrow, title, desc, image |
| `article-hero` | Hero khusus artikel |
| `article-lead` | Lead paragraph dengan label |
| `stats-grid` | Grid statistik (4 kolom) |
| `service-card-grid` | Grid 4 layanan |
| `service-detail` | Detail layanan lengkap |
| `service-directory` | Daftar layanan |
| `service-cta` | CTA ke layanan (mid-content) |
| `testimonial-grid` | Grid testimoni |
| `feature-card-grid` | Grid fitur |
| `content-section` | Section dengan title + paragraphs |
| `csms-element-grid` | Grid 9 elemen CSMS |
| `element-detail` | Detail elemen CSMS |
| `image-panel` | Panel gambar |
| `call-to-action` | CTA umum |
| `contact-panel` | Panel kontak |
| `latest-articles` / `latest-articles-block` | Artikel terbaru |
| `section-header` | Header section dengan nomor |

### Specialized Blocks
| Type | Description |
|------|-------------|
| `requirement-checklist` | Checklist persyaratan dengan disclaimer |
| `document-list` | Daftar dokumen dengan purpose |
| `comparison-table` | Tabel perbandingan |
| `info-callout` | Info/warning/success box |
| `numbered-steps` | Langkah bernomor |

## Article Layout Features

### TOC (Table of Contents)
- Otomatis dibangun dari content blocks: `section-header`, `article-body`, `process-timeline`
- Depth 2 (section) + Depth 3 (subsection)
- Smooth scroll ke heading ID

### Sticky Sidebar
- **Left**: Table of Contents, Layanan Terkait, Penulis
- **Position**: `lg:sticky lg:top-24 lg:self-start`
- **Scrollable wrapper**: `max-h-[calc(100vh-260px)] overflow-y-auto`
- Parent grid: `min-h-[calc(100vh-200px)]` untuk enable sticky

### Related Content
- **Related Articles**: 3 artikel (prioritas: same service → same category → latest)
- **Related Service**: 1 service berdasarkan `relatedService` frontmatter

### CTA Mid-Content
- `service-cta` block disisipkan di tengah artikel (antara section)
- Link ke service yang relevan

## Domain & Deployment

### Multi-Environment
| Env | Domain | SITE_URL |
|-----|--------|----------|
| Local | `jasa-perijinan-csms.lan` | `http://jasa-perijinan-csms.lan` |
| Preview | Vercel `.app` | Auto |
| Production | `perijinan-csms.com` | `https://www.perijinan-csms.com` |

### Asset Strategy
- **UI Assets** (`<img>`, links): Relative paths (`/images/...`)
- **SEO Metadata** (canonical, OG, sitemap): Absolute URLs via `siteUrl(path, true)`

### Nginx Config
```nginx
server {
    server_name jasa-perijinan-csms.lan;
    root /www/wwwroot/jasa-perijinan-csms/dist;
    # static file serving, no SSR
}
```

## Commands

```bash
npm run dev      # Dev server (localhost:4321)
npm run build    # Build static → dist/
npm run preview  # Preview dist/ locally
```

## Content Management

### Adding New Article
1. Create `.md` di `src/content/articles/`
2. Frontmatter wajib: `id`, `type: "article"`, `title`, `description`, `pubDate`, `relatedService`
3. Gunakan `contentBlocks` untuk struktur konten
4. Sisipkan `service-cta` di tengah artikel

### Adding New Page
1. Create `.md` di `src/content/pages/`
2. Frontmatter: `type: "page"`, `title`, `contentBlocks`
3. Page akan otomatis ter-render via `src/pages/[slug].astro` (butuh route manual atau dynamic)

### Adding New Block Type
1. Buat component di `src/components/blocks/NewBlock.astro`
2. Tambah schema di `src/content/block-schema.ts`
3. Register di `src/components/blocks/BlockRenderer.astro`

## SEO & Structured Data

- **SEOMeta.astro**: Title, description, OG, Twitter Card, canonical
- **StructuredData.astro**: JSON-LD (LocalBusiness, WebPage, Article, BreadcrumbList)
- **Sitemap**: Auto-generated via `scripts/generate-sitemap.cjs`
- **Robots.txt**: Auto-generated

## Related Articles Algorithm

`src/utils/related.ts`:
1. Same service (`relatedService`) → max 3
2. Same category → fill remaining
3. Latest by `pubDate` → fill remaining
4. Max 3 total

## Performance

- Static generation (no SSR)
- Minimal JS (only interactive components)
- Optimized images (SVG)
- Preconnect fonts
- Minified CSS/JS

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Focus states visible
- Color contrast (WCAG AA)
- Heading hierarchy (h1 → h2 → h3)
- Alt text on all images

## Development Notes

- **TypeScript strict**: `tsconfig.json` strict mode
- **Content validation**: Zod schemas in `config.ts`
- **Hot reload**: Astro dev server
- **Content Collections**: Type-safe content access

## License

MIT