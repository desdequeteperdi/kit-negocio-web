// El CDN de Sanity redimensiona y convierte la imagen al vuelo con parámetros en la URL.
// Así una foto de varios MB subida desde el móvil no llega entera a la web.
export function optimizada(url: string | null | undefined, parametros: string): string {
  if (!url || !url.startsWith('https://cdn.sanity.io/')) return url ?? '';
  return `${url}${url.includes('?') ? '&' : '?'}${parametros}`;
}
