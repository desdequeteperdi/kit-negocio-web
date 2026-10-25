# Kit de negocio: web de presentación, captación y catálogo

Base común del curso. Web estática en Astro con el contenido editable desde un panel de Sanity, publicada en Netlify y con el código en GitHub. El alumnado cambia textos e imágenes desde el panel; no programa.

## Guías

- [GUIA-ALTA.md](GUIA-ALTA.md): crear las cuentas (GitHub, Sanity, Netlify), conectar el panel y publicar la web.
- [GUIA-PANEL.md](GUIA-PANEL.md): usar el panel día a día.

## Qué incluye

- **Web:** portada, servicios, «Quiénes somos», preguntas frecuentes y formulario de contacto (Netlify Forms). Las secciones vacías o desactivadas desaparecen sin dejar hueco.
- **Estilo y colores:** tres estilos (Clásico, Moderno, Editorial) y tres colores (verde, azul, terracota), que se combinan. Se eligen en el panel.
- **Redes sociales:** Instagram, YouTube, TikTok, Facebook y una más, en el pie.
- **Opcionales, apagados por defecto:**
  - **Blog:** listado, entradas, etiquetas, preguntas frecuentes por entrada y feed `/rss.xml`.
  - **Newsletter:** formulario con Brevo mediante una función de Netlify.
  - **Catálogo:** categorías y productos, con ficha propia, carrusel en portada y botón «Consultar» que rellena el formulario.
  - **Tienda:** enlaces de pago de Stripe en los productos y página de condiciones de venta (física o digital). Sin carrito.
  - **Secciones extra** de portada con texto, imágenes y HTML.
- **SEO:** sitemap, `robots.txt`, canónicas, Open Graph y datos estructurados (negocio, artículos, productos, migas de pan y preguntas frecuentes).
- **Cookies:** banner de consentimiento que aparece solo si hay Google Analytics o píxel de Meta.
- **Legal:** aviso legal, privacidad, y condiciones de venta si hay tienda. Son borradores de partida: identifican necesidades, no certifican cumplimiento.

## Estructura

```text
kit-negocio/
├── web/                     # Web pública (Astro)
│   ├── src/data/negocio.json   # Contenido de ejemplo (se usa si no hay Sanity)
│   ├── src/lib/contenido.ts    # Única puerta de entrada al contenido
│   ├── src/components/, layouts/, pages/, styles/
│   └── netlify/functions/      # Suscripción a la newsletter
├── studio/                  # Panel de Sanity (esquemas y menú)
├── scripts/                 # empezar, semilla y publicar el panel
├── GUIA-ALTA.md, GUIA-PANEL.md
└── netlify.toml
```

Sanity decide qué contenido hay; Astro decide cómo se presenta. Los componentes solo leen de `lib/contenido.ts`. Si `SANITY_PROJECT_ID` está definido, la web lee de Sanity; si no, usa `negocio.json`.

## Comandos

Desde la carpeta del kit:

| Comando | Qué hace |
|---|---|
| `npm run empezar` | Instala lo necesario y arranca la web en <http://localhost:4321> (también con doble clic en `empezar.command` o `empezar.bat`). |
| `npm run instalar` | Solo instala las dependencias. |
| `npm run semilla` | Carga el contenido de ejemplo en tu proyecto de Sanity (`-- --reemplazar` sobrescribe lo editado). |
| `npm run publicar-panel` | Publica el panel en `https://<nombre>.sanity.studio`. Hay que repetirlo cuando cambian los campos del panel. |
| `npm run build` | Compila la web en `web/dist`. |

Requiere Node 22.12 o superior.

## Variables de entorno

Las lista y explica `web/.env.example` (web) y `studio/.env.example` (panel). En Netlify: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SITE_URL` y, para la newsletter, `BREVO_API_KEY`, `BREVO_LIST_ID` y `BREVO_DOI_TEMPLATE_ID`. Las claves van solo en Netlify, nunca en el código ni en el panel. Tras cambiar una variable hay que volver a desplegar.

## Pendiente de comprobar

- Límites y precios vigentes de Netlify y Sanity.
- Acción de «Actualizar mi web» (build hook): hoy, tras publicar en el panel, hay que relanzar el despliegue en Netlify.
- Los datos de consultas o clientes nunca van en el contenido público de Sanity.
