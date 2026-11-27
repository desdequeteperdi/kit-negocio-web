// Diagnóstico previo del entorno para Windows (con antivirus/OneDrive/PowerShell) y Mac.
// Uso: node scripts/diagnostico.mjs
import { accessSync, constants, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(join(dirname(fileURLToPath(import.meta.url)), '..'));
const esWindows = process.platform === 'win32';
const esMac = process.platform === 'darwin';

let avisos = 0;
let errores = 0;

function ok(msg) { console.log(`[OK]    ${msg}`); }
function warn(msg) { avisos++; console.log(`[AVISO] ${msg}`); }
function err(msg) { errores++; console.log(`[ERROR] ${msg}`); }

console.log('=== Diagnóstico del entorno (kit-negocio-web) ===');
console.log(`Sistema: ${process.platform} (${process.arch})`);
console.log(`Carpeta: ${raiz}`);

// 1. Node.js >= 22.12
const [mayor, menor] = process.versions.node.split('.').map(Number);
if (mayor > 22 || (mayor === 22 && menor >= 12)) {
  ok(`Node.js v${process.versions.node} (>= 22.12)`);
} else {
  err(`Node.js v${process.versions.node} es antiguo. Instala la versión LTS (>= 22.12) desde https://nodejs.org y reinicia VS Code.`);
}

// 2. npm, Git y PATH global (especialmente en Windows tras instalar herramientas)
for (const [nombre, cmd] of [['npm', 'npm -v'], ['Git', 'git --version']]) {
  try {
    const out = execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    ok(`${nombre}: ${out}`);
  } catch {
    err(`${nombre} no responde en la terminal. Si acabas de instalarlo en Windows, refresca el PATH o cierra y abre VS Code.`);
  }
}

if (esWindows) {
  try {
    const npmPrefix = execSync('npm prefix -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const pathActual = (process.env.PATH || process.env.Path || '').toLowerCase();
    if (npmPrefix && !pathActual.includes(npmPrefix.toLowerCase())) {
      warn(`La carpeta global de npm (${npmPrefix}) no está en el PATH actual (por eso fallan "codex" o "claude"). Refresca en PowerShell con: $env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")`);
    } else if (npmPrefix) {
      ok(`Carpeta global de npm en PATH: ${npmPrefix}`);
    }
  } catch {
    warn('No se pudo comprobar el PATH global de npm.');
  }
}

// 3. Comprobaciones específicas de Windows (OneDrive, rutas largas, carpetas protegidas, PowerShell)
if (esWindows) {
  if (/onedrive/i.test(raiz)) {
    warn('El proyecto está dentro de OneDrive. OneDrive bloquea miles de archivos de node_modules durante npm install (EPERM/EBUSY). Muévelo a C:\\proyectos\\kit-negocio-web.');
  }
  if (/program files|windows\\system32/i.test(raiz)) {
    err('El proyecto está en una carpeta protegida del sistema. Muévelo a C:\\proyectos\\kit-negocio-web.');
  }
  if (raiz.length > 110) {
    warn(`La ruta tiene ${raiz.length} caracteres. En Windows las rutas largas pueden dar errores al instalar; conviene C:\\proyectos\\kit-negocio-web.`);
  }
  try {
    const policy = execSync('powershell -NoProfile -Command "Get-ExecutionPolicy"', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
    if (policy === 'Restricted' || policy === 'AllSigned') {
      warn(`PowerShell ExecutionPolicy = ${policy} (puede bloquear npm en VS Code). Ejecuta en PowerShell: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`);
    } else {
      ok(`PowerShell ExecutionPolicy: ${policy}`);
    }
  } catch {
    warn('No se pudo comprobar Get-ExecutionPolicy de PowerShell.');
  }
} else if (esMac && raiz.startsWith('/Applications')) {
  warn('El proyecto está dentro de /Applications. Conviene moverlo a una carpeta dentro de tu usuario (p. ej. ~/proyectos/kit-negocio-web).');
}

// 4. Permisos de escritura
for (const rel of ['.', 'web', 'studio']) {
  const dir = join(raiz, rel);
  if (!existsSync(dir)) continue;
  try {
    accessSync(dir, constants.W_OK);
    ok(`Permiso de escritura en ${rel === '.' ? 'raíz' : rel}/`);
  } catch {
    err(`Sin permiso de escritura en ${dir}. Mueve el proyecto a una carpeta de tu usuario (C:\\proyectos en Windows; ~/proyectos en Mac).`);
  }
}

// 5. Estado de dependencias y archivos de proyecto
for (const carpeta of ['web', 'studio']) {
  const nm = join(raiz, carpeta, 'node_modules');
  if (existsSync(nm)) {
    ok(`${carpeta}/node_modules ya existe`);
  } else {
    warn(`${carpeta}/node_modules falta → ejecuta: npm run instalar`);
  }
}

if (existsSync(join(raiz, 'MEMORIA.md'))) {
  ok('MEMORIA.md existe en la raíz');
} else {
  warn('Falta MEMORIA.md (se creará desde plantillas/memoria-negocio.md)');
}

console.log('---');
console.log(`Resumen: ${errores} errores, ${avisos} avisos.`);
if (errores > 0) process.exit(1);
