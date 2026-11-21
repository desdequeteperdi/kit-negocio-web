# Módulos opcionales

Funciones extra que se activan desde el panel cuando las necesitas. Vienen **apagadas** por defecto.

## Módulo: consulta por WhatsApp + hoja de Google

La persona rellena nombre, teléfono y mensaje. Al enviar, **se abre WhatsApp con el mensaje ya escrito** (lo envía ella desde su móvil) y, a la vez, **la consulta se guarda en una hoja de Google** para que no se pierda ninguna.

Necesitas: una cuenta de Google y el teléfono de WhatsApp puesto en «Datos del negocio» (con prefijo, solo números: `34600000000`).

### 1. Crear la hoja y el script

Antes de empezar, mira arriba a la derecha de Google que estás en **la cuenta que quieres usar para el negocio**. Si tienes varias abiertas, el script se crearía en otra.

1. Entra en [Google Sheets](https://sheets.google.com) y crea una hoja de cálculo en blanco. Llámala «Consultas web».
2. En el menú de la hoja, pulsa **Extensiones → Apps Script**. Se abre otra pestaña con un editor y un código de ejemplo.
3. Borra todo el código del editor (selecciónalo con Ctrl + A, o Cmd + A en Mac, y pulsa Suprimir) y pega el contenido de [`modulos/consulta-whatsapp/apps-script.gs`](modulos/consulta-whatsapp/apps-script.gs).
4. **Inventa una contraseña** (larga, sin espacios, por ejemplo `cafe-luna-4821-verde`) y sustituye `cambia-esta-contrasena` por ella, dejando las comillas. Guárdala en tu gestor de contraseñas: la necesitarás en el paso 2. **No la subas a GitHub ni la pegues en una IA.**
5. Pulsa el icono del disquete (**Guardar proyecto**). Si te pide un nombre, pon «Consultas web».
6. Arriba a la derecha, pulsa **Implementar → Nueva implementación**.
7. Junto a «Seleccionar tipo» pulsa el engranaje y elige **Aplicación web**. Rellena:
   - **Ejecutar como:** Yo (tu cuenta).
   - **Quién tiene acceso:** Cualquier persona.

   «Cualquier persona» **no hace pública tu hoja**: solo permite que la web envíe datos a este script. La hoja sigue siendo privada y el script rechaza cualquier envío que no lleve tu contraseña.
8. Pulsa **Implementar**. Google pedirá permiso:
   1. Pulsa **Autorizar acceso** y elige tu cuenta.
   2. Saldrá «Google no ha verificado esta aplicación». Es normal, porque el script lo has escrito tú. Pulsa **Avanzado** y luego **Ir a Consultas web (no seguro)**.
   3. Pulsa **Permitir**.
9. Copia la **URL de la aplicación web** (termina en `/exec`) y guárdala junto a la contraseña.
10. **Comprueba que funciona:** pega esa URL en una pestaña nueva del navegador. Debe aparecer el texto «El script funciona». Si ves otro mensaje, mira «Si algo falla» más abajo.

> Si más adelante cambias el código del script, hay que volver a **Implementar → Gestionar implementaciones**, pulsar el lápiz, elegir **Versión: Nueva versión** y **Implementar**. Si no, sigue funcionando el código antiguo.

### 2. Conectarlo a Netlify

En Netlify: **Site configuration → Environment variables**, añade:

| Variable | Valor |
|---|---|
| `APPS_SCRIPT_URL` | La URL `/exec` del paso 1 |
| `APPS_SCRIPT_TOKEN` | La contraseña del paso 1 (márcala como secreta) |

Después, **Deploys → Trigger deploy** para que se apliquen.

### 3. Activarlo en el panel

En el panel: **4. Contacto, buscadores y legal → Consulta por WhatsApp** → activa «Mostrar el formulario», ajusta los textos y publica. Si tu panel ya existía, ejecuta antes `npm run publicar-panel` para que aparezca el apartado nuevo.

### 4. Probarlo

Rellena el formulario en tu web publicada: debe abrirse WhatsApp con el mensaje y aparecer una fila nueva en la pestaña `Consultas` de tu hoja. ### Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Al abrir la URL `/exec` sale «No se encontró la función de secuencia de comandos: doGet» | Falta el trozo `doGet` del script: vuelve a pegar el código completo y publica una **Nueva versión**. |
| Al abrir la URL `/exec` te pide iniciar sesión o dice «Necesitas acceso» | En el paso 7, «Quién tiene acceso» debe ser **Cualquier persona**. Corrígelo en **Gestionar implementaciones** y publica una nueva versión. |
| WhatsApp se abre pero no aparece la fila | Revisa en Netlify que `APPS_SCRIPT_URL` y `APPS_SCRIPT_TOKEN` están bien escritas (la contraseña igual que en el script) y vuelve a desplegar. |
| La fila no llega y las variables están bien | En Apps Script, menú de la izquierda, **Ejecuciones**: ahí aparece el error de cada envío. |

Si sigue fallando, copia el error y pregúntaselo a una IA (sin pegar contraseñas ni la URL del script).

### Privacidad

Los datos pasan por Google. La política de privacidad lo menciona automáticamente cuando el módulo está activo; revísala igualmente (son borradores de partida) y no compartas la hoja con quien no deba verla.

---

## Próximamente

- **Reservas con Google Calendar:** duración configurable, cálculo de precio y comprobación de disponibilidad.
