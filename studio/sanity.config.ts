import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { esESLocale } from '@sanity/locale-es-es';
import { schemaTypes, singletons } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'REEMPLAZAR';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

// Textos de cada apartado único (una sola ficha cada uno)
const apartados: Record<string, string> = {
  negocio: 'Datos del negocio',
  portada: 'Portada',
  sobre: 'Quiénes somos',
  contacto: 'Contacto',
  buscadores: 'Google, IA y buscadores',
  legal: 'Datos legales',
  blogAjustes: 'Blog: ajustes y comentarios',
  newsletter: 'Newsletter',
  catalogoAjustes: 'Catálogo: ajustes',
};

const itemUnico = (S: StructureBuilder, id: string) =>
  S.listItem()
    .title(apartados[id] ?? id)
    .id(id)
    .child(S.document().schemaType(id).documentId(id));

export default defineConfig({
  name: 'default',
  title: 'Panel de mi web',
  projectId,
  dataset,
  plugins: [
    esESLocale(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Mi web')
          .items([
            S.listItem()
              .title('1. Mi negocio y portada')
              .id('grupo-negocio')
              .child(
                S.list()
                  .title('1. Mi negocio y portada')
                  .items([
                    itemUnico(S, 'negocio'),
                    itemUnico(S, 'portada'),
                    itemUnico(S, 'sobre'),
                    S.divider(),
                    S.documentTypeListItem('servicio').title('Servicios'),
                    S.documentTypeListItem('seccion').title('Secciones extra de la portada'),
                  ]),
              ),
            S.listItem()
              .title('2. Blog')
              .id('grupo-blog')
              .child(
                S.list()
                  .title('2. Blog')
                  .items([
                    itemUnico(S, 'blogAjustes'),
                    S.documentTypeListItem('entrada').title('Entradas del blog'),
                  ]),
              ),
            S.listItem()
              .title('3. Catálogo y tienda')
              .id('grupo-catalogo')
              .child(
                S.list()
                  .title('3. Catálogo y tienda')
                  .items([
                    itemUnico(S, 'catalogoAjustes'),
                    S.documentTypeListItem('categoria').title('Categorías del catálogo'),
                    S.documentTypeListItem('producto').title('Productos'),
                  ]),
              ),
            S.listItem()
              .title('4. Contacto, buscadores y legal')
              .id('grupo-contacto-seo-legal')
              .child(
                S.list()
                  .title('4. Contacto, buscadores y legal')
                  .items([
                    itemUnico(S, 'contacto'),
                    S.documentTypeListItem('pregunta').title('Preguntas frecuentes de la portada'),
                    itemUnico(S, 'newsletter'),
                    S.divider(),
                    itemUnico(S, 'buscadores'),
                    itemUnico(S, 'legal'),
                  ]),
              ),
          ]),
    }),
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],
  schema: {
    types: schemaTypes,
    // Los apartados únicos no se pueden crear ni duplicar
    templates: (plantillas) => plantillas.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (acciones, { schemaType }) =>
      singletons.includes(schemaType)
        ? acciones.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : acciones,
  },
});
