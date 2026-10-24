// Da de alta a un contacto en tu lista de Brevo. Recibe el formulario de la newsletter (Newsletter.astro).
// Variables (Netlify > Site configuration > Environment variables):
//   BREVO_API_KEY      clave de API de Brevo (márcala como secreta)
//   BREVO_LIST_ID      número de la lista donde se guardan los contactos
//   BREVO_DOI_TEMPLATE_ID   (opcional) número de la plantilla de doble confirmación; si lo pones,
//                           Brevo envía un email para confirmar la suscripción antes de añadirla
//   BREVO_DOI_REDIRECT_URL  (opcional) página a la que llega quien confirma; por defecto /newsletter-gracias
const API = 'https://api.brevo.com/v3';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const volver = (req, ruta) => Response.redirect(new URL(ruta, req.url), 303);

export default async (req) => {
  if (req.method !== 'POST') return new Response('Método no permitido', { status: 405 });

  const form = await req.formData().catch(() => null);
  if (!form) return volver(req, '/newsletter-error');

  // Los robots rellenan el campo oculto: se les responde "bien" sin hacer nada
  if (form.get('campo-trampa')) return volver(req, '/newsletter-gracias');

  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254 || !form.get('privacidad')) return volver(req, '/newsletter-error');

  const { BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID, BREVO_DOI_REDIRECT_URL } = process.env;
  const lista = Number(BREVO_LIST_ID);
  if (!BREVO_API_KEY || !Number.isInteger(lista) || lista < 1) {
    console.error('Newsletter: faltan BREVO_API_KEY o BREVO_LIST_ID en Netlify.');
    return volver(req, '/newsletter-error');
  }

  const doble = Number(BREVO_DOI_TEMPLATE_ID);
  const peticion = doble > 0
    ? { ruta: '/contacts/doubleOptinConfirmation', cuerpo: { email, includeListIds: [lista], templateId: doble, redirectionUrl: BREVO_DOI_REDIRECT_URL || new URL('/newsletter-gracias', req.url).href } }
    : { ruta: '/contacts', cuerpo: { email, listIds: [lista], updateEnabled: true } };

  try {
    const r = await fetch(API + peticion.ruta, {
      method: 'POST',
      headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(peticion.cuerpo),
    });
    // 201/204: alta correcta. Un contacto que ya existe no es un error para quien se suscribe.
    if (r.ok) return volver(req, '/newsletter-gracias');
    const detalle = await r.text();
    if (/already exist|duplicate/i.test(detalle)) return volver(req, '/newsletter-gracias');
    console.error(`Newsletter: Brevo respondió ${r.status}: ${detalle}`);
  } catch (e) {
    console.error('Newsletter: no se pudo contactar con Brevo', e);
  }
  return volver(req, '/newsletter-error');
};
