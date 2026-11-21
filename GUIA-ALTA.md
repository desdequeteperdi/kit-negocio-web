# Guía de alta: tu web, tu panel y tu publicación

Al terminar tendrás tu propia copia del kit funcionando con tus cuentas:

- **GitHub:** guarda el código de tu web.
- **Sanity:** es el panel donde editas los textos e imágenes.
- **Netlify:** publica tu web en internet.

Usa siempre **tu email personal**, no el de ninguna empresa. Las tres cuentas se crean con GitHub, así que solo recordarás una contraseña.

## 1. Instala lo necesario en tu ordenador

1. **Node.js, versión LTS:** descárgala de <https://nodejs.org> e instálala con las opciones por defecto. Hace falta la versión 22.12 o superior; la LTS actual lo cumple.
2. **Git:** descárgalo de <https://git-scm.com> e instálalo con las opciones por defecto.
3. **Visual Studio Code** (tu editor de texto): descárgalo de <https://code.visualstudio.com> e instálalo con las opciones por defecto. Lo usarás para abrir el proyecto, tocar archivos de configuración y tener la terminal a mano.

### Cómo abrir la terminal

La terminal es la ventana donde escribes los comandos. La forma más fácil es abrirla desde Visual Studio Code, ya dentro de la carpeta del proyecto (lo harás en el paso 2):

- Menú **Terminal → Nueva terminal** (si está en inglés, *Terminal → New Terminal*).
- Se abre un panel en la parte de abajo. Todo lo que en esta guía dice «escribe» o «ejecuta» se escribe ahí, y se confirma con **Intro**.

Si instalaste Node o Git con Visual Studio Code ya abierto, **ciérralo y vuelve a abrirlo** para que los reconozca. Para comprobarlo, en la terminal escribe `node -v` y pulsa Intro; después `git --version` y Intro. Los dos deben mostrar un número de versión (de Node, 22 o más).

> **Windows: si sale «la ejecución de scripts está deshabilitada».** Es un bloqueo de PowerShell, no un fallo tuyo. Abre **PowerShell** desde el menú Inicio, pega esto y pulsa Intro:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```
>
> Responde `S` (o `Y`) si te pregunta, cierra Visual Studio Code, vuelve a abrirlo y repite el comando que falló.

## 2. GitHub: cuenta y copia del kit

1. Crea tu cuenta en <https://github.com> con tu email personal.
2. Abre <https://github.com/desdequeteperdi/kit-negocio-web> y pulsa **Fork** (arriba a la derecha). Así tienes tu propia copia en tu cuenta: `github.com/<tu-usuario>/kit-negocio-web`.
3. En tu copia pulsa **Code**, copia la dirección HTTPS (empieza por `https://github.com/`).
4. **Elige la carpeta donde guardarás tus proyectos.** No tienes que crear la del kit: se crea sola en el paso siguiente. Abre Visual Studio Code, ve a **Archivo → Abrir carpeta…** (en Mac, **Archivo → Abrir…**) y, en la ventana que sale, pulsa **Nueva carpeta** y llámala `proyectos`:

   - **Windows:** créala dentro del disco `C:` (quedará `C:\proyectos`). Evita Documentos: en Windows suele sincronizarse con OneDrive y el proyecto tiene miles de archivos que ralentizan o dan problemas.
   - **Mac:** créala dentro de tu carpeta personal (la que lleva tu nombre).

   Selecciónala, pulsa **Seleccionar carpeta** (en Mac, **Abrir**) y, si pregunta si confías en los autores, pulsa **Sí, confío**.
5. Abre la terminal con **Terminal → Nueva terminal**. Ya está dentro de `proyectos`: lo verás escrito al principio de la línea. Escribe, sustituyendo el texto entre `<` y `>` por la dirección que copiaste:

   ```bash
   git clone <la-dirección-que-has-copiado>
   ```

   Si Git te pide iniciar sesión en GitHub, hazlo en la ventana del navegador que se abre. Al terminar, dentro de `proyectos` habrá una carpeta nueva llamada `kit-negocio-web`.
6. **Abre el proyecto.** En Visual Studio Code: **Archivo → Abrir carpeta…** (en Mac, **Archivo → Abrir…**), entra en `proyectos`, elige `kit-negocio-web` y pulsa **Seleccionar carpeta** (en Mac, **Abrir**). Si pregunta si confías en los autores, pulsa **Sí, confío**. Abre una terminal nueva (**Terminal → Nueva terminal**): ya estará dentro del proyecto. **Desde aquí, todos los comandos de la guía se escriben en esta terminal.**
7. Instala las dependencias. La primera vez puede tardar **entre 3 y 10 minutos**, según tu conexión, y salen muchas líneas de texto: es normal, no cierres la terminal:

   ```bash
   npm run instalar
   ```

   Termina bien cuando vuelve a aparecer el cursor y ves `✔ Listo`.

   > **Avisos en amarillo.** Durante la instalación pueden salir líneas que empiezan por `npm warn` (por ejemplo, «deprecated», «19 vulnerabilities» o «install-scripts»). **Ignóralos:** son avisos habituales y no impiden que funcione. Solo es un problema si la instalación se detiene y aparece la palabra `ERR` en rojo; en ese caso, mira «Si algo falla» al final de esta guía.

## 3. Sanity: cuenta y proyecto

1. Entra en <https://www.sanity.io> y regístrate con **Continue with GitHub**.
2. Crea un proyecto nuevo desde <https://www.sanity.io/manage>. Elige el plan gratuito y el dataset `production`.
3. Dentro del proyecto copia el **Project ID** (una cadena corta de letras minúsculas y números). Lo necesitas en los pasos 4, 5 y 6.

## 4. Conecta tu copia con tu panel

1. Conecta tu copia con tu proyecto. En la terminal de Visual Studio Code, desde la carpeta principal del proyecto, escribe y pulsa Intro:

   ```bash
   npm run configurar
   ```

   Te hará tres preguntas. Responde y pulsa Intro después de cada una:

   - **Pega tu Project ID:** pega el que copiaste en el paso 3 (en la terminal de Visual Studio Code, `Ctrl + V`; en Mac, `Cmd + V`; también vale clic derecho → Pegar). Debe tener solo letras minúsculas y números.
   - **Nombre de tu panel:** lo eliges tú. Será la dirección de tu panel: `https://nombre-de-tu-panel.sanity.studio`. Usa solo minúsculas, números y guiones, sin espacios ni tildes (por ejemplo, `mi-negocio`).

   - **¿Quieres ahora iniciar sesión en Sanity, cargar el contenido de ejemplo y publicar el panel? (s/n):** escribe `s` y pulsa Intro. Se abrirá el navegador: elige **GitHub** y acepta. Después vuelve a la terminal y espera: cargará el contenido de ejemplo y publicará tu panel él solo. Si prefieres hacerlo paso a paso, escribe `n` y sigue los pasos 2 a 4 de más abajo.

   Si escribes algo no válido, te lo dice y te lo vuelve a preguntar. Los dos primeros pasos terminan con `✔ Escrito: studio/.env` y `✔ Escrito: web/.env`. No tienes que abrir ni editar ningún archivo. Puedes repetir el comando cuando quieras para cambiar el ID o el nombre del panel; si ya existen los archivos, te pide confirmación antes de actualizarlos.

   **Si respondiste `s` y termina con «Todo listo», sáltate los pasos 2, 3 y 4 y ve a la comprobación de abajo.** Si se para con un error, copia el mensaje y pregúntaselo a una IA (sin pegar claves); puedes repetir solo los pasos que falten con los comandos de abajo.

2. *(Solo si respondiste `n`, o si el paso anterior se paró.)* Inicia sesión en Sanity desde la terminal. Escribe estos tres comandos, uno por línea, con Intro después de cada uno. Se abrirá el navegador: elige **GitHub** y acepta. Si la terminal pregunta algo, elige la opción de GitHub con las flechas y pulsa Intro.

   ```bash
   cd studio
   npx sanity login
   cd ..
   ```

   El último comando (`cd ..`) te devuelve a la carpeta principal del proyecto: es importante, porque los siguientes comandos hay que ejecutarlos desde ahí.

3. *(Solo si hace falta.)* Carga el contenido de ejemplo en tu proyecto:

   ```bash
   npm run semilla
   ```

4. *(Solo si hace falta.)* Publica tu panel:

   ```bash
   npm run publicar-panel
   ```

Cuando termine, abre `https://nombre-de-tu-panel.sanity.studio` y comprueba que ves el menú con Portada, Servicios, etc. Para usarlo, sigue [GUIA-PANEL.md](GUIA-PANEL.md).

> **Ojo: web y panel tienen direcciones distintas.** El panel **no** está en Netlify: su dirección es `https://nombre-de-tu-panel.sanity.studio`. La web pública es la que te dará Netlify en el paso 6 (`https://nombre.netlify.app`). Si abres el panel con una dirección de Netlify, el navegador dirá «La conexión no es privada».
>
> Si no recuerdas la dirección del panel, está en <https://www.sanity.io/manage>, dentro de tu proyecto, pestaña **Studios**.

## 5. Ve tu web en tu ordenador

Antes de publicarla, comprueba que funciona en tu ordenador. El comando del paso 4 (`npm run configurar`) ya conectó la web con tu panel, así que no tienes que configurar nada más.

1. Arranca la web. En la terminal, desde la carpeta principal del proyecto:

   ```bash
   npm run empezar
   ```

   También puedes hacer doble clic en `empezar.bat` (Windows) o `empezar.command` (Mac) dentro de la carpeta del proyecto. En Mac, la primera vez puede pedirte permiso: clic derecho sobre el archivo → **Abrir**.

2. Cuando veas `Listo. Abre http://localhost:4321`, abre esa dirección en el navegador. Es tu web, que solo se ve en tu ordenador.
3. **Para parar la web:** en la terminal pulsa `Ctrl + C` *(si Windows pregunta `¿Desea terminar el trabajo por lotes (S/N)?`, escribe `S` y pulsa Intro)*. Para volver a arrancarla, repite el paso 1.

En tu ordenador, los cambios que publiques en el panel se ven al **recargar la página** (`F5` en Windows, `Cmd + R` en Mac). Si no aparecen, para la web con `Ctrl + C` y arráncala otra vez.

## 6. Netlify: publica tu web

1. Entra en <https://www.netlify.com> y regístrate con **GitHub**.
2. Pulsa **Add new site → Import an existing project**, elige **GitHub** y selecciona **tu copia** `kit-negocio-web`.
3. No cambies la configuración de compilación: ya viene en el archivo `netlify.toml` del proyecto.
4. Antes de desplegar, abre **Add environment variables** y añade estas tres. No marques «Contains secret values»:

   | Variable | Valor |
   |---|---|
   | `SANITY_PROJECT_ID` | tu Project ID de Sanity |
   | `SANITY_DATASET` | `production` |
   | `SITE_URL` | la dirección de tu web, sin barra final (si aún no la sabes, mira el paso siguiente) |

5. Pulsa **Deploy**. Cuando termine, Netlify te da una dirección del tipo `https://nombre.netlify.app`.
6. Si `SITE_URL` no coincide con esa dirección, corrígela en **Site configuration → Environment variables** y lanza otro despliegue: **Deploys → Trigger deploy → Deploy site**. Las variables solo se aplican a los despliegues nuevos.

## 7. Que la web se actualice sola al publicar

Sin este paso, la web no se entera de que has pulsado **Publish** en el panel y tendrías que relanzar el despliegue a mano. Se conectan Netlify y Sanity con un enlace:

1. En Netlify, abre tu sitio y ve a **Site configuration → Build & deploy → Build hooks → Add build hook**. Ponle de nombre `Sanity` y elige la rama `main`. Copia la dirección que te da (empieza por `https://api.netlify.com/build_hooks/`).
2. En <https://www.sanity.io/manage>, abre tu proyecto y ve a **API → Webhooks → Create webhook**. Rellena:

   | Campo | Valor |
   |---|---|
   | Name | `Actualizar web` |
   | URL | la dirección del build hook de Netlify |
   | Dataset | `production` |
   | Trigger on | marca **Create**, **Update** y **Delete** |
   | Filter | vacío |
   | HTTP method | `POST` |
   | Drafts | desmarcado (no avisar por borradores) |
   | Enable webhook | marcado |

3. Pulsa **Save**.

Prueba: cambia un texto en el panel, pulsa **Publish** y, en Netlify, pestaña **Deploys**, debe aparecer un despliegue nuevo en unos segundos. La web lo muestra al terminar (uno o dos minutos).

La dirección del build hook es como una contraseña: quien la tenga puede lanzar despliegues. No la pegues en el código ni la compartas.

## 8. Comprueba que todo funciona

- [ ] En tu ordenador, `npm run empezar` abre la web en <http://localhost:4321> con el contenido de tu panel, no el de ejemplo.
- [ ] La web publicada en Netlify carga y muestra el contenido de tu panel, no el de ejemplo.
- [ ] Cambias un texto en el panel, pulsas **Publish** y la web lo muestra al terminar el despliegue automático.
- [ ] Envías una consulta desde el formulario y aparece en Netlify, pestaña **Forms**.

## Newsletter con Brevo (opcional)

El formulario de suscripción viene preparado pero apagado. Para activarlo:

1. Crea una cuenta gratuita en <https://www.brevo.com>.
2. En **CRM → Contactos → Listas** crea una lista y ábrela: su número (ID) aparece como `#número` junto al nombre en el filtro «Miembro de».
3. Pulsa tu nombre (arriba a la derecha) → **SMTP y API** → pestaña **Claves API y MCP** (no la de SMTP) y genera una clave:
   - **Acceso:** Restringido, con permiso **Todos** solo en **contacto**. El resto en **Ninguno**.
   - Cópiala ahora: no se vuelve a mostrar.
   - No actives el aviso «Activar bloqueo de IPs no autorizadas»: las funciones de Netlify no tienen IP fija y Brevo rechazaría todas las altas.
   - Aunque pongas «Sin vencimiento», la clave caduca tras 90 días sin usarse. Si pasa ese tiempo sin suscripciones, genera otra y actualízala en Netlify.
4. Recomendado: crea la plantilla de **doble confirmación** en Brevo (la persona recibe un email y confirma que quiere suscribirse) y anota su ID. Si con la doble confirmación falla el alta, da también permiso a la clave en **Emails transaccionales**.
5. En Netlify, **Site configuration → Environment variables**, añade:

   | Variable | Valor |
   |---|---|
   | `BREVO_API_KEY` | tu clave de API (marca **Contains secret values**) |
   | `BREVO_LIST_ID` | el número de tu lista |
   | `BREVO_DOI_TEMPLATE_ID` | el ID de la plantilla de doble confirmación (opcional) |

6. Relanza el despliegue (**Deploys → Trigger deploy**).
7. En el panel, abre **Newsletter**, activa **Mostrar el formulario de suscripción**, revisa los textos y pulsa **Publish**.

Nunca pegues la clave de API en un archivo del proyecto ni en el panel: solo en Netlify.

## Dominio propio (opcional)

Puedes comprar un dominio donde quieras y conectarlo en Netlify: **Site configuration → Domain management → Add a domain**. Después cambia `SITE_URL` por la dirección final y vuelve a desplegar.

## Si algo falla

### Pregunta a una IA

Si sale un error que no entiendes, puedes pedir ayuda a un asistente de IA (ChatGPT, Claude, Gemini…). Suele resolverlo en pocos minutos:

1. **Copia el mensaje de error completo.** En la terminal de Visual Studio Code, selecciona el texto con el ratón y cópialo (`Ctrl + C`; en Mac, `Cmd + C`). Si es un error del navegador, haz una captura de pantalla.
2. **Pégalo en el asistente y cuéntale tres cosas:** qué paso de esta guía estabas haciendo, qué comando escribiste y si usas Windows o Mac. Por ejemplo: «Estoy en el paso 2 de una guía para montar una web con Astro y Sanity. Uso Windows. Escribí `npm run instalar` y me sale este error: …».
3. **Haz lo que te indique, un paso cada vez,** y vuelve a contarle qué ha pasado.

**Antes de pegar nada, comprueba que no incluye datos secretos:** el contenido de los archivos `.env`, claves de API (como la de Brevo) ni la dirección del build hook de Netlify. Si aparecen, bórralos del texto o sustitúyelos por `XXXX`. El Project ID de Sanity no es secreto y puedes compartirlo.

Si la IA no lo resuelve, enséñale el error a quien te da el curso.

### Problemas habituales

| Problema | Qué hacer |
|---|---|
| `node -v` da un error o un número menor que 22 | Instala Node LTS desde <https://nodejs.org>, cierra Visual Studio Code y vuelve a abrirlo. |
| Windows: «la ejecución de scripts está deshabilitada» | Sigue el recuadro del paso 1 (`Set-ExecutionPolicy`). |
| `npm run …` dice «Missing script» o «no se encuentra package.json» | Estás en la carpeta equivocada. Comprueba que la terminal está en la carpeta principal del proyecto (`kit-negocio-web`). Si sigues dentro de `studio`, escribe `cd ..`. |
| `localhost:4321` no carga | Mira que la terminal siga arrancada (no pulsaste `Ctrl + C`) y que no ha salido ningún error en rojo. Repite `npm run empezar`. |
| Falta `studio/.env`, o el Project ID no es válido | Ejecuta `npm run configurar` y vuelve a pegar tu Project ID. Está en <https://www.sanity.io/manage>. |
| `npm run semilla` dice que el proyecto ya tiene contenido | No pasa nada, no se ha cambiado nada. Para volver al contenido de ejemplo (borra tus cambios): `npm run semilla -- --reemplazar`. |
| Pide iniciar sesión | `cd studio`, `npx sanity login`, elige GitHub. |
| Abro el panel desde Netlify y sale «La conexión no es privada» | El panel está en `https://nombre-de-tu-panel.sanity.studio`, no en Netlify. |
| Publico en el panel y la web no cambia | Mira en Netlify, **Deploys**: si no aparece despliegue nuevo, revisa el webhook del paso 7 (URL, dataset `production`, activado). Mientras tanto, **Trigger deploy → Deploy site** lo lanza a mano. |
| La web sale con datos de ejemplo | Falta `SANITY_PROJECT_ID` en Netlify, o está mal escrito. Corrígelo y relanza el despliegue. |
| La instalación (`npm run instalar`) termina con `ERR` en rojo | Comprueba tu conexión a internet y vuelve a ejecutar el mismo comando. Si se repite, copia las últimas líneas y pregúntaselas a una IA (ver «Pregunta a una IA») o enséñaselas a quien te da el curso. |
| Netlify marca el despliegue como *Failed* | Ábrelo, copia las últimas líneas del registro y pregúntaselas a una IA (ver «Pregunta a una IA») o enséñaselas a quien te da el curso. |
