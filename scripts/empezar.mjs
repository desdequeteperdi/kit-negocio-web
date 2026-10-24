// Pone en marcha el kit: comprueba Node, instala dependencias y arranca la web.
// Uso: node scripts/empezar.mjs [--sin-servidor]
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const sinServidor = process.argv.includes('--sin-servidor');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const [mayor, menor] = process.versions.node.split('.').map(Number);
if (mayor < 18 || (mayor === 18 && menor < 20)) {
  console.error(`\nNecesitas Node 18.20 o superior (tienes ${process.versions.node}).`);
  console.error('Descarga la versión LTS en https://nodejs.org y vuelve a intentarlo.\n');
  process.exit(1);
}

function ejecutar(carpeta, args) {
  const r = spawnSync(npm, args, { cwd: join(raiz, carpeta), stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) {
    console.error(`\nAlgo ha fallado en «${carpeta}» (npm ${args.join(' ')}).`);
    console.error('Comprueba tu conexión a internet y vuelve a ejecutar este mismo comando.\n');
    process.exit(r.status ?? 1);
  }
}

for (const carpeta of ['web', 'studio']) {
  if (!existsSync(join(raiz, carpeta, 'package.json'))) continue;
  if (existsSync(join(raiz, carpeta, 'node_modules'))) {
    console.log(`✔ ${carpeta}: dependencias ya instaladas`);
  } else {
    console.log(`\nInstalando dependencias de ${carpeta} (la primera vez tarda un par de minutos)…`);
    ejecutar(carpeta, ['install']);
  }
}

if (sinServidor) {
  console.log('\n✔ Listo. Para arrancar la web: npm run dev');
} else {
  console.log('\n✔ Listo. Abre http://localhost:4321 en el navegador. Para parar: Ctrl + C.\n');
  ejecutar('web', ['run', 'dev']);
}
