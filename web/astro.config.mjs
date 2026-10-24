import { defineConfig } from 'astro/config';

// Sitio estático: Astro genera las páginas al compilar y Netlify publica la carpeta dist.
export default defineConfig({
  // Cambia por el dominio real al publicar (se usa en sitemap y metadatos)
  site: 'https://ejemplo.netlify.app',
});
