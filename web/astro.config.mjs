import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio estático: Astro genera las páginas al compilar y Netlify publica la carpeta dist.
// El dominio sale de SITE_URL (variable de entorno de Netlify); si no existe, usa la URL que
// Netlify asigna al sitio y, en local, una de ejemplo. Se usa en sitemap, canónicas y metadatos.
const site = (process.env.SITE_URL || process.env.URL || 'https://ejemplo.netlify.app').replace(/\/$/, '');

export default defineConfig({
  site,
  integrations: [sitemap({ filter: (url) => !/\/(gracias|404|condiciones)\/?$/.test(url) })],
});
