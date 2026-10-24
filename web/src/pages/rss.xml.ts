import { getContenido, entradasOrdenadas } from '../lib/contenido';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET({ site }: { site: URL }) {
  const c = await getContenido();
  const base = (site ?? new URL('https://ejemplo.netlify.app')).origin;
  const items = c.blog.mostrar
    ? entradasOrdenadas(c).map((e) => `<item><title>${esc(e.titulo)}</title><link>${base}/blog/${e.slug}</link><guid>${base}/blog/${e.slug}</guid><pubDate>${new Date(e.fecha).toUTCString()}</pubDate><description>${esc(e.resumen)}</description></item>`).join('')
    : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(c.negocio.nombre)}</title><link>${base}</link><description>${esc(c.blog.introduccion)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
