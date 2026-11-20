// Resumen estructurado en Markdown (/llms.txt) para asistentes de IA y motores de respuesta (AEO).
// Se genera automáticamente a partir del contenido del panel si está activado en «Google, IA y buscadores».
import type { APIRoute } from 'astro';
import {
  getContenido,
  entradasOrdenadas,
  catalogoVisible,
  productosPublicos,
  precioProducto,
  urlProducto,
  paginasPublicas,
} from '../lib/contenido';

export const GET: APIRoute = async ({ site }) => {
  const c = await getContenido();
  if (c.buscadores.publicarLlmsTxt === false) {
    return new Response('No disponible\n', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }

  const base = (site ?? new URL('https://ejemplo.netlify.app')).origin;
  const n = c.negocio;
  const lineas: string[] = [
    `# ${n.nombre}`,
    '',
    ...(n.descripcion ? [`> ${n.descripcion}`, ''] : []),
    '## Datos del negocio',
    `- Web: ${base}/`,
    ...(n.zona ? [`- Zona de servicio: ${n.zona}`] : []),
    ...(n.horario ? [`- Horario: ${n.horario}`] : []),
    ...(n.telefono ? [`- Teléfono: ${n.telefono}`] : []),
    ...(n.email ? [`- Email: ${n.email}`] : []),
    '',
  ];

  if (c.servicios.length > 0) {
    lineas.push('## Servicios');
    for (const s of c.servicios) {
      const precio = s.precio ? ` (${s.precio})` : '';
      const desc = s.descripcion ? `: ${s.descripcion}` : '';
      lineas.push(`- **${s.nombre}**${precio}${desc}`);
    }
    lineas.push('');
  }

  if (c.sobre.mostrar && (c.sobre.texto || c.sobre.puntos.length > 0)) {
    lineas.push(`## ${c.sobre.titulo || 'Quiénes somos'}`);
    if (c.sobre.texto) lineas.push(c.sobre.texto);
    for (const p of c.sobre.puntos) lineas.push(`- ${p}`);
    lineas.push('');
  }

  if (c.preguntas.length > 0) {
    lineas.push('## Preguntas frecuentes');
    for (const p of c.preguntas) {
      lineas.push(`- **${p.pregunta}** ${p.respuesta}`);
    }
    lineas.push('');
  }

  const paginas = paginasPublicas(c).filter((p) => !p.noindex);
  if (paginas.length > 0) {
    lineas.push('## Páginas');
    for (const p of paginas) {
      const desc = p.subtitulo ? `: ${p.subtitulo}` : '';
      lineas.push(`- [${p.titulo}](${base}/${p.slug})${desc}`);
    }
    lineas.push('');
  }

  if (c.enlaces.mostrar && !c.enlaces.noindex) {
    lineas.push(`## Enlaces\n- [Página de enlaces](${base}/enlaces): accesos rápidos y redes de ${n.nombre}.\n`);
  }

  const entradas = c.blog.mostrar ? entradasOrdenadas(c).filter((e) => !e.noindex) : [];
  if (entradas.length > 0) {
    lineas.push(`## ${c.blog.titulo || 'Blog'}`);
    for (const e of entradas) {
      const sintesis = e.respuestaDirecta || e.resumen;
      const cat = e.categoria ? ` [${e.categoria}]` : '';
      lineas.push(`- [${e.titulo}](${base}/blog/${e.slug})${cat}: ${sintesis}`);
    }
    lineas.push('');
  }

  if (catalogoVisible(c)) {
    lineas.push(`## ${c.catalogo.titulo || 'Catálogo'}`);
    for (const p of productosPublicos(c)) {
      const precio = precioProducto(p);
      const etqPrecio = precio ? ` (${precio})` : '';
      lineas.push(`- [${p.nombre}](${base}${urlProducto(p)})${etqPrecio}: ${p.resumen}`);
    }
    lineas.push('');
  }

  return new Response(lineas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
