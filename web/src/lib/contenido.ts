// Única puerta de entrada al contenido de la web.
// Si hay un proyecto de Sanity configurado (SANITY_PROJECT_ID), lee de ahí al compilar;
// si no, usa el archivo local src/data/negocio.json (datos de ejemplo).
import { createClient } from '@sanity/client';
import datos from '../data/negocio.json';
import { optimizada } from './imagenes';
import { aHtml, parrafosAHtml } from './texto';

export { optimizada };

export type FotoGaleria = { url: string; alt: string; pie: string };

// El texto de cada entrada se guarda ya convertido a HTML (cuerpoHtml)
export type Entrada = {
  slug: string; titulo: string; fecha: string; categoria: string; resumen: string; respuestaDirecta: string;
  imagen: string; alt: string; galeria: FotoGaleria[];
  autor: string; autorRol: string; actualizada: string; etiquetas: string[]; faqs: { pregunta: string; respuesta: string }[];
  comentarios: 'heredar' | 'activados' | 'desactivados';
  seoTitulo: string; seoDescripcion: string; noindex: boolean; cuerpoHtml: string;
};
export type Categoria = { slug: string; nombre: string; descripcion: string; orden: number; imagen: string; alt: string };
export type Producto = {
  slug: string; nombre: string; categoria: string; resumen: string; imagen: string; alt: string;
  precio: number | null; precioTexto: string; enlacePago: string; disponible: boolean; destacado: boolean; orden: number; creado: string;
  descripcionHtml: string;
};
export type Seccion = { orden: number; lugar: string; titulo: string; html: string };
export type Contenido = Omit<typeof datos, 'blog' | 'catalogo'> & {
  blog: Omit<typeof datos.blog, 'entradas'> & { entradas: Entrada[] };
  catalogo: { mostrar: boolean; titulo: string; introduccion: string; textoBoton: string; tienda: boolean; textoBotonPago: string; categorias: Categoria[]; productos: Producto[] };
  secciones: Seccion[];
};

export const temas: Record<string, { principal: string; oscuro: string; suave: string }> = {
  verde: { principal: '#2f842b', oscuro: '#1b3a1a', suave: '#f0f7ec' },
  azul: { principal: '#1f6fb2', oscuro: '#12304d', suave: '#eaf3fb' },
  terracota: { principal: '#b5532f', oscuro: '#4a2214', suave: '#fbf0ea' },
};

export const estilos = ['clasico', 'moderno', 'editorial'];

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET ?? 'production';

const consulta = `{
  "negocio": *[_id == "negocio"][0]{nombre, descripcion, tipoNegocio, telefono, email, whatsapp, zona, horario, tema, estilo, instagram, youtube, tiktok, facebook, otraRedNombre, otraRed},
  "portada": *[_id == "portada"][0]{titular, presentacion, textoBoton, "imagen": imagen.asset->url, "alt": imagen.alt},
  "servicios": *[_type == "servicio"] | order(orden asc){orden, nombre, descripcion, precio},
  "sobre": *[_id == "sobre"][0]{mostrar, titulo, texto, puntos},
  "preguntas": *[_type == "pregunta"] | order(orden asc){pregunta, respuesta},
  "contacto": *[_id == "contacto"][0]{texto, mostrarFormulario},
  "newsletter": *[_id == "newsletter"][0]{mostrar, titulo, texto, textoBoton, consentimiento},
  "buscadores": *[_id == "buscadores"][0]{titulo, descripcion, publicarLlmsTxt, searchConsole, ga4, gtm, metaPixel, "imagenCompartir": imagenCompartir.asset->url},
  "legal": *[_id == "legal"][0]{titular, nif, domicilio, plazoConservacion, tipoVenta, plazoEntrega, devoluciones},
  "catalogoAjustes": *[_id == "catalogoAjustes"][0]{mostrar, titulo, introduccion, textoBoton, tienda, textoBotonPago},
  "categorias": *[_type == "categoria" && defined(slug.current)] | order(orden asc){
    "slug": slug.current, nombre, descripcion, orden, "imagen": imagen.asset->url, "alt": imagen.alt
  },
  "productos": *[_type == "producto" && defined(slug.current) && defined(categoria->slug.current)] | order(orden asc){
    "slug": slug.current, nombre, "categoria": categoria->slug.current, resumen, "imagen": imagen.asset->url, "alt": imagen.alt,
    precio, precioTexto, enlacePago, disponible, destacado, orden, "creado": _createdAt,
    descripcion[]{..., _type == "bloqueImagen" => {"url": imagen.asset->url}, _type == "bloqueGaleria" => {..., imagenes[]{..., "url": asset->url}}}
  },
  "blogAjustes": *[_id == "blogAjustes"][0]{mostrar, titulo, introduccion, comentarios, cusdisId},
  "entradas": *[_type == "entrada" && defined(slug.current)] | order(fecha desc){
    "slug": slug.current, titulo, fecha, categoria, resumen, respuestaDirecta, "imagen": imagen.asset->url, "alt": imagen.alt,
    galeria[]{alt, pie, "url": asset->url},
    autor, autorRol, actualizada, etiquetas, faqs[]{pregunta, respuesta}, comentarios, seoTitulo, seoDescripcion, noindex,
    cuerpo[]{..., _type == "bloqueImagen" => {"url": imagen.asset->url}, _type == "bloqueGaleria" => {..., imagenes[]{..., "url": asset->url}}}
  },
  "secciones": *[_type == "seccion" && mostrar != false] | order(orden asc){
    orden, lugar, titulo,
    contenido[]{..., _type == "bloqueImagen" => {"url": imagen.asset->url}, _type == "bloqueGaleria" => {..., imagenes[]{..., "url": asset->url}}}
  }
}`;

// Rellena lo que falte en una entrada para que la web nunca se rompa
function normalizar(e: any, cuerpoHtml: string): Entrada {
  const modoComentarios = e.comentarios === 'activados' || e.comentarios === 'desactivados' ? e.comentarios : 'heredar';
  return {
    slug: e.slug, titulo: e.titulo, fecha: e.fecha,
    categoria: e.categoria ?? '', resumen: e.resumen ?? '', respuestaDirecta: e.respuestaDirecta ?? '',
    imagen: optimizada(e.imagen, 'w=800&auto=format'), alt: e.alt ?? '',
    galeria: (e.galeria ?? [])
      .map((g: any) => ({ url: optimizada(g?.url, 'w=800&auto=format'), alt: g?.alt ?? '', pie: g?.pie ?? '' }))
      .filter((g: FotoGaleria) => Boolean(g.url)),
    autor: e.autor ?? '', autorRol: e.autorRol ?? '', actualizada: e.actualizada ?? '',
    etiquetas: (e.etiquetas ?? []).filter(Boolean),
    faqs: (e.faqs ?? []).filter((f: any) => f?.pregunta && f?.respuesta),
    comentarios: modoComentarios,
    seoTitulo: e.seoTitulo ?? '', seoDescripcion: e.seoDescripcion ?? '',
    noindex: e.noindex === true,
    cuerpoHtml,
  };
}

// Rellena lo que falte en un producto para que la web nunca se rompa
function normalizarProducto(p: any, descripcionHtml: string): Producto {
  return {
    slug: p.slug, nombre: p.nombre, categoria: p.categoria, resumen: p.resumen ?? '',
    imagen: optimizada(p.imagen, 'w=800&auto=format'), alt: p.alt ?? '',
    precio: typeof p.precio === 'number' ? p.precio : null, precioTexto: p.precioTexto ?? '',
    enlacePago: /^https:\/\//.test(p.enlacePago ?? '') ? p.enlacePago : '',
    disponible: p.disponible !== false, destacado: p.destacado === true, orden: p.orden ?? 1, creado: p.creado ?? '',
    descripcionHtml,
  };
}

// «Terrazas y jardín» -> «terrazas-y-jardin»: dirección de la página de cada etiqueta
export function slugEtiqueta(t: string): string {
  return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function desdeSanity(): Promise<Contenido> {
  const cliente = createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false });
  const r = await cliente.fetch(consulta);
  // Si falta un apartado en el panel, se usa el de ejemplo para que la web nunca se rompa
  return {
    ...datos,
    esEjemplo: false,
    negocio: { ...datos.negocio, ...r.negocio },
    portada: { ...datos.portada, ...r.portada, imagen: r.portada?.imagen ? optimizada(r.portada.imagen, 'w=1000&auto=format') : datos.portada.imagen, alt: r.portada?.alt ?? '' },
    servicios: r.servicios,
    sobre: { ...datos.sobre, ...r.sobre, puntos: r.sobre?.puntos ?? [] },
    preguntas: r.preguntas,
    contacto: { ...datos.contacto, ...r.contacto },
    newsletter: { ...datos.newsletter, ...r.newsletter },
    buscadores: { ...datos.buscadores, ...r.buscadores, imagenCompartir: optimizada(r.buscadores?.imagenCompartir, 'w=1200&h=630&fit=crop&fm=jpg&q=80') },
    legal: { ...datos.legal, ...r.legal },
    catalogo: {
      ...datos.catalogo,
      ...r.catalogoAjustes,
      categorias: (r.categorias ?? []).map((k: any) => ({ ...k, descripcion: k.descripcion ?? '', orden: k.orden ?? 1, imagen: optimizada(k.imagen, 'w=800&auto=format'), alt: k.alt ?? '' })),
      productos: (r.productos ?? []).map(({ descripcion, ...p }: any) => normalizarProducto(p, aHtml(descripcion))),
    },
    blog: {
      ...datos.blog,
      ...r.blogAjustes,
      entradas: r.entradas.map(({ cuerpo, ...e }: any) => normalizar(e, aHtml(cuerpo))),
    },
    secciones: (r.secciones ?? []).map((x: any) => ({ orden: x.orden ?? 1, lugar: x.lugar ?? 'antes-contacto', titulo: x.titulo ?? '', html: aHtml(x.contenido) })),
  } as Contenido;
}

// Datos de ejemplo: los párrafos de negocio.json pasan a HTML y no hay secciones extra
function desdeArchivo(): Contenido {
  return {
    ...datos,
    blog: { ...datos.blog, entradas: datos.blog.entradas.map(({ cuerpo, ...e }) => normalizar(e, parrafosAHtml(cuerpo))) },
    catalogo: { ...datos.catalogo, productos: datos.catalogo.productos.map(({ descripcion, ...p }) => normalizarProducto(p, parrafosAHtml(descripcion))) },
    secciones: [],
  };
}

export async function getContenido(): Promise<Contenido> {
  return projectId ? desdeSanity() : desdeArchivo();
}

// Entradas del blog, de la más reciente a la más antigua.
export function entradasOrdenadas(c: Contenido) {
  return [...c.blog.entradas].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

// Categorías distintas usadas en el blog, con su slug y nombre original.
export function categoriasBlog(c: Contenido): { slug: string; nombre: string }[] {
  const mapa = new Map<string, string>();
  for (const e of entradasOrdenadas(c)) {
    const slug = slugEtiqueta(e.categoria);
    if (slug && !mapa.has(slug)) mapa.set(slug, e.categoria);
  }
  return [...mapa.entries()].map(([slug, nombre]) => ({ slug, nombre }));
}

// Decide si una entrada muestra comentarios según el ajuste de la entrada y el general del blog.
export function comentariosVisibles(c: Contenido, e: Entrada): boolean {
  return e.comentarios === 'activados' || (e.comentarios !== 'desactivados' && Boolean(c.blog.comentarios));
}

// El catálogo solo existe en la web si está activado y tiene al menos un producto con categoría.
export function catalogoVisible(c: Contenido) {
  return c.catalogo.mostrar && productosPublicos(c).length > 0;
}

// Productos cuya categoría existe, ordenados por categoría y por orden.
export function productosPublicos(c: Contenido) {
  const orden = new Map(c.catalogo.categorias.map((k, i) => [k.slug, i]));
  return c.catalogo.productos
    .filter((p) => orden.has(p.categoria))
    .sort((a, b) => orden.get(a.categoria)! - orden.get(b.categoria)! || a.orden - b.orden || b.creado.localeCompare(a.creado));
}

// Para la portada: los marcados como destacados o, si no hay ninguno, los 6 más recientes.
export function productosPortada(c: Contenido) {
  const todos = productosPublicos(c);
  const marcados = todos.filter((p) => p.destacado);
  const lista = marcados.length > 0 ? marcados : [...todos].sort((a, b) => b.creado.localeCompare(a.creado));
  return lista.slice(0, 8);
}

export function precioProducto(p: Producto): string {
  if (p.precioTexto) return p.precioTexto;
  return p.precio === null ? '' : new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(p.precio);
}

// Hay venta online si la tienda está activada y algún producto público tiene enlace de pago
export const hayVenta = (c: Contenido) => catalogoVisible(c) && c.catalogo.tienda === true && productosPublicos(c).some((p) => p.enlacePago);

export const urlProducto = (p: Producto) => `/catalogo/${p.categoria}/${p.slug}`;
export const urlConsulta = (p: Producto) => `/?consulta=${encodeURIComponent(p.nombre)}#contacto`;

// Redes sociales rellenadas en el panel (solo enlaces https), listas para mostrar
export function redesSociales(n: Contenido['negocio']): { nombre: string; url: string }[] {
  const lista = [
    ['Instagram', n.instagram], ['YouTube', n.youtube], ['TikTok', n.tiktok],
    ['Facebook', n.facebook], [n.otraRedNombre || 'Otra red', n.otraRed],
  ] as const;
  return lista.flatMap(([nombre, url]) => (typeof url === 'string' && /^https:\/\//.test(url) ? [{ nombre, url }] : []));
}
