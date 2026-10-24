// Genera studio/semilla.ndjson con el contenido de ejemplo (web/src/data/negocio.json)
// para cargarlo en Sanity:  cd studio && npx sanity dataset import semilla.ndjson production --replace
import { readFileSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

const d = JSON.parse(readFileSync(new URL('../web/src/data/negocio.json', import.meta.url)));
const docs = [];
const unico = (tipo, campos) => docs.push({ _id: tipo, _type: tipo, ...campos });

unico('negocio', d.negocio);
const { imagen, ...portada } = d.portada; // la imagen de ejemplo es un SVG local: se sube desde el panel
unico('portada', portada);
unico('sobre', d.sobre);
unico('contacto', d.contacto);
unico('buscadores', d.buscadores);
unico('legal', d.legal);
unico('blogAjustes', { mostrar: d.blog.mostrar, titulo: d.blog.titulo, introduccion: d.blog.introduccion });

d.servicios.forEach((s, i) => docs.push({ _id: `servicio-${i + 1}`, _type: 'servicio', ...s }));
d.preguntas.forEach((p, i) => docs.push({ _id: `pregunta-${i + 1}`, _type: 'pregunta', orden: i + 1, ...p }));
d.blog.entradas.forEach((e) => {
  const { slug, imagen, cuerpo, faqs, ...resto } = e;
  docs.push({
    _id: `entrada-${slug}`,
    _type: 'entrada',
    ...resto,
    slug: { _type: 'slug', current: slug },
    faqs: faqs.map((f) => ({ _type: 'faq', _key: randomUUID().slice(0, 12), ...f })),
    cuerpo: cuerpo.map((t) => ({
      _type: 'block', _key: randomUUID().slice(0, 12), style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: randomUUID().slice(0, 12), text: t, marks: [] }],
    })),
  });
});

writeFileSync(new URL('../studio/semilla.ndjson', import.meta.url), docs.map((x) => JSON.stringify(x)).join('\n') + '\n');
console.log(`studio/semilla.ndjson: ${docs.length} documentos`);
