// Genera /<INDEXNOW_KEY>.txt al compilar solo si está configurada la variable INDEXNOW_KEY en Netlify.
// Permite verificar la propiedad del dominio para el protocolo IndexNow (Bing / Copilot).
import type { APIRoute, GetStaticPaths } from 'astro';

const KEY_RE = /^[a-zA-Z0-9-]{8,128}$/;
const clave = (process.env.INDEXNOW_KEY ?? '').trim();

export const getStaticPaths: GetStaticPaths = () => {
  return KEY_RE.test(clave) ? [{ params: { indexnow: clave } }] : [];
};

export const GET: APIRoute = () => {
  return new Response(clave, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
