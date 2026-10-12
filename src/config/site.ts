// Site configuration — edit these values to customize the site.
// Domain is a placeholder; replace with your purchased custom domain.

export const siteConfig = {
  // ── Site identity ──
  siteName: 'Konsultan CSMS',
  siteTagline: 'Solusi Digital Pembuatan Dokumen Keselamatan Kontraktor',

  // ── Domain (placeholder — ganti setelah domain dibeli) ──
  domain: 'perijinan-csms.com',

  // ── Company / PT ──
  companyName: 'Konsultan CSMS',
  companyLegalName: '', // isi jika berupa PT (mis. "PT Cahaya K3 Indonesia")

  // ── Alamat ──
  address: {
    street: 'Graha Sentana Lt. 6 Jl. Hajjah Tutty Alawiyah No. 2,3',
    locality: 'Duren Tiga, Pancoran',
    region: 'Jakarta Selatan',
    postalCode: '12740',
    country: 'ID',
  },

  // ── Kontak ──
  phone: '+62-811-2676071',
  whatsapp: '628112676071', // format internasional tanpa '+'
  email: 'info@perijinan-csms.com',

  // ── Media sosial ──
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
    x: 'https://www.x.com/',
    linkedin: 'https://www.linkedin.com/',
    tiktok: 'https://www.tiktok.com/',
  },

  // ── Branding ──
  logo: '/logo.png',
  ogImage: '/og-image.jpg',
  heroImage: '/hero-image.jpg',

  // ── SEO defaults ──
  defaultTitle: 'Konsultan CSMS - Jasa Pembuatan Dokumen Sistem Manajemen Keselamatan Kontraktor',
  defaultDescription:
    'Konsultan CSMS membantu penyusunan, review, dan digitalisasi dokumen CSMS guna memastikan perusahaan Anda lolos verifikasi principal migas, tambang, dan industri besar. Tim ahli kami memastikan sistem K3LL Anda memenuhi standar skor tertinggi.',

  // ── Locale ──
  language: 'id_ID',
  locale: 'id_ID',

  // ── Jam operasional ──
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },

  // ── Koordinat ──
  geo: {
    latitude: -6.2622,
    longitude: 106.8272,
  },

  // ── Lainnya ──
  priceRange: 'Sesuai konsultasi',
  twitterHandle: 'perijinancsms',
};

// ── Registry layanan (single source of truth) ──
// ID bersifat STABIL: jangan diubah dan jangan dipakai ulang.
// Artikel menghubungkan diri ke layanan lewat `relatedService: <id>` di frontmatter.
export interface Service {
  id: number;
  slug: string;
  href: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  target: string;
}

export const services: Service[] = [
  {
    id: 1,
    slug: 'penyusunan-dokumen-csms',
    href: '/services/penyusunan-dokumen-csms',
    badge: 'Layanan Utama #1',
    title: 'Penyusunan Dokumen CSMS dari Nol',
    description:
      'Bagi perusahaan atau kontraktor yang belum memiliki dokumentasi Sistem Manajemen Keselamatan Kerja dan Lingkungan (K3LL). Kami menyusun seluruh manual, prosedur, safe work practices, dan form pendukung sesuai standar industri migas, tambang, dan konstruksi.',
    features: [
      'Penyusunan 9 Elemen CSMS lengkap',
      'Manual K3LL & Prosedur Operasional Standar (POS)',
      'Jaminan kesesuaian dengan standar principal',
    ],
    cta: 'Pesan Layanan Ini',
    target:
      'Kontraktor baru yang ingin mengikuti tender di perusahaan minyak, gas, tambang, dan manufaktur besar yang mensyaratkan prakualifikasi CSMS.',
  },
  {
    id: 2,
    slug: 'review-gap-analysis-csms',
    href: '/services/review-gap-analysis-csms',
    badge: 'Layanan Utama #2',
    title: 'Review & Gap Analysis CSMS',
    description:
      'Evaluasi mendalam terhadap dokumen CSMS eksisting Anda untuk menemukan celah (gap) ketidaksesuaian dengan standar verifikasi terbaru. Kami memberikan rekomendasi perbaikan terarah agar skor verifikasi Anda meningkat drastis.',
    features: [
      'Audit dokumen existing secara menyeluruh',
      'Laporan Gap Analysis & rekomendasi perbaikan',
      'Optimalisasi skor penilaian prakualifikasi',
    ],
    cta: 'Pesan Layanan Ini',
    target:
      'Kontraktor yang pernah gagal dalam verifikasi CSMS atau ingin memperbarui dokumen lama agar lolos tender berikutnya.',
  },
  {
    id: 3,
    slug: 'pendampingan-verifikasi-audit-hse',
    href: '/services/pendampingan-verifikasi-audit-hse',
    badge: 'Layanan Utama #3',
    title: 'Pendampingan Verifikasi & Audit HSE',
    description:
      'Pendampingan intensif saat auditor principal atau verifikator independen melakukan audit lapangan maupun verifikasi dokumen. Tim kami mendampingi dari sesi pembukaan hingga penutupan audit untuk memastikan kelancaran proses.',
    features: [
      'Simulasi & persiapan audit verifikasi',
      'Pendampingan langsung saat audit principal',
      'Penanganan temuan audit (Corrective Action Plan)',
    ],
    cta: 'Pesan Layanan Ini',
    target:
      'Perusahaan yang akan menghadapi jadwal verifikasi audit lapangan atau verifikasi meja (desk evaluation) oleh principal.',
  },
  {
    id: 4,
    slug: 'digitalisasi-standardisasi-k3ll',
    href: '/services/digitalisasi-standardisasi-k3ll',
    badge: 'Layanan Utama #4',
    title: 'Digitalisasi & Standardisasi K3LL',
    description:
      'Transformasi dokumen fisik K3LL menjadi sistem digital terstandar yang mudah diakses, diperbarui, dan diverifikasi oleh manajemen maupun auditor kapan pun dan di mana pun.',
    features: [
      'Konversi arsip fisik ke format digital terstruktur',
      'Implementasi template pelaporan K3LL',
      'Pelatihan pengoperasian sistem bagi tim internal',
    ],
    cta: 'Pesan Layanan Ini',
    target:
      'Kontraktor modern yang ingin meninggalkan cara manual dan mengadopsi pengelolaan data K3LL berbasis digital.',
  },
];

export const serviceIds: number[] = services.map(s => s.id);

export function getService(id?: number | null): Service | undefined {
  return services.find(s => s.id === id);
}

// Helper: bangun URL lengkap dari path
// Untuk UI/assets di halaman (<img>, dll), gunakan relative path agar selalu aman di .lan, Vercel, dan custom domain.
// Untuk SEO (og:image, canonical, sitemap), gunakan absolute URL dari SITE_URL atau domain.
export function siteUrl(path = '', absolute = false): string {
  if (!absolute) {
    return path ? (path.startsWith('/') ? path : '/' + path) : '/';
  }
  const base = process.env.SITE_URL || `https://www.${siteConfig.domain}`;
  return path ? `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}` : base;
}