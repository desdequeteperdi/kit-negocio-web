// Convierte los textos largos del panel (párrafos, imágenes y código HTML) en HTML.
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
        // Código HTML pegado por quien edita la web: se publica tal cual
        bloqueHtml: ({ value }: any) => value.codigo ?? '',
      },
    },
  });
}
