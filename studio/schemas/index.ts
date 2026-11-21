import { defineField, defineType } from 'sanity';

export const singletons = ['negocio', 'portada', 'sobre', 'contacto', 'buscadores', 'legal', 'blogAjustes', 'newsletter', 'consultaWhatsapp', 'catalogoAjustes', 'enlaces'];

const RUTAS_RESERVADAS = new Set(['blog', 'catalogo', 'condiciones', 'aviso-legal', 'privacidad', 'gracias', 'newsletter-gracias', 'newsletter-error', 'enlaces', '404']);

const FORMATOS_IMAGEN = 'image/jpeg,image/png,image/webp';

const texto = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: 'string', ...extra });
const parrafo = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: 'text', rows: 3, ...extra });
const url = (name: string, title: string, description = 'Déjalo vacío para no mostrarla. Empieza por https://') =>
  defineField({ name, title, type: 'url', description, validation: (r) => r.uri({ scheme: ['https'] }) });
const interruptor = (name: string, title: string, initialValue = true, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: 'boolean', initialValue, ...extra });
const altImagen = (extra: Record<string, unknown> = {}) =>
  texto('alt', 'Descripción de la imagen', {
    description: 'Describe qué se ve en la foto para lectores de pantalla y para Google.',
    validation: (r) => r.required().warning('Recomendado para accesibilidad y Google: añade una descripción breve de la imagen'),
    ...extra,
  });

// Bloques que se pueden colocar dentro de un texto largo
const bloqueImagen = defineType({
  name: 'bloqueImagen', title: 'Imagen', type: 'object',
  fields: [
    defineField({ name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true, accept: FORMATOS_IMAGEN }, validation: (r) => r.required() }),
    altImagen(),
    texto('pie', 'Pie de foto (opcional)'),
  ],
  preview: { select: { title: 'alt', subtitle: 'pie', media: 'imagen' }, prepare: ({ title, subtitle, media }) => ({ title: title || 'Imagen', subtitle, media }) },
});

const bloqueGaleria = defineType({
  name: 'bloqueGaleria', title: 'Galería de imágenes', type: 'object',
  fields: [
    defineField({
      name: 'imagenes', title: 'Imágenes', type: 'array',
      description: 'Sube una o varias fotos en JPG, PNG o WebP (puedes editarlas antes en Canva).',
      options: { layout: 'grid' },
      validation: (r) => r.min(1),
      of: [{
        type: 'image',
        options: { hotspot: true, accept: FORMATOS_IMAGEN },
        fields: [altImagen(), texto('pie', 'Pie de foto (opcional)')],
      }],
    }),
    defineField({
      name: 'disposicion', title: 'Cómo se muestra', type: 'string', initialValue: 'cuadricula',
      options: {
        list: [
          { title: 'Cuadrícula de fotos', value: 'cuadricula' },
          { title: 'Carrusel deslizable', value: 'carrusel' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: { imagenes: 'imagenes', disposicion: 'disposicion' },
    prepare: ({ imagenes, disposicion }) => ({
      title: `Galería (${imagenes?.length ?? 0} foto${imagenes?.length === 1 ? '' : 's'})`,
      subtitle: disposicion === 'carrusel' ? 'Carrusel deslizable' : 'Cuadrícula',
      media: imagenes?.[0],
    }),
  },
});

const bloqueHtml = defineType({
  name: 'bloqueHtml', title: 'Código HTML', type: 'object',
  fields: [
    defineField({
      name: 'codigo', title: 'Código HTML', type: 'text', rows: 8,
      description: 'Pega aquí el código tal cual (un vídeo de YouTube, un reproductor de audio, un mapa, una presentación…). Se publica sin revisar: usa solo código de fuentes de confianza. No pegues scripts de seguimiento (Analytics, píxel de Meta): para eso están los campos de «Google, IA y buscadores», que piden consentimiento de cookies.',
    }),
  ],
  preview: { select: { codigo: 'codigo' }, prepare: ({ codigo }) => ({ title: 'Código HTML', subtitle: (codigo ?? '').slice(0, 60) }) },
});

const textoLibre = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: 'array', of: [{ type: 'block' }, { type: 'bloqueImagen' }, { type: 'bloqueGaleria' }, { type: 'bloqueHtml' }], ...extra });

const negocio = defineType({
  name: 'negocio', title: 'Datos del negocio', type: 'document',
  fields: [
    texto('nombre', 'Nombre del negocio', { validation: (r) => r.required() }),
    parrafo('descripcion', 'Descripción corta'),
    defineField({
      name: 'tipoNegocio', title: 'Tipo de actividad (para Google)', type: 'string', initialValue: 'LocalBusiness',
      description: 'Ayuda a buscadores y asistentes de IA a clasificar tu actividad.',
      options: {
        list: [
          { title: 'Negocio local o autónomo (general)', value: 'LocalBusiness' },
          { title: 'Servicios profesionales o consultoría', value: 'ProfessionalService' },
          { title: 'Comercio o tienda', value: 'Store' },
          { title: 'Salud, bienestar o estética', value: 'HealthAndBeautyBusiness' },
          { title: 'Hogar, reformas, instalaciones o jardinería', value: 'HomeAndConstructionBusiness' },
          { title: 'Hostelería o alimentación', value: 'FoodEstablishment' },
        ],
      },
    }),
    texto('telefono', 'Teléfono'),
    texto('email', 'Email'),
    texto('whatsapp', 'WhatsApp (solo números, con prefijo: 34600000000)'),
    texto('zona', 'Zona donde trabajas'),
    texto('horario', 'Horario de atención (opcional)', { description: 'Por ejemplo: Lunes a viernes de 9:30 a 19:00.' }),
    url('instagram', 'Instagram (enlace a tu perfil)'),
    url('youtube', 'YouTube (enlace a tu canal)'),
    url('tiktok', 'TikTok (enlace a tu perfil)'),
    url('facebook', 'Facebook (enlace a tu página)'),
    texto('otraRedNombre', 'Otra red: nombre (LinkedIn, Pinterest…)'),
    url('otraRed', 'Otra red: enlace'),
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
    defineField({ name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true, accept: FORMATOS_IMAGEN }, fields: [altImagen()] }),
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

const consultaWhatsapp = defineType({
  name: 'consultaWhatsapp', title: 'Consulta por WhatsApp', type: 'document',
  fields: [
    interruptor('mostrar', 'Mostrar el formulario de consulta por WhatsApp', false, {
      description: 'Necesita el teléfono de WhatsApp en «Datos del negocio». Los datos se guardan en tu hoja de Google (ver GUIA-MODULOS).',
    }),
    texto('titulo', 'Título'),
    parrafo('texto', 'Texto de invitación'),
    texto('textoBoton', 'Texto del botón'),
    parrafo('consentimiento', 'Texto de consentimiento', { description: 'Avisa de que sus datos se guardan para atender la consulta.' }),
  ],
  preview: { prepare: () => ({ title: 'Consulta por WhatsApp' }) },
});

const buscadores = defineType({
  name: 'buscadores', title: 'Google, IA y buscadores', type: 'document',
  fields: [
    texto('titulo', 'Título en Google', { validation: (r) => r.max(70) }),
    parrafo('descripcion', 'Descripción en Google', { validation: (r) => r.max(160) }),
    defineField({
      name: 'imagenCompartir', title: 'Imagen al compartir la web', type: 'image',
      options: { accept: FORMATOS_IMAGEN },
      description: 'Se ve al compartir el enlace en WhatsApp, redes o LinkedIn. Mejor horizontal, de 1200 × 630 px (JPG, PNG o WebP). Si la dejas vacía se usa la de la portada.',
    }),
    interruptor('publicarLlmsTxt', 'Publicar resumen para asistentes de IA (/llms.txt)', true, {
      description: 'Genera automáticamente /llms.txt con la información de tu negocio, servicios, preguntas frecuentes y artículos para que asistentes de IA (ChatGPT, Claude, Perplexity…) entiendan mejor tu web.',
    }),
    texto('searchConsole', 'Código de Google Search Console', {
      description: 'Solo el código de verificación (el valor de "content" de la etiqueta meta). Déjalo vacío si no lo usas.',
      validation: (r) => r.regex(/^[\w-]{20,100}$/, { name: 'código' }).warning('Pega solo el código, sin la etiqueta completa'),
    }),
    texto('ga4', 'ID de Google Analytics 4', {
      description: 'Empieza por G- (por ejemplo G-ABC123XYZ9). Si lo rellenas, la web pedirá consentimiento de cookies.',
      validation: (r) => r.regex(/^G-[A-Z0-9]{4,20}$/, { name: 'ID de GA4' }).warning('Debe tener el formato G-XXXXXXXXXX'),
    }),
    texto('gtm', 'ID de Google Tag Manager', {
      description: 'Empieza por GTM- (por ejemplo GTM-ABC1234). Si lo rellenas, la web pedirá consentimiento de cookies antes de cargarlo.',
      validation: (r) => r.regex(/^GTM-[A-Z0-9]{4,15}$/, { name: 'ID de GTM' }).warning('Debe tener el formato GTM-XXXXXXX'),
    }),
    texto('metaPixel', 'ID del píxel / Conjunto de datos de Meta', {
      description: 'Número único de 15 o 16 cifras del Administrador de eventos de Meta (Dataset ID). Si lo rellenas, la web pedirá consentimiento de cookies y medirá PageView y Lead en /gracias.',
      validation: (r) => r.regex(/^\d{8,20}$/, { name: 'ID del píxel' }).warning('Debe ser un número, sin letras ni espacios'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Google, IA y buscadores' }) },
});

const legal = defineType({
  name: 'legal', title: 'Datos legales', type: 'document',
  fields: [
    texto('titular', 'Nombre o razón social'),
    texto('nif', 'NIF'),
    texto('domicilio', 'Domicilio'),
    texto('plazoConservacion', 'Plazo de conservación de los datos de contacto'),
    defineField({
      name: 'tipoVenta', title: 'Condiciones de venta: qué vendes', type: 'string', initialValue: 'fisica',
      description: 'Solo se usa si activas la tienda. Cambia el texto de las condiciones de venta.',
      options: { list: [{ title: 'Productos físicos (envío y devoluciones)', value: 'fisica' }, { title: 'Productos digitales (descarga o acceso online)', value: 'digital' }], layout: 'radio' },
    }),
    texto('plazoEntrega', 'Condiciones de venta: plazo de entrega', { description: 'Solo se usa si algún producto tiene enlace de pago. Productos físicos: 3 a 5 días laborables en la península. Digitales: cómo se entrega, por ejemplo «enlace de descarga en la página tras el pago y por email».' }),
    parrafo('devoluciones', 'Condiciones de venta: devoluciones (solo productos físicos)', { description: 'Solo se usa si algún producto tiene enlace de pago. Por ejemplo: 14 días naturales desde la recepción, con el producto sin usar.' }),
  ],
  preview: { prepare: () => ({ title: 'Datos legales' }) },
});

const blogAjustes = defineType({
  name: 'blogAjustes', title: 'Blog: ajustes y comentarios', type: 'document',
  fields: [
    interruptor('mostrar', 'Mostrar el blog', false),
    texto('titulo', 'Título'),
    parrafo('introduccion', 'Introducción'),
    interruptor('comentarios', 'Activar comentarios en las entradas', false, {
      description: 'Activa o desactiva la caja de comentarios por defecto en todas las entradas. También puedes cambiarlo entrada por entrada.',
    }),
    texto('cusdisId', 'ID de Cusdis (para recibir y moderar comentarios)', {
      description: 'Opcional. Crea una cuenta gratuita en cusdis.com, registra tu web y pega aquí el código App ID (data-app-id). Los comentarios quedan pendientes hasta que los apruebes.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Blog: ajustes y comentarios' }) },
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
  groups: [
    { name: 'contenido', title: '1. Artículo', default: true },
    { name: 'organizacion', title: '2. Categoría, etiquetas y fotos' },
    { name: 'seo', title: '3. Google e IA' },
  ],
  fields: [
    texto('titulo', 'Título', { group: 'contenido', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Dirección web', type: 'slug', group: 'contenido', options: { source: 'titulo', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({
      name: 'fecha', title: 'Fecha', type: 'date', group: 'contenido',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    parrafo('resumen', 'Resumen', {
      group: 'contenido',
      description: 'Una o dos frases que aparecen en el listado del blog y como descripción por defecto.',
      validation: (r) => r.required().warning('Recomendado: escribe un resumen claro de 1 o 2 frases'),
    }),
    parrafo('respuestaDirecta', 'En resumen / Respuesta directa (opcional, para IA y lectura rápida)', {
      group: 'contenido', rows: 2,
      description: 'Responde en 40-60 palabras a la pregunta principal del artículo. Se destaca al principio de la entrada y facilita que buscadores y asistentes de IA citen tu artículo.',
      validation: (r) => r.max(320),
    }),
    defineField({
      name: 'imagen', title: 'Imagen principal', type: 'image', group: 'contenido',
      options: { hotspot: true, accept: FORMATOS_IMAGEN },
      description: 'Foto de cabecera de la entrada (JPG, PNG o WebP). Puedes diseñarla o recortarla antes en Canva.',
      fields: [altImagen()],
    }),
    textoLibre('cuerpo', 'Texto del artículo', { group: 'contenido' }),
    defineField({
      name: 'faqs', title: 'Preguntas frecuentes de esta entrada', type: 'array', group: 'contenido',
      description: 'Preguntas con respuestas cortas y directas. Se muestran al final de la entrada y se envían a Google y a los asistentes de IA como datos estructurados.',
      of: [{
        type: 'object', name: 'faq', title: 'Pregunta',
        fields: [texto('pregunta', 'Pregunta', { validation: (r) => r.required() }), parrafo('respuesta', 'Respuesta', { validation: (r) => r.required() })],
        preview: { select: { title: 'pregunta', subtitle: 'respuesta' } },
      }],
    }),
    texto('categoria', 'Categoría', {
      group: 'organizacion',
      description: 'Tema principal de la entrada (por ejemplo: Terrazas, Mantenimiento). Cada categoría genera automáticamente su propia página (/blog/categoria/…).',
    }),
    defineField({
      name: 'etiquetas', title: 'Etiquetas', type: 'array', group: 'organizacion', of: [{ type: 'string' }], options: { layout: 'tags' },
      description: 'Palabras clave de la entrada. Cada etiqueta tiene su propia página en la web (/blog/etiqueta/…).',
    }),
    defineField({
      name: 'galeria', title: 'Galería de fotos de la entrada (opcional)', type: 'array', group: 'organizacion',
      description: 'Sube aquí una o varias fotos adicionales para mostrar en la entrada (puedes editarlas antes en Canva). Si prefieres intercalarlas entre párrafos, usa el botón «+» dentro del Texto del artículo.',
      options: { layout: 'grid' },
      of: [{
        type: 'image',
        options: { hotspot: true, accept: FORMATOS_IMAGEN },
        fields: [altImagen(), texto('pie', 'Pie de foto (opcional)')],
      }],
    }),
    texto('autor', 'Autor o autora', {
      group: 'organizacion',
      description: 'Aparece en la entrada y en los datos para Google. Si lo dejas vacío, se usa el nombre del negocio.',
    }),
    texto('autorRol', 'Cargo o especialidad de quien firma (opcional)', {
      group: 'organizacion',
      description: 'Refuerza la credibilidad ante lectores, Google y asistentes de IA (por ejemplo: «Paisajista en Madrid · 10 años de experiencia»).',
    }),
    defineField({
      name: 'actualizada', title: 'Fecha de última actualización', type: 'date', group: 'organizacion',
      description: 'Rellénala cuando revises o amplíes la entrada.',
    }),
    defineField({
      name: 'comentarios', title: 'Comentarios en esta entrada', type: 'string', group: 'organizacion',
      initialValue: 'heredar',
      options: {
        list: [
          { title: 'Seguir el ajuste general del blog', value: 'heredar' },
          { title: 'Permitir comentarios en esta entrada', value: 'activados' },
          { title: 'Desactivar comentarios en esta entrada', value: 'desactivados' },
        ],
        layout: 'radio',
      },
    }),
    texto('seoTitulo', 'Título en Google (opcional)', {
      group: 'seo',
      description: 'Si lo dejas vacío se usa el título de la entrada.',
      validation: (r) => r.max(70),
    }),
    parrafo('seoDescripcion', 'Descripción en Google (opcional)', {
      group: 'seo',
      description: 'Si la dejas vacía se usa el resumen.',
      validation: (r) => r.max(160),
    }),
    interruptor('noindex', 'Ocultar esta entrada de Google y asistentes de IA', false, {
      group: 'seo',
      description: 'Actívalo si es una prueba de clase y no quieres que aparezca en buscadores ni en /llms.txt.',
    }),
  ],
  orderings: [{ title: 'Más recientes', name: 'fecha', by: [{ field: 'fecha', direction: 'desc' }] }],
  preview: { select: { title: 'titulo', subtitle: 'fecha', media: 'imagen' } },
});

const catalogoAjustes = defineType({
  name: 'catalogoAjustes', title: 'Catálogo: ajustes', type: 'document',
  fields: [
    interruptor('mostrar', 'Mostrar el catálogo', false),
    texto('titulo', 'Título'),
    parrafo('introduccion', 'Introducción'),
    interruptor('tienda', 'Activar la tienda (cobrar con enlaces de pago)', false),
    texto('textoBotonPago', 'Texto del botón de compra', { description: 'Aparece en los productos con enlace de pago. Por ejemplo: Comprar, Pagar ahora.' }),
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
    defineField({ name: 'imagen', title: 'Imagen (opcional)', type: 'image', options: { hotspot: true, accept: FORMATOS_IMAGEN }, fields: [altImagen()] }),
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
    defineField({ name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true, accept: FORMATOS_IMAGEN }, fields: [altImagen()] }),
    defineField({ name: 'precio', title: 'Precio en euros (opcional)', type: 'number', validation: (r) => r.min(0), description: 'Solo el número, por ejemplo 45 o 12.5. Si lo dejas vacío no se muestra precio.' }),
    texto('precioTexto', 'Texto del precio (opcional)', { description: 'Sustituye al precio en pantalla. Por ejemplo: Desde 45 € o 12 € el metro.' }),
    url('enlacePago', 'Enlace de pago (opcional)', 'Solo funciona si activas la tienda en «Catálogo: ajustes». Pega el enlace de pago de Stripe (Payment Link), que empieza por https://buy.stripe.com. Si lo rellenas, el producto muestra el botón de compra. Déjalo vacío para solo consultar.'),
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

const pagina = defineType({
  name: 'pagina', title: 'Página o landing de campaña', type: 'document',
  groups: [
    { name: 'contenido', title: '1. Contenido', default: true },
    { name: 'navegacion', title: '2. Menú y captación' },
    { name: 'seo', title: '3. Google e IA' },
  ],
  fields: [
    texto('titulo', 'Título de la página', { group: 'contenido', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Dirección web', type: 'slug', group: 'contenido',
      options: { source: 'titulo', maxLength: 80 },
      description: 'Será la URL de la página (por ejemplo: quienes-somos o campana-verano).',
      validation: (r) => r.required().custom((val) => {
        const s = val?.current?.trim().toLowerCase() ?? '';
        return RUTAS_RESERVADAS.has(s) ? `La dirección «${s}» está reservada por el sistema; elige otra.` : true;
      }),
    }),
    defineField({
      name: 'tipo', title: 'Tipo de página', type: 'string', group: 'contenido', initialValue: 'pagina',
      options: {
        list: [
          { title: 'Subpágina de la web (Quiénes somos, servicios, información…)', value: 'pagina' },
          { title: 'Landing de campaña (para redes sociales, anuncios o email)', value: 'landing' },
        ],
        layout: 'radio',
      },
    }),
    parrafo('subtitulo', 'Subtítulo o promesa breve (opcional)', {
      group: 'contenido', rows: 2,
      description: 'Se muestra debajo del titular y sirve como descripción por defecto en Google.',
    }),
    defineField({
      name: 'imagen', title: 'Imagen principal (opcional)', type: 'image', group: 'contenido',
      options: { hotspot: true, accept: FORMATOS_IMAGEN },
      description: 'En landings de campaña aparece junto al titular (JPG, PNG o WebP).',
      fields: [altImagen()],
    }),
    textoLibre('cuerpo', 'Contenido de la página', { group: 'contenido' }),
    defineField({
      name: 'faqs', title: 'Preguntas frecuentes (opcional)', type: 'array', group: 'contenido',
      of: [{
        type: 'object', name: 'faqPagina', title: 'Pregunta',
        fields: [texto('pregunta', 'Pregunta', { validation: (r) => r.required() }), parrafo('respuesta', 'Respuesta', { validation: (r) => r.required() })],
        preview: { select: { title: 'pregunta', subtitle: 'respuesta' } },
      }],
    }),
    interruptor('mostrar', 'Publicar esta página', true, {
      group: 'navegacion',
      description: 'Desactívalo para guardarla en borrador sin publicarla en la web.',
    }),
    interruptor('mostrarEnMenu', 'Mostrar enlace en el menú superior', false, {
      group: 'navegacion',
      description: 'Actívalo para subpáginas como «Quiénes somos». Déjalo apagado en landings de campaña.',
    }),
    defineField({ name: 'orden', title: 'Orden en el menú (1 sale primero)', type: 'number', group: 'navegacion', initialValue: 1 }),
    texto('textoMenu', 'Texto corto en el menú (opcional)', {
      group: 'navegacion',
      description: 'Si lo dejas vacío se usa el título de la página.',
    }),
    interruptor('mostrarContacto', 'Mostrar formulario de contacto al final', true, { group: 'navegacion' }),
    texto('textoBotonContacto', 'Texto del botón en cabecera de landing (opcional)', {
      group: 'navegacion',
      description: 'Por ejemplo: «Pedir presupuesto» o «Reservar plaza». Lleva al formulario de la página.',
    }),
    interruptor('mostrarNewsletter', 'Mostrar bloque de newsletter al final', false, {
      group: 'navegacion',
      description: 'Solo se muestra si además tienes activada la Newsletter en el apartado 4.',
    }),
    texto('seoTitulo', 'Título en Google (opcional)', {
      group: 'seo',
      description: 'Si lo dejas vacío se usa el título de la página.',
      validation: (r) => r.max(70),
    }),
    parrafo('seoDescripcion', 'Descripción en Google (opcional)', {
      group: 'seo',
      description: 'Si la dejas vacía se usa el subtítulo.',
      validation: (r) => r.max(160),
    }),
    interruptor('noindex', 'Ocultar de Google y asistentes de IA', false, {
      group: 'seo',
      description: 'Útil para pruebas de clase o landings temporales de anuncios.',
    }),
  ],
  orderings: [{ title: 'Orden', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: {
    select: { title: 'titulo', slug: 'slug.current', tipo: 'tipo', mostrar: 'mostrar', media: 'imagen' },
    prepare: ({ title, slug, tipo, mostrar, media }) => ({
      title,
      subtitle: `${mostrar === false ? 'Oculta · ' : ''}${tipo === 'landing' ? 'Landing' : 'Subpágina'} · /${slug ?? ''}`,
      media,
    }),
  },
});

const enlaces = defineType({
  name: 'enlaces', title: 'Página /enlaces (Link in bio)', type: 'document',
  fields: [
    interruptor('mostrar', 'Activar página /enlaces', false, {
      description: 'Genera la ruta /enlaces para ponerla en tu biografía de Instagram, TikTok o LinkedIn.',
    }),
    texto('titulo', 'Título o nombre público (opcional)', {
      description: 'Si lo dejas vacío se usa el nombre del negocio.',
    }),
    parrafo('bio', 'Presentación breve', {
      rows: 2,
      description: 'Una o dos frases explicando qué haces y a quién ayudas.',
    }),
    defineField({
      name: 'imagen', title: 'Foto o logotipo (opcional)', type: 'image',
      options: { hotspot: true, accept: FORMATOS_IMAGEN },
      fields: [altImagen()],
    }),
    defineField({
      name: 'botones', title: 'Botones de enlace', type: 'array',
      description: 'Añade enlaces a tus landings de campaña, servicios, newsletter o recursos externos.',
      of: [{
        type: 'object', name: 'botonEnlace', title: 'Enlace',
        fields: [
          texto('etiqueta', 'Texto del botón', { validation: (r) => r.required() }),
          texto('url', 'Destino (empieza por / o https://)', {
            description: 'Ejemplo interno: /campana-terrazas o /#contacto. Ejemplo externo: https://...',
            validation: (r) => r.required().custom((v) => {
              const s = (v ?? '').trim();
              return /^(\/|https:\/\/)/.test(s) ? true : 'Debe empezar por / (página de tu web) o https://';
            }),
          }),
          interruptor('destacado', 'Destacar como botón principal', false),
        ],
        preview: { select: { title: 'etiqueta', subtitle: 'url' } },
      }],
    }),
    interruptor('mostrarWhatsapp', 'Mostrar botón directo de WhatsApp (si hay teléfono)', true),
    interruptor('mostrarUltimasEntradas', 'Mostrar últimos artículos del blog (si el blog está activo)', true),
    interruptor('mostrarRedes', 'Mostrar enlaces a tus redes sociales', true),
    interruptor('noindex', 'Ocultar /enlaces de Google', false),
  ],
  preview: { prepare: () => ({ title: 'Página /enlaces (Link in bio)' }) },
});

export const schemaTypes = [negocio, portada, sobre, contacto, buscadores, legal, blogAjustes, newsletter, consultaWhatsapp, catalogoAjustes, servicio, pregunta, entrada, categoria, producto, seccion, pagina, enlaces, bloqueImagen, bloqueGaleria, bloqueHtml];
