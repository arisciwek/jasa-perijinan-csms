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

// Helper: bangun URL lengkap dari path
export function siteUrl(path = ''): string {
  const base = `https://www.${siteConfig.domain}`;
  return path ? `${base}${path.startsWith('/') ? path : '/' + path}` : base;
}