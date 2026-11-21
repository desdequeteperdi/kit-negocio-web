// Pega este código en Apps Script (script.google.com) dentro de una hoja de cálculo. Ver GUIA-MODULOS.md.
// Cambia TOKEN por una contraseña inventada por ti (la misma que pondrás en Netlify como RESERVAS_SCRIPT_TOKEN).
// Usa la zona horaria de tu calendario: en Apps Script, Configuración del proyecto > Zona horaria.
const TOKEN = 'cambia-esta-contrasena';
// Deja vacío para usar tu calendario principal. Para otro calendario, pon su ID (Ajustes del calendario > Integrar el calendario).
const CALENDARIO_ID = '';
const PESTANA = 'Reservas';
const PASO_MINUTOS = 30;

const calendario_ = () => (CALENDARIO_ID ? CalendarApp.getCalendarById(CALENDARIO_ID) : CalendarApp.getDefaultCalendar());

// Sirve para comprobar que el script está publicado: al abrir su dirección en el navegador debe verse este texto.
function doGet() {
  return ContentService.createTextOutput('El script funciona. Ya puedes conectarlo a Netlify.');
}

function responder_(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}

// Horas de inicio libres (HH:MM) de un día para una duración. Un evento del calendario, también de día completo, ocupa su tramo.
function huecos_(c, fecha, duracion) {
  const [y, m, d] = fecha.split('-').map(Number);
  const dia = new Date(y, m - 1, d).getDay() || 7;
  if (c.dias.indexOf(dia) < 0) return [];
  const [hi, mi] = c.horaInicio.split(':').map(Number);
  const [hf, mf] = c.horaFin.split(':').map(Number);
  const inicio = new Date(y, m - 1, d, hi, mi);
  const fin = new Date(y, m - 1, d, hf, mf);
  const ahora = Date.now();
  const minimo = ahora + c.antelacionHoras * 3600000;
  const maximo = ahora + c.diasMaximos * 86400000;
  const eventos = calendario_().getEvents(inicio, fin);
  const libres = [];
  for (let t = inicio.getTime(); t + duracion * 60000 <= fin.getTime(); t += PASO_MINUTOS * 60000) {
    const a = t, b = t + duracion * 60000;
    if (a < minimo || a > maximo) continue;
    if (eventos.some((e) => e.getStartTime().getTime() < b && e.getEndTime().getTime() > a)) continue;
    libres.push(Utilities.formatDate(new Date(a), Session.getScriptTimeZone(), 'HH:mm'));
  }
  return libres;
}

// El texto de las celdas que empiezan por = + - @ se guarda como texto, no como fórmula
const seguro_ = (v) => (/^[=+\-@]/.test(String(v)) ? "'" + v : v);

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.token !== TOKEN) return responder_({ ok: false, error: 'no-autorizado' });

  if (d.accion === 'huecos') {
    return responder_({ ok: true, huecos: huecos_(d.config, d.fecha, d.duracion) });
  }

  if (d.accion === 'reservar') {
    // El bloqueo evita que dos personas reserven el mismo hueco a la vez
    const bloqueo = LockService.getScriptLock();
    bloqueo.waitLock(20000);
    try {
      if (huecos_(d.config, d.fecha, d.duracion).indexOf(d.hora) < 0) return responder_({ ok: false, error: 'ocupado' });
      const [y, m, dd] = d.fecha.split('-').map(Number);
      const [h, mi] = d.hora.split(':').map(Number);
      const inicio = new Date(y, m - 1, dd, h, mi);
      const fin = new Date(inicio.getTime() + d.duracion * 60000);
      const descripcion = [
        'Nombre: ' + d.nombre, 'Teléfono: ' + d.telefono, 'Email: ' + d.email,
        d.precio ? 'Precio: ' + d.precio + ' €' : '', d.notas ? 'Notas: ' + d.notas : '',
      ].filter(Boolean).join('\n');
      calendario_().createEvent('Reserva: ' + d.nombre, inicio, fin, { description: descripcion });
      const libro = SpreadsheetApp.getActiveSpreadsheet();
      if (libro) {
        const hoja = libro.getSheetByName(PESTANA) || libro.insertSheet(PESTANA);
        if (hoja.getLastRow() === 0) hoja.appendRow(['Registrada', 'Fecha', 'Hora', 'Duración (min)', 'Precio (€)', 'Nombre', 'Teléfono', 'Email', 'Notas']);
        hoja.appendRow([d.registrada, d.fecha, d.hora, d.duracion, d.precio, seguro_(d.nombre), seguro_(d.telefono), seguro_(d.email), seguro_(d.notas)]);
      }
      return responder_({ ok: true });
    } finally {
      bloqueo.releaseLock();
    }
  }
  return responder_({ ok: false, error: 'accion-desconocida' });
}
