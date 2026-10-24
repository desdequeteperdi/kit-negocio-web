import { defineField, defineType } from 'sanity';

export const singletons = ['negocio', 'portada', 'sobre', 'contacto', 'buscadores', 'legal', 'blogAjustes'];

const texto = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: 'string', ...extra });
const parrafo = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: 'text', rows: 3, ...extra });
const interruptor = (name: string, title: string, initialValue = true) =>
  defineField({ name, title, type: 'boolean', initialValue });

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

const buscadores = defineType({
  name: 'buscadores', title: 'Google y buscadores', type: 'document',
  fields: [
    texto('titulo', 'Título en Google', { validation: (r) => r.max(70) }),
    parrafo('descripcion', 'Descripción en Google', { validation: (r) => r.max(160) }),
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
    parrafo('resumen', 'Resumen'),
    defineField({ name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true }, fields: [texto('alt', 'Descripción de la imagen')] }),
    defineField({ name: 'cuerpo', title: 'Texto', type: 'array', of: [{ type: 'block' }] }),
  ],
  orderings: [{ title: 'Más recientes', name: 'fecha', by: [{ field: 'fecha', direction: 'desc' }] }],
  preview: { select: { title: 'titulo', subtitle: 'fecha' } },
});

export const schemaTypes = [negocio, portada, sobre, contacto, buscadores, legal, blogAjustes, servicio, pregunta, entrada];
