# Kit de negocio: web de presentación y captación

Base común del curso. Web en Astro (estática) con contenido editable, publicada en Netlify. El alumnado cambia contenidos desde un panel; no programa.

## Estado

| Fase | Qué es | Estado |
|---|---|---|
| 1 | Web con negocio ficticio y contenido local | Hecha |
| 2 | Panel de Sanity que edita esa web | Pendiente |
| 3 | Publicación en Netlify con actualización de contenido probada | Pendiente |
| 4 | Copia completa desde cuentas nuevas, probada por alguien que no programe | Pendiente |

## Estructura

```text
kit-negocio/
├── web/                  # Web pública (Astro)
│   └── src/
│       ├── data/negocio.json   # Contenido de ejemplo (en la fase 2 lo sustituye Sanity)
│       ├── lib/contenido.ts    # Única puerta de entrada al contenido
│       ├── components/         # Header, Hero, Services, About, FAQ, Contact, Footer
│       ├── layouts/, pages/    # Portada, aviso legal, privacidad, gracias, 404
│       └── styles/global.css
├── studio/               # Panel de Sanity (fase 2)
└── netlify.toml
```

Sanity decide qué contenido hay; Astro decide cómo se presenta. Los componentes solo leen de `lib/contenido.ts`, así que cambiar de JSON a Sanity no los toca.

## Probarlo en local

Con doble clic en `empezar.command` (Mac) o `empezar.bat` (Windows), o con `npm run empezar`. Instala lo necesario y arranca en <http://localhost:4321>. Guía completa en `../README.md`.

## Qué se puede cambiar

Nombre y datos de contacto, tema de color (`verde`, `azul`, `terracota`), portada, servicios, «Quiénes somos» (se puede ocultar), preguntas frecuentes, formulario (se puede ocultar), título y descripción para buscadores y datos legales. Las secciones vacías o desactivadas desaparecen sin dejar hueco.

## Blog (opcional)

El kit sirve también para blogs. En `negocio.json`, `blog.mostrar` lo activa: aparecen el enlace «Blog», las últimas 3 entradas en la portada, el listado en `/blog`, cada entrada en `/blog/<slug>` y el feed `/rss.xml`. Apagado, no se genera nada. Cada entrada tiene título, slug, fecha, categoría, resumen, imagen y cuerpo (en la fase 2 el cuerpo pasará a texto enriquecido de Sanity).

## Formulario

Usa Netlify Forms: las consultas llegan al panel de Netlify (*Forms*). Hay que probar la recepción tras desplegar.

## Pendiente de decidir o comprobar

- Límites y precios vigentes de Netlify y Sanity (créditos por despliegue, datasets públicos).
- Alta guiada: cuentas de GitHub, Sanity y Netlify a nombre de cada alumno.
- Acción de «Actualizar mi web» (build hook) para publicar un conjunto de cambios.
- Los textos legales son un punto de partida: identifican necesidades, no certifican cumplimiento.
- Los datos de consultas o clientes nunca van en el contenido público de Sanity.
