---
name: auditar-web-seo
description: Audita una web del kit  (conversión móvil, prueba social verificable, SEO global y por página, perfil local físico/SAB/remoto, AEO /llms.txt, tienda/módulos y privacidad) separando qué se corrige en Sanity Studio y qué en Astro/esquemas. Use when se revisa la web en Sesión 4, 6 u 8 o al preparar el lanzamiento.
---

# Auditar conversión, SEO local y AEO (`kit-negocio-web`)

Objetivo: detectar fallos reales de **claridad comercial, confianza, SEO local, respuestas en IA (AEO), tienda/captación y privacidad** sin inventar métricas ni exigir herramientas de pago, separando claramente lo editable en **Sanity Studio** de lo que requiere código en **Astro (`web/src/`)** o **esquemas (`studio/schemas/index.ts`)**.

## Antes de empezar

1. Lee `MEMORIA.md` (si existe) para saber qué vende el negocio, cuál es su acción principal, si es proyecto real o caso ficticio, y qué perfil local tiene:
   - **Perfil 1 · Local físico** (atención en tienda/estudio/despacho).
   - **Perfil 2 · A domicilio / área de servicio (SAB)** (dirección oculta en Maps).
   - **Perfil 3 · 100 % online / remoto** (sin ficha de Google Maps).
2. **Alcance de la inspección:** audita siempre la **URL publicada**, **`http://localhost:4321`** o la salida compilada **`web/dist/`** (generada con `npm run build`). **Nunca audites `studio/` como web pública.** Si tienes Playwright MCP (`npm run mcp`), inspecciona la web renderizada en móvil (`390×844`) y escritorio; si no, lee `web/dist/` o pide que peguen la URL o el texto visible.
3. Si está activo el **MCP de Sanity**, lee también el estado real de los documentos en Sanity (`negocio`, `portada`, `sobre`, `resenas`, `buscadores`, `legal`, `pagina`, `entrada`, `producto`, `enlaces`, etc.) para comprobar campos que no se ven a simple vista (como `noindex`, `publicarLlmsTxt`, `ga4`/`gtm`/`metaPixel` o `alt`).

## Checklist de auditoría en 6 bloques

### 1. Claridad, rutas del kit y conversión en móvil (primeros 5 segundos)
- ¿Se entiende qué vendes, para quién y dónde sin hacer scroll en móvil?
- ¿El botón principal lleva a una única acción clara y el teléfono/WhatsApp tienen buen tamaño táctil?
- ¿Quedan textos de ejemplo de `web/src/data/negocio.json` sin sustituir (*«Estudio Almendro»*, *«hola@ejemplo.invalid»*, *«ejemplo»*, `/img-portada.svg`)?
- Si usa **Páginas y landings de campaña (`/[slug]`)**: ¿las landings de campaña tienen `mostrarEnMenu: false` para no ensuciar la cabecera y un CTA claro hacia `#contacto` o WhatsApp?
- Si usa **`/enlaces` (Link in bio)**: ¿los botones apuntan a las prioridades reales de `MEMORIA.md` y no a enlaces rotos?

### 2. Señales de confianza reales (cero humo)
- ¿Las afirmaciones de *Servicios* y *Quiénes somos* (`sobre`) son comprobables?
- Si muestra testimonios o reseñas: ¿usa **1. Mi negocio y portada → Reseñas y perfiles verificados** (`resenas`) con sellos y URLs reales a **Google Maps, ProvenExpert, Trustpilot, LinkedIn o un directorio sectorial**? *(Si hay citas sin fuente ni contexto real en un proyecto real, márcalo como riesgo de credibilidad; si aún no hay reseñas reales, debe permanecer desactivado).*

### 3. SEO técnico, global y por página
- **Global y portada (`4. Contacto, buscadores y legal → Google, IA y buscadores`, singleton `buscadores`):**
  - `titulo` (`≤ 70` caracteres): incluye servicio principal + zona/público (evita *«Inicio»* o solo el nombre).
  - `descripcion` (`≤ 160` caracteres): explica beneficio y siguiente paso.
  - `imagenCompartir` (`og:image`): horizontal `1200 × 630 px` en JPG, PNG o WebP (no SVG; si se deja vacía usa la de portada si no es SVG).
- **Por página o entrada (`pagina` y `entrada` → pestaña `3. Google e IA`):**
  - ¿Tienen `seoTitulo` (≤ 70), `seoDescripcion` (≤ 160) o un buen `subtitulo`/`resumen` de respaldo?
  - ¿Tienen `noindex` desactivado las páginas que sí deben indexar, y activado solo en pruebas de clase o landings temporales?
- **Catálogo, `/enlaces` y legales:** las fichas de `producto`, `categoria`, `/enlaces`, `/aviso-legal`, `/privacidad` y `/condiciones` no tienen pestaña SEO propia en el esquema actual (`studio/schemas/index.ts`): heredan `nombre`/`resumen` o los valores globales.
- **Imágenes (`alt`):** todas las imágenes en `portada`, `pagina`, `entrada` (principal y galería), `categoria`, `producto`, `enlaces` y bloques `bloqueImagen`/`bloqueGaleria` tienen `alt` descriptivo (o vacío solo si es decorativa).
- **JSON-LD (`web/src/components/DatosEstructurados.astro`):** `tipoNegocio` coherente (`LocalBusiness`, `ProfessionalService`, `Store`, `HealthAndBeautyBusiness`, `HomeAndConstructionBusiness`, `FoodEstablishment`), `areaServed` sin exponer domicilio privado y `sameAs` con redes y `resenas.perfiles`.
- **Rastreo:** existen `/sitemap-index.xml` y `/robots.txt` tras compilar.

### 4. Estrategia local y AEO (`/llms.txt`)
- **Coherencia con el perfil (1, 2 o 3):** si es a domicilio (SAB) o remoto, verifica que **no** muestra su dirección particular en portada, pie ni `Datos del negocio → zona`; si tiene local físico, comprueba consistencia **NAP** (Nombre, Zona/Dirección, Teléfono).
- **`/llms.txt` (`buscadores.publicarLlmsTxt`):** comprueba si está activo y si resume limpiamente negocio, servicios, reseñas verificadas, FAQs, páginas públicas, `/enlaces`, entradas del blog (`respuestaDirecta` o `resumen`) y catálogo (excluyendo documentos con `noindex`).
- **Blog AEO (`entrada`):** ¿incluyen las entradas clave `respuestaDirecta` (40–60 palabras al inicio), `faqs` cortas y `autor` / `autorRol`? *(Recuerda: `/llms.txt` y JSON-LD ayudan a estructurar datos, pero no garantizan ranking ni citas en IA).*

### 5. Tienda, reservas y captación *(si están activos)*
- **Catálogo / Stripe (`catalogoAjustes`, `producto`):** si `tienda` está activo, comprueba que los productos cobrables tienen `enlacePago` válido (`https://buy.stripe.com...`), precio numérico coherente y que `Datos legales` incluye `tipoVenta` (`fisica`|`digital`), `plazoEntrega` y `devoluciones` (genera `/condiciones`).
- **Módulos opcionales (`consultaWhatsapp`, `reservas`, `newsletter`):** si están activados (`mostrar: true`), verifica que `whatsapp` está puesto en `negocio`, los textos de `consentimiento` son claros, y en `reservas` el horario (`horaInicio`, `horaFin`), `duraciones` y `precioPorHora` tienen sentido.

### 6. Privacidad, cookies y datos legales
- Si recoge datos reales (formulario `/gracias`, `Consulta por WhatsApp`, `Reservas`, `Newsletter` Brevo): ¿están completos **4. Contacto, buscadores y legal → Datos legales** (`titular`, `nif`, `domicilio`, `plazoConservacion`)?
- Si hay `ga4`, `gtm` o `metaPixel` en `buscadores`: ¿aparece el banner de `Consentimiento.astro` y **bloquea** los scripts hasta pulsar *Aceptar* (y en `/gracias` solo dispara `Lead` si hay consentimiento)? Si carga ambos `ga4` y `gtm` con GA4 dentro de GTM, avisa del riesgo de duplicar visitas.

## Doble modo de trabajo y separación Sanity Studio vs. Código

### Modo 1 · Con MCP de Sanity activo
Para los fallos que se resuelven en contenido (SEO, `alt`, `respuestaDirecta`, `noindex`, `tipoNegocio`, textos de `portada`/`contacto`/`legal`):
- Lee primero el documento afectado en Sanity y propón los cambios exactos.
- **Pide confirmación explícita al alumno antes de escribir.**
- Aplica los cambios **solo en borrador (`drafts.*`)**, respetando los *singletons* y sin publicar ni borrar nada sin autorización.

### Modo 2 · Sin MCP / edición manual
- Indica para cada arreglo de contenido la **ruta exacta en Sanity Studio** (p. ej. `4. Contacto, buscadores y legal → Google, IA y buscadores → Descripción en Google`) y el texto propuesto listo para copiar y pegar (recordando pulsar **Publish**).

### Separación explícita en el informe
Clasifica siempre cada hallazgo según dónde se corrige:
1. **En Sanity Studio (sin programar):** textos, títulos/descripciones SEO de portada/páginas/entradas, `alt`, `imagenCompartir` (1200×630 JPG/PNG/WebP), `publicarLlmsTxt`, `resenas`, `legal`, activar/desactivar módulos o secciones extra (`seccion`).
2. **En Astro / esquemas (`web/src/` o `studio/schemas/index.ts`):** requiere editar código o usar un agente de código siguiendo `AGENTS.md` (por ejemplo: cambiar el orden fijo de portada en `web/src/pages/index.astro`, añadir SEO por producto en `studio/schemas/index.ts` + `negocio.json` + `contenido.ts` + página `.astro`, o tocar `DatosEstructurados.astro` / `Consentimiento.astro`).
3. **Configuración externa (Netlify / Google / Stripe / Brevo):** variables de entorno en Netlify (`BREVO_API_KEY`, `APPS_SCRIPT_URL`, `RESERVAS_SCRIPT_URL`, `META_CAPI_TOKEN`, `INDEXNOW_KEY`), Apps Script `.gs` o Google Business Profile.

## Salida

Entrega un informe breve ordenado por impacto:
1. **3 fallos prioritarios a corregir hoy** (indicando si van en **Sanity Studio**, **Astro/esquema** o **externo**, con la ruta exacta o borrador propuesto).
2. **Mejoras recomendadas** para SEO local, AEO (`/llms.txt`, `respuestaDirecta`, `faqs`) y reseñas verificables.
3. **Qué está ya bien resuelto.**
