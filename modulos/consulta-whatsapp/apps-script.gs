// Pega este código en Apps Script (script.google.com) dentro de tu hoja de cálculo. Ver GUIA-MODULOS.md.
// Cambia TOKEN por una contraseña inventada por ti (la misma que pondrás en Netlify como APPS_SCRIPT_TOKEN).
const TOKEN = 'cambia-esta-contrasena';
const PESTANA = 'Consultas';

// Sirve para comprobar que el script está publicado: al abrir su dirección en el navegador debe verse este texto.
function doGet() {
  return ContentService.createTextOutput('El script funciona. Ya puedes conectarlo a Netlify.');
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.token !== TOKEN) return ContentService.createTextOutput('No autorizado');
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PESTANA)
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet(PESTANA);
  if (hoja.getLastRow() === 0) hoja.appendRow(['Fecha', 'Nombre', 'Teléfono', 'Mensaje', 'Página']);
  // El apóstrofo evita que una celda que empiece por = + - @ se ejecute como fórmula
  const seguro = (v) => (/^[=+\-@]/.test(String(v)) ? "'" + v : v);
  hoja.appendRow([d.fecha, seguro(d.nombre), seguro(d.telefono), seguro(d.mensaje), seguro(d.url)]);
  return ContentService.createTextOutput('ok');
}
