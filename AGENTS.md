# Instrucciones para agentes de código y marketing (`kit-negocio`)

Este repositorio es la base unificada del curso (`COMM0006` / `IFCT029PO`): integra las **12 skills de marketing del curso**, la plantilla de memoria del negocio (`plantillas/memoria-negocio.md`) y la web estática en **Astro** (`web/`) conectada a un panel de contenidos en **Sanity Studio** (`studio/`) y desplegada en **Netlify**.

## 0. Protocolo de primer arranque y skills de marketing

- **Disparador de arranque inicial:** si el usuario pide *"Instálame el repo para empezar a construir el proyecto"*, *"instálame el repo"*, *"arranca el proyecto"* o reporta errores de `npm` / permisos / antivirus al empezar, sigue obligatoriamente la skill **`arrancar-proyecto`** (`.agents/skills/arrancar-proyecto/SKILL.md` o `.claude/skills/arrancar-proyecto/SKILL.md`):
  1. Ejecuta `node scripts/diagnostico.mjs`, resuelve bloqueos de Windows/antivirus/OneDrive/PowerShell/Mac y ejecuta `npm run instalar`.
  2. **Pregunta #1 obligatoria y sin abrumar:** pregunta primero **solo** si el proyecto es **real o ficticio/de ejemplo** (en proyectos ficticios o arranque inicial, evita cuestionarios largos).
  3. **Diseño y tokens CSS:** pregunta si tiene **web propia o webs de referencia** para extraer paleta, tipografía y tokens CSS (`web/src/styles/` + `web/src/data/negocio.json`) y construir la primera versión visible en `http://localhost:4321`.
- **Dónde están las skills (13 en total):**
  - `.agents/skills/` *(descubrimiento automático en **Codex CLI** y **Antigravity CLI**)*
  - `.claude/skills/` *(descubrimiento automático en **Claude Code**)*
- **Memoria del negocio (`MEMORIA.md`):** antes de ejecutar cualquier skill de estrategia, redacción o auditoría, lee `MEMORIA.md` en la raíz del proyecto (si no existe, créala copiando `plantillas/memoria-negocio.md`).
- **Reglas de rigor y privacidad:**
  - Separa siempre **declarado**, **evidencia** (con fuente y fecha), **inferencia** e **hipótesis**. Nunca inventes cifras, precios, reseñas, certificaciones ni conversaciones reales.
  - Nunca introduzcas datos personales reales de clientes ni secretos (`.env`, tokens, build hooks) en prompts o archivos públicos.
  - **Doble modo sobre Sanity Studio:** si el MCP de Sanity (`npm run mcp`) está activo, lee antes los documentos actuales, pide confirmación antes de escribir y guarda **solo borradores (`drafts.*`)** respetando los 13 *singletons* sin publicar ni borrar nada sin permiso; si no hay MCP, entrega los textos listos para copiar y pegar con su ruta exacta en Sanity Studio.

## 1. Mapa del proyecto

- `web/src/lib/contenido.ts`: **única puerta de entrada al contenido**. Lee de Sanity cuando existe `SANITY_PROJECT_ID` y usa `web/src/data/negocio.json` como respaldo local. Ningún componente ni página `.astro` debe consultar a Sanity directamente.
- `web/src/data/negocio.json`: datos de ejemplo y fuente de tipos TypeScript (`Contenido`).
- `web/src/layouts/BaseLayout.astro`: cabecera HTML, SEO/Open Graph, variables CSS de color (`--principal`, `--oscuro`, `--suave`), `data-estilo` y carga condicional de `Consentimiento.astro`.
- `web/src/styles/`: `global.css` (base y estilo `clasico`), `moderno.css` (`[data-estilo="moderno"]`) y `editorial.css` (`[data-estilo="editorial"]`).
- `web/src/components/` y `web/src/pages/`: componentes y rutas estáticas (portada con `Resenas.astro` para reseñas y perfiles verificados en Google/ProvenExpert/Trustpilot/LinkedIn/directorios, blog, catálogo, legales, `/rss.xml`, `/llms.txt`, `/robots.txt`).
- `web/netlify/functions/suscribir.mjs`: función serverless de newsletter conectada a Brevo.
- `web/netlify/functions/consulta-whatsapp.mjs` y `modulos/consulta-whatsapp/apps-script.gs`: módulo opcional de consulta por WhatsApp que guarda en una hoja de Google (`ConsultaWhatsapp.astro`; guía en `GUIA-MODULOS.md`).
- `web/netlify/functions/reservas.mjs` y `modulos/reservas/apps-script.gs`: módulo opcional de reservas con Google Calendar y cálculo de precio según duración (`Reservas.astro`; guía en `GUIA-MODULOS.md`). `reservas.mjs` lee la configuración del singleton `reservas` de Sanity en cada petición y calcula el precio en servidor (el navegador no manda el precio); el script de Apps Script calcula los huecos (paso de 30 min, `PASO_MINUTOS`) y crea el evento bajo `LockService`. Si cambias los campos del singleton `reservas`, sincroniza también `POR_DEFECTO` en `reservas.mjs`.
- `studio/schemas/index.ts`: definición de todos los tipos y campos editables de Sanity (`singletons` y colecciones).
- `studio/sanity.config.ts`: menú del panel, idioma español, bloqueo de borrado en `singletons` y plantillas de creación (`templates`).
- `scripts/`: `empezar.mjs`, `configurar.mjs` (escribe `studio/.env` y `web/.env` a partir del Project ID y ofrece iniciar sesión en Sanity, cargar la semilla y publicar el panel), `mcp.mjs` (crea `.mcp.json` opcional a partir de `.mcp.json.example` con los MCPs sin Google Cloud: Sanity, Netlify y Playwright), `panel.mjs` (`semilla` y `publicar`) y `semilla.mjs` (genera `studio/semilla.ndjson` a partir de `web/src/data/negocio.json`).
- `CAMBIOS.md`: historial de cambios del kit y pasos extra obligatorios al actualizar un fork (`npm run publicar-panel`, `npm run instalar`, pegar `.gs` en Apps Script o variables en Netlify).

## 2. Reglas al modificar Astro y Sanity

1. **Cambios solo visuales o de estructura fija (Astro / CSS):**
   - Edita en `web/src/components/`, `web/src/pages/`, `web/src/layouts/` o `web/src/styles/`.
   - Respeta siempre los 3 estilos (`clasico`, `moderno`, `editorial`) y el diseño móvil.
   - No añadas librerías externas pesadas ni scripts de seguimiento fuera de `Consentimiento.astro`.
2. **Si añades o modificas un campo en Sanity (sincronía completa):**
   - Actualiza **los 4 sitios en orden** para no romper webs ya publicadas ni el modo local sin Sanity:
     1. `studio/schemas/index.ts` (campo, etiqueta clara en español, `description` y `validation`).
     2. `web/src/data/negocio.json` (valor por defecto seguro).
     3. `web/src/lib/contenido.ts` (proyección en la consulta GROQ y normalización segura si el documento en Sanity aún no tiene ese campo).
     4. Componente o página en `web/src/` que lo renderiza.
   - Si procede, regenera la semilla con `node scripts/semilla.mjs` y documenta el cambio en `GUIA-PANEL.md`.
3. **Si cambias plantillas o estructura del panel (`studio/sanity.config.ts`):**
   - Genera `_key` únicos en cualquier bloque Portable Text o elemento de array dentro de `templates`.
4. **Privacidad y secretos:**
   - Nunca leas, modifiques ni incluyas en git archivos `.env`, `studio/.env`, `web/.env` ni credenciales (`BREVO_API_KEY`, build hooks).
   - Cualquier script de analítica o píxel debe ejecutarse únicamente tras aceptar el banner en `Consentimiento.astro` y reflejarse en `web/src/pages/privacidad.astro` y `Footer.astro`.

## 3. Verificación obligatoria antes de terminar

Ejecuta siempre desde `plantillas/kit-negocio/`:

- Si tocaste `web/`: `npm run build` (debe generar `web/dist/` sin errores).
- Si tocaste `studio/`: `npm --prefix studio run build -- --yes` (debe compilar Sanity Studio sin errores).
- Recuerda avisar al usuario de lo necesario para publicar en producción:
  - Cambios en `web/`: `git commit` + `git push` a `main` (Netlify redespliega).
  - Cambios en `studio/`: ejecutar `npm run publicar-panel` dentro de `plantillas/kit-negocio/`.
