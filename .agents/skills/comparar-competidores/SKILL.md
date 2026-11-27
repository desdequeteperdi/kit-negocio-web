---
name: comparar-competidores
description: Compara cara a cara tu oferta con alternativas y competidores reales con fuentes verificables y fecha, aplicando la regla de contraste de la Sesión 1 ("no se ha encontrado anunciada en las alternativas revisadas", nunca "nadie lo ofrece") y preparando comparativas honestas para decidir posicionamiento o FAQs. Use when se analiza competencia en Sesión 1 o comparativas en Sesión 6.
---

# Comparar competidores y alternativas reales

Objetivo: construir una **comparativa honesta y verificable** entre tu propuesta y las alternativas reales que ya usa tu cliente, para detectar dónde puedes diferenciarte sin inventar ventajas ni desacreditar a terceros.

## Antes de empezar

1. Lee `MEMORIA.md` (oferta en una frase, cliente ideal, alternativa actual, diferencia propuesta y fuentes ya consultadas). Si está vacío, usa antes `aterrizar-idea` o `investigar-mercado`.
2. Pide al usuario que pegue las URLs o el texto visible (precios, servicios, plazos, zona) de **3 a 6 alternativas reales**:
   - **Competidores directos** (negocios iguales en tu zona/nicho).
   - **Alternativas sustitutivas** (qué hace hoy el cliente si no contrata a nadie: hacerlo él mismo, pedir favor a un conocido, plataforma genérica o no hacer nada).

## Proceso en 4 pasos

1. **Tabla comparativa de hechos (con URL y fecha):**
   - Columnas recomendadas: **Criterio que importa al cliente** (precio publicado, plazo de respuesta/entrega, zona, qué incluye, cómo se contacta/reserva, reseñas visibles y plataforma) | **Tu propuesta** | **Alternativa A** | **Alternativa B** | **Alternativa C** | **Alternativa «no contratar»**.
   - Si una web no publica un dato (por ejemplo, el precio), escribe **`No publicado`** (nunca lo deduzcas ni pongas cifras orientativas ajenas como si fueran suyas).
2. **Contraste estricto de la diferencia propuesta (regla de Sesión 1):**
   - Clasifica tu diferencia propuesta en uno de estos 3 estados exactos:
     1. **También la ofrecen:** qué alternativas la anuncian y con qué texto/URL.
     2. **No se ha encontrado anunciada en las alternativas revisadas:** indica exactamente cuántas webs se miraron y la fecha *(prohibido escribir «nadie lo ofrece» o «somos los únicos»).*
     3. **Información insuficiente:** falta revisar páginas o preguntar directamente.
3. **Filtro de relevancia («tener» vs. «importar»):**
   - Distingue si esa diferencia es solo algo interno tuyo o algo por lo que el cliente cambiaría de proveedor. Si no hay prueba real de que le importe, márcala en `MEMORIA.md` como **hipótesis pendiente de preguntar en entrevistas**.
4. **Opcional · Traducción a tu web (`kit-negocio-web`):**
   - **En Sanity Studio (sin código):** redacta 2–3 frases claras o 2 preguntas frecuentes explicando **tu forma de trabajar** (ej. *«Presupuesto cerrado por escrito antes de empezar»*) **sin nombrar ni atacar a competidores concretos** y pasando el filtro de `humanizar-textos`. Rutas exactas:
     - `1. Mi negocio y portada → Portada` (`presentacion`) o `Quiénes somos` (`texto` / `puntos`).
     - `1. Mi negocio y portada → Páginas y landings de campaña` (`/[slug]`, campo `faqs`) si es una landing específica.
     - `4. Contacto, buscadores y legal → Preguntas frecuentes de la portada`.
   - *(Si tienes el MCP de Sanity activo tras `npm run mcp`, ofrece guardar la propuesta en **borrador** pidiendo confirmación antes de escribir; si no, entrégala lista para copiar, pegar y pulsar **Publish**).*
   - *(Si hiciera falta una tabla comparativa visual fija o un componente nuevo que no existe en el bloque de texto libre, eso ya correspondería a código Astro en `web/src/` siguiendo `AGENTS.md`.)*

## Reglas

- **Solo hechos observables:** si no puedes leer una URL porque está bloqueada o sin conexión, dilo y pide que peguen el texto de la web.
- **No conviertas falta de información en superioridad:** que un competidor no ponga el precio en su portada no prueba que sea más caro ni peor.
- **Distingue evidencia e hipótesis** al guardar los resultados.

## Salida

1. Actualiza la tabla **Diferencia propuesta**, **Fuentes consultadas** (con URL y fecha) y **Registro de conocimiento** en `MEMORIA.md`.
2. Entrega la tabla comparativa limpia + 2 preguntas concretas para validar en conversaciones reales si tu diferencia le importa de verdad al cliente.
