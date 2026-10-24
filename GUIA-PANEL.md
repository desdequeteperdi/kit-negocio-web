# Guía del panel: cambiar tu web sin código

El panel es donde editas los textos, imágenes y listas de tu web. Solo necesitas un navegador.

## Entrar

1. Abre la dirección de tu panel: `https://<tu-nombre>.sanity.studio`.
2. Inicia sesión con tu email personal.

## Qué hay en el menú

**Bloques fijos** (uno por cada parte de la web):

- Datos del negocio: nombre, datos de contacto y colores de la web.
- Portada
- Quiénes somos
- Contacto
- Google y buscadores: título y descripción que aparecen en los resultados.
- Datos legales
- Blog: ajustes

**Listas** (puedes añadir y quitar elementos):

- Servicios
- Preguntas frecuentes
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

- Cambiar el diseño ni mover secciones.
- Añadir campos nuevos que no estén en el panel.

Eso se hace en el código (GitHub) y, si necesita un campo nuevo en el panel, hace falta además un comando en terminal.
