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

Rellena el formulario en tu web publicada: debe abrirse WhatsApp con el mensaje y aparecer una fila nueva en la pestaña `Consultas` de tu hoja.

### Si algo falla

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

## Módulo: reservas con Google Calendar + hoja de Google

La persona elige **día, duración y hora libre** en tiempo real (consultando tu Google Calendar), ve el **precio calculado** automáticamente (si configuraste un precio por hora mayor que `0 €`) y confirma sus datos. Al reservar:
- Se comprueba otra vez que el hueco siga libre (para evitar dobles reservas).
- Se crea el evento **`Reserva: <Nombre>`** en tu Google Calendar con sus datos y notas.
- Se guarda una fila en la pestaña `Reservas` de tu hoja de Google.

Cualquier evento que tú tengas apuntado en ese calendario (incluso eventos personales o de día completo) bloquea automáticamente esas horas para que nadie reserve encima.

### 1. Crear la hoja y el script de reservas

Antes de empezar, comprueba arriba a la derecha que estás en **la cuenta de Google que tiene el calendario del negocio**.

1. Entra en [Google Sheets](https://sheets.google.com) y crea una hoja de cálculo (o usa la misma de «Consultas web», ya que creará una pestaña separada llamada `Reservas`).
2. En el menú superior, pulsa **Extensiones → Apps Script**.
3. En el menú de la izquierda de Apps Script, pulsa el icono de engranaje (**Configuración del proyecto**) y comprueba que **Zona horaria** coincide con la de tu calendario (por ejemplo, `(GMT+01:00) Hora estándar de Europa Central - Madrid`). Vuelve al **Editor** (`< >`).
4. Borra el código que haya y pega el contenido completo de [`modulos/reservas/apps-script.gs`](modulos/reservas/apps-script.gs).
5. **Inventa una contraseña larga** y sustituye `cambia-esta-contrasena` en `const TOKEN = '...'`. Guárdala en tu gestor de contraseñas (**no la subas a GitHub ni la pegues en una IA**).
6. *(Opcional)* Si quieres usar tu calendario principal de esa cuenta, deja `const CALENDARIO_ID = '';` tal cual. Si has creado un calendario secundario solo para reservas, abre Google Calendar → **Configuración del calendario → Integrar el calendario**, copia el **ID del calendario** (termina en `@group.calendar.google.com`) y pégalo entre las comillas de `CALENDARIO_ID`.
7. Pulsa el icono del disquete (**Guardar proyecto**).
8. Arriba a la derecha, pulsa **Implementar → Nueva implementación**, elige el engranaje **Aplicación web** y configura:
   - **Ejecutar como:** Yo (tu cuenta).
   - **Quién tiene acceso:** Cualquier persona *(tu calendario y tu hoja siguen siendo privados; el script solo responde a peticiones con la contraseña o las acciones permitidas)*.
9. Pulsa **Implementar** y autoriza los permisos (**Autorizar acceso → tu cuenta → Avanzado → Ir a… (no seguro) → Permitir**). Te pedirá permiso para consultar/crear eventos en Google Calendar y escribir en Google Sheets.
10. Copia la **URL de la aplicación web** (termina en `/exec`) y ábrela en una pestaña nueva del navegador: debe verse «El script funciona. Ya puedes conectarlo a Netlify.».

### 2. Conectarlo a Netlify

En Netlify: **Site configuration → Environment variables**, añade:

| Variable | Valor |
|---|---|
| `RESERVAS_SCRIPT_URL` | La URL `/exec` de tu script de reservas |
| `RESERVAS_SCRIPT_TOKEN` | La contraseña `TOKEN` que pusiste en el script de reservas (márcala como secreta) |

*(La función de Netlify lee automáticamente los horarios, duraciones y precio por hora desde tu proyecto de Sanity usando `SANITY_PROJECT_ID`, para que nadie pueda alterar precios desde el navegador).*

Después, lanza **Deploys → Trigger deploy → Deploy site**.

### 3. Configurar horarios, duraciones y precios en el panel

Si tu panel de Sanity ya estaba publicado antes de este módulo, ejecuta primero `npm run publicar-panel` en la carpeta `kit-negocio` para actualizar los campos.

Después entra en tu panel (`https://<tu-panel>.sanity.studio`) y abre **4. Contacto, buscadores y legal → Reservas con Google Calendar**:
- **Mostrar el formulario de reservas:** actívalo cuando hayas completado los pasos 1 y 2.
- **Título, texto de invitación, texto del botón y texto de consentimiento.**
- **Duraciones que se pueden reservar (en minutos):** por ejemplo `60`, o varias (`30`, `60`, `90`). Si pones una sola duración, el formulario no muestra desplegable; si pones varias, el cliente elige duración y el precio se recalcula al instante.
- **Precio por hora (€):** pon `0` si la cita/valoración inicial es gratuita (no se mostrará línea de precio), o tu tarifa por hora (p. ej. `60` → 30 min = 30 €, 60 min = 60 €, 90 min = 90 €).
- **Hora de apertura y de cierre (`HH:MM`):** por ejemplo `09:00` y `18:00`.
- **Días de la semana con reservas:** marca los días en que atiendes.
- **Antelación mínima (horas)** (p. ej. `24` para que no te reserven para dentro de media hora) y **Hasta cuántos días vista se puede reservar** (p. ej. `60`).
- Pulsa **Publish**.

### 4. Probarlo y resolver problemas

1. Abre tu web publicada en Netlify, elige un día laborable y comprueba que salen los botones con las horas libres cada 30 minutos.
2. Crea un evento de prueba en tu Google Calendar para ese día y recarga la fecha en tu web: ese tramo debe haber desaparecido de los huecos libres.
3. Completa una reserva de prueba: debe aparecer el evento `Reserva: …` en tu Google Calendar y una fila nueva en la pestaña `Reservas` de tu hoja de Google.

| Qué ves | Qué hacer |
|---|---|
| «No se ha podido consultar la disponibilidad» | Revisa en Netlify que `RESERVAS_SCRIPT_URL` y `RESERVAS_SCRIPT_TOKEN` coinciden con tu script de reservas y que desplegaste de nuevo (**Trigger deploy**). Si cambiaste el código del script, recuerda publicar una **Nueva versión** en **Implementar → Gestionar implementaciones**. |
| Las horas salen desplazadas (1 o 2 horas antes/después) | En Apps Script → **Configuración del proyecto (engranaje)**, cambia la **Zona horaria** a la de tu ciudad (p. ej. Madrid) y publica una **Nueva versión**. |
| Sale «No quedan horas libres ese día» en un día libre | Comprueba en el panel de Sanity que ese día de la semana está marcado en **Días de la semana con reservas**, que la fecha cumple la **Antelación mínima (horas)** y que en Google Calendar no tienes un evento de día completo marcado como «Ocupado». |
