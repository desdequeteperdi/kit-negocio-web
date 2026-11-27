---
name: redactar-landing
description: Redacta y revisa los textos de la web para los campos reales de Sanity Studio (Portada, Servicios, Quiénes somos, Reseñas, Páginas/landings /[slug], /enlaces, Blog, Catálogo/Tienda, Captación, Google/IA y Datos legales) a partir de MEMORIA.md, sin inventar cifras ni usar clichés de IA. Use when el alumnado prepara los textos de su web o los pasa a Sanity Studio (con o sin MCP).
---

# Redactar contenidos para el kit (`kit-negocio-web`)

Objetivo: pasar de las hipótesis de `MEMORIA.md` a **textos claros, honestos y orientados a conversión** adaptados a la estructura real de **Sanity Studio** en `kit-negocio-web`, listos para trabajar sin programar.

## Antes de empezar

1. Lee `MEMORIA.md` (oferta en una frase, cliente ideal, alternativa actual, diferencia propuesta, recursos y si es proyecto real o caso ficticio). Si falta, sugiere usar antes `aterrizar-idea`.
2. Revisa que no vas a prometer nada sin respaldo en `MEMORIA.md`.

## Doble modo de trabajo (MCP de Sanity vs. edición manual)

Pregunta o detecta si está activo el **MCP de Sanity** (configurable opcionalmente con `npm run mcp` dentro de `kit-negocio-web`, según `.mcp.json.example`):

1. **Modo 1 · Con MCP de Sanity activo:**
   - Lee primero el estado actual de los documentos en Sanity (`negocio`, `portada`, `sobre`, `resenas`, `buscadores`, `pagina`, `entrada`, `producto`, etc.) para no sobrescribir datos reales ni repetir trabajo.
   - Presenta al alumno la propuesta de textos y **pide confirmación explícita antes de escribir nada**.
   - Crea o actualiza **únicamente borradores (`drafts.*`)**. **Nunca publiques (`publish`) ni borres (`delete`/`unpublish`)** sin autorización expresa del alumno.
   - **Respeta los *singletons*** (`negocio`, `portada`, `sobre`, `resenas`, `contacto`, `buscadores`, `legal`, `blogAjustes`, `newsletter`, `consultaWhatsapp`, `reservas`, `catalogoAjustes`, `enlaces`): actualiza siempre su ID único, nunca crees copias con ID aleatorio ni intentes duplicarlos o borrarlos.
2. **Modo 2 · Sin MCP / edición manual:**
   - Entrega cada bloque listo para copiar y pegar, indicando la **ruta exacta en Sanity Studio** (grupo → apartado → pestaña → campo) y los límites de caracteres.
   - Recuerda al alumno pulsar **Publish** (botón verde abajo a la derecha) en Sanity Studio cuando haya revisado y aprobado los cambios.

## Mapa exacto de Sanity Studio (qué redactar y dónde)

### 1. `1. Mi negocio y portada`
- **Datos del negocio** *(singleton `negocio`)*:
  - `nombre`, `descripcion` (corta), `tipoNegocio` (para Google/JSON-LD), `zona` (sin exponer domicilio privado si trabajas a domicilio/remoto), `horario`, `telefono`, `email`, `whatsapp` (solo dígitos con prefijo, ej. `34600000000`), redes (`instagram`, `youtube`, `tiktok`, `facebook`, `otraRedNombre`, `otraRed`), `tema` (`verde`, `azul`, `terracota`) y `estilo` (`clasico`, `moderno`, `editorial`).
- **Portada** *(singleton `portada`)*:
  - `titular` *(máx. 10–12 palabras)*: qué problema resuelves, para quién y dónde (si aplica). Evita frases vacías como *«Llevamos tu negocio al siguiente nivel»*.
  - `presentacion` *(2–3 frases)*: cómo trabajas, diferencia frente a la alternativa habitual y qué gana el cliente.
  - `textoBoton` *(2–4 palabras)*: acción concreta (p. ej. *«Pide presupuesto»*, *«Reserva valoración»*). Evita *«Enviar»* o *«Más información»*.
  - `imagen` + `alt` (**Descripción de la imagen** obligatoria para accesibilidad y Google; solo JPG, PNG o WebP).
- **Quiénes somos** *(singleton `sobre`)*:
  - `mostrar`, `titulo`, `texto` (2–3 frases directas) y `puntos` (3 hechos comprobables; si es un caso ficticio, márcalo expresamente).
- **Reseñas y perfiles verificados** *(singleton `resenas`, apagado por defecto)*:
  - Si aún no hay valoraciones públicas reales, indica **dejar `mostrar` desactivado** y redacta solo `textoBotonResena` y un mensaje breve para pedirlas cuando existan.
  - Si ya existen reseñas verificables: enlaza `perfiles` (`Google Maps`, `ProvenExpert`, `Trustpilot`, `LinkedIn`, `Doctoralia`, `Habitissimo`, etc. con `url`, `nota`, `total`) y copia en `lista` entre 2 y 6 reseñas reales con `autor`, `detalleAutor` (servicio/barrio o cargo), `fecha`, `fuente` y `urlFuente`. **Nunca inventes testimonios.**
- **Servicios** *(colección `servicio`, 3–4 bloques ordenados por beneficio)*:
  - `orden`, `nombre` (claro, sin jerga), `descripcion` (1–2 frases: qué incluye y para quién) y `precio` (texto libre si está confirmado en `MEMORIA.md`; si no, `[PRECIO O RANGO PENDIENTE]`).
- **Secciones extra de la portada** *(colección `seccion`)*:
  - Para añadir bloques extra sin programar en `despues-servicios`, `despues-sobre` o `antes-contacto` (`orden`, `lugar`, `mostrar`, `titulo`, `contenido` con texto, imagen, galería o HTML).
- **Páginas y landings de campaña** *(colección `pagina`, ruta `/[slug]`, con 2 plantillas al pulsar `+`: Subpágina corporativa o Landing de campaña)*:
  - Pestaña **1. Contenido**: `titulo`, `slug`, `tipo` (`pagina` | `landing`), `subtitulo` (promesa breve y descripción por defecto), `imagen` + `alt`, `cuerpo` (texto enriquecido, imágenes, galerías o HTML) y `faqs` (pregunta + respuesta corta).
  - Pestaña **2. Menú y captación**: `mostrar`, `mostrarEnMenu` (`true` en subpáginas como `/quienes-somos`, `false` en landings de campaña), `orden`, `textoMenu`, `mostrarContacto`, `textoBotonContacto` y `mostrarNewsletter`.
  - Pestaña **3. Google e IA**: `seoTitulo` (≤ 70 caracteres), `seoDescripcion` (≤ 160 caracteres) y `noindex` (activar en pruebas o campañas temporales).
- **Página /enlaces (Link in bio)** *(singleton `enlaces`, ruta `/enlaces`)*:
  - `mostrar`, `titulo`, `bio` (1–2 frases), `imagen` + `alt`, `botones` (`etiqueta`, `url` empezando por `/` o `https://`, `destacado`), `mostrarWhatsapp`, `mostrarUltimasEntradas`, `mostrarRedes`, `noindex`.

### 2. `2. Blog` *(si aplica al proyecto)*
- **Blog: ajustes y comentarios** *(singleton `blogAjustes`)*: `mostrar`, `titulo`, `introduccion`, `comentarios`, `cusdisId`.
- **Entradas del blog** *(colección `entrada`, rutas `/blog/[slug]`, `/blog/categoria/...`, `/blog/etiqueta/...`, `/rss.xml`)*:
  - Pestaña **1. Artículo**: `titulo`, `slug`, `fecha`, `resumen` (1–2 frases), **`respuestaDirecta`** (40–60 palabras, máx. 320 caracteres, destacada al inicio para lectura rápida e IA), `imagen` + `alt`, `cuerpo` y `faqs`.
  - Pestaña **2. Categoría, etiquetas y fotos**: `categoria`, `etiquetas`, `galeria` (cada foto con `alt`), `autor`, `autorRol` (cargo o especialidad), `actualizada`, `comentarios`.
  - Pestaña **3. Google e IA**: `seoTitulo` (≤ 70), `seoDescripcion` (≤ 160), `noindex`.

### 3. `3. Catálogo y tienda` *(si aplica al proyecto)*
- **Catálogo: ajustes** *(singleton `catalogoAjustes`)*: `mostrar`, `titulo`, `introduccion`, `tienda` (activar cobro Stripe), `textoBotonPago`, `textoBoton` (botón de consulta).
- **Categorías del catálogo** *(colección `categoria`)*: `orden`, `nombre`, `slug`, `descripcion`, `imagen` + `alt`.
- **Productos** *(colección `producto`)*: `nombre`, `slug`, `categoria`, `resumen`, `imagen` + `alt`, `precio` (número), `precioTexto` (ej. *«Desde 45 €»*), `enlacePago` (`https://buy.stripe.com...`, opcional), `disponible`, `destacado` (portada), `orden` y `descripcion` (texto libre).

### 4. `4. Contacto, buscadores y legal`
- **Contacto** *(singleton `contacto`)*: `texto` (explica qué pasa tras enviar y en qué plazo respondes; lleva a `/gracias`) y `mostrarFormulario`.
- **Preguntas frecuentes de la portada** *(colección `pregunta`, 4–5 FAQs)*: `orden`, `pregunta`, `respuesta` directa de 2–3 líneas sobre objeciones reales (precio, plazos, zona, primera visita). Alimenta `FAQPage` JSON-LD y `/llms.txt`.
- **Newsletter** *(singleton `newsletter`)*: `mostrar`, `titulo`, `texto`, `textoBoton`, `consentimiento` (qué recibe y cómo darse de baja; conectado a Brevo vía Netlify).
- **Consulta por WhatsApp** *(singleton `consultaWhatsapp`)*: `mostrar`, `titulo`, `texto`, `textoBoton`, `consentimiento` (aviso de registro en hoja de Google).
- **Reservas con Google Calendar** *(singleton `reservas`)*: `mostrar`, `titulo`, `texto`, `textoBoton`, `consentimiento`, `duraciones` (minutos), `precioPorHora`, `horaInicio`, `horaFin`, `dias`, `antelacionHoras`, `diasMaximos`.
- **Google, IA y buscadores** *(singleton `buscadores`)*: `titulo` (≤ 70 caracteres), `descripcion` (≤ 160 caracteres), `imagenCompartir` (1200 × 630 px en JPG/PNG/WebP), `publicarLlmsTxt` (`/llms.txt`). *(Los IDs `searchConsole`, `ga4`, `gtm` y `metaPixel` los pega el alumno tras crear sus cuentas).*
- **Datos legales** *(singleton `legal`)*: `titular`, `nif`, `domicilio`, `plazoConservacion`, y si hay tienda: `tipoVenta` (`fisica` | `digital`), `plazoEntrega`, `devoluciones`. *(Marcar como borradores de partida que el alumno debe confirmar con sus datos reales).*

## Qué se resuelve en Sanity Studio vs. código (`AGENTS.md`)

- **Todo lo anterior se hace en Sanity Studio sin programar.**
- **Requiere editar Astro (`web/src/`) o el esquema (`studio/schemas/index.ts`)** —siguiendo `AGENTS.md`— si el alumno pide: cambiar el orden de las secciones fijas en portada (`web/src/pages/index.astro`), crear un 4.º tema/estilo CSS (`web/src/styles/`), añadir campos nuevos al formulario o al panel (`studio/schemas/index.ts` → `web/src/data/negocio.json` → `web/src/lib/contenido.ts` → componente `.astro`), o modificar el HTML fijo de los componentes. En ese caso, indícalo claramente en lugar de fingir que existe un campo en Sanity.

## Reglas anti-invención y filtro anti-AI-slop

- **Cero datos inventados:** nunca añadas testimonios ficticios, años de experiencia no declarados, premios, sellos ni garantías absolutas (*«100 % garantizado»*). Si falta un dato concreto, escribe `[COMPLETAR CON DATO REAL]`.
- **Pasa el filtro de `humanizar-textos` antes de entregar:** elimina aperturas cliché (*«En el mundo actual…»*), adjetivos vacíos (*«solución integral, innovadora y personalizada»*), rayas largas excesivas y frases en tono de folleto corporativo.
- **Un único objetivo por bloque:** el lector debe entender en **5 segundos** qué ofreces, para quién es y qué botón pulsar.

## Salida

1. En **Modo MCP** (si está activo y el alumno confirma): borradores (`drafts.*`) guardados en Sanity Studio sin publicar ni borrar nada + resumen de cambios y campos pendientes.
2. En **Modo manual**: todos los textos listos para copiar y pegar con su ruta exacta en Sanity Studio + lista breve de `[DATOS PENDIENTES]` que el alumno debe confirmar antes de pulsar **Publish**.
