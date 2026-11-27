---
name: reutilizar-contenido
description: Convierte una entrada del blog, página o servicio real en el bloque "En resumen / Respuesta directa" (AEO, Sanity Studio) y 3 piezas para redes/email con guion corto, enlace a /enlaces y tabla UTM para CALENDARIO-EDITORIAL.md. Use when se aplica el flujo "1 artículo -> 3 piezas" en Sesión 5, 9 o IFCT029PO.
---

# Reutilizar contenido (`1 artículo → 3 piezas` + AEO + UTM)

Objetivo: sacar **un pack multiformato listo para programar** a partir de un único tema real del negocio en `kit-negocio-web`, alimentando tanto el blog de **Sanity Studio** como las redes, la newsletter (Brevo) y `CALENDARIO-EDITORIAL.md`.

## Antes de empezar

1. Lee `MEMORIA.md` (público, tono, acción principal de la web y experimento activo).
2. Obtén la entrada del blog o servicio base y su URL destino:
   - Si el **MCP de Sanity** está activo (`npm run mcp` en `kit-negocio-web`), puedes leer directamente la `entrada`, `pagina`, `servicio` o `producto` desde Sanity para no pedir al alumno que lo copie entero.
   - Si no hay MCP, pide al alumno el borrador/artículo (o tema/caso real ya anonimizado) y la URL destino (p. ej. `https://tuweb.netlify.app/blog/mi-articulo`, `/campana-...` o `/enlaces`).

## Qué producir paso a paso

1. **Bloque «En resumen / Respuesta directa» (40–60 palabras, máx. 320 caracteres):**
   - Destino en Sanity Studio: `2. Blog → Entradas del blog → pestaña 1. Artículo → En resumen / Respuesta directa` (`respuestaDirecta`).
   - Responde de forma directa a la duda central del tema para lectura rápida en móvil y para que los asistentes de IA (AEO y `/llms.txt`) citen el artículo con precisión.
   - Si el artículo aún no tiene `faqs` (2–3 preguntas cortas en `1. Artículo → Preguntas frecuentes de esta entrada`) o botón destacado en `1. Mi negocio y portada → Página /enlaces` (`enlaces`), propón también el borrador.
2. **Pieza 1 · Carrusel educativo (Instagram / LinkedIn, formato `1080 × 1350 px` en Canva):**
   - Texto listo lámina a lámina (Portada con promesa concreta + 3–4 láminas de valor con una idea por pantalla + Lámina final con llamada a la acción hacia `/enlaces`, el artículo o una landing `/[slug]`).
   - Texto breve de acompañamiento (*caption*), empezando con 2 líneas de gancho sin clichés.
3. **Pieza 2 · Publicación breve / Google Business Profile / X / Facebook:**
   - Una duda real que suelen preguntar los clientes + respuesta práctica en 2–4 frases + enlace al artículo o formulario de consulta/reserva.
4. **Pieza 3 · Guion de vídeo corto vertical (20–45 s) O resumen para Newsletter (Brevo):**
   - **Para vídeo (Reels / TikTok / Shorts):** Gancho hablado y visual en los primeros 2–3 segundos → 1 idea con ejemplo real → cierre indicando dónde ampliar o reservar *(con indicación de añadir subtítulos)*.
   - **Para Newsletter (Brevo):** Asunto claro (sin palabras spam ni mayúsculas), resumen de 4–5 líneas y botón único hacia el artículo o servicio *(recordando que también existe `/rss.xml` en el kit para automatizar envíos en Brevo cuando el blog está activo)*.
5. **Tabla de enlaces UTM (para Google Campaign URL Builder):**
   - Indica exactamente qué poner en `utm_source`, `utm_medium`, `utm_campaign` y `utm_content` para cada pieza (Instagram/LinkedIn: `utm_medium=social`; Google Business Profile: `utm_medium=organic`; Brevo: `utm_medium=email`) sin escribir la URL a mano.

## Doble modo de trabajo (MCP de Sanity vs. edición manual)

- **Modo 1 · Con MCP de Sanity activo:**
  - Lee la `entrada` (y opcionalmente `enlaces`) actual en Sanity.
  - Propón guardar `respuestaDirecta`, `faqs` o un botón en `enlaces` y **pide confirmación explícita antes de escribir**.
  - Guarda **únicamente en borrador (`drafts.*`)**, respetando los *singletons* (como `enlaces` y `blogAjustes`) y **sin publicar ni borrar nada** sin autorización.
- **Modo 2 · Sin MCP / edición manual:**
  - Entrega `respuestaDirecta` (y las FAQs/botón de `/enlaces` si aplican) listos para copiar y pegar con su ruta exacta en Sanity Studio y recuerda pulsar **Publish**.
- **Qué ya viene hecho en Astro (`web/src/`):** el kit ya genera automáticamente los botones ligeros para compartir cada artículo (`CompartirEntrada.astro`), el feed `/rss.xml` y el resumen `/llms.txt`; no hace falta tocar código para difundir entradas ni actualizar `/enlaces`.

## Reglas

- **Aplica `humanizar-textos`:** cero frases hechas de IA, cero emojis en cada línea, cero datos o casos inventados.
- **Un único objetivo:** cada pieza apunta a la acción que toca medir (visitas al artículo, `/enlaces`, landing `/[slug]` o formulario `/gracias`).

## Salida

Entrega:
1. El bloque *En resumen* (`respuestaDirecta`) listo para Sanity Studio (o guardado en borrador vía MCP tras confirmación).
2. Las 3 piezas listas para copiar en Canva / Meta Business Suite / Metricool / Brevo.
3. La tabla de etiquetas UTM lista para anotar en `CALENDARIO-EDITORIAL.md`.
