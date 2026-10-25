import { defineField, defineType } from 'sanity';

export const singletons = ['negocio', 'portada', 'sobre', 'contacto', 'buscadores', 'legal', 'blogAjustes', 'newsletter', 'catalogoAjustes'];

const texto = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: 'string', ...extra });
const parrafo = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: 'text', rows: 3, ...extra });
const interruptor = (name: string, title: string, initialValue = true) =>
  defineField({ name, title, type: 'boolean', initialValue });

// Bloques que se pueden colocar dentro de un texto largo
const bloqueImagen = defineType({
  name: 'bloqueImagen', title: 'Imagen', type: 'object',
  fields: [
    defineField({ name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    texto('alt', 'Descripción de la imagen'),
    texto('pie', 'Pie de foto (opcional)'),
  ],
  preview: { select: { title: 'alt', subtitle: 'pie', media: 'imagen' }, prepare: ({ title, subtitle, media }) => ({ title: title || 'Imagen', subtitle, media }) },
});

const bloqueHtml = defineType({
  name: 'bloqueHtml', title: 'Código HTML', type: 'object',
  fields: [
    defineField({
      name: 'codigo', title: 'Código HTML', type: 'text', rows: 8,
      description: 'Pega aquí el código tal cual (un vídeo de YouTube, un mapa, un botón…). Se publica sin revisar: usa solo código de fuentes de confianza. No pegues scripts de seguimiento (Analytics, píxel de Meta): para eso están los campos de «Google y buscadores», que piden consentimiento de cookies.',
    }),
  ],
  preview: { select: { codigo: 'codigo' }, prepare: ({ codigo }) => ({ title: 'Código HTML', subtitle: (codigo ?? '').slice(0, 60) }) },
});

const textoLibre = (name: string, title: string) =>
  defineField({ name, title, type: 'array', of: [{ type: 'block' }, { type: 'bloqueImagen' }, { type: 'bloqueHtml' }] });

const negocio = defineType({
  name: 'negocio', title: 'Datos del negocio', type: 'document',
  fields: [
    texto('nombre', 'Nombre del negocio', { validation: (r) => r.required() }),
    parrafo('descripcion', 'Descripción corta'),
    texto('telefono', 'Teléfono'),
    texto('email', 'Email'),
    texto('whatsapp', 'WhatsApp (solo números, con prefijo: 34600000000)'),
    texto('zona', 'Zona donde trabajas'),
    defineField({
      name: 'tema', title: 'Colores de la web', type: 'string', initialValue: 'verde',
      options: { list: [{ title: 'Verde', value: 'verde' }, { title: 'Azul', value: 'azul' }, { title: 'Terracota', value: 'terracota' }], layout: 'radio' },
    }),
    defineField({
      name: 'estilo', title: 'Estilo de la web', type: 'string', initialValue: 'clasico',
      description: 'Cambia el diseño completo (tipografía, formas y animaciones). Se combina con los colores.',
      options: {
        list: [
          { title: 'Clásico: sobrio y sin animaciones', value: 'clasico' },
          { title: 'Moderno: titulares grandes, sombras y animaciones suaves', value: 'moderno' },
          { title: 'Editorial: elegante, mucho espacio y tipografía con serifa', value: 'editorial' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: { prepare: () => ({ title: 'Datos del negocio' }) },
});

const portada = defineType({
  name: 'portada', title: 'Portada', type: 'document',
  fields: [
    texto('titular', 'Titular'),
    parrafo('presentacion', 'Presentación'),
    texto('textoBoton', 'Texto del botón'),
    defineField({ name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true }, fields: [texto('alt', 'Descripción de la imagen')] }),
  ],
  preview: { prepare: () => ({ title: 'Portada' }) },
});

const sobre = defineType({
  name: 'sobre', title: 'Quiénes somos', type: 'document',
  fields: [
    interruptor('mostrar', 'Mostrar esta sección'),
    texto('titulo', 'Título'),
    parrafo('texto', 'Texto'),
    defineField({ name: 'puntos', title: 'Puntos destacados', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { prepare: () => ({ title: 'Quiénes somos' }) },
});

const contacto = defineType({
  name: 'contacto', title: 'Contacto', type: 'document',
  fields: [parrafo('texto', 'Texto de invitación'), interruptor('mostrarFormulario', 'Mostrar formulario')],
  preview: { prepare: () => ({ title: 'Contacto' }) },
});

const newsletter = defineType({
  name: 'newsletter', title: 'Newsletter', type: 'document',
  fields: [
    interruptor('mostrar', 'Mostrar el formulario de suscripción', false),
    texto('titulo', 'Título'),
    parrafo('texto', 'Texto de invitación'),
    texto('textoBoton', 'Texto del botón'),
    parrafo('consentimiento', 'Texto de consentimiento', { description: 'Qué recibirá la persona y que puede darse de baja cuando quiera.' }),
  ],
  preview: { prepare: () => ({ title: 'Newsletter' }) },
});

const buscadores = defineType({
  name: 'buscadores', title: 'Google y buscadores', type: 'document',
  fields: [
    texto('titulo', 'Título en Google', { validation: (r) => r.max(70) }),
    parrafo('descripcion', 'Descripción en Google', { validation: (r) => r.max(160) }),
    defineField({
      name: 'imagenCompartir', title: 'Imagen al compartir la web', type: 'image',
      description: 'Se ve al compartir el enlace en WhatsApp, redes o LinkedIn. Mejor horizontal, de 1200 × 630 px. Si la dejas vacía se usa la de la portada.',
    }),
    texto('searchConsole', 'Código de Google Search Console', {
      description: 'Solo el código de verificación (el valor de "content" de la etiqueta meta). Déjalo vacío si no lo usas.',
      validation: (r) => r.regex(/^[\w-]{20,100}$/, { name: 'código' }).warning('Pega solo el código, sin la etiqueta completa'),
    }),
    texto('ga4', 'ID de Google Analytics 4', {
      description: 'Empieza por G- (por ejemplo G-ABC123XYZ9). Si lo rellenas, la web pedirá consentimiento de cookies.',
      validation: (r) => r.regex(/^G-[A-Z0-9]{4,20}$/, { name: 'ID de GA4' }).warning('Debe tener el formato G-XXXXXXXXXX'),
    }),
    texto('metaPixel', 'ID del píxel de Meta', {
      description: 'Solo números (15 o 16 cifras). Si lo rellenas, la web pedirá consentimiento de cookies.',
      validation: (r) => r.regex(/^\d{8,20}$/, { name: 'ID del píxel' }).warning('Debe ser un número, sin letras ni espacios'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Google y buscadores' }) },
});

const legal = defineType({
  name: 'legal', title: 'Datos legales', type: 'document',
  fields: [
    texto('titular', 'Nombre o razón social'),
    texto('nif', 'NIF'),
    texto('domicilio', 'Domicilio'),
    texto('plazoConservacion', 'Plazo de conservación de los datos de contacto'),
  ],
  preview: { prepare: () => ({ title: 'Datos legales' }) },
});

const blogAjustes = defineType({
  name: 'blogAjustes', title: 'Blog: ajustes', type: 'document',
  fields: [interruptor('mostrar', 'Mostrar el blog', false), texto('titulo', 'Título'), parrafo('introduccion', 'Introducción')],
  preview: { prepare: () => ({ title: 'Blog: ajustes' }) },
});

const servicio = defineType({
  name: 'servicio', title: 'Servicio', type: 'document',
  fields: [
    defineField({ name: 'orden', title: 'Orden (1 sale primero)', type: 'number', validation: (r) => r.required().integer().min(1) }),
    texto('nombre', 'Nombre', { validation: (r) => r.required() }),
    parrafo('descripcion', 'Descripción'),
    texto('precio', 'Precio (texto libre)'),
  ],
  orderings: [{ title: 'Orden', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: { select: { title: 'nombre', subtitle: 'precio' } },
});

const pregunta = defineType({
  name: 'pregunta', title: 'Pregunta frecuente', type: 'document',
  fields: [
    defineField({ name: 'orden', title: 'Orden', type: 'number', initialValue: 1 }),
    texto('pregunta', 'Pregunta', { validation: (r) => r.required() }),
    parrafo('respuesta', 'Respuesta'),
  ],
  orderings: [{ title: 'Orden', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: { select: { title: 'pregunta' } },
});

const entrada = defineType({
  name: 'entrada', title: 'Entrada del blog', type: 'document',
  fields: [
    texto('titulo', 'Título', { validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Dirección web', type: 'slug', options: { source: 'titulo', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: 'fecha', title: 'Fecha', type: 'date', validation: (r) => r.required() }),
    texto('categoria', 'Categoría'),
    defineField({
      name: 'etiquetas', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' },
      description: 'Palabras clave de la entrada. Cada etiqueta tiene su propia página en la web (/blog/etiqueta/…).',
    }),
    texto('autor', 'Autor o autora', { description: 'Aparece en la entrada y en los datos para Google. Si lo dejas vacío, se usa el nombre del negocio.' }),
    parrafo('resumen', 'Resumen'),
    defineField({ name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true }, fields: [texto('alt', 'Descripción de la imagen')] }),
    textoLibre('cuerpo', 'Texto'),
    defineField({
      name: 'faqs', title: 'Preguntas frecuentes de esta entrada', type: 'array',
      description: 'Preguntas con respuestas cortas y directas. Se muestran al final de la entrada y se envían a Google y a los asistentes de IA como datos estructurados.',
      of: [{
        type: 'object', name: 'faq', title: 'Pregunta',
        fields: [texto('pregunta', 'Pregunta', { validation: (r) => r.required() }), parrafo('respuesta', 'Respuesta', { validation: (r) => r.required() })],
        preview: { select: { title: 'pregunta', subtitle: 'respuesta' } },
      }],
    }),
    defineField({ name: 'actualizada', title: 'Fecha de última actualización', type: 'date', description: 'Rellénala cuando revises o amplíes la entrada.' }),
    texto('seoTitulo', 'Título en Google (opcional)', { description: 'Si lo dejas vacío se usa el título de la entrada.', validation: (r) => r.max(70) }),
    parrafo('seoDescripcion', 'Descripción en Google (opcional)', { description: 'Si la dejas vacía se usa el resumen.', validation: (r) => r.max(160) }),
  ],
  orderings: [{ title: 'Más recientes', name: 'fecha', by: [{ field: 'fecha', direction: 'desc' }] }],
  preview: { select: { title: 'titulo', subtitle: 'fecha' } },
});

const catalogoAjustes = defineType({
  name: 'catalogoAjustes', title: 'Catálogo: ajustes', type: 'document',
  fields: [
    interruptor('mostrar', 'Mostrar el catálogo', false),
    texto('titulo', 'Título'),
    parrafo('introduccion', 'Introducción'),
    texto('textoBoton', 'Texto del botón de cada producto', { description: 'Lleva al formulario de contacto con el producto ya escrito. Por ejemplo: Consultar, Pedir presupuesto.' }),
  ],
  preview: { prepare: () => ({ title: 'Catálogo: ajustes' }) },
});

const categoria = defineType({
  name: 'categoria', title: 'Categoría del catálogo', type: 'document',
  fields: [
    defineField({ name: 'orden', title: 'Orden (1 sale primero)', type: 'number', initialValue: 1 }),
    texto('nombre', 'Nombre', { validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Dirección web', type: 'slug', options: { source: 'nombre', maxLength: 60 }, validation: (r) => r.required() }),
    parrafo('descripcion', 'Descripción'),
    defineField({ name: 'imagen', title: 'Imagen (opcional)', type: 'image', options: { hotspot: true }, fields: [texto('alt', 'Descripción de la imagen')] }),
  ],
  orderings: [{ title: 'Orden', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: { select: { title: 'nombre', media: 'imagen' } },
});

const producto = defineType({
  name: 'producto', title: 'Producto', type: 'document',
  fields: [
    texto('nombre', 'Nombre', { validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Dirección web', type: 'slug', options: { source: 'nombre', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: 'categoria', title: 'Categoría', type: 'reference', to: [{ type: 'categoria' }], validation: (r) => r.required() }),
    parrafo('resumen', 'Resumen', { description: 'Una o dos frases. Sale en el listado y en Google.' }),
    defineField({ name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true }, fields: [texto('alt', 'Descripción de la imagen')] }),
    defineField({ name: 'precio', title: 'Precio en euros (opcional)', type: 'number', validation: (r) => r.min(0), description: 'Solo el número, por ejemplo 45 o 12.5. Si lo dejas vacío no se muestra precio.' }),
    texto('precioTexto', 'Texto del precio (opcional)', { description: 'Sustituye al precio en pantalla. Por ejemplo: Desde 45 € o 12 € el metro.' }),
    interruptor('disponible', 'Disponible'),
    interruptor('destacado', 'Mostrar en la portada', false),
    defineField({ name: 'orden', title: 'Orden dentro de su categoría (1 sale primero)', type: 'number', initialValue: 1 }),
    textoLibre('descripcion', 'Descripción completa'),
  ],
  orderings: [{ title: 'Orden', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: { select: { title: 'nombre', subtitle: 'resumen', media: 'imagen' } },
});

const seccion = defineType({
  name: 'seccion', title: 'Sección extra de la portada', type: 'document',
  fields: [
    defineField({ name: 'orden', title: 'Orden (1 sale primero)', type: 'number', initialValue: 1 }),
    defineField({
      name: 'lugar', title: 'Dónde aparece', type: 'string', initialValue: 'antes-contacto',
      options: {
        list: [
          { title: 'Después de Servicios', value: 'despues-servicios' },
          { title: 'Después de Quiénes somos', value: 'despues-sobre' },
          { title: 'Antes de Contacto', value: 'antes-contacto' },
        ],
        layout: 'radio',
      },
    }),
    interruptor('mostrar', 'Mostrar esta sección'),
    texto('titulo', 'Título (opcional)'),
    textoLibre('contenido', 'Contenido'),
  ],
  orderings: [{ title: 'Orden', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: { select: { title: 'titulo', subtitle: 'lugar' }, prepare: ({ title, subtitle }) => ({ title: title || 'Sección sin título', subtitle }) },
});

export const schemaTypes = [negocio, portada, sobre, contacto, buscadores, legal, blogAjustes, newsletter, catalogoAjustes, servicio, pregunta, entrada, categoria, producto, seccion, bloqueImagen, bloqueHtml];
