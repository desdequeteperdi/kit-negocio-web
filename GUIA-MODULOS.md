# Módulos opcionales

Funciones extra que se activan desde el panel cuando las necesitas. Vienen **apagadas** por defecto.

## Módulo: consulta por WhatsApp + hoja de Google

La persona rellena nombre, teléfono y mensaje. Al enviar, **se abre WhatsApp con el mensaje ya escrito** (lo envía ella desde su móvil) y, a la vez, **la consulta se guarda en una hoja de Google** para que no se pierda ninguna.

Necesitas: una cuenta de Google y el teléfono de WhatsApp puesto en «Datos del negocio» (con prefijo, solo números: `34600000000`).

### 1. Crear la hoja y el script

1. En Google Sheets crea una hoja de cálculo nueva (por ejemplo, «Consultas web»).
2. Menú **Extensiones → Apps Script**. Borra el código que aparece y pega el contenido de [`modulos/consulta-whatsapp/apps-script.gs`](modulos/consulta-whatsapp/apps-script.gs).
3. Cambia `cambia-esta-contrasena` por una contraseña inventada por ti (larga, sin espacios). Guárdala: la necesitarás en el paso 2.
4. Pulsa **Implementar → Nueva implementación**. En el engranaje elige **Aplicación web**. Configura: *Ejecutar como*: **Yo**; *Quién tiene acceso*: **Cualquier persona**. Pulsa **Implementar** y acepta los permisos (Google avisará de que la app no está verificada: **Avanzado → Ir a… (no seguro)** es normal porque el script es tuyo).
5. Copia la **URL de la aplicación web** (termina en `/exec`).

> Si cambias el código del script más adelante, hay que volver a **Implementar → Gestionar implementaciones → editar → Nueva versión**; si no, sigue funcionando el código antiguo.

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

Rellena el formulario en tu web publicada: debe abrirse WhatsApp con el mensaje y aparecer una fila nueva en la pestaña `Consultas` de tu hoja. Si WhatsApp se abre pero la fila no llega, revisa las dos variables de Netlify y que hayas vuelto a desplegar. Si sigue fallando, copia el error y pregúntaselo a una IA (sin pegar contraseñas).

### Privacidad

Los datos pasan por Google. La política de privacidad lo menciona automáticamente cuando el módulo está activo; revísala igualmente (son borradores de partida) y no compartas la hoja con quien no deba verla.

---

## Próximamente

- **Reservas con Google Calendar:** duración configurable, cálculo de precio y comprobación de disponibilidad.
