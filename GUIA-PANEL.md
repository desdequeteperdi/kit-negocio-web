# Guía del panel: cambiar tu web sin código

El panel es donde editas los textos, imágenes y listas de tu web. Solo necesitas un navegador.

## Entrar

1. Abre la dirección de tu panel: `https://<tu-nombre>.sanity.studio` (no es la de tu web de Netlify).
2. Inicia sesión con tu email personal.

## Qué hay en el menú

El menú de la izquierda está organizado en **cuatro grupos** para que encuentres cada apartado sin perderte:

1. **1. Mi negocio y portada**
   - **Datos del negocio:** nombre, descripción, **tipo de actividad** (para Google), contacto, horario, **redes sociales** (Instagram, YouTube, TikTok, Facebook y otra; las vacías no se muestran y las demás salen en el pie), colores y **estilo de la web** (Clásico, Moderno o Editorial).
   - **Portada:** titular, presentación, botón e imagen principal.
   - **Quiénes somos:** presentación y puntos destacados.
   - **Servicios** y **Secciones extra de la portada** (listas donde puedes añadir, ordenar o quitar elementos).
   - **Páginas y landings de campaña:** subpáginas independientes (`/{direccion-web}`) para separar apartados (como *Quiénes somos*) o crear landings específicas para anuncios y redes, eligiendo si salen o no en el menú superior.
   - **Página /enlaces (Link in bio):** página móvil con tus botones clave, WhatsApp, últimos artículos del blog y redes para poner en tu biografía de Instagram, TikTok o LinkedIn.
2. **2. Blog**
   - **Blog: ajustes y comentarios:** activar el blog, título, introducción y activar o desactivar los **comentarios** (con tu ID de Cusdis).
   - **Entradas del blog:** artículos organizados en tres pestañas (*1. Artículo*, *2. Categoría, etiquetas y fotos* y *3. Google e IA*).
3. **3. Catálogo y tienda**
   - **Catálogo: ajustes**, **Categorías del catálogo** y **Productos**.
4. **4. Contacto, buscadores y legal**
   - **Contacto**, **Preguntas frecuentes de la portada**, **Newsletter**, **Google, IA y buscadores** (título, descripción, imagen al compartir, resumen `/llms.txt` para asistentes de IA, Search Console, Analytics y píxel) y **Datos legales**.

## Cambiar un texto

1. Abre el bloque en el menú de la izquierda.
2. Haz clic en el campo y escribe. El borrador se guarda solo.
3. Pulsa **Publish** (botón verde, abajo a la derecha). Hasta que no lo pulses, la web no ve el cambio.

## Cambiar una imagen

1. Abre el bloque (por ejemplo, Portada).
2. Arrastra la foto al campo **Imagen** o pulsa para elegirla.
3. Rellena **Descripción de la imagen**: sirve para personas que usan lector de pantalla y para Google. La web la usa como texto alternativo.
4. Pulsa **Publish**.

## Añadir, ordenar y quitar elementos de una lista

- **Añadir:** abre la lista (Servicios, Preguntas frecuentes o Entradas del blog) y pulsa el botón **+** (Create). En *Entradas del blog* puedes elegir entre una entrada en blanco o una de las plantillas listas (*Guía práctica / Tutorial*, *Caso práctico / Antes y después* o *Comparativa / Preguntas frecuentes*). Rellena los campos y pulsa **Publish**.
- **Ordenar:** en Servicios y Preguntas frecuentes, el campo **Orden** decide la posición. El 1 sale primero.
- **Quitar:** abre el elemento, pulsa los tres puntos y elige **Delete**. Después de borrar, la web se actualiza igual que al publicar.

## Imágenes, galerías, vídeos y código HTML dentro de un texto

Puedes preparar o recortar tus fotos antes en **Canva** y descargarlas en **JPG, PNG o WebP** (el panel bloquea formatos no compatibles como SVG para no romper las vistas previas en redes sociales).

El texto de una entrada del blog, la descripción de un producto y el contenido de una sección extra admiten cuatro tipos de bloque. Pulsa el **+** que aparece entre bloques y elige:

- **Texto:** párrafos con negrita, cursiva, encabezados H2/H3, enlaces y listas.
- **Imagen:** sube una foto, rellena la **Descripción de la imagen** (texto alternativo para accesibilidad y Google) y, si quieres, un **Pie de foto**. La web la reduce sola para que no pese.
- **Galería de imágenes:** sube varias fotos de una vez y elige si quieres mostrarlas en **Cuadrícula de fotos** o en **Carrusel deslizable**. Además, en la pestaña *2. Categoría, etiquetas y fotos* de cada entrada tienes el campo **Galería de fotos de la entrada** por si prefieres añadir una o varias fotos directamente al final del artículo.
- **Código HTML:** pega el código que te da otro servicio (un vídeo de YouTube, un reproductor de audio o podcast, una presentación, un mapa de Google Maps, un botón de reserva…). Se publica tal cual.

Usa solo código de fuentes de confianza. Un código mal pegado puede romper el aspecto de esa página, y un `<script>` se ejecuta en tu web. No pegues aquí Analytics ni el píxel de Meta: para eso están los campos de **Google, IA y buscadores**, que piden consentimiento de cookies.

### Ejemplos de `<iframe>` para el bloque Código HTML

1. **Vídeo de YouTube:** debajo del vídeo pulsa *Compartir → Insertar* y copia el `<iframe>`:
   ```html
   <iframe width="100%" height="400" src="https://www.youtube.com/embed/ID_DEL_VIDEO" title="Título del vídeo" frameborder="0" allowfullscreen></iframe>
   ```
2. **Audio o podcast (Spotify / Ivoox):** pulsa *Compartir → Insertar episodio/programa* y pega el `<iframe>`:
   ```html
   <iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/ID_EPISODIO" width="100%" height="152" frameborder="0" allowfullscreen></iframe>
   ```
   *(En Ivoox: *Compartir → Código de inserción* y pega el `<iframe>` que genera).*
3. **Presentación o documento (Canva / SlideShare):** en Canva pulsa *Compartir → Más → Insertar* (código HTML) o en SlideShare *Compartir → Insertar* y pega el `<iframe>`:
   ```html
   <iframe loading="lazy" style="width:100%;height:420px;border:0;" src="https://www.canva.com/design/ID_DISENO/view?embed" allowfullscreen></iframe>
   ```

## Posicionar una entrada del blog (Google y asistentes de IA)

Cada entrada está dividida en tres pestañas para trabajar con orden:

- **1. Artículo:**
  - **Título, Dirección web y Fecha** (por defecto se rellena sola con la fecha de hoy).
  - **Resumen:** una o dos frases para el listado del blog y descripción por defecto.
  - **En resumen / Respuesta directa (opcional):** responde en 40–60 palabras a la duda principal del artículo. Aparece destacada al principio de la entrada y ayuda a que los buscadores y asistentes de IA citen tu contenido.
  - **Imagen principal, Texto del artículo y Preguntas frecuentes de esta entrada:** escribe solo preguntas con respuestas cortas y directas que de verdad se respondan en la entrada.
- **2. Categoría, etiquetas y fotos:**
  - **Categoría:** clasificación principal del artículo (por ejemplo, *Terrazas* o *Mantenimiento*). Cada categoría genera sola su página en `/blog/categoria/…`.
  - **Etiquetas:** palabras clave transversales. Cada etiqueta tiene su propia página en `/blog/etiqueta/…`.
  - **Galería de fotos de la entrada:** para mostrar 1 o varias fotos adicionales en cuadrícula sin tener que insertarlas entre párrafos.
  - **Autor o autora** y **Cargo o especialidad:** refuerzan la autoría y credibilidad ante lectores, Google y asistentes de IA.
  - **Fecha de última actualización** y **Comentarios en esta entrada** (seguir el ajuste general del blog, activarlos solo en esta entrada o desactivarlos).
- **3. Google e IA:**
  - **Título y descripción en Google (opcionales):** máximo 70 y 160 caracteres.
  - **Ocultar esta entrada de Google y asistentes de IA:** actívalo si es una entrada de prueba en clase que no quieres indexar ni incluir en `/llms.txt`.

La web añade sola los datos estructurados (artículo, migas de pan con categoría y preguntas frecuentes), los botones ligeros para compartir cada entrada (WhatsApp, LinkedIn, X y copiar enlace, sin cookies), el feed `/rss.xml` (para lectores como Feedly o automatizar envíos en Brevo) y actualiza `/llms.txt`: no tienes que hacer nada más.

## Comentarios en el blog (con Cusdis)

Puedes activar o desactivar los comentarios tanto en todo el blog (**2. Blog → Blog: ajustes y comentarios**) como en una entrada concreta (pestaña **2. Categoría, etiquetas y fotos → Comentarios en esta entrada**).

Para recibir y moderar comentarios reales sin necesidad de programar:

1. Crea una cuenta gratuita en <https://cusdis.com> y añade tu web.
2. En el panel de Cusdis pulsa **Embed code** y copia solo el valor de `data-app-id` (un código con letras, números y guiones).
3. Pégalo en **Blog: ajustes y comentarios → ID de Cusdis**, activa **Activar comentarios en las entradas** y pulsa **Publish**.
4. Cuando alguien deje un comentario, quedará pendiente de moderación en Cusdis hasta que lo apruebes.

## Catálogo de productos

Sirve para enseñar lo que vendes, con o sin precio. Por defecto no cobra: cada producto lleva un botón que abre el formulario de contacto con el nombre del producto ya escrito. Si quieres cobrar, mira «Vender con Stripe» más abajo.

1. Abre **Catálogo: ajustes**, activa **Mostrar el catálogo**, revisa el título, la introducción y el texto del botón, y pulsa **Publish**.
2. Crea al menos una **Categoría del catálogo** (nombre, orden y, si quieres, descripción e imagen).
3. Crea tus **Productos**: nombre, categoría, resumen, imagen y descripción completa.
   - **Precio en euros:** solo el número (45 o 12.5). Si lo dejas vacío no se muestra precio.
   - **Texto del precio:** sustituye al precio en pantalla («Desde 45 €»). Los datos para Google usan el precio numérico.
   - **Disponible:** si lo desactivas, el producto sigue visible con el aviso «No disponible ahora».
   - **Mostrar en la portada:** los marcados salen en la franja del catálogo de la portada. Si no marcas ninguno, salen los más recientes.

### Vender con Stripe (enlaces de pago)

0. En **Catálogo: ajustes** activa **Activar la tienda**. Sin eso, los enlaces de pago se ignoran.
1. En <https://dashboard.stripe.com> crea una cuenta y, en **Catálogo de productos**, el producto con su precio.
2. Pulsa **Crear enlace de pago**. Copia el enlace (empieza por `https://buy.stripe.com`).
3. En el producto del panel, pégalo en **Enlace de pago** y pulsa **Publish**.
4. En **Datos legales** elige **qué vendes** (físicos o digitales) y rellena el **plazo de entrega** (y las **devoluciones**, si son físicos). La web crea sola la página «Condiciones de venta» y añade el aviso de compras a la política de privacidad.

El producto muestra un botón de compra que lleva a la página de pago de Stripe, y debajo sigue el botón de consultar. Sin enlace de pago, solo hay consulta. Si desactivas **Disponible**, el botón de compra desaparece.

**Productos digitales:** en el enlace de pago de Stripe activa la casilla de **términos de servicio** con un texto como «Acepto la entrega inmediata del contenido digital y que pierdo el derecho de desistimiento» y, en **Después del pago**, pon una redirección a la página con la descarga o un mensaje con el enlace. Quien tenga ese enlace podrá usarlo: no lo compartas en otro sitio.

Stripe cobra y emite el recibo; el IVA, los envíos y el stock los gestionas tú. No hay carrito: cada enlace cobra un solo producto. Prueba antes con el modo de pruebas de Stripe y revisa los textos legales (son un punto de partida).

El catálogo aparece en el menú y en el pie solo cuando está activado y hay al menos un producto con categoría. Cada producto tiene su propia página, con datos estructurados para Google.

## Secciones extra en la portada

En **Secciones extra de la portada** pulsa **+** para añadir un bloque a la portada. Rellena:

- **Dónde aparece:** después de Servicios, después de Quiénes somos o antes de Contacto.
- **Orden:** si hay varias en el mismo sitio, el 1 sale primero.
- **Título:** opcional.
- **Contenido:** texto, imágenes y código HTML, como en el blog.
- **Mostrar esta sección:** desmárcalo para ocultarla sin borrarla.

## Subpáginas, landings de campaña y `/enlaces`

1. **Crear una subpágina o landing (`1. Mi negocio y portada → Páginas y landings de campaña → +`):**
   - Elige una plantilla (**Subpágina corporativa** o **Landing de campaña**) o una página en blanco.
   - **Subpágina de la web** *(ej. `/quienes-somos`)*: activa **Mostrar enlace en el menú superior** (y si sustituye a la sección de portada, puedes apagar *Mostrar esta sección* en *Quiénes somos*).
   - **Landing de campaña** *(ej. `/campana-terrazas`)*: deja **Mostrar enlace en el menú superior** desactivado para que no aparezca en la cabecera, añade un botón de llamada a la acción y activa **Mostrar formulario de contacto al final**. Puedes marcar **Ocultar de Google y asistentes de IA** si es una prueba o campaña temporal.
2. **Activar tu página `/enlaces` (`1. Mi negocio y portada → Página /enlaces`):**
   - Activa **Activar página /enlaces**, escribe tu presentación breve y añade botones hacia tus landings, servicios o enlaces externos (empezando por `/` o `https://`).
   - Copia tu URL `https://<tu-web>.netlify.app/enlaces` (con UTM si quieres) y pégala en la biografía de Instagram, TikTok o LinkedIn.

## Ver el cambio en la web

Al publicar, la web se vuelve a generar sola (si hiciste el paso 6 de la guía de alta). Tarda uno o dos minutos. Si no ves el cambio:

1. Espera un par de minutos y recarga la página (Ctrl+F5 o Cmd+Shift+R).
2. Comprueba que pulsaste **Publish** y que no quedó en borrador.
3. Entra en Netlify, pestaña **Deploys**: el último debe poner *Published*. Si pone *Failed*, abre el registro y enséñaselo a quien te da el curso.
4. Si no hay ningún despliegue nuevo, el webhook no está bien: revisa el paso 6 de la guía de alta. Mientras tanto, **Trigger deploy → Deploy site** lo lanza a mano.

## Imagen al compartir la web

En **Google y buscadores** puedes subir una **Imagen al compartir la web**: es la que se ve cuando alguien pega el enlace en WhatsApp, redes o LinkedIn. Mejor horizontal, de 1200 × 630 px, en JPG o PNG. Si la dejas vacía se usa la de la portada, siempre que no sea un SVG.

## Google Analytics, Google Tag Manager, píxel de Meta y Search Console

En **Google, IA y buscadores** hay cuatro campos opcionales. Pega solo el código, no el script completo:

- **Código de Google Search Console:** el valor de `content` de la etiqueta meta de verificación.
- **ID de Google Analytics 4:** empieza por `G-`.
- **ID de Google Tag Manager:** empieza por `GTM-` (opcional, si gestionas etiquetas de GA4 o eventos desde Google Tag Manager; si ya cargas GA4 dentro de GTM, deja vacío el campo de GA4 para no duplicar visitas).
- **ID del píxel / Conjunto de datos de Meta:** número único de 15 o 16 cifras (en Meta actual, *Conjunto de datos / Dataset ID* une Píxel y API de conversiones). Además de `PageView` en toda la web (incluidas landings y `/enlaces`), la página `/gracias` dispara automáticamente el evento **`Lead`** cuando se aceptan las cookies.
- **Meta Conversions API / CAPI *(opcional, en Netlify)*:** como usa el mismo ID de Conjunto de datos que ya pusiste en Sanity, solo tienes que añadir en **Netlify → Environment variables** tu token secreto **`META_CAPI_TOKEN`** (y, para probar en *Probar eventos* de Meta, `META_TEST_EVENT_CODE`). Ambos envíos comparten el mismo `event_id` para que Meta los deduplice automáticamente. Si no pones `META_CAPI_TOKEN`, solo funciona el píxel del navegador.

Si rellenas Analytics, Tag Manager o el píxel, la web muestra un aviso de cookies. Los scripts solo se cargan si la persona pulsa **Aceptar**. Con el campo vacío no se carga nada. La política de privacidad añade un párrafo de cookies por sí sola. Como todos los textos legales del kit, es un punto de partida: revísalo antes de usarlo con datos reales.

## Qué no se puede hacer desde el panel

- Cambiar el diseño de las secciones fijas ni su orden. Las secciones extra solo se colocan en los tres sitios indicados.
- Añadir campos nuevos que no estén en el panel.

Eso se hace en el código (GitHub) y, si necesita un campo nuevo en el panel, hace falta además un comando en terminal.
