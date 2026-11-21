// Reservas con Google Calendar (Reservas.astro). Comprueba los datos, calcula el precio y habla con tu Apps Script,
// que mira el calendario y crea la reserva. Ver GUIA-MODULOS.md.
//   GET  ?fecha=AAAA-MM-DD&duracion=60  ->  { huecos: ['09:00', '09:30', ...] }
//   POST { fecha, hora, duracion, nombre, telefono, email, notas, privacidad }  ->  { ok, precio }
// Variables (Netlify > Site configuration > Environment variables):
//   RESERVAS_SCRIPT_URL    dirección de la aplicación web de tu Apps Script
//   RESERVAS_SCRIPT_TOKEN  contraseña inventada por ti, igual que en el script (márcala como secreta)
//   SANITY_PROJECT_ID, SANITY_DATASET  ya los tienes: de ahí se leen duraciones, precio y horario
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
const limpiar = (v, max) => String(v ?? '').replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, max);
const json = (cuerpo, status = 200) => Response.json(cuerpo, { status });

// Mismos valores que web/src/data/negocio.json: se usan solo si la web no está conectada a Sanity
const POR_DEFECTO = { duraciones: [60], precioPorHora: 0, horaInicio: '09:00', horaFin: '18:00', dias: [1, 2, 3, 4, 5], antelacionHoras: 24, diasMaximos: 60 };

// La configuración se lee del panel en cada petición para que el cliente no pueda cambiar precios ni horarios
async function configuracion() {
  const { SANITY_PROJECT_ID: id, SANITY_DATASET: dataset = 'production' } = process.env;
  if (!id) return POR_DEFECTO;
  const consulta = encodeURIComponent('*[_id == "reservas"][0]');
  const r = await fetch(`https://${id}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${consulta}`);
  if (!r.ok) throw new Error(`Sanity respondió ${r.status}`);
  const { result } = await r.json();
  return { ...POR_DEFECTO, ...Object.fromEntries(Object.entries(result ?? {}).filter(([, v]) => v !== null)) };
}

async function script(cuerpo) {
  const { RESERVAS_SCRIPT_URL, RESERVAS_SCRIPT_TOKEN } = process.env;
  if (!RESERVAS_SCRIPT_URL || !RESERVAS_SCRIPT_TOKEN) throw new Error('faltan RESERVAS_SCRIPT_URL o RESERVAS_SCRIPT_TOKEN en Netlify');
  const r = await fetch(RESERVAS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token: RESERVAS_SCRIPT_TOKEN, ...cuerpo }),
  });
  if (!r.ok) throw new Error(`Apps Script respondió ${r.status}`);
  return r.json();
}

export default async (req) => {
  try {
    const c = await configuracion();
    const regla = { horaInicio: c.horaInicio, horaFin: c.horaFin, dias: c.dias, antelacionHoras: c.antelacionHoras, diasMaximos: c.diasMaximos };

    if (req.method === 'GET') {
      const q = new URL(req.url).searchParams;
      const fecha = q.get('fecha') ?? '';
      const duracion = Number(q.get('duracion'));
      if (!FECHA.test(fecha) || !c.duraciones.includes(duracion)) return json({ error: 'datos' }, 400);
      const r = await script({ accion: 'huecos', config: regla, fecha, duracion });
      return json({ huecos: r.huecos ?? [] });
    }

    if (req.method !== 'POST') return new Response('Método no permitido', { status: 405 });
    const d = await req.json().catch(() => null);
    if (!d) return json({ error: 'datos' }, 400);
    if (d['campo-trampa']) return json({ ok: true }); // los robots rellenan el campo oculto

    const reserva = {
      fecha: limpiar(d.fecha, 10), hora: limpiar(d.hora, 5), duracion: Number(d.duracion),
      nombre: limpiar(d.nombre, 100), telefono: limpiar(d.telefono, 30), email: limpiar(d.email, 254).toLowerCase(), notas: limpiar(d.notas, 500),
    };
    if (!FECHA.test(reserva.fecha) || !HORA.test(reserva.hora) || !c.duraciones.includes(reserva.duracion)
      || !reserva.nombre || reserva.telefono.replace(/\D/g, '').length < 9 || !EMAIL.test(reserva.email) || !d.privacidad) {
      return json({ error: 'datos' }, 400);
    }
    const precio = Math.round(c.precioPorHora * (reserva.duracion / 60) * 100) / 100;

    const r = await script({ accion: 'reservar', config: regla, ...reserva, precio, registrada: new Date().toISOString() });
    if (r.ok) return json({ ok: true, precio });
    if (r.error === 'ocupado') return json({ error: 'ocupado' }, 409);
    throw new Error(`Apps Script: ${r.error}`);
  } catch (e) {
    console.error('Reservas:', e);
    return json({ error: 'servicio' }, 502);
  }
};
