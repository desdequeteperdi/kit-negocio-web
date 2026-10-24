#!/bin/bash
# Mac: doble clic para instalar y arrancar. Linux: ./empezar.command
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "Falta Node.js. Descarga la versión LTS en https://nodejs.org, instálala y vuelve a abrir este archivo."
  read -r -p "Pulsa Intro para cerrar…"
  exit 1
fi
node scripts/empezar.mjs
read -r -p "Pulsa Intro para cerrar…"
