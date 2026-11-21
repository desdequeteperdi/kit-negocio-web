// Conecta tu copia del kit con tu proyecto de Sanity: pregunta el Project ID y el nombre del panel
// y escribe studio/.env y web/.env. Sustituye a copiar y editar esos archivos a mano.
// Uso: node scripts/configurar.mjs [--id=<project-id>] [--panel=<nombre>] [--dataset=<dataset>] [--si]
//      (con --id y --panel no pregunta nada; --si acepta actualizar un .env que ya existe)
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opcion = (nombre) => args.find((a) => a.startsWith(`--${nombre}=`))?.slice(nombre.length + 3).trim();

function salir(mensaje) {
  console.error(`\n${mensaje}\n`);
  process.exit(1);
}

const validarId = (v) => /^[a-z0-9]{8,}$/.test(v);
const validarPanel = (v) => /^[a-z0-9][a-z0-9-]*$/.test(v);

const rl = createInterface({ input: process.stdin, output: process.stdout });
const entrada = rl[Symbol.asyncIterator]();

// Lee una línea; si se cierra la entrada (Ctrl + D) termina sin cambiar nada.
async function leer(texto) {
  process.stdout.write(texto);
  const { value, done } = await entrada.next();
  if (done) salir('Cancelado: no se ha cambiado nada.');
  return value.trim();
}

async function preguntar(texto, valido, error, inicial) {
  if (inicial !== undefined) {
    if (!valido(inicial)) salir(error);
    return inicial;
  }
  for (;;) {
    const respuesta = await leer(texto);
    if (valido(respuesta)) return respuesta;
    console.log(`  ${error}\n`);
  }
}

// Parte del .env que ya existe (conserva las demás variables) o, si no hay, de .env.example.
// Solo cambia las claves indicadas; no muestra ningún valor que ya hubiera.
function escribirEnv(carpeta, valores) {
  const ruta = join(raiz, carpeta, '.env');
  const base = existsSync(ruta) ? ruta : join(raiz, carpeta, '.env.example');
  if (!existsSync(base)) salir(`Falta ${carpeta}/.env.example. Vuelve a descargar el proyecto.`);
  const lineas = readFileSync(base, 'utf8').split(/\r?\n/);
  for (const [clave, valor] of Object.entries(valores)) {
    const i = lineas.findIndex((l) => l.startsWith(`${clave}=`));
    if (i >= 0) lineas[i] = `${clave}=${valor}`;
    else lineas.push(`${clave}=${valor}`);
  }
  writeFileSync(ruta, lineas.join('\n').replace(/\n*$/, '\n'));
  return ruta;
}

console.log('\nVamos a conectar tu web con tu proyecto de Sanity.');
console.log('Tu Project ID está en https://www.sanity.io/manage, dentro de tu proyecto.\n');

const existentes = ['studio', 'web'].filter((c) => existsSync(join(raiz, c, '.env')));
if (existentes.length && !args.includes('--si')) {
  const r = (await leer(`Ya existe ${existentes.map((c) => `${c}/.env`).join(' y ')}. Se actualizarán solo el ID, el dataset y el nombre del panel. ¿Continuar? (s/n) `)).toLowerCase();
  if (!['s', 'si', 'sí', 'y', 'yes'].includes(r)) {
    rl.close();
    salir('No se ha cambiado nada.');
  }
}

const id = await preguntar(
  'Pega tu Project ID: ',
  validarId,
  'El Project ID debe tener solo letras minúsculas y números (8 o más). Cópialo de nuevo desde sanity.io/manage.',
  opcion('id'),
);
console.log('\nElige el nombre de tu panel: será la dirección https://<nombre>.sanity.studio');
console.log('Solo letras minúsculas, números y guiones (por ejemplo: mi-negocio).\n');
const panel = await preguntar(
  'Nombre de tu panel: ',
  validarPanel,
  'Usa solo letras minúsculas, números y guiones, sin espacios ni tildes.',
  opcion('panel'),
);
rl.close();

const dataset = opcion('dataset') || 'production';
const rutaStudio = escribirEnv('studio', {
  SANITY_STUDIO_PROJECT_ID: id,
  SANITY_STUDIO_DATASET: dataset,
  SANITY_STUDIO_HOST: panel,
});
const rutaWeb = escribirEnv('web', { SANITY_PROJECT_ID: id, SANITY_DATASET: dataset });

console.log(`\n✔ Escrito: ${rutaStudio.replace(raiz, '').replace(/^[\\/]/, '')}`);
console.log(`✔ Escrito: ${rutaWeb.replace(raiz, '').replace(/^[\\/]/, '')}`);
console.log('\nSiguiente paso: iniciar sesión en Sanity (cd studio, npx sanity login, cd ..).\n');
