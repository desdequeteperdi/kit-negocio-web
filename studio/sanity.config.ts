import { defineConfig, type Template } from 'sanity';
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
  consultaWhatsapp: 'Consulta por WhatsApp',
  reservas: 'Reservas con Google Calendar',
  catalogoAjustes: 'Catálogo: ajustes',
  enlaces: 'Página /enlaces (Link in bio)',
};

const itemUnico = (S: StructureBuilder, id: string) =>
  S.listItem()
    .title(apartados[id] ?? id)
    .id(id)
    .child(S.document().schemaType(id).documentId(id));

const clave = () => globalThis.crypto?.randomUUID?.().slice(0, 12) ?? Math.random().toString(36).slice(2, 14);
const bloque = (text: string, style: 'normal' | 'h2' = 'normal') => ({
  _type: 'block',
  _key: clave(),
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: clave(), text, marks: [] }],
});
const faq = (pregunta: string, respuesta: string) => ({
  _type: 'faq',
  _key: clave(),
  pregunta,
  respuesta,
});

// Plantillas listas al pulsar «+» en Entradas del blog (Initial Value Templates)
const plantillasEntrada: Template[] = [
  {
    id: 'entrada-guia',
    title: 'Guía práctica / Tutorial',
    schemaType: 'entrada',
    value: () => ({
      categoria: 'Guías',
      respuestaDirecta: 'En 40–60 palabras: qué problema resuelve esta guía, para quién es y cuál es el primer paso recomendado.',
      cuerpo: [
        bloque('1. Qué necesitas antes de empezar', 'h2'),
        bloque('Explica brevemente los requisitos previos o materiales necesarios.'),
        bloque('2. Pasos para hacerlo bien', 'h2'),
        bloque('Describe el proceso paso a paso con ejemplos claros de tu negocio.'),
        bloque('3. Errores habituales que conviene evitar', 'h2'),
        bloque('Enumera dos o tres fallos frecuentes y cómo prevenirlos.'),
      ],
      faqs: [
        faq('¿Cuánto tiempo lleva aplicarlo?', 'Escribe aquí una respuesta corta y realista.'),
        faq('¿Qué hago si me surge una duda en el proceso?', 'Indica el canal de contacto o siguiente paso.'),
      ],
    }),
  },
  {
    id: 'entrada-caso',
    title: 'Caso práctico / Antes y después',
    schemaType: 'entrada',
    value: () => ({
      categoria: 'Casos',
      respuestaDirecta: 'En 40–60 palabras: situación inicial del encargo, solución aplicada y aprendizaje o resultado comprobable.',
      cuerpo: [
        bloque('Situación inicial (el problema)', 'h2'),
        bloque('Describe el punto de partida sin inventar datos ni resultados no verificables.'),
        bloque('Qué solución aplicamos', 'h2'),
        bloque('Explica el criterio seguido, materiales o decisiones tomadas.'),
        bloque('Resultado y aprendizaje', 'h2'),
        bloque('Resume qué cambió tras la intervención y para qué tipo de cliente encaja.'),
      ],
      faqs: [
        faq('¿Se puede aplicar en un caso parecido?', 'Explica brevemente en qué condiciones funciona.'),
      ],
    }),
  },
  {
    id: 'entrada-comparativa',
    title: 'Comparativa / Preguntas frecuentes',
    schemaType: 'entrada',
    value: () => ({
      categoria: 'Consejos',
      respuestaDirecta: 'En 40–60 palabras: qué opción conviene elegir según el caso, uso o presupuesto del cliente.',
      cuerpo: [
        bloque('Cuándo elegir cada opción', 'h2'),
        bloque('Compara de forma clara ventajas, límites y casos de uso reales.'),
        bloque('Criterios clave para decidir', 'h2'),
        bloque('Resume los 3 puntos que conviene revisar antes de contratar o comprar.'),
      ],
      faqs: [
        faq('¿Cuál es la opción más recomendable para empezar?', 'Responde de forma directa en 2 o 3 líneas.'),
        faq('¿Qué diferencia hay en coste o mantenimiento?', 'Aclara qué incluye cada alternativa.'),
      ],
    }),
  },
];

// Plantillas listas al pulsar «+» en Páginas y landings de campaña
const plantillasPagina: Template[] = [
  {
    id: 'pagina-corporativa',
    title: 'Subpágina corporativa (Quiénes somos / Equipo)',
    schemaType: 'pagina',
    value: () => ({
      tipo: 'pagina',
      mostrar: true,
      mostrarEnMenu: true,
      orden: 1,
      mostrarContacto: true,
      cuerpo: [
        bloque('Nuestra forma de trabajar', 'h2'),
        bloque('Explica quién está detrás del proyecto, tu experiencia real y en qué zona trabajas.'),
        bloque('Por qué elegirnos', 'h2'),
        bloque('Resume 2 o 3 compromisos comprobables sin exagerar ni inventar cifras.'),
      ],
    }),
  },
  {
    id: 'pagina-landing',
    title: 'Landing de campaña (anuncios o redes)',
    schemaType: 'pagina',
    value: () => ({
      tipo: 'landing',
      mostrar: true,
      mostrarEnMenu: false,
      mostrarContacto: true,
      textoBotonContacto: 'Solicitar información',
      cuerpo: [
        bloque('Qué incluye esta propuesta', 'h2'),
        bloque('Detalla el servicio o promoción concreta de la campaña, para quién es y qué incluye.'),
        bloque('Cómo funciona paso a paso', 'h2'),
        bloque('Explica qué ocurre cuando la persona rellena el formulario o escribe por WhatsApp.'),
      ],
      faqs: [
        faq('¿Tiene algún compromiso pedir información?', 'Aclara cómo respondes y en qué plazo.'),
      ],
    }),
  },
];

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
                    S.divider(),
                    S.documentTypeListItem('pagina').title('Páginas y landings de campaña'),
                    itemUnico(S, 'enlaces'),
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
                    itemUnico(S, 'consultaWhatsapp'),
                    itemUnico(S, 'reservas'),
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
    // Los apartados únicos no se pueden crear ni duplicar; además se añaden plantillas para blog y páginas
    templates: (plantillas) => [
      ...plantillas.filter(({ schemaType }) => !singletons.includes(schemaType)),
      ...plantillasEntrada,
      ...plantillasPagina,
    ],
  },
  document: {
    actions: (acciones, { schemaType }) =>
      singletons.includes(schemaType)
        ? acciones.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : acciones,
  },
});
