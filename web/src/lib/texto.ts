// Convierte los textos largos del panel (párrafos, imágenes, galerías y código HTML) en HTML.
import { toHTML } from '@portabletext/to-html';
import { optimizada } from './imagenes';

const escapa = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Texto del archivo local de ejemplo (negocio.json): una lista de párrafos
export function parrafosAHtml(parrafos: string[]): string {
  return parrafos.map((p) => `<p>${escapa(p)}</p>`).join('\n');
}

export function aHtml(bloques: any[] | null | undefined): string {
  if (!bloques?.length) return '';
  return toHTML(bloques, {
    onMissingComponent: false,
    components: {
      types: {
        bloqueImagen: ({ value }: any) => {
          const url = optimizada(value.url, 'w=1000&auto=format');
          if (!url) return '';
          const pie = value.pie ? `<figcaption>${escapa(value.pie)}</figcaption>` : '';
          return `<figure><img src="${escapa(url)}" alt="${escapa(value.alt ?? '')}" loading="lazy">${pie}</figure>`;
        },
        bloqueGaleria: ({ value }: any) => {
          const imgs = (value.imagenes ?? [])
            .map((img: any) => {
              const url = optimizada(img?.url, 'w=800&auto=format');
              if (!url) return '';
              const pie = img.pie ? `<figcaption>${escapa(img.pie)}</figcaption>` : '';
              return `<figure><img src="${escapa(url)}" alt="${escapa(img.alt ?? '')}" loading="lazy">${pie}</figure>`;
            })
            .filter(Boolean);
          if (!imgs.length) return '';
          const clase = value.disposicion === 'carrusel' ? 'galeria carrusel' : 'galeria galeria-cuadricula';
          return `<div class="${clase}">${imgs.join('')}</div>`;
        },
        // Código HTML pegado por quien edita la web: se publica tal cual
        bloqueHtml: ({ value }: any) => value.codigo ?? '',
      },
    },
  });
}
