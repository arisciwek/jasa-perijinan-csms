# Audit Baseline Arsitektur Astro — Konsultan CSMS

Tanggal pemeriksaan: 2026-10-13  
Repository: `arisciwek/jasa-perijinan-csms`  
Branch kerja: `experiment/astro-content-blocks`  
Commit baseline: `e07fd98f5ec7e154812d38fe3a589dd27aa7f680`

## 1. Tujuan

Dokumen ini mencatat kondisi awal berdasarkan file yang dapat diperiksa pada repository. Ini menjadi baseline untuk refactoring bertahap menuju arsitektur yang memisahkan konten (frontmatter/Markdown atau data collection) dari presentasi (komponen Astro).

Audit ini bukan klaim bahwa seluruh halaman telah diuji secara visual atau semua aspek production telah diverifikasi.

## 2. Inventaris awal

Dari recursive Git tree pada commit baseline:

- 91 file repository terinventarisasi.
- 38 file berekstensi `.astro`.
- 22 file di `src/pages/`.
- 14 path di `src/content/`, termasuk schema dan 13 artikel Markdown.
- 13 artikel Markdown di `src/content/articles/`.

Kategori halaman pada `src/pages/`:

- Beranda.
- Halaman daftar dan detail artikel.
- Halaman layanan dan empat halaman detail layanan.
- Halaman daftar dan sembilan halaman detail elemen CSMS.
- About, contact, dan 404.

## 3. Kondisi yang sudah tersedia

1. Astro 3, TypeScript, Tailwind CSS, dan static site generation.
2. Content collections untuk `articles`, `pages`, `categories`, dan `authors` di `src/content/config.ts`.
3. Schema artikel sudah mendukung `contentBlocks` opsional.
4. Tiga jenis block awal terdaftar: `quick-answer`, `process-timeline`, dan `requirement-checklist`.
5. Halaman artikel dinamis menggunakan `BlockRenderer.astro` ketika `contentBlocks` tersedia.
6. Data layanan dan elemen CSMS memiliki registry di `src/config/site.ts`.
7. Beranda mengambil tiga artikel terbaru yang tidak berstatus draft.
8. Metadata dan structured data sudah memiliki komponen bersama.

## 4. Temuan dan risiko awal

### A. Kontrak block baru mencakup artikel

Schema `articleSchema` memiliki `contentBlocks`, sedangkan `pageSchema` belum memiliki field untuk block. Halaman layanan, beranda, halaman umum, dan halaman elemen CSMS masih perlu kontrak konten yang jelas sebelum dimigrasikan.

### B. Renderer belum cukup ketat

`BlockRenderer.astro` menggunakan tipe `Record<string, any>` dan mengabaikan tipe block yang tidak dikenal dengan mengembalikan `null`. Ini berisiko menyembunyikan kesalahan penulisan tipe block. Pada tahap arsitektur, registry dan validasi harus diselaraskan dengan schema agar data invalid terdeteksi lebih awal.

### C. Beranda masih banyak berisi konten langsung di template

`src/pages/index.astro` memuat beberapa section panjang, termasuk statistik, kartu layanan, preview elemen CSMS, testimoni, dan CTA. Konten seperti ini perlu dipindahkan secara bertahap ke data/frontmatter dan komponen khusus. Migrasi harus menjaga isi dan URL yang sudah ada, serta tidak mempertahankan klaim statistik/testimoni tanpa verifikasi pemilik situs.

### D. Data elemen CSMS berpotensi duplikatif

`src/pages/csms-elements.astro` mendeklarasikan array elemen di dalam halaman, sementara registry elemen CSMS juga ada di `src/config/site.ts`. Sumber data perlu disatukan agar judul, slug, URL, dan ID tidak berbeda antarhalaman.

### E. Sitemap berisi daftar route statis

`scripts/generate-sitemap.cjs` menggunakan daftar route yang ditulis langsung di file. Pola ini perlu dibandingkan dengan halaman yang benar-benar dipublikasikan, collection, draft, dan URL hasil build agar route baru tidak terlupakan dan route lama tidak tertinggal.

### F. Dokumentasi yang dirujuk instruksi proyek tidak ditemukan pada jalur yang disebutkan

`AGENTS.md` menyebut `docs/PRD.md` dan `docs/PLAN.md`, tetapi keduanya tidak ditemukan pada branch saat pemeriksaan. Perlu dipastikan apakah dokumen dipindahkan/dihapus atau perlu dibuat kembali berdasarkan sumber yang valid. Audit ini tidak mengarang isi dokumen tersebut.

### G. Baseline build perlu dibedakan dari pengujian lokal

Status commit baseline pada GitHub menunjukkan status Vercel `success` dengan deskripsi `Deployment has completed`. Ini adalah bukti status deployment untuk baseline, bukan bukti bahwa build lokal telah dijalankan dalam sesi audit ini. Akses jaringan dari lingkungan kerja ini tidak dapat meng-clone repository secara langsung, sehingga pengujian lokal belum dilakukan.

## 5. Prinsip desain yang direkomendasikan

1. Frontmatter/Markdown atau data collection menjadi sumber konten; komponen Astro menjadi lapisan presentasi.
2. Setiap block mempunyai file komponen Astro tersendiri dan kontrak data yang eksplisit.
3. Gunakan schema validasi untuk data block dan hindari `any` bila tipe dapat didefinisikan.
4. Pertahankan kompatibilitas artikel yang belum bermigrasi selama transisi.
5. Jangan memindahkan semua teks panjang menjadi objek YAML jika Markdown lebih sesuai.
6. Gunakan satu sumber data untuk layanan dan elemen CSMS.
7. Jaga URL, metadata SEO, relasi internal, dan aturan draft selama migrasi.
8. Migrasikan dalam kelompok kecil dengan commit terpisah.
9. Setiap perubahan kode harus disertai build dan pemeriksaan regresi yang dapat dibuktikan sebelum dinyatakan selesai.

## 6. Rencana tahap

- Tahap 0: audit baseline dan inventaris (dokumen ini).
- Tahap 1: perjelas kontrak schema, tipe block, dan registry.
- Tahap 2: perkuat renderer dan komponen block.
- Tahap 3: migrasi beranda.
- Tahap 4: migrasi halaman layanan dan elemen CSMS.
- Tahap 5: migrasi halaman umum dan standarisasi artikel.
- Tahap 6: rekonsiliasi SEO teknis, internal linking, dan sitemap.
- Tahap 7: pengujian produksi, aksesibilitas, performa, dan regresi.

Setiap tahap dapat dipecah lagi apabila ruang lingkupnya terlalu besar. Perubahan kode tidak boleh dicampur ke dalam satu commit besar lintas tahap.
