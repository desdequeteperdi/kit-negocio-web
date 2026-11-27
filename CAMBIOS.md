# Cambios del kit y qué hacer al actualizar

Cómo traer estos cambios a tu copia está en el manual (capítulo 3.3, apartado «Actualizar tu copia del kit»). Aquí está lo que **cambia cada actualización** y los pasos extra que necesita, además de actualizar el fork.

## Pasos extra: tabla rápida

| Si la actualización toca… | Haz además |
|---|---|
| `studio/` (campos o menú del panel) | `npm run publicar-panel` dentro de la carpeta del kit |
| `package.json` | `npm run instalar` |
| un archivo `.gs` de `modulos/` | Pegar el código nuevo en tu Apps Script y publicar una **Nueva versión** *(solo si usas ese módulo)* |
| variables de entorno nuevas (`.env.example`) | Crearlas en Netlify y hacer **Trigger deploy** *(solo si usas esa función)* |
| solo `web/` | Nada más: Netlify despliega solo |

Tu contenido (textos, imágenes, entradas) vive en Sanity, no en el código: actualizar el kit **no lo borra ni lo cambia**.

---

## 2026-11-27 · Skills de marketing integradas, arranque guiado para Windows y flujo con VS Code + CLI

- **Nuevo:** integradas las **13 skills del curso** en `.agents/skills/` (para **Codex CLI** y **Antigravity CLI**) y `.claude/skills/` (para **Claude Code**), incluyendo **`arrancar-proyecto`** (instalación/diagnóstico Windows con antivirus y permisos, pregunta inicial *real vs. ficticio* sin abrumar, y extracción de CSS/tokens desde web propia o de referencia) junto a `plantillas/memoria-negocio.md`, `npm run diagnosticar` (`scripts/diagnostico.mjs`) y `npm run auditar` (auditoría HTML multiplataforma en Node.js para la Sesión 8, sin `bash` ni `jq`).
- **Cambiado:** `AGENTS.md`, `CLAUDE.md`, `README.md`, `GUIA-ALTA.md` y `scripts/empezar.mjs` actualizados para detectar OneDrive, errores `EPERM`/`EBUSY`/`EACCES` (antivirus/permisos) y reflejar el flujo completo en Visual Studio Code (vincular GitHub por HTTPS sin clave SSH, Fork + `git clone`, CLI opcional y arranque local). No requiere pasos extra si ya tienes tu web desplegada y no usas las skills en terminal.

## 2026-11-22 · Bloque de reseñas y perfiles verificados + MCPs opcionales sin Google Cloud

- **Nuevo:** apartado **Reseñas y perfiles verificados** en *1. Mi negocio y portada* (`Resenas.astro`), con sellos hacia perfiles públicos (**Google Maps, ProvenExpert, Trustpilot, LinkedIn, Doctoralia, Habitissimo…**), botón para dejar reseña, tarjetas de reseñas reales con enlace a la fuente e integración en `sameAs` (JSON-LD) y `/llms.txt`. Viene apagado por defecto.
  - **Obligatorio si actualizas:** `npm run publicar-panel` (aparece el apartado nuevo en el grupo 1 del panel).
- **Nuevo *(opcional, solo agentes de código)*:** `.mcp.json.example` y comando `npm run mcp` para activar con un clic los MCPs que no requieren Google Cloud (**Sanity**, **Netlify** y **Playwright**). Nada que hacer si no usas agente.

## 2026-11-21 · Módulos opcionales y comando `configurar`

- **Nuevo: consulta por WhatsApp + hoja de Google** y **reservas con Google Calendar** (apagados por defecto). Guía: `GUIA-MODULOS.md`.
  - **Obligatorio si actualizas:** `npm run publicar-panel` (aparecen dos apartados nuevos en *4. Contacto, buscadores y legal*).
  - Solo si los quieres usar: crear el script de Apps Script, las variables `APPS_SCRIPT_URL`, `APPS_SCRIPT_TOKEN`, `RESERVAS_SCRIPT_URL`, `RESERVAS_SCRIPT_TOKEN` en Netlify y activarlos en el panel.
- **Nuevo:** `npm run configurar` escribe `studio/.env` y `web/.env` preguntando tu Project ID. No cambia nada si ya los tienes.
- **Nuevo:** IndexNow opcional (`INDEXNOW_KEY`). Nada que hacer si no lo usas.
- Mejoras en las guías de alta (`GUIA-ALTA.md`, Windows y Mac).

## 2026-11-20 · Subpáginas y landings, `/enlaces`, evento Lead y Meta CAPI

- **Nuevo:** subpáginas/landings, página `/enlaces`, evento *Lead* y Meta CAPI opcional.
  - **Obligatorio si actualizas:** `npm run publicar-panel` (campos nuevos en el panel).
- Nuevo `AGENTS.md` y `CLAUDE.md` para personalizar con un agente de código.

## 2026-11-19 y anteriores · Blog, SEO y utilidades

- Blog con galerías, categorías, etiquetas y comentarios moderados; GTM, botones para compartir, plantillas de entrada y calendario editorial.
  - Si actualizas desde una versión anterior: `npm run publicar-panel`.

---

*Cómo añadir una entrada (para quien mantiene el kit):* una por fecha, con **Nuevo / Cambiado / Corregido** y, siempre, qué paso extra tiene el alumnado. Si el cambio toca `studio/`, un `.gs` o variables, dilo en la primera línea.
