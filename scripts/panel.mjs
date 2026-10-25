// Comandos del panel de Sanity que leen su configuración de studio/.env.
// Uso: node scripts/panel.mjs semilla [--reemplazar]   (carga el contenido de ejemplo en tu proyecto)
//      node scripts/panel.mjs publicar                 (publica el panel en https://<nombre>.sanity.studio)
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const studio = join(raiz, 'studio');
const [orden, ...opciones] = process.argv.slice(2);
const win = process.platform === 'win32';

function salir(mensaje) {
  console.error(`\n${mensaje}\n`);
  process.exit(1);
}

const [mayor, menor] = process.versions.node.split('.').map(Number);
if (mayor < 22 || (mayor === 22 && menor < 12)) {
  salir(`El panel necesita Node 22.12 o superior (tienes ${process.versions.node}).\nDescarga la versión LTS en https://nodejs.org y vuelve a intentarlo.`);
}

// Lee studio/.env (líneas CLAVE=valor; las que empiezan por # se ignoran)
function leerEnv() {
  const ruta = join(studio, '.env');
  if (!existsSync(ruta)) {
    salir('Falta el archivo studio/.env.\nCópialo desde studio/.env.example (sin «.example») y rellena SANITY_STUDIO_PROJECT_ID.');
  }
  const env = {};
  for (const linea of readFileSync(ruta, 'utf8').split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !linea.trim().startsWith('#')) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}

const env = leerEnv();
if (!/^[a-z0-9]{8,}$/.test(env.SANITY_STUDIO_PROJECT_ID ?? '')) {
  salir('SANITY_STUDIO_PROJECT_ID de studio/.env está vacío o no es válido.\nLo encuentras en https://www.sanity.io/manage, dentro de tu proyecto.');
}
const dataset = env.SANITY_STUDIO_DATASET || 'production';

if (!existsSync(join(studio, 'node_modules'))) {
  salir('Faltan las dependencias del panel. Ejecuta primero: npm run instalar');
}

function sanity(args) {
  const r = spawnSync(win ? 'npx.cmd' : 'npx', ['sanity', ...args], {
    cwd: studio,
    stdio: ['inherit', 'inherit', 'pipe'],
    shell: win,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) {
    if (/already exists/.test(r.stderr ?? '')) {
      salir('Tu proyecto ya tiene contenido, así que no se ha cambiado nada.\nSi quieres volver al contenido de ejemplo (borra tus cambios): npm run semilla -- --reemplazar');
    }
    salir(`Algo ha fallado (sanity ${args.join(' ')}).\nSi pide iniciar sesión, ejecuta en la carpeta studio: npx sanity login`);
  }
}

if (orden === 'semilla') {
  const g = spawnSync(process.execPath, [join(raiz, 'scripts', 'semilla.mjs')], { stdio: 'inherit' });
  if (g.status !== 0) salir('No se pudo generar studio/semilla.ndjson.');
  // Sin --reemplazar, Sanity se niega a pisar documentos que ya existen: así no se pierden tus cambios.
  const extra = opciones.includes('--reemplazar') ? ['--replace'] : [];
  if (extra.length) console.log('\nAviso: --reemplazar sobrescribe los textos que ya hayas cambiado en el panel.');
  sanity(['dataset', 'import', 'semilla.ndjson', dataset, ...extra]);
  console.log(`\n✔ Contenido de ejemplo cargado en el proyecto ${env.SANITY_STUDIO_PROJECT_ID} (dataset ${dataset}).`);
} else if (orden === 'publicar') {
  if (!/^[a-z0-9-]+$/.test(env.SANITY_STUDIO_HOST ?? '')) {
    salir('Falta SANITY_STUDIO_HOST en studio/.env.\nEs el nombre de tu panel (solo minúsculas, números y guiones): tu dirección será https://<nombre>.sanity.studio');
  }
  sanity(['deploy']);
  console.log('\n✔ Panel publicado.');
} else {
  salir('Uso: node scripts/panel.mjs semilla [--reemplazar]  |  node scripts/panel.mjs publicar');
}
