// Configura de forma opcional en .mcp.json los servidores MCP que NO necesitan Google Cloud:
// Sanity (https://mcp.sanity.io), Netlify (https://mcp.netlify.com/mcp) y Playwright (@playwright/mcp).
// Uso: node scripts/mcp.mjs [--si] [--sin-playwright]
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, '.mcp.json');
const args = process.argv.slice(2);
const si = (v) => ['s', 'si', 'sí', 'y', 'yes'].includes(String(v).trim().toLowerCase());

function construirConfig(incluirPlaywright) {
  const win = process.platform === 'win32';
  const servidores = {
    Sanity: { type: 'http', url: 'https://mcp.sanity.io' },
    netlify: { type: 'http', url: 'https://mcp.netlify.com/mcp' },
  };
  if (incluirPlaywright) {
    servidores.playwright = win
      ? { command: 'cmd', args: ['/c', 'npx', '-y', '@playwright/mcp@latest'] }
      : { command: 'npx', args: ['-y', '@playwright/mcp@latest'] };
  }
  return { mcpServers: servidores };
}

let incluirPlaywright = !args.includes('--sin-playwright');

if (!args.includes('--si')) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const preguntar = (q) => new Promise((res) => rl.question(q, (r) => res(r.trim())));

  console.log('\nConfiguración opcional de MCPs sin Google Cloud (.mcp.json):');
  console.log('  - Sanity  (https://mcp.sanity.io): esquema y borradores de contenido (login OAuth).');
  console.log('  - Netlify (https://mcp.netlify.com/mcp): despliegues, logs y formularios (login OAuth).');
  console.log('  - Playwright (@playwright/mcp): abre tu web en navegador para revisar móvil y SEO.\n');

  if (existsSync(destino)) {
    const resp = await preguntar('Ya existe .mcp.json. ¿Sobrescribirlo? (s/n) ');
    if (!si(resp)) {
      rl.close();
      console.log('No se ha cambiado nada.');
      process.exit(0);
    }
  }
  const respPw = await preguntar('¿Incluir también Playwright (navegador local)? (S/n) ');
  incluirPlaywright = respPw === '' || si(respPw);
  rl.close();
}

writeFileSync(destino, JSON.stringify(construirConfig(incluirPlaywright), null, 2) + '\n', 'utf8');
console.log('\n✔ Escrito: .mcp.json (ignorado en Git para no dar conflictos entre Windows y Mac).');
console.log('Si usas Claude Code, también puedes añadirlos con:');
console.log('  claude mcp add --transport http sanity https://mcp.sanity.io');
console.log('  claude mcp add --transport http netlify https://mcp.netlify.com/mcp');
if (incluirPlaywright) {
  console.log('  claude mcp add playwright -- npx -y @playwright/mcp@latest');
}
console.log('\nLa primera vez que tu agente use Sanity o Netlify te abrirá el navegador para iniciar sesión.\n');
