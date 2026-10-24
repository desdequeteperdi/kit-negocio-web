// Única puerta de entrada al contenido de la web.
// Si hay un proyecto de Sanity configurado (SANITY_PROJECT_ID), lee de ahí al compilar;
// si no, usa el archivo local src/data/negocio.json (datos de ejemplo).
import { createClient } from '@sanity/client';
import datos from '../data/negocio.json';
import { optimizada } from './imagenes';
import { aHtml, parrafosAHtml } from './texto';

export { optimizada };

// El texto de cada entrada se guarda ya convertido a HTML (cuerpoHtml)
export type Entrada = {
  slug: string; titulo: string; fecha: string; categoria: string; resumen: string; imagen: string; alt: string;
  autor: string; actualizada: string; etiquetas: string[]; faqs: { pregunta: string; respuesta: string }[];
  seoTitulo: string; seoDescripcion: string; cuerpoHtml: string;
};
export type Seccion = { orden: number; lugar: string; titulo: string; html: string };
export type Contenido = Omit<typeof datos, 'blog'> & {
  blog: Omit<typeof datos.blog, 'entradas'> & { entradas: Entrada[] };
  secciones: Seccion[];
};

export const temas: Record<string, { principal: string; oscuro: string; suave: string }> = {
  verde: { principal: '#2f842b', oscuro: '#1b3a1a', suave: '#f0f7ec' },
  azul: { principal: '#1f6fb2', oscuro: '#12304d', suave: '#eaf3fb' },
  terracota: { principal: '#b5532f', oscuro: '#4a2214', suave: '#fbf0ea' },
};

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET ?? 'production';

const consulta = `{
  "negocio": *[_id == "negocio"][0]{nombre, descripcion, telefono, email, whatsapp, zona, tema},
  "portada": *[_id == "portada"][0]{titular, presentacion, textoBoton, "imagen": imagen.asset->url, "alt": imagen.alt},
  "servicios": *[_type == "servicio"] | order(orden asc){orden, nombre, descripcion, precio},
  "sobre": *[_id == "sobre"][0]{mostrar, titulo, texto, puntos},
  "preguntas": *[_type == "pregunta"] | order(orden asc){pregunta, respuesta},
  "contacto": *[_id == "contacto"][0]{texto, mostrarFormulario},
  "newsletter": *[_id == "newsletter"][0]{mostrar, titulo, texto, textoBoton, consentimiento},
  "buscadores": *[_id == "buscadores"][0]{titulo, descripcion, searchConsole, ga4, metaPixel, "imagenCompartir": imagenCompartir.asset->url},
  "legal": *[_id == "legal"][0]{titular, nif, domicilio, plazoConservacion},
  "blogAjustes": *[_id == "blogAjustes"][0]{mostrar, titulo, introduccion},
  "entradas": *[_type == "entrada" && defined(slug.current)] | order(fecha desc){
    "slug": slug.current, titulo, fecha, categoria, resumen, "imagen": imagen.asset->url, "alt": imagen.alt,
    autor, actualizada, etiquetas, faqs[]{pregunta, respuesta}, seoTitulo, seoDescripcion,
    cuerpo[]{..., _type == "bloqueImagen" => {"url": imagen.asset->url}}
  },
  "secciones": *[_type == "seccion" && mostrar != false] | order(orden asc){
    orden, lugar, titulo,
    contenido[]{..., _type == "bloqueImagen" => {"url": imagen.asset->url}}
  }
}`;

// Rellena lo que falte en una entrada para que la web nunca se rompa
function normalizar(e: any, cuerpoHtml: string): Entrada {
  return {
    slug: e.slug, titulo: e.titulo, fecha: e.fecha,
    categoria: e.categoria ?? '', resumen: e.resumen ?? '',
    imagen: optimizada(e.imagen, 'w=800&auto=format'), alt: e.alt ?? '',
    autor: e.autor ?? '', actualizada: e.actualizada ?? '',
    etiquetas: (e.etiquetas ?? []).filter(Boolean),
    faqs: (e.faqs ?? []).filter((f: any) => f?.pregunta && f?.respuesta),
    seoTitulo: e.seoTitulo ?? '', seoDescripcion: e.seoDescripcion ?? '',
    cuerpoHtml,
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
