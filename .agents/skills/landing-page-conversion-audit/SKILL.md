---
name: landing-page-conversion-audit
description: Audit a landing page, sales page, /enlaces or product/checkout page in our Astro + Sanity + Netlify kit for conversion leaks and return a fix list ordered by expected impact. Use when asked to review, critique or improve a landing page, campaign page (/[slug]), product page or checkout/booking flow, when conversion rate is low, or when someone asks "why isn't this page converting" or wants a CRO review.
---

# Landing Page Conversion Audit (`kit-negocio-web`)

> **Notice of modification (Apache-2.0 §4(b)):** Adapted from [`autonnel/autonnel-skills`](https://github.com/autonnel/autonnel-skills) (`landing-page-conversion-audit`, Apache License 2.0, see `LICENSE`) for the `CURSO-MARKETING-ONLINE-WEB` (`kit-negocio-web`) Astro + Sanity Studio + Netlify stack and non-programmer students.

Audit a live page (or the compiled static HTML in `web/dist/` — **never `studio/`**) for conversion leaks and return a ranked fix list. Every finding must name the element, the failure mode, what to change it to, and whether it is edited in **Sanity Studio** or in **code (`web/src/` / `studio/schemas/index.ts`)**.

## When to use

- "Review my landing page" / "why is my conversion rate so low" (for portada `/`, campaign landings `/[slug]`, `/enlaces`, or product pages `/catalogo/...`)
- Traffic (paid ads, social, Google Business Profile) is arriving without enough leads/bookings/purchases
- Before scaling ad spend or running a campaign in `disenar-experimento`

## When not to use

- The page does not exist or has zero exposure yet and the offer itself is still undefined: use `aterrizar-idea`, `disenar-experimento` and `redactar-landing` first (or check `MEMORIA.md`).
- The problem is upstream (wrong audience, wrong offer, or unverified fictitious example data from `negocio.json`). A page audit cannot fix a broken offer; say so and stop.

## Procedure

### 1. Gather what you are allowed to conclude from

Read `MEMORIA.md` first (if present) to know the offer, target client, real vs. example/fictitious status, and active experiment. Then ask for or inspect, in this order (note explicitly what you did not get, because it caps what you can claim):

| Input | What it unlocks |
|---|---|
| Live URL (Netlify), `http://localhost:4321`, or compiled `web/dist/` (never `studio/`) | Rendered DOM / HTML inspection (use Playwright MCP from `npm run mcp` if available, or `web/dist/` static output) |
| Sanity Studio documents (via Sanity MCP if active, or pasted by student) | Exact current field values (`portada`, `pagina`, `contacto`, `resenas`, `reservas`, `consultaWhatsapp`, `producto`, `buscadores`, `enlaces`) |
| Traffic source + sample ad / social post / GBP link + UTM | Message-match check (the single highest-impact check for campaigns) |
| Sessions and conversions over the last 14–30 days (GA4 / Netlify Forms / Sheets / Stripe, excluding `PRUEBA`) | Whether the problem is statistically real or low-sample noise |
| Funnel step drop-off (`clic WhatsApp → consulta recibida → cita/venta`) | Which step actually leaks |
| Device split | Whether to audit mobile-first (usually yes: social/local traffic is mostly mobile) |

If you only have the URL or `web/dist/`, say so in the output and mark every quantitative claim as an estimate.

### 2. Run the checks

Work in this order (ordered by typical conversion impact):

**A. Message match (ad / post / link → page)**
- Does the headline (`portada.titular` or `pagina.titulo`) repeat the ad/post promise in the visitor's own words?
- Does the link go to a focused campaign landing (`/[slug]` with `tipo: 'landing'` and `mostrarEnMenu: false`) or dump cold traffic onto a generic homepage?
- Is the core offer visible without scrolling on a `390×844` mobile viewport?

**B. Above the fold, mobile**
- One clear promise, one primary CTA (`portada.textoBoton` or `pagina.textoBotonContacto` → `#contacto`, WhatsApp, or booking). Count competing CTAs (e.g. menu links on a campaign landing, newsletter + WhatsApp + contact + Stripe fighting for attention).
- Is the CTA button reachable in the first viewport, or pushed down by a tall image or excess text?
- Load & media: avoid unoptimized heavy images or heavy third-party `<iframe>` embeds above the fold (`bloqueHtml`); remember `portada.imagen` / `pagina.imagen` must be JPG/PNG/WebP (never leftover `/img-portada.svg` example assets).

**C. Offer clarity**
- Can a stranger answer in 5 seconds: what is it, who is it for, what does it cost (or how pricing works), and what happens when they click?
- Price/range presented or clear expectation set (`servicio.precio`, `producto.precio`/`precioTexto`, `reservas.precioPorHora`)?
- Risk reversal / clear expectations (free initial assessment, written quote before starting, Stripe delivery & return terms in `legal.tipoVenta` / `plazoEntrega` / `devoluciones`).

**D. Friction in the form, booking, WhatsApp or checkout**
- Check which capture mechanism is active in the kit:
  - **Contact form (`contacto` / `pagina.mostrarContacto`):** Netlify Forms posts to `/gracias`. Check whether `contacto.texto` explains response time and next steps.
  - **WhatsApp (`consultaWhatsapp`):** opens WhatsApp prefilled + logs to Google Sheets. Check if `negocio.whatsapp` is valid and `consentimiento` is clear.
  - **Calendar bookings (`reservas`):** checks real-time slots via Apps Script. Check if `duraciones`, `horaInicio`/`horaFin`, `antelacionHoras` and `precioPorHora` create unnecessary dead ends.
  - **Stripe checkout (`catalogoAjustes.tienda` + `producto.enlacePago`):** single-product `https://buy.stripe.com...` link (no cart). Check that `disponible` is `true`, pricing matches `producto.precioTexto`, and digital products explain immediate delivery / withdrawal terms in Stripe.
  - **Newsletter (`newsletter`):** Brevo form (`suscribir.mjs`). Do not let an unaligned newsletter form steal focus from the main conversion CTA on a sales/lead landing.

**E. Trust at the point of action**
- Are real, verifiable signals present without inventing claims? In the kit, check **1. Mi negocio y portada → Reseñas y perfiles verificados (`resenas`)**: real platform badges + links (`Google Maps`, `ProvenExpert`, `Trustpilot`, `LinkedIn`, niche directories) and attributable quotes with `autor`, `detalleAutor`, `fuente` and `urlFuente`. Anonymous filler hurts trust.
- Check if `Datos legales` (`legal`: `titular`, `nif`, `domicilio`, `plazoConservacion`) are completed before collecting real leads/payments.

**F. The path after the button**
- Does `/gracias` (or `/newsletter-gracias`, or Stripe's post-payment redirect/message) clearly set expectations (when you will reply, what arrives next, support contact) rather than leaving the user guessing?
- Note for non-programmers: `/gracias` in `web/src/pages/gracias.astro` is currently generic ("Gracias, hemos recibido tu consulta"); customizing it with a specific next step, calendar link, or secondary offer requires editing Astro (`web/src/pages/gracias.astro`) or using a Stripe post-payment redirect URL.

**G. Measurement (check this even if it is not a direct leak)**
- Are `ga4`, `gtm` or `metaPixel` configured in `4. Contacto, buscadores y legal → Google, IA y buscadores` (`buscadores`), and do they respect `Consentimiento.astro` (blocked until accepted)?
- On Meta campaigns: `/gracias` triggers `Lead` via `Consentimiento.astro` (`__metaTrack('Lead')`) with `event_id` deduplication to `web/netlify/functions/meta-capi.mjs` when `META_CAPI_TOKEN` is set in Netlify Environment Variables (browser `_fbp`/`_fbc` cookies are read only after consent).
- Note kit boundary: external Stripe Payment Links (`buy.stripe.com`) do not carry browser `fbclid`/`gclid` into Stripe orders automatically unless you configure Stripe post-payment redirect back to a dedicated thank-you URL on your domain.

### 3. Rank and report

Output in the user's language (Spanish if the conversation is in Spanish) using this structure:

```markdown
## Verdict
<one paragraph: is the landing page the bottleneck, is it upstream (offer/traffic/still example data), or is there not enough traffic yet?>

## Fix now (ordered by expected impact, max 7 items)
1. <element> - <failure mode> → <specific change> | Dónde se cambia: Sanity Studio (`exact path`) / Código Astro (`web/src/...`) / Externo (Netlify/Stripe) | effort: S/M/L | confidence: high/med/low

## Test, don't guess
<changes worth testing with `disenar-experimento`, with the metric to judge on>

## Not a problem
<things checked that are already fine>

## Could not check
<missing inputs and what that limits>
```

Rules for the report:
- Never claim a percentage lift for a specific fix. Rank relatively and state expected direction.
- If sessions are under ~1,000 or conversions under ~30 (excluding `PRUEBA` test entries), state that the sample is too small to separate signal from noise and prioritize by first-principles friction.
- Cap the "Fix now" list at 7 items.

## Implementing the fixes in `kit-negocio-web`

Do **not** recommend external platforms or self-hosted funnel builders (such as Autonnel) when the fix belongs in the student's existing Astro + Sanity + Netlify kit. Instead, separate execution cleanly:

### 1. Changes editable in Sanity Studio (no programming)
- **Dual mode:**
  - **With Sanity MCP active (`npm run mcp`):** read the current document(s) first (`portada`, `pagina`, `resenas`, `contacto`, `reservas`, `consultaWhatsapp`, `producto`, `enlaces`, `buscadores`, `legal`), propose exact copy/field changes, **ask for explicit confirmation before writing**, and save **only as drafts (`drafts.*`)**. Respect all *singletons* (never duplicate or delete them) and **never publish or delete** without explicit authorization.
  - **Without MCP / manual:** give ready-to-paste copy and the exact Sanity Studio path (`grupo → apartado → pestaña → campo`) and remind the student to click **Publish**.
- Examples solvable in Sanity Studio: rewriting `portada` or `pagina` (`/[slug]`) headline/subtitulo/CTA, creating a dedicated `Landing de campaña` (`mostrarEnMenu: false`), trimming competing blocks, updating `contacto.texto`, enabling verified `resenas`, adjusting `reservas` durations/hours, or setting `buscadores` IDs.

### 2. Changes requiring code (`web/src/` or `studio/schemas/index.ts`)
Follow `AGENTS.md`:
- Layout/order changes on fixed sections (`web/src/pages/index.astro`, `[slug].astro`, `gracias.astro`, `styles/`) → edit in `web/src/`, verify with `npm run build`, deploy via `git commit` + `git push`.
- New editable fields (e.g. per-landing custom thank-you message or new form fields) → update in order: `studio/schemas/index.ts` → `web/src/data/negocio.json` → `web/src/lib/contenido.ts` → `.astro` component, then run `npm run build` and `npm run publicar-panel`.

### 3. External configuration (outside Sanity and Git)
- Netlify Environment Variables (`META_CAPI_TOKEN`, `BREVO_API_KEY`, `APPS_SCRIPT_URL`, `RESERVAS_SCRIPT_URL`), Stripe Payment Link post-payment redirect/terms, or Google Apps Script `.gs` updates.
