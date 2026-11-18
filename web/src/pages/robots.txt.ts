import type { APIRoute } from 'astro';
import { getContenido } from '../lib/contenido';

export const GET: APIRoute = async ({ site }) => {
  const c = await getContenido();
  const llms = c.buscadores.publicarLlmsTxt !== false ? `# Resumen para asistentes de IA: ${new URL('llms.txt', site)}\n` : '';
  return new Response(`User-agent: *\nAllow: /\n\n${llms}Sitemap: ${new URL('sitemap-index.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
