# AGENTS.md — Jasa Perijinan CSMS

## Project
Situs konsultan CSMS & perijinan (perijinan-csms.com). Astro statis + Tailwind CSS.

## Stack
- Astro ^3.0.0 (SSG)
- Tailwind CSS ^3.0.0
- TypeScript strict
- Node.js CLI (npm)

## Commands
```bash
npm run dev      # dev server
npm run build    # static build → dist/
npm run preview  # preview build
```

## Structure
```
src/
  pages/         # halaman statis (.astro)
  layouts/       # BaseLayout.astro (shared shell)
  components/    # SEOMeta, StructuredData, reusable
docs/            # PRD.md (arsitektur), PLAN.md (spesifik situs)
```

## Domain & Asset Conventions
- **UI Assets (`<img>`, links)**: Gunakan relative path (`/images/...`) agar kompatibel di `.lan`, Vercel `.app`, dan production.
- **SEO Metadata (Canonical, Open Graph, Sitemap)**: Gunakan helper `siteUrl(path, true)` yang membaca `process.env.SITE_URL` untuk absolute URL.
- **Config**: `astro.config.mjs` membaca `SITE_URL` dengan fallback ke `http://jasa-perijinan-csms.lan`.
- **Runtime vs Canonical Domain**: Pisahkan *runtime domain* (hostname request via `Astro.url`) dari *canonical domain* (SEO, sitemap, OG image). Canonical selalu dari `SITE_URL` env var. Jangan gunakan preview domain Vercel sebagai canonical production.
- **Semantic Classes**: Gunakan kelas semantik (`section`, `article`, `header`, `footer`, dan kelas deskriptif seperti `service-card`, `service-content`, `service-media`) pada struktur halaman utama agar mudah dimodifikasi dan penempatan aset/gambar tertata rapi.
- Bahasa Indonesia untuk semua konten pengguna.
- Relatif URL (`/slug/`) untuk internal link.
- Metadata SEO: title, description, Open Graph, Twitter Card, JSON-LD.
- Tailwarn color `primary` = blue (#3b82f6). Gunakan kelas Tailwind, jangan inline style.
- Aksesibilitas dasar: semantic HTML, alt teks, focus states.
- Draft tidak dipublikasikan (future-proof, saat ini semua statis).

## Configuration
- Semua domain, brand, kontak, dan konfigurasi situs dideklarasikan di `src/config/site.ts` (single source of truth).
- Di file `.astro`, gunakan `import { siteConfig, siteUrl }` untuk mengakses konfigurasi. Jangan hardcoded domain atau data situs.
- File statis yang tidak bisa menggunakan TypeScript (`public/robots.txt`, `public/sitemap.xml`, `astro.config.mjs`) harus diupdate secara manual saat domain berubah.

## Content Governance
- `docs/PRD.md` = arsitektur konten (registry, workflow engine) — tidak diterapkan untuk situs layanan.
- `docs/PLAN.md` = spesifik situs CSMS — acuan utama untuk halaman & konten.
- Konten statis: home, about, services, csms-elements, contact, 404.
- Tambah halaman baru: file .astro di `src/pages/`, gunakan BaseLayout, atur SEO.
- **Setiap konten baru (page, article, csms-element, service) WAJIB ditambahkan ke `scripts/generate-sitemap.cjs` agar terindeks di sitemap.xml.**

## Related Content (Artikel ↔ Layanan)
- Registry layanan (ID, slug, href, judul) berada di `src/config/site.ts` → `services`. ID **stabil** — jangan diubah/dipakai ulang.
- Artikel menghubungkan diri ke layanan lewat frontmatter: `relatedService: <id>` (angka, contoh `1`). Nilai divalidasi schema — ID salah membuat build gagal.
- Tambah layanan baru: tambahkan entry di `services` (ID = terbesar + 1), buat halaman `src/pages/services/<slug>.astro` dengan prop `serviceId={<id>}`, tambahkan ke sitemap.
- Kartu "Layanan Terkait" (halaman artikel) dan "Artikel Terkait" (halaman layanan) dihitung otomatis dari `relatedService` — jangan hardcoded daftar artikel.
- Artikel terkait diprioritaskan: satu layanan → satu kategori → terbaru (maks 3), via `src/utils/related.ts`.

## Principles
- Minimal & tuntas. YAGNI. Tidak ada boilerplate untuk fitur yang belum ada.
- Edit non-destruktif. Jangan commit tanpa build success.
- Gunakan ulang komponen yang ada. Jangan re-implementasi pola yang sudah ada.
- Validasi build sebelum deploy.