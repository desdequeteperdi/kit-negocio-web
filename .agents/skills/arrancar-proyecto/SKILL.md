---
name: arrancar-proyecto
description: Instala y diagnostica el repositorio kit-negocio-web (especialmente en Windows con antivirus, permisos o OneDrive, y en Mac), hace un arranque mínimo empezando por si el proyecto es real o ficticio sin abrumar con preguntas, y recoge web propia o webs de referencia para extraer CSS/tokens de diseño y construir la primera versión de la web. Use when el alumno dice "instálame el repo", "instálame el repo para empezar a construir el proyecto", "arranca el proyecto", "me da error npm / permisos / antivirus" o empieza desde cero.
---

# Arrancar e instalar el proyecto (`kit-negocio-web`)

Objetivo: que una persona sin conocimientos técnicos (especialmente en **Windows con antivirus**) pase de clonar el repo a tener la web instalada, arrancada y personalizada con su propio estilo/CSS en minutos, **sin abrumarla con preguntas**.

## Reglas de tono e interacción

- Habla en español claro, sin jerga innecesaria.
- **No hagas muchas preguntas.** Sigue estrictamente el orden de las 3 fases de abajo: máximo 1 pregunta por turno en las Fases 2 y 3.
- Nunca pidas desactivar por completo el antivirus ni ejecutar comandos destructivos. Tampoco inventes datos reales ni copies textos/marcas de webs de referencia ajenas.

---

## Fase 1 · Diagnóstico e instalación (Windows con antivirus / Mac)

1. Ejecuta el diagnóstico en la raíz del proyecto:
   ```bash
   node scripts/diagnostico.mjs
   ```
2. Resuelve primero cualquier `[ERROR]` o `[AVISO]` real antes de lanzar la instalación:
   - **Node.js < 22.12 o no encontrado / errores de `PATH` en Windows («no se reconoce como comando»):**
     - Si acaba de instalar Node, Git o un CLI global (`codex`, `claude`) y la terminal no lo encuentra, **no hace falta reiniciar el ordenador**: ejecuta primero este refresco de `PATH` en PowerShell dentro de VS Code:
       ```powershell
       $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
       ```
     - Si el CLI global sigue sin reconocerse, comprueba `npm prefix -g`; si falta en el `PATH` de usuario en Windows, añádelo (o lánzalo directamente con `npx @openai/codex` / `npx @anthropic-ai/claude-code` sin depender del `PATH` global).
     - Si falta Node (`>= 22.12`), instala **Node.js LTS** (`https://nodejs.org`) y **Git** (`https://git-scm.com`) **antes** de reabrir VS Code una sola vez.
   - **Windows · carpeta dentro de `OneDrive` o ruta muy larga (`> 110` caracteres):** explica que OneDrive bloquea miles de archivos durante `npm install` (`EPERM`/`EBUSY`) y guía a mover la carpeta a `C:\proyectos\kit-negocio-web`.
   - **Windows · PowerShell `ExecutionPolicy` bloquea `npm` («la ejecución de scripts está deshabilitada»):** indica ejecutar en PowerShell:
     ```powershell
     Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
     ```
     (o abrir en VS Code una terminal **Command Prompt / `cmd`**).
   - **Permisos insuficientes (`EACCES` / carpeta protegida):** nunca trabajar en `Program Files` ni `/Applications`; en Mac, no usar `sudo` con `npm` dentro del proyecto.
3. Si falta `web/node_modules` o `studio/node_modules`, ejecuta:
   ```bash
   npm run instalar
   ```
4. **Si `npm run instalar` falla con `EPERM`, `EBUSY`, `UNKNOWN` o bloquea `esbuild.exe` / `sharp` en Windows (antivirus):**
   - Cierra cualquier servidor Node abierto (`Ctrl + C`).
   - Guía al alumno paso a paso para **añadir una exclusión únicamente a la carpeta del proyecto** (p. ej. `C:\proyectos\kit-negocio-web`) en **Seguridad de Windows → Protección contra virus y amenazas → Administrar configuración → Exclusiones** (o en su antivirus), **sin apagar el antivirus general**.
   - Borra la carpeta parcial `web/node_modules` o `studio/node_modules` que haya fallado, limpia caché (`npm cache clean --force`) y repite `npm run instalar`.
5. Verifica que `npm run build` compila sin errores (si aún no hay Sanity configurado o no hay red, `contenido.ts` usa `web/src/data/negocio.json`).

---

## Fase 2 · Pregunta #1 obligatoria y memoria mínima (sin agobiar)

Antes de preguntar detalles de negocio o diseño, haz **esta única primera pregunta**:

> **«¿Este proyecto es un negocio real tuyo o es un proyecto ficticio / de ejemplo para practicar en clase?»**

Según lo que responda:

- **Si es FICTICIO / de ejemplo:**
  - **Prohibido lanzar cuestionarios largos.** Haz una sola pregunta breve:
    *«Cuéntame en 1 o 2 líneas de qué trata tu proyecto ficticio (qué vende, en qué ciudad/barrio y cómo quieres que te contacten) —o dime si prefieres que te proponga 3 ideas listas para elegir en un clic.»*
  - En cuanto conteste, crea `MEMORIA.md` en la raíz a partir de `plantillas/memoria-negocio.md`, deja marcado **`Proyecto ficticio / de ejemplo`** y pasa directo a la **Fase 3**.

- **Si es REAL:**
  - Haz **como máximo 3 preguntas cortas en un solo mensaje** (sin lanzar `aterrizar-idea` entero todavía):
    1. ¿Qué servicio o producto principal vendes?
    2. ¿Para qué tipo de cliente y en qué zona (o 100 % online)?
    3. ¿Cuál es el botón principal que quieres en la web (WhatsApp, formulario o reserva)?
  - Crea `MEMORIA.md` con lo contestado (dejando el resto como pendiente) y pasa directo a la **Fase 3**.

---

## Fase 3 · Diseño, web propia o webs de referencia → CSS / tokens y construcción

Haz **una sola pregunta de diseño**:

> **«¿Tienes ya una web propia de la que cojamos tus colores, tipografía y estilo (CSS/tokens), o tienes 1–2 webs de referencia que te gusten? *(Si no tienes ninguna, dime qué estilo prefieres —Clásico, Moderno o Editorial— y qué color principal quieres).*»**

Actúa según su respuesta:

1. **Si tiene web propia o webs de referencia:**
   - Inspecciona las URLs indicadas (si una web bloquea el acceso automático o tiene protección anti-bot, no intentes saltarla: pídele una captura o los colores/fuentes que quiere).
   - Extrae los **tokens visuales**: color principal (`--principal`), oscuro (`--oscuro`), fondo suave (`--suave`), color de texto (`--texto`), tipografía (`font-family`), radios de borde y estilo general (`clasico`, `moderno` o `editorial`).
   - **Regla de autoría:** si es **su propia web**, puedes aprovechar su información real (nombre, servicios, zona, teléfono, estructura); si son **webs de referencia de terceros**, toma **solo** inspiración de diseño, tokens CSS y estructura, **nunca** textos ni nombres comerciales ajenos.
2. **Construye la primera versión en el kit siguiendo `AGENTS.md`:**
   - **Tokens CSS y estilos:**
     - Elige el estilo más cercano en `web/src/data/negocio.json` (`negocio.estilo`: `clasico`, `moderno` o `editorial`).
     - Para aplicar la paleta exacta del alumno sin romper la compatibilidad, actualiza `--principal`, `--oscuro`, `--suave` y estilos base en `web/src/styles/global.css` (y en `web/src/lib/contenido.ts` / `studio/schemas/index.ts` si creas un tema nuevo como `marca`, manteniendo sincronía completa según `AGENTS.md`).
   - **Contenido inicial (`web/src/data/negocio.json`):**
     - Rellena portada (`titular`, `subtitulo`, `ctaTexto`), `negocio` (`nombre`, `descripcion`, `zona`, contacto si es real o ficticio claramente marcado), 3–4 `servicios`, `sobre` (si aplica) y 3–4 `preguntas`.
     - **No inventes** reseñas reales (`resenas.mostrar = false` si no hay reseñas verificables), cifras ni certificaciones.
     - Si el MCP de Sanity está activo y ya tiene `SANITY_PROJECT_ID`, ofrece guardar estos textos también como borradores (`drafts.*`) pidiendo confirmación previa.
3. **Verificación y arranque visual:**
   - Ejecuta `npm run build` (y `npm --prefix studio run build -- --yes` si tocaste `studio/schemas/index.ts`).
   - Indica al alumno que arranque (o abra) `http://localhost:4321` con `npm run empezar` para ver su web construida en tiempo real.
   - Cierra recordando en una línea que, si más adelante quiere pulir oferta o textos, puede usar `redactar-landing`, `humanizar-textos` o `aterrizar-idea` sin prisa.
