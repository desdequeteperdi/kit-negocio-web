# Kit de negocio: web de presentación, captación, catálogo y skills de marketing

Base común del curso (`COMM0006` / `IFCT029PO`). Reúne en un solo repositorio la web estática en Astro (`web/`), el panel editable en Sanity (`studio/`), el despliegue en Netlify, la plantilla de memoria del negocio (`plantillas/memoria-negocio.md`) y las **13 skills del curso** listas para usar desde la terminal de Visual Studio Code con **Codex CLI**, **Antigravity CLI** o **Claude Code** (`.agents/skills/` y `.claude/skills/`). El alumnado cambia textos e imágenes desde el panel o trabaja su estrategia en `MEMORIA.md`; no programa.

## Puesta en marcha desde el Día 1 (en Visual Studio Code)

1. **Crear cuenta en GitHub** (`https://github.com`) con tu email personal o del negocio recuperable.
2. **Instalar Node.js LTS (22.12+), Git y Visual Studio Code** (`https://code.visualstudio.com`).
3. **Vincular VS Code a GitHub (sin clave SSH):** desde el icono de **Cuentas** (abajo a la izquierda) → *Iniciar sesión con GitHub*. Al usar HTTPS, no hace falta crear SSH key.
4. **Fork y `git clone`:** haz **Fork** de `https://github.com/desdequeteperdi/kit-negocio-web`, clona tu copia en `C:\proyectos` (Windows, evitando OneDrive) o `~/proyectos` (Mac) y ábrela en VS Code.
5. **Instalar el agente CLI (opcional):** en la terminal integrada de VS Code, instala **Codex CLI** (`npm install -g @openai/codex`), **Claude Code** (`npm install -g @anthropic-ai/claude-code`) o **Antigravity CLI** (`agy`). Las 13 skills ya vienen integradas en `.agents/skills/` y `.claude/skills/`.
6. **Arrancar con un solo mensaje al agente (o a mano):** abre tu agente CLI en la carpeta y dile exactamente:
   > *«Instálame el repo para empezar a construir el proyecto»*
   *(Activa la skill `arrancar-proyecto`: revisa permisos/antivirus/PowerShell en Windows, instala dependencias, pregunta primero si es real o ficticio sin agobiar, pide tu web actual o webs de referencia para sacar colores/CSS y construye la primera versión en `http://localhost:4321`).*
   Si prefieres hacerlo sin agente: ejecuta `npm run diagnosticar`, `npm run instalar`, `npm run empezar` (`http://localhost:4321`) y crea `MEMORIA.md` desde `plantillas/memoria-negocio.md`.

## Guías

- [GUIA-ALTA.md](GUIA-ALTA.md): crear las cuentas (GitHub, Sanity, Netlify), conectar el panel, publicar la web y hacer que se actualice sola.
- [GUIA-MODULOS.md](GUIA-MODULOS.md): funciones opcionales (consulta por WhatsApp + hoja de Google y reservas con Google Calendar).
- [GUIA-PANEL.md](GUIA-PANEL.md): usar el panel día a día.
- [CALENDARIO-EDITORIAL.md](CALENDARIO-EDITORIAL.md): plantilla de calendario semanal y flujo práctico «1 artículo del blog → 3 piezas para redes».
- [CAMBIOS.md](CAMBIOS.md): historial de mejoras del kit y qué pasos extra hay que hacer al actualizar tu fork (`Sync fork` + `git pull`).
- [AGENTS.md](AGENTS.md) *(y [CLAUDE.md](CLAUDE.md))*: mapa técnico y reglas para modificar Astro y Sanity con un agente de código.

## Qué incluye

- **Web:** portada, servicios, «Quiénes somos», preguntas frecuentes y formulario de contacto (Netlify Forms). Las secciones vacías o desactivadas desaparecen sin dejar hueco.
- **Estilo y colores:** tres estilos (Clásico, Moderno, Editorial) y tres colores (verde, azul, terracota), que se combinan. Se eligen en el panel.
- **Redes sociales:** Instagram, YouTube, TikTok, Facebook y una más, en el pie.
- **Opcionales, apagados por defecto:**
  - **Reseñas y perfiles verificados:** bloque en portada con sellos y enlaces directos a perfiles públicos verificables (**Google Maps**, **ProvenExpert**, **Trustpilot**, **LinkedIn**, **Doctoralia**, **Habitissimo**, **TripAdvisor / TheFork** u otros directorios sectoriales), botón opcional para dejar reseña y tarjetas de reseñas reales con enlace a su fuente, sin scripts pesados ni cookies de terceros. Añade además los perfiles a `sameAs` en JSON-LD y a `/llms.txt`.
  - **Blog:** listado, entradas, **categorías** (`/blog/categoria/…`) y **etiquetas** (`/blog/etiqueta/…`), galería de fotos (en el cuerpo o al final de la entrada), bloque «En resumen» para lectura rápida e IA, preguntas frecuentes por entrada, **botones para compartir** (WhatsApp, LinkedIn, X y copiar enlace, sin librerías externas ni cookies), **comentarios moderados** opcionales (con Cusdis) y feed `/rss.xml`.
  - **Newsletter:** formulario con Brevo mediante una función de Netlify.
  - **Catálogo:** categorías y productos, con ficha propia, carrusel en portada y botón «Consultar» que rellena el formulario.
  - **Tienda:** enlaces de pago de Stripe en los productos y página de condiciones de venta (física o digital). Sin carrito.
  - **Consulta por WhatsApp:** formulario que abre WhatsApp con el mensaje escrito y guarda la consulta en una hoja de Google (función de Netlify + Apps Script).
  - **Reservas con Google Calendar:** selector de fecha, duración y horas libres en tiempo real con cálculo automático de precio, creación del evento en Google Calendar y registro en Google Sheets (función de Netlify + Apps Script). Sin cobro, correos de confirmación ni cancelaciones: la reserva queda registrada y el negocio contacta. Apagado por defecto.
  - **Secciones extra** de portada con texto, imágenes, galerías y HTML.
- **SEO y AEO (buscadores y asistentes de IA):** sitemap, `robots.txt`, `/llms.txt` dinámico para asistentes de IA, canónicas, Open Graph y datos estructurados en grafo (`WebSite`, `LocalBusiness` o subtipo de actividad, `OfferCatalog` de servicios, artículos con autor/cargo y resumen directo, productos, migas de pan y `FAQPage` en portada y artículos).
- **Cookies:** banner de consentimiento que aparece solo si hay Google Analytics, Google Tag Manager o píxel de Meta.
- **Legal:** aviso legal, privacidad, y condiciones de venta si hay tienda. Son borradores de partida: identifican necesidades, no certifican cumplimiento.

## Estructura

```text
kit-negocio/
├── .agents/skills/          # 12 skills del curso (Codex CLI y Antigravity CLI)
├── .claude/skills/          # 12 skills del curso (Claude Code)
├── plantillas/              # Plantilla de memoria del negocio (memoria-negocio.md)
├── web/                     # Web pública (Astro)
│   ├── src/data/negocio.json   # Contenido de ejemplo (se usa si no hay Sanity)
│   ├── src/lib/contenido.ts    # Única puerta de entrada al contenido
│   ├── src/components/, layouts/, pages/, styles/
│   └── netlify/functions/      # Funciones serverless (newsletter, WhatsApp, reservas, Meta CAPI)
├── studio/                  # Panel de Sanity (esquemas y menú)
├── modulos/                 # Scripts de Google Apps Script (consulta-whatsapp y reservas)
├── scripts/                 # empezar, configurar, semilla y publicar el panel
├── GUIA-ALTA.md, GUIA-PANEL.md, GUIA-MODULOS.md, CALENDARIO-EDITORIAL.md, CAMBIOS.md, AGENTS.md
└── netlify.toml
```

Sanity decide qué contenido hay; Astro decide cómo se presenta. Los componentes solo leen de `lib/contenido.ts`. Si `SANITY_PROJECT_ID` está definido, la web lee de Sanity; si no, usa `negocio.json`.

## Comandos

Desde la carpeta del kit:

| Comando | Qué hace |
|---|---|
| `npm run diagnosticar` | Comprueba Node, Git, permisos, OneDrive y PowerShell antes de instalar (útil en Windows con antivirus). |
| `npm run empezar` | Instala lo necesario y arranca la web en <http://localhost:4321> (también con doble clic en `empezar.command` o `empezar.bat`). |
| `npm run instalar` | Solo instala las dependencias. |
| `npm run configurar` | Te pregunta el Project ID de Sanity y el nombre de tu panel, escribe `studio/.env` y `web/.env` por ti y ofrece iniciar sesión en Sanity, cargar la semilla y publicar el panel de una vez. |
| `npm run mcp` | *(Opcional, para agentes de código)* Crea `.mcp.json` con los MCPs de **Sanity**, **Netlify** y **Playwright** (sin Google Cloud). |
| `npm run semilla` | Carga el contenido de ejemplo en tu proyecto de Sanity (`-- --reemplazar` sobrescribe lo editado). |
| `npm run publicar-panel` | Publica el panel en `https://<nombre>.sanity.studio`. Hay que repetirlo cuando cambian los campos del panel. |
| `npm run build` | Compila la web en `web/dist`. |
| `npm run auditar` | Revisa el HTML compilado en `web/dist` (accesibilidad, metadatos SEO, `alt`, `h1` y URLs `http://`), válido en Windows y Mac sin dependencias extra. |

Requiere Node 22.12 o superior.

## Variables de entorno

Las lista y explica `web/.env.example` (web) y `studio/.env.example` (panel). En Netlify: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SITE_URL` y, según los módulos opcionales que actives, `BREVO_API_KEY` / `BREVO_LIST_ID` / `BREVO_DOI_TEMPLATE_ID` (newsletter), `APPS_SCRIPT_URL` / `APPS_SCRIPT_TOKEN` (consulta por WhatsApp + hoja), `RESERVAS_SCRIPT_URL` / `RESERVAS_SCRIPT_TOKEN` (reservas con Google Calendar), `META_CAPI_TOKEN` (Meta CAPI) e `INDEXNOW_KEY` (IndexNow). Las claves van solo en Netlify, nunca en el código ni en el panel. Tras cambiar una variable hay que volver a desplegar.

## Pendiente de comprobar

- Límites y precios vigentes de Netlify y Sanity.
- Webhook de Sanity a Netlify (paso 7 de GUIA-ALTA): documentado, pendiente de probar en un alta real.
- Los datos de consultas o clientes nunca van en el contenido público de Sanity.
