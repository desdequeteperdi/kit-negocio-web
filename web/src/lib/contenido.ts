// Única puerta de entrada al contenido de la web.
// Si hay un proyecto de Sanity configurado (SANITY_PROJECT_ID), lee de ahí al compilar;
// si no, usa el archivo local src/data/negocio.json (datos de ejemplo).
import { createClient } from '@sanity/client';
import datos from '../data/negocio.json';

export type Contenido = typeof datos;

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
  "buscadores": *[_id == "buscadores"][0]{titulo, descripcion, searchConsole, ga4, metaPixel, "imagenCompartir": imagenCompartir.asset->url},
  "legal": *[_id == "legal"][0]{titular, nif, domicilio, plazoConservacion},
  "blogAjustes": *[_id == "blogAjustes"][0]{mostrar, titulo, introduccion},
  "entradas": *[_type == "entrada" && defined(slug.current)] | order(fecha desc){
    "slug": slug.current, titulo, fecha, categoria, resumen, "imagen": imagen.asset->url, "alt": imagen.alt,
    "cuerpo": cuerpo[_type == "block"]{"texto": pt::text(@)}.texto
  }
}`;

// El CDN de Sanity redimensiona y convierte la imagen al vuelo con parámetros en la URL.
// Así una foto de varios MB subida desde el móvil no llega entera a la web.
export function optimizada(url: string | null | undefined, parametros: string): string {
  if (!url || !url.startsWith('https://cdn.sanity.io/')) return url ?? '';
  return `${url}${url.includes('?') ? '&' : '?'}${parametros}`;
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
    buscadores: { ...datos.buscadores, ...r.buscadores, imagenCompartir: optimizada(r.buscadores?.imagenCompartir, 'w=1200&h=630&fit=crop&fm=jpg&q=80') },
    legal: { ...datos.legal, ...r.legal },
    blog: {
      ...datos.blog,
      ...r.blogAjustes,
      entradas: r.entradas.map((e: any) => ({ ...e, categoria: e.categoria ?? '', resumen: e.resumen ?? '', imagen: optimizada(e.imagen, 'w=800&auto=format'), alt: e.alt ?? '', cuerpo: e.cuerpo ?? [] })),
    },
  } as Contenido;
}

export async function getContenido(): Promise<Contenido> {
  return projectId ? desdeSanity() : datos;
}

// Entradas del blog, de la más reciente a la más antigua.
export function entradasOrdenadas(c: Contenido) {
  return [...c.blog.entradas].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
