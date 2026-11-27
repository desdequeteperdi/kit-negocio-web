#!/usr/bin/env node
// Read-only HTML quality analyzer (v3 - pure Node.js, cross-platform Windows/Mac/Linux, zero dependencies).
// Automatically narrows kit-negocio / web roots to web/dist and skips studio, node_modules, .astro, .git.
// stderr = human logs, stdout = structured JSON.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const MAX_FINDINGS = 100;
const MAX_PER_CATEGORY_PER_FILE = 20;
const SKIP_DIRS = new Set(['studio', 'node_modules', '.astro', '.git']);

function fail(type, message, suggestion) {
  console.log(JSON.stringify({
    success: false,
    error: { type, message, retryable: false, suggestion },
  }, null, 2));
  process.exit(1);
}

const args = process.argv.slice(2);
let target;
if (args.length >= 1) {
  target = args[0];
} else if (existsSync('./web/dist')) {
  target = './web/dist';
} else if (existsSync('./plantillas/kit-negocio/web/dist')) {
  target = './plantillas/kit-negocio/web/dist';
} else {
  fail(
    'invalid_input',
    'No target provided and no built web/dist folder detected',
    "Run 'npm run build' and pass web/dist (or a built HTML file)"
  );
}

if (!existsSync(target)) {
  fail('invalid_input', `Target not found: ${target}`, 'Pass an existing web/dist folder or HTML file path');
}

let scanTarget = target;
const targetStat = statSync(target);
if (targetStat.isDirectory()) {
  const baseName = basename(resolve(target));
  if (SKIP_DIRS.has(baseName)) {
    fail('invalid_input', `Refusing to scan non-public directory '${baseName}'`, "Pass web/dist after running 'npm run build'");
  }

  const webDist = join(target, 'web', 'dist');
  const webDir = join(target, 'web');
  const studioDir = join(target, 'studio');
  const distDir = join(target, 'dist');
  const hasAstroConfig = existsSync(join(target, 'astro.config.mjs')) || existsSync(join(target, 'astro.config.ts'));

  if (existsSync(webDist) && statSync(webDist).isDirectory()) {
    scanTarget = webDist;
  } else if (existsSync(webDir) && existsSync(studioDir)) {
    fail(
      'not_built',
      `Found kit root '${target}' but '${webDist}' does not exist yet`,
      "Run 'npm run build' in the kit first so Astro compiles Sanity/negocio.json into web/dist"
    );
  } else if (existsSync(distDir) && (hasAstroConfig || existsSync(join(target, 'src')))) {
    scanTarget = distDir;
  } else if (hasAstroConfig) {
    fail('not_built', `Found web folder '${target}' without compiled 'dist/'`, "Run 'npm run build' first and scan web/dist");
  }
}

console.error(`Target resolved to: ${scanTarget}`);

const issues = [];
const warnings = [];
let filesScanned = 0;

function collectHtmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...collectHtmlFiles(full));
    } else if (entry.isFile() && /\.(html?|HTM?)$/.test(entry.name)) {
      found.push(full);
    }
  }
  return found.sort();
}

function lineNumberAt(content, index) {
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (content.charCodeAt(i) === 10) line++;
  }
  return line;
}

function analyzeHtml(file) {
  filesScanned++;
  console.error(`Analyzing: ${file}`);
  const content = readFileSync(file, 'utf8');
  const isErrorOrRedirect = /(^|[\\/])404\.html$/i.test(file) || /http-equiv=["']refresh["']/i.test(content);

  if (!/<!doctype\s+html>/i.test(content)) issues.push(`${file}:0: Missing HTML5 doctype`);
  if (!/charset=["']?utf-8/i.test(content)) warnings.push(`${file}:0: Missing or non-UTF-8 charset`);
  if (!/<meta[^>]+name=["']viewport["']/i.test(content)) issues.push(`${file}:0: Missing viewport meta tag`);
  if (!/<html[^>]*\blang=/i.test(content)) issues.push(`${file}:0: Missing lang attribute on <html>`);
  if (!/<title>\s*[^<\s][^<]*<\/title>/i.test(content)) issues.push(`${file}:0: Missing or empty <title> tag`);

  if (!isErrorOrRedirect) {
    if (!/<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']|<meta[^>]+content=["'][^"']+["'][^>]+name=["']description["']/i.test(content)) {
      warnings.push(`${file}:0: Missing or empty meta description`);
    }
    if (!/<h1\b[^>]*>/i.test(content)) {
      warnings.push(`${file}:0: Missing <h1> heading`);
    }
  }

  // <img> without alt attribute
  let altCount = 0;
  for (const m of content.matchAll(/<img\b[^>]*>/gi)) {
    if (/\balt\s*=/i.test(m[0])) continue;
    if (altCount >= MAX_PER_CATEGORY_PER_FILE) {
      warnings.push(`${file}:0: <img>-without-alt findings truncated (>${MAX_PER_CATEGORY_PER_FILE} in this file)`);
      break;
    }
    const ln = lineNumberAt(content, m.index ?? 0);
    warnings.push(`${file}:${ln}: <img> without alt attribute`);
    altCount++;
  }

  // Non-HTTPS URLs in HTML resource/link attributes (ignores xmlns/schema.org namespaces)
  let httpCount = 0;
  for (const m of content.matchAll(/\b(?:href|src|action|poster)=["'](http:\/\/[^"'\s>]+)/gi)) {
    const url = m[1];
    if (/^http:\/\/(?:localhost|127\.0\.0\.1)(?:[:/]|$)/i.test(url)) continue;
    if (httpCount >= MAX_PER_CATEGORY_PER_FILE) {
      warnings.push(`${file}:0: Non-HTTPS URL findings truncated (>${MAX_PER_CATEGORY_PER_FILE} in this file)`);
      break;
    }
    const ln = lineNumberAt(content, m.index ?? 0);
    warnings.push(`${file}:${ln}: Non-HTTPS URL (${url})`);
    httpCount++;
  }
}

const finalStat = statSync(scanTarget);
if (finalStat.isDirectory()) {
  const htmlFiles = collectHtmlFiles(scanTarget);
  if (htmlFiles.length === 0) {
    fail('no_html_found', `No built .html/.htm files found in '${scanTarget}'`, "Run 'npm run build' and pass web/dist");
  }
  for (const file of htmlFiles) analyzeHtml(file);
} else if (finalStat.isFile()) {
  analyzeHtml(scanTarget);
} else {
  fail('invalid_input', `Target is not a regular file or directory: ${scanTarget}`, 'Pass a path to web/dist or an .html/.htm file');
}

const issueTotal = issues.length;
const warningTotal = warnings.length;

console.error(`Scanned ${filesScanned} HTML file(s) in ${scanTarget}. ${issueTotal} issues, ${warningTotal} warnings.`);

console.log(JSON.stringify({
  success: true,
  scannedTarget: scanTarget,
  filesScanned,
  issues: issues.slice(0, MAX_FINDINGS),
  warnings: warnings.slice(0, MAX_FINDINGS),
  issueCount: issueTotal,
  warningCount: warningTotal,
  truncated: issueTotal > MAX_FINDINGS || warningTotal > MAX_FINDINGS,
}, null, 2));
