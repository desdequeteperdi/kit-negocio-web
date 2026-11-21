// Guarda en una hoja de Google las consultas del formulario de WhatsApp (ConsultaWhatsapp.astro).
// Reenvía los datos a un Google Apps Script que tú publicas (ver GUIA-MODULOS.md).
// Variables (Netlify > Site configuration > Environment variables):
//   APPS_SCRIPT_URL    dirección de la aplicación web de tu Apps Script
//   APPS_SCRIPT_TOKEN  contraseña inventada por ti, igual que en el script (márcala como secreta)
const limpiar = (v, max) => String(v ?? '').replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, max);

export default async (req) => {
  if (req.method !== 'POST') return new Response('Método no permitido', { status: 405 });

  const d = await req.json().catch(() => null);
  if (!d) return new Response('Datos no válidos', { status: 400 });
  // Los robots rellenan el campo oculto: se les responde "bien" sin hacer nada
  if (d['campo-trampa']) return Response.json({ ok: true });

  const consulta = {
    nombre: limpiar(d.nombre, 100),
    telefono: limpiar(d.telefono, 30),
    mensaje: limpiar(d.mensaje, 1000),
    url: limpiar(d.url, 300),
  };
  if (!consulta.nombre || consulta.telefono.replace(/\D/g, '').length < 9 || !consulta.mensaje || !d.privacidad) {
    return new Response('Faltan datos', { status: 400 });
  }

  const { APPS_SCRIPT_URL, APPS_SCRIPT_TOKEN } = process.env;
  if (!APPS_SCRIPT_URL || !APPS_SCRIPT_TOKEN) {
    console.error('Consulta WhatsApp: faltan APPS_SCRIPT_URL o APPS_SCRIPT_TOKEN en Netlify.');
    return new Response('Servicio sin configurar', { status: 500 });
  }

  try {
    const r = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token: APPS_SCRIPT_TOKEN, fecha: new Date().toISOString(), ...consulta }),
    });
    if (r.ok) return Response.json({ ok: true });
    console.error(`Consulta WhatsApp: Apps Script respondió ${r.status}`);
  } catch (e) {
    console.error('Consulta WhatsApp: no se pudo contactar con Apps Script', e);
  }
  return new Response('No se pudo guardar', { status: 502 });
};
