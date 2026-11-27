// Pone en marcha el kit: comprueba Node, permisos/OneDrive, instala dependencias y arranca la web.
// Uso: node scripts/empezar.mjs [--sin-servidor]
import { accessSync, constants, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(join(dirname(fileURLToPath(import.meta.url)), '..'));
const sinServidor = process.argv.includes('--sin-servidor');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const esWindows = process.platform === 'win32';

const [mayor, menor] = process.versions.node.split('.').map(Number);
// El panel de Sanity 6 pide Node 22.12 o superior; la web, con menos, ya funcionaría.
if (mayor < 22 || (mayor === 22 && menor < 12)) {
  console.error(`\nNecesitas Node 22.12 o superior (tienes ${process.versions.node}).`);
  console.error('Descarga la versión LTS en https://nodejs.org, cierra VS Code y vuelve a abrirlo.\n');
  process.exit(1);
}

if (esWindows && /onedrive/i.test(raiz)) {
  console.warn('\n[AVISO] Esta carpeta está dentro de OneDrive.');
  console.warn('Si la instalación falla por archivos bloqueados (EPERM/EBUSY), mueve el proyecto a C:\\proyectos\\kit-negocio-web.\n');
}

try {
  accessSync(raiz, constants.W_OK);
} catch {
  console.error(`\n[ERROR] No tienes permiso de escritura en ${raiz}.`);
  console.error('Mueve la carpeta a C:\\proyectos (Windows) o a tu carpeta personal ~/proyectos (Mac).\n');
  process.exit(1);
}

function mostrarAyudaFalloInstalacion(carpeta, salida) {
  console.error(`\nAlgo ha fallado en «${carpeta}» (npm install).`);
  if (/EPERM|EBUSY|UNKNOWN|esbuild|sharp/i.test(salida)) {
    console.error('\nCausa probable: bloqueo de antivirus en Windows, OneDrive o un proceso abierto tocando node_modules.');
    console.error('Cómo resolverlo sin desactivar tu antivirus:');
    console.error('  1. Cierra otras terminales o ventanas donde esté corriendo la web.');
    console.error('  2. Si estás en Windows, añade una exclusión SOLO para esta carpeta en Seguridad de Windows / tu antivirus:');
    console.error(`     ${raiz}`);
    console.error(`  3. Borra la carpeta parcial ${carpeta}\\node_modules (si existe), ejecuta "npm cache clean --force" y repite "npm run instalar".\n`);
  } else if (/EACCES/i.test(salida)) {
    console.error('\nCausa probable: problema de permisos en la carpeta o en la caché de npm.');
    console.error('  - En Windows: mueve el proyecto a C:\\proyectos\\kit-negocio-web.');
    console.error('  - En Mac: asegúrate de que la carpeta es de tu usuario y no usaste sudo con npm anteriormente.\n');
  } else {
    console.error('Comprueba tu conexión a internet y vuelve a ejecutar "npm run instalar".');
    console.error('Si continúa el error, ejecuta "npm run diagnosticar" para ver qué falla.\n');
  }
}

function ejecutar(carpeta, args, esInstall = false) {
  const cwd = join(raiz, carpeta);
  if (!esInstall) {
    const r = spawnSync(npm, args, { cwd, stdio: 'inherit', shell: esWindows });
    if (r.status !== 0) {
      console.error(`\nAlgo ha fallado en «${carpeta}» (npm ${args.join(' ')}).`);
      console.error('Ejecuta "npm run diagnosticar" para revisar el entorno.\n');
      process.exit(r.status ?? 1);
    }
    return;
  }

  const r = spawnSync(npm, args, { cwd, encoding: 'utf8', shell: esWindows });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) {
    mostrarAyudaFalloInstalacion(carpeta, `${r.stdout || ''}\n${r.stderr || ''}`);
    process.exit(r.status ?? 1);
  }
}

for (const carpeta of ['web', 'studio']) {
  if (!existsSync(join(raiz, carpeta, 'package.json'))) continue;
  if (existsSync(join(raiz, carpeta, 'node_modules'))) {
    console.log(`✔ ${carpeta}: dependencias ya instaladas`);
  } else {
    console.log(`\nInstalando dependencias de ${carpeta} (la primera vez tarda unos minutos)…`);
    ejecutar(carpeta, ['install', '--no-audit', '--no-fund'], true);
  }
}

if (sinServidor) {
  console.log('\n✔ Listo. Para arrancar la web: npm run empezar (o npm run dev)');
} else {
  console.log('\n✔ Listo. Abre http://localhost:4321 en el navegador. Para parar: Ctrl + C.\n');
  ejecutar('web', ['run', 'dev']);
}
