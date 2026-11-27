---
name: humanizar-textos
description: Elimina el tono robótico y los clichés típicos de IA ("AI slop") en textos en español (Sanity Studio: portada, servicios, páginas/landings, blog, catálogo, captación, /enlaces, o redes/email/WhatsApp) sustituyéndolos por lenguaje natural, concreto y comprobable desde MEMORIA.md. Use when un borrador suene artificial, genérico o sobrecargado.
---

# Humanizar textos (filtro Anti-AI-Slop en español)

Objetivo: convertir borradores que «huelen a IA» en textos claros, directos y creíbles como los escribiría una persona real del oficio, listos para el kit (`kit-negocio-web`).

## Antes de empezar

1. Si existe `MEMORIA.md`, léelo para usar **datos reales** del proyecto (barrio/ciudad, forma de trabajar, plazos reales, palabras que usan sus clientes, si es proyecto real o caso ficticio).
2. Identifica dónde va el texto dentro de **Sanity Studio** (o fuera de la web, en redes/email/WhatsApp):
   - **Portada / negocio:** `1. Mi negocio y portada → Portada`, `Servicios`, `Quiénes somos`, `Secciones extra de la portada`.
   - **Subpáginas y campañas:** `1. Mi negocio y portada → Páginas y landings de campaña` (`/[slug]`) y `Página /enlaces (Link in bio)` (`/enlaces`).
   - **Blog y AEO:** `2. Blog → Entradas del blog` (`resumen`, `respuestaDirecta` de 40–60 palabras, `cuerpo`, `faqs`).
   - **Catálogo:** `3. Catálogo y tienda → Productos` (`resumen`, `descripcion`).
   - **Captación y SEO:** `4. Contacto, buscadores y legal → Contacto`, `Preguntas frecuentes de la portada`, `Newsletter`, `Consulta por WhatsApp`, `Reservas con Google Calendar`, `Google, IA y buscadores`.

## Doble modo de trabajo (MCP de Sanity vs. edición manual)

- **Con MCP de Sanity activo** (opcional vía `npm run mcp` en `kit-negocio-web`): si el alumno pide humanizar textos ya cargados en su web, lee primero los documentos actuales en Sanity, muestra el antes/después y **pide confirmación antes de escribir**. Guarda los cambios **solo en borrador (`drafts.*`)**, respetando los *singletons* (`negocio`, `portada`, `sobre`, `resenas`, `contacto`, `buscadores`, `legal`, `blogAjustes`, `newsletter`, `consultaWhatsapp`, `reservas`, `catalogoAjustes`, `enlaces`) y sin publicar ni borrar nada sin autorización.
- **Sin MCP / edición manual:** entrega el texto reescrito listo para copiar y pegar indicando la ruta exacta en Sanity Studio (y recuerda pulsar **Publish** tras revisarlo) o en su herramienta de redes/email.
- **Alcance:** `humanizar-textos` actúa sobre contenidos (Sanity Studio, redes, email, WhatsApp). No modifica plantillas ni código fijo de Astro (`web/src/`); si algún texto fijo viniera en el código (por ejemplo, etiquetas de interfaz en `web/src/components/`), indícalo aparte siguiendo `AGENTS.md`.

## Qué detectar y eliminar siempre (señales de «AI slop»)

1. **Aperturas y cierres prefabricados:**
   - *«En el mundo actual…»*, *«En la era digital…»*, *«Hoy en día más que nunca…»*, *«¿Alguna vez te has preguntado…?»*, *«En resumen / En conclusión, podemos decir que…»*.
2. **Muletillas y contrastes forzados de plantilla:**
   - *«No se trata solo de X, sino de Y»*, *«Más que un servicio, es…»*, *«Descubre el poder de…»*, *«Desbloquea tu potencial»*, *«Lleva tu negocio al siguiente nivel»*.
3. **Adjetivos vacíos y jerga de folleto:**
   - *«solución integral»*, *«a medida»*, *«vanguardia»*, *«excelencia»*, *«impecable»*, *«sin precedentes»*, *«robusto»*, *«dinámico»*, *«en constante evolución»*.
4. **Exceso de ritmo artificial y formato recargado:**
   - Demasiadas rayas (`—`) o frases simétricas de tres elementos (*«rápido, seguro y eficiente»*).
   - Poner en **negrita** media frase en cada párrafo o un emoji al principio de cada viñeta.
5. **Promesas absolutas o cifras sin fuente:**
   - *«Resultados garantizados»*, *«100 % satisfacción»*, *«multiplica tus clientes»*.

## Cómo reescribir (2 pasadas)

- **Pasada 1 (sustituir humo por hechos):** cambia cada adjetivo genérico por un hecho concreto del servicio.
  - *Antes:* «Ofrecemos una solución integral y personalizada para tu jardín en la era moderna.»
  - *Después:* «Visitamos tu terraza en Madrid, medimos las horas de sol y te pasamos una lista cerrada de plantas y riego en 48 horas.»
- **Pasada 2 (ritmo oral en voz alta):** usa frases más cortas, mezcla longitudes de oración, habla de tú o de usted con coherencia (nunca mezcles ambos en el mismo texto) y usa verbos simples (*hacer, revisar, instalar, responder, presupuestar*).
- **Respeta los límites de Sanity cuando apliquen:** `respuestaDirecta` en 40–60 palabras (máx. 320 caracteres), `buscadores.titulo` ≤ 70 caracteres, `buscadores.descripcion` ≤ 160 caracteres.
- **Si falta el dato concreto:** no lo inventes para rellenar el hueco; deja una marca clara como `[INDICAR PLAZO REAL]` o `[AÑADIR BARRIO/ZONA]`.

## Salida

1. **Lista rápida de lo corregido:** 3–5 clichés o exageraciones detectadas en el original.
2. **Texto reescrito listo para publicar** (indicando la ruta exacta de Sanity Studio o canal, o guardado como borrador vía MCP tras confirmación).
3. **Datos reales que conviene añadir** *(si los hubiera)* antes de pulsar **Publish**.
