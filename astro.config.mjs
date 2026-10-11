import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.perijinan-csms.com',
  integrations: [
    tailwind()
  ],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});