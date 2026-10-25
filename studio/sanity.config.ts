import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
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
  buscadores: 'Google y buscadores',
  legal: 'Datos legales',
  blogAjustes: 'Blog: ajustes',
  newsletter: 'Newsletter',
  catalogoAjustes: 'Catálogo: ajustes',
};

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
            ...Object.entries(apartados).map(([id, titulo]) =>
              S.listItem()
                .title(titulo)
                .id(id)
                .child(S.document().schemaType(id).documentId(id)),
            ),
            S.divider(),
            S.documentTypeListItem('servicio').title('Servicios'),
            S.documentTypeListItem('pregunta').title('Preguntas frecuentes'),
            S.documentTypeListItem('categoria').title('Categorías del catálogo'),
            S.documentTypeListItem('producto').title('Productos'),
            S.documentTypeListItem('seccion').title('Secciones extra de la portada'),
            S.documentTypeListItem('entrada').title('Entradas del blog'),
          ]),
    }),
    visionTool(),
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
