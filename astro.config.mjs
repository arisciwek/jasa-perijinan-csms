import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const siteUrl = process.env.SITE_URL || 'http://jasa-perijinan-csms.lan';

export default defineConfig({
  site: siteUrl,
  integrations: [
    tailwind()
  ],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});