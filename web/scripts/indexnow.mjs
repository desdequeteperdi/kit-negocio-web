// Notifica a IndexNow (Bing / Copilot) las URLs publicadas tras compilar en producción en Netlify.
// Solo actúa si INDEXNOW_KEY está definida y el despliegue es de producción (CONTEXT=production).
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const KEY_RE = /^[a-zA-Z0-9-]{8,128}$/;
const key = (process.env.INDEXNOW_KEY ?? '').trim();
const site = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '');

if (!KEY_RE.test(key) || process.env.CONTEXT !== 'production' || !/^https?:\/\//.test(site)) {
  process.exit(0);
}

const sitemapPath = join(process.cwd(), 'dist', 'sitemap-0.xml');
if (!existsSync(sitemapPath)) {
  process.exit(0);
}

const xml = readFileSync(sitemapPath, 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).slice(0, 500);
if (urlList.length === 0) {
  process.exit(0);
}

const host = new URL(site).host;
try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${site}/${key}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow: ${res.status} (${urlList.length} URLs enviadas)`);
} catch (err) {
  console.warn('IndexNow: no se pudo notificar (no afecta al despliegue)', err?.message ?? err);
}
