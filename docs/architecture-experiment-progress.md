# Catatan Progres Eksperimen Arsitektur Astro

Tanggal pembaruan: 2026-10-14  
Repository: `arisciwek/jasa-perijinan-csms`  
Branch kerja: `experiment/astro-content-blocks`  
Branch pembanding: `main`

## Tujuan

Menguji pola konten Astro dengan alur:

`Markdown frontmatter → Zod content schema → BlockRenderer → komponen Astro per blok`

Eksperimen dilakukan di branch terpisah. Branch `main` dan deployment Vercel tidak diubah oleh pekerjaan ini.

## Yang sudah dikerjakan

### Fondasi dan validasi blok

- Menambahkan `src/content/block-schema.ts` sebagai kontrak bertipe untuk blok konten.
- Menghubungkan skema blok ke collection `pages` dan `articles` di `src/content/config.ts`.
- Mengembangkan `BlockRenderer.astro` untuk memilih komponen berdasarkan tipe blok.
- Menambahkan atau menyempurnakan komponen `QuickAnswer`, `ProcessTimeline`, dan `RequirementChecklist`, termasuk ID bagian dan label aksesibilitas.

### Homepage

Konten homepage sekarang berada di `src/content/pages/home.md`, dan urutan tampilnya bagian dikendalikan oleh urutan `contentBlocks` di frontmatter.

Tipe blok yang dipakai homepage:

- `hero`
- `stats-grid`
- `service-card-grid`
- `image-panel`
- `csms-element-grid`
- `testimonial-grid`
- `call-to-action`
- `latest-articles`

Komponen yang menangani blok tersebut disimpan masing-masing sebagai file di `src/components/blocks/`. `src/pages/index.astro` kini berfungsi terutama sebagai penghubung konten homepage dengan layout.

Catatan: angka statistik dan teks testimoni dipindahkan dari implementasi sebelumnya; pemindahan ini bukan verifikasi bahwa klaim-klaim tersebut benar. Pemilik situs perlu memvalidasi klaim sebelum publikasi.

### Halaman elemen CSMS

- Menambahkan `src/content/pages/csms-elements.md` untuk metadata dan deskripsi sembilan elemen.
- Mengubah `src/pages/csms-elements.astro` agar mengambil metadata dan blok dari collection Markdown.
- Komponen `CsmsElementGrid.astro` memakai registry `csmsElements` di `src/config/site.ts` untuk judul, badge, dan URL, sedangkan deskripsi konten dikelola di frontmatter.

### Aksesibilitas dan SEO teknis

- ID blok diteruskan ke komponen untuk menyediakan anchor yang stabil.
- Heading komponen artikel terbaru menggunakan ID yang dapat ditentukan oleh blok.
- `scripts/generate-sitemap.cjs` disesuaikan untuk menemukan halaman statis dari `src/pages`, menambahkan artikel yang tidak berstatus draft, membuat URL pagination artikel, serta menghasilkan sitemap dan robots.txt.
- `robots.txt` yang dihasilkan mengizinkan crawling dan mencantumkan sitemap.
- Host deployment dari `VERCEL_URL` dinormalisasi menjadi URL HTTPS jika `SITE_URL` tidak ditentukan.

### Halaman layanan, tentang kami, dan kontak

- Menambahkan `src/content/pages/services.md`; halaman `/services` memilih layanan melalui ID pada frontmatter, sementara detail layanan tetap menggunakan registry `src/config/site.ts` sebagai sumber data bersama.
- Mengubah `src/pages/services.astro` agar merender blok direktori layanan.
- Menambahkan `src/content/pages/about.md` dan memindahkan bagian pengenalan, visi-misi, serta keunggulan ke blok `content-section` dan `feature-card-grid`.
- Menambahkan `src/content/pages/contact.md` dan komponen `ContactPanel.astro`.
- Formulir kontak kini menyusun pesan dan membuka WhatsApp; situs tidak mengklaim mengirim data formulir ke server. Data nomor WhatsApp, jam operasional, dan pilihan layanan berada di frontmatter.

## Status validasi

- Perubahan tersimpan sebagai commit terpisah di branch eksperimen.
- Build Astro dan pengujian lokal **belum dijalankan**. Environment pengerjaan tidak berhasil meng-clone repository untuk menjalankan `npm ci` / `npm run build`.
- Karena itu, tidak ada klaim bahwa build, output visual, atau hasil sitemap telah lolos pengujian runtime.
- Sesuai kesepakatan, validasi build lokal dilakukan oleh pemilik repository setelah eksperimen selesai. Vercel tidak diperiksa atau diubah dalam tahap ini.

## Pekerjaan berikutnya

1. Migrasi halaman layanan dan halaman statis lain secara bertahap ke frontmatter serta komponen blok.
2. Menentukan model blok yang cukup fleksibel untuk paragraf, daftar, tabel, dan konten sidebar tanpa memasukkan HTML mentah ke frontmatter.
3. Memeriksa konsistensi data layanan antara Markdown dan registry konfigurasi.
4. Memvalidasi tautan internal, slug, metadata SEO, canonical, sitemap, dan status draft terhadap route yang benar-benar diterbitkan.
5. Memeriksa ulang klaim statistik, testimoni, jaminan kelulusan, dan klaim pengalaman sebelum dipublikasikan.
6. Menjalankan `npm ci`, `npm run build`, dan pemeriksaan visual di lingkungan lokal; memperbaiki masalah berdasarkan hasil aktual.

## Riwayat tahap

| Commit | Pesan |
|---|---|
| `eb498f5` | docs(audit): record Astro architecture baseline |
| `629dde1` | refactor(content): centralize typed block schema |
| `5f5a0d8` | fix(blocks): add unique anchors and accessible labels |
| `7130d48` | refactor(home): move stats section into markdown block |
| `4b03a29` | refactor(home): drive service cards from markdown frontmatter |
| `85da3b0` | fix(home): preserve services anchor from markdown block |
| `fa0d154` | refactor(home): render CSMS element preview from markdown |
| `2bd40e5` | refactor(content): drive CSMS elements page from markdown |
| `ae5a4ce` | fix(content): keep homepage blocks inside frontmatter |
| `74e2115` | refactor(home): move testimonials and CTA into markdown blocks |
| `6b8c4db` | refactor(home): render hero from markdown frontmatter |
| `626d4ba` | fix(home): align layout closing tag and hero block lookup |
| `dbf1767` | refactor(home): move illustration settings into markdown |
| `fffe4c1` | refactor(home): let markdown define section order |
| `105b39d` | refactor(home): define latest articles block in markdown |
| `342d4f5` | fix(a11y): scope latest articles heading to block id |
| `de2e6af` | fix(seo): generate sitemap from published routes |
| `4979d44` | fix(seo): correct sitemap URL and newline handling |
| `aa06632` | refactor(services): drive service directory from markdown |
| `270fd67` | fix(services): narrow registry entries before rendering |
| `fadb43c` | refactor(about): move page content into markdown blocks |
| `4542dcd` | refactor(contact): move contact page into markdown block |
| `f00929f` | chore(pages): remove unused page metadata variables |

Status terakhir diverifikasi pada commit `f00929f`: branch eksperimen 24 commit di depan `main` dan tidak tertinggal commit. Build tetap belum dijalankan; periksa kembali status branch sebelum merge.
