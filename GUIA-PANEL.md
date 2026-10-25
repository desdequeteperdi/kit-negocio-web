# Guía del panel: cambiar tu web sin código

El panel es donde editas los textos, imágenes y listas de tu web. Solo necesitas un navegador.

## Entrar

1. Abre la dirección de tu panel: `https://<tu-nombre>.sanity.studio`.
2. Inicia sesión con tu email personal.

## Qué hay en el menú

**Bloques fijos** (uno por cada parte de la web):

- Datos del negocio: nombre, datos de contacto, colores y **estilo de la web** (Clásico, Moderno o Editorial; cambia tipografía, formas y animaciones y se combina con los colores).
- Portada
- Quiénes somos
- Contacto
- Google y buscadores: título y descripción que aparecen en los resultados.
- Datos legales
- Blog: ajustes
- Catálogo: ajustes

**Listas** (puedes añadir y quitar elementos):

- Servicios
- Preguntas frecuentes
- Categorías del catálogo
- Productos
- Secciones extra de la portada
- Entradas del blog

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

- **Añadir:** abre la lista (Servicios, Preguntas frecuentes o Entradas del blog) y pulsa el botón **+** (Create). Rellena los campos y pulsa **Publish**.
- **Ordenar:** en Servicios y Preguntas frecuentes, el campo **Orden** decide la posición. El 1 sale primero.
- **Quitar:** abre el elemento, pulsa los tres puntos y elige **Delete**. Después de borrar, la web se actualiza igual que al publicar.

## Imágenes, vídeos y código HTML dentro de un texto

El texto de una entrada del blog y el contenido de una sección extra admiten tres tipos de bloque. Pulsa el **+** que aparece entre bloques y elige:

- **Texto:** párrafos con negrita, cursiva, enlaces y listas.
- **Imagen:** sube la foto, rellena la **Descripción de la imagen** y, si quieres, un **Pie de foto**. La web la reduce sola para que no pese.
- **Código HTML:** pega el código que te da otro servicio (un vídeo de YouTube, un mapa de Google Maps, un botón de reserva…). Se publica tal cual.

Usa solo código de fuentes de confianza. Un código mal pegado puede romper el aspecto de esa página, y un `<script>` se ejecuta en tu web. No pegues aquí Analytics ni el píxel de Meta: para eso están los campos de **Google y buscadores**, que piden consentimiento de cookies.

## Posicionar una entrada del blog (Google y asistentes de IA)

Cada entrada tiene estos campos, además del título y el texto:

- **Etiquetas:** palabras clave de la entrada. Cada etiqueta tiene su propia página en la web con todas las entradas que la usan.
- **Autor o autora:** aparece en la entrada y en los datos para Google. Si lo dejas vacío se usa el nombre del negocio.
- **Fecha de última actualización:** rellénala cuando revises o amplíes la entrada.
- **Preguntas frecuentes de esta entrada:** pulsa **+** y escribe pregunta y respuesta, cortas y directas. Se muestran al final de la entrada y se envían a buscadores y asistentes de IA. Escribe solo preguntas que de verdad se respondan en la entrada.
- **Título y descripción en Google (opcionales):** si los dejas vacíos se usan el título y el resumen. Máximo 70 y 160 caracteres.

La web añade sola los datos estructurados (artículo, migas de pan y preguntas frecuentes): no tienes que hacer nada más.

## Catálogo de productos

Sirve para enseñar lo que vendes, con o sin precio. No cobra: cada producto lleva un botón que abre el formulario de contacto con el nombre del producto ya escrito.

1. Abre **Catálogo: ajustes**, activa **Mostrar el catálogo**, revisa el título, la introducción y el texto del botón, y pulsa **Publish**.
2. Crea al menos una **Categoría del catálogo** (nombre, orden y, si quieres, descripción e imagen).
3. Crea tus **Productos**: nombre, categoría, resumen, imagen y descripción completa.
   - **Precio en euros:** solo el número (45 o 12.5). Si lo dejas vacío no se muestra precio.
   - **Texto del precio:** sustituye al precio en pantalla («Desde 45 €»). Los datos para Google usan el precio numérico.
   - **Disponible:** si lo desactivas, el producto sigue visible con el aviso «No disponible ahora».
   - **Mostrar en la portada:** los marcados salen en la franja del catálogo de la portada. Si no marcas ninguno, salen los más recientes.

El catálogo aparece en el menú y en el pie solo cuando está activado y hay al menos un producto con categoría. Cada producto tiene su propia página, con datos estructurados para Google.

## Secciones extra en la portada

En **Secciones extra de la portada** pulsa **+** para añadir un bloque a la portada. Rellena:

- **Dónde aparece:** después de Servicios, después de Quiénes somos o antes de Contacto.
- **Orden:** si hay varias en el mismo sitio, el 1 sale primero.
- **Título:** opcional.
- **Contenido:** texto, imágenes y código HTML, como en el blog.
- **Mostrar esta sección:** desmárcalo para ocultarla sin borrarla.

## Ver el cambio en la web

Al publicar, la web se vuelve a generar. Tarda uno o dos minutos. Si no ves el cambio:

1. Espera un par de minutos y recarga la página (Ctrl+F5 o Cmd+Shift+R).
2. Comprueba que pulsaste **Publish** y que no quedó en borrador.
3. Entra en Netlify, pestaña **Deploys**: el último debe poner *Published*. Si pone *Failed*, abre el registro y enséñaselo a quien te da el curso.

## Imagen al compartir la web

En **Google y buscadores** puedes subir una **Imagen al compartir la web**: es la que se ve cuando alguien pega el enlace en WhatsApp, redes o LinkedIn. Mejor horizontal, de 1200 × 630 px, en JPG o PNG. Si la dejas vacía se usa la de la portada, siempre que no sea un SVG.

## Google Analytics, píxel de Meta y Search Console

En **Google y buscadores** hay tres campos opcionales. Pega solo el código, no el script completo:

- **Código de Google Search Console:** el valor de `content` de la etiqueta meta de verificación.
- **ID de Google Analytics 4:** empieza por `G-`.
- **ID del píxel de Meta:** un número de 15 o 16 cifras.

Si rellenas Analytics o el píxel, la web muestra un aviso de cookies. Los scripts solo se cargan si la persona pulsa **Aceptar**. Con el campo vacío no se carga nada. La política de privacidad añade un párrafo de cookies por sí sola. Como todos los textos legales del kit, es un punto de partida: revísalo antes de usarlo con datos reales.

## Qué no se puede hacer desde el panel

- Cambiar el diseño de las secciones fijas ni su orden. Las secciones extra solo se colocan en los tres sitios indicados.
- Añadir campos nuevos que no estén en el panel.

Eso se hace en el código (GitHub) y, si necesita un campo nuevo en el panel, hace falta además un comando en terminal.
