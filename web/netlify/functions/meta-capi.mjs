// Envía eventos opcionales a Meta Conversions API (CAPI) para complementar y deduplicar el píxel del navegador.
// En Meta actual, Píxel y CAPI comparten el mismo «ID del conjunto de datos» (Dataset ID).
// Solo actúa tras aceptar las cookies y si está configurado el token en Netlify:
//   META_CAPI_TOKEN      Token de acceso de Conversions API (márcalo como secreto)
//   META_PIXEL_ID        (opcional) ID del conjunto de datos/píxel si quieres fijarlo en Netlify en vez de usar el de Sanity
//   META_TEST_EVENT_CODE (opcional) Código de prueba de Meta Events Manager
const EVENTOS_VALIDOS = new Set(['PageView', 'Lead', 'CompleteRegistration', 'Contact']);
const FB_COOKIE = /^fb\.\d+\.\d+\.[\w-]+$/;
const PIXEL_RE = /^\d{8,20}$/;

export default async (req) => {
  if (req.method !== 'POST') return new Response('Método no permitido', { status: 405 });

  const { META_PIXEL_ID, META_CAPI_TOKEN, META_TEST_EVENT_CODE } = process.env;
  if (!META_CAPI_TOKEN) return new Response(null, { status: 204 });

  const body = await req.json().catch(() => null);
  const pixelId = (META_PIXEL_ID && PIXEL_RE.test(META_PIXEL_ID))
    ? META_PIXEL_ID
    : (typeof body?.pixel_id === 'string' && PIXEL_RE.test(body.pixel_id) ? body.pixel_id : '');
  const eventName = typeof body?.event_name === 'string' ? body.event_name : '';
  const eventId = typeof body?.event_id === 'string' ? body.event_id.slice(0, 80) : '';
  const sourceUrl = typeof body?.event_source_url === 'string' ? body.event_source_url.slice(0, 500) : '';
  if (!pixelId || !EVENTOS_VALIDOS.has(eventName) || !eventId || !/^https?:\/\//.test(sourceUrl)) {
    return new Response(null, { status: 204 });
  }

  const ip = (req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const ua = req.headers.get('user-agent') || '';
  const fbp = typeof body?.fbp === 'string' && FB_COOKIE.test(body.fbp) ? body.fbp : '';
  const fbc = typeof body?.fbc === 'string' && FB_COOKIE.test(body.fbc) ? body.fbc : '';

  const userData = {
    ...(ip && { client_ip_address: ip }),
    ...(ua && { client_user_agent: ua }),
    ...(fbp && { fbp }),
    ...(fbc && { fbc }),
  };

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_id: eventId,
      event_source_url: sourceUrl,
      user_data: userData,
    }],
    ...(META_TEST_EVENT_CODE && { test_event_code: META_TEST_EVENT_CODE }),
  };

  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${encodeURIComponent(pixelId)}/events`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${META_CAPI_TOKEN}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error(`Meta CAPI respondió ${r.status}: ${await r.text()}`);
  } catch (e) {
    console.error('Meta CAPI: error de conexión', e);
  }

  return new Response(null, { status: 204 });
};
