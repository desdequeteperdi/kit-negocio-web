# Guía de alta: tu web, tu panel y tu publicación

Al terminar tendrás tu propia copia del kit funcionando con tus cuentas:

- **GitHub:** guarda el código de tu web.
- **Sanity:** es el panel donde editas los textos e imágenes.
- **Netlify:** publica tu web en internet.

Usa siempre **tu email personal**, no el de ninguna empresa. Las tres cuentas se crean con GitHub, así que solo recordarás una contraseña.

## 1. Instala lo necesario en tu ordenador

1. **Node.js, versión LTS:** descárgala de <https://nodejs.org> e instálala con las opciones por defecto. Hace falta la versión 22.12 o superior; la LTS actual lo cumple.
2. **Git:** descárgalo de <https://git-scm.com> e instálalo con las opciones por defecto.

Cierra y vuelve a abrir la terminal (Terminal en Mac; PowerShell en Windows) para que los reconozca. Para comprobarlo escribe `node -v` y `git --version`: los dos deben mostrar un número de versión.

## 2. GitHub: cuenta y copia del kit

1. Crea tu cuenta en <https://github.com> con tu email personal.
2. Abre <https://github.com/desdequeteperdi/kit-negocio-web> y pulsa **Fork** (arriba a la derecha). Así tienes tu propia copia en tu cuenta: `github.com/<tu-usuario>/kit-negocio-web`.
3. En tu copia pulsa **Code**, copia la dirección HTTPS y ejecuta en la terminal, en la carpeta donde quieras guardar el proyecto:

   ```bash
   git clone <la-dirección-que-has-copiado>
   cd kit-negocio-web
   ```

4. Instala las dependencias (la primera vez tarda un par de minutos):

   ```bash
   npm run instalar
   ```

## 3. Sanity: cuenta y proyecto

1. Entra en <https://www.sanity.io> y regístrate con **Continue with GitHub**.
2. Crea un proyecto nuevo desde <https://www.sanity.io/manage>. Elige el plan gratuito y el dataset `production`.
3. Dentro del proyecto copia el **Project ID** (una cadena corta de letras minúsculas y números). Lo necesitas en los pasos 4 y 5.

## 4. Conecta tu copia con tu panel

1. Copia el archivo de configuración del panel:

   - Mac: `cp studio/.env.example studio/.env`
   - Windows (PowerShell): `copy studio\.env.example studio\.env`

2. Abre `studio/.env` en un editor de texto y rellena:

   ```text
   SANITY_STUDIO_PROJECT_ID=tu-project-id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_HOST=nombre-de-tu-panel
   ```

   `SANITY_STUDIO_HOST` es el nombre de tu panel: tu dirección será `https://nombre-de-tu-panel.sanity.studio`. Usa solo minúsculas, números y guiones. Es un archivo oculto: si no lo ves, activa «mostrar archivos ocultos» (Mac: Cmd + Mayús + punto).

3. Inicia sesión en Sanity desde la terminal. Elige **GitHub** en el navegador cuando se abra:

   ```bash
   cd studio
   npx sanity login
   cd ..
   ```

4. Carga el contenido de ejemplo en tu proyecto:

   ```bash
   npm run semilla
   ```

5. Publica tu panel:

   ```bash
   npm run publicar-panel
   ```

Cuando termine, abre `https://nombre-de-tu-panel.sanity.studio` y comprueba que ves el menú con Portada, Servicios, etc. Para usarlo, sigue [GUIA-PANEL.md](GUIA-PANEL.md).

## 5. Netlify: publica tu web

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

## 6. Comprueba que todo funciona

- [ ] La web carga y muestra el contenido de tu panel, no el de ejemplo.
- [ ] Cambias un texto en el panel, pulsas **Publish** y, al relanzar el despliegue en Netlify, la web lo muestra.
- [ ] Envías una consulta desde el formulario y aparece en Netlify, pestaña **Forms**.

## Newsletter con Brevo (opcional)

El formulario de suscripción viene preparado pero apagado. Para activarlo:

1. Crea una cuenta gratuita en <https://www.brevo.com>.
2. En **Contactos → Listas** crea una lista y anota su número (ID).
3. En **SMTP y API → Claves de API** genera una clave. Cópiala ahora: no se vuelve a mostrar.
4. Recomendado: crea la plantilla de **doble confirmación** en Brevo (la persona recibe un email y confirma que quiere suscribirse) y anota su ID.
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

| Problema | Qué hacer |
|---|---|
| `node -v` da un error o un número menor que 22 | Instala Node LTS desde <https://nodejs.org> y reabre la terminal. |
| Falta `studio/.env` o el Project ID no es válido | Revisa el paso 4. El Project ID está en <https://www.sanity.io/manage>. |
| `npm run semilla` dice que el proyecto ya tiene contenido | No pasa nada, no se ha cambiado nada. Para volver al contenido de ejemplo (borra tus cambios): `npm run semilla -- --reemplazar`. |
| Pide iniciar sesión | `cd studio`, `npx sanity login`, elige GitHub. |
| La web sale con datos de ejemplo | Falta `SANITY_PROJECT_ID` en Netlify, o está mal escrito. Corrígelo y relanza el despliegue. |
| Netlify marca el despliegue como *Failed* | Ábrelo, copia las últimas líneas del registro y enséñaselas a quien te da el curso. |
