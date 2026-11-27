#!/bin/bash
# Read-only HTML quality analyzer (v2 - scoped to built web output). No filesystem mutations.
# Automatically narrows kit-negocio / web roots to web/dist and prunes studio, node_modules, .astro, .git.
# stderr = human logs, stdout = structured JSON.
set -euo pipefail

MAX_FINDINGS=100
MAX_PER_CATEGORY_PER_FILE=20  # cap per high-volume check per file so one category can't fill MAX_FINDINGS

fail() {
  local type="$1" msg="$2" suggestion="$3"
  if command -v jq >/dev/null 2>&1; then
    jq -n \
      --arg type "$type" \
      --arg msg "$msg" \
      --arg suggestion "$suggestion" \
      '{success: false, error: {type: $type, message: $msg, retryable: false, suggestion: $suggestion}}'
  else
    printf '{"success":false,"error":{"type":"%s","message":"%s","suggestion":"%s","retryable":false}}\n' \
      "$type" "$msg" "$suggestion"
  fi
  exit 1
}

command -v jq >/dev/null 2>&1 || \
  fail "missing_dependency" "jq is required for safe JSON output" "Install: brew install jq"

if [ $# -ge 1 ]; then
  TARGET="$1"
elif [ -d "./web/dist" ]; then
  TARGET="./web/dist"
elif [ -d "./plantillas/kit-negocio/web/dist" ]; then
  TARGET="./plantillas/kit-negocio/web/dist"
else
  fail "invalid_input" "No target provided and no built web/dist folder detected" "Run 'npm run build' and pass web/dist (or a built HTML file)"
fi

[ -e "$TARGET" ] || fail "invalid_input" "Target not found: $TARGET" "Pass an existing web/dist folder or HTML file path"

# Resolve kit or web folder cleanly to its built static HTML output (web/dist)
SCAN_TARGET="$TARGET"
if [ -d "$TARGET" ]; then
  BASE_NAME="$(basename "$(cd "$TARGET" && pwd)")"
  case "$BASE_NAME" in
    studio|node_modules|.astro|.git)
      fail "invalid_input" "Refusing to scan non-public directory '$BASE_NAME'" "Pass web/dist after running 'npm run build'"
      ;;
  esac

  if [ -d "$TARGET/web/dist" ]; then
    SCAN_TARGET="$TARGET/web/dist"
  elif [ -d "$TARGET/web" ] && [ -d "$TARGET/studio" ]; then
    fail "not_built" "Found kit root '$TARGET' but '$TARGET/web/dist' does not exist yet" "Run 'npm run build' in the kit first so Astro compiles Sanity/negocio.json into web/dist"
  elif [ -d "$TARGET/dist" ] && { [ -f "$TARGET/astro.config.mjs" ] || [ -f "$TARGET/astro.config.ts" ] || [ -d "$TARGET/src" ]; }; then
    SCAN_TARGET="$TARGET/dist"
  elif [ -f "$TARGET/astro.config.mjs" ] || [ -f "$TARGET/astro.config.ts" ]; then
    fail "not_built" "Found web folder '$TARGET' without compiled 'dist/'" "Run 'npm run build' first and scan web/dist"
  fi
fi

echo "Target resolved to: $SCAN_TARGET" >&2

ISSUES=()
WARNINGS=()
FILES_SCANNED=0

analyze_html() {
  local file="$1"
  FILES_SCANNED=$((FILES_SCANNED + 1))
  echo "Analyzing: $file" >&2

  grep -qi "<!doctype html>"     "$file" || ISSUES+=("$file:0: Missing HTML5 doctype")
  grep -qi 'charset.*utf-8'      "$file" || WARNINGS+=("$file:0: Missing or non-UTF-8 charset")
  grep -qi 'name="viewport"'     "$file" || ISSUES+=("$file:0: Missing viewport meta tag")
  grep -qi '<html[^>]*lang='     "$file" || ISSUES+=("$file:0: Missing lang attribute on <html>")
  grep -qi '<title>'             "$file" || ISSUES+=("$file:0: Missing <title> tag")

  # <img> without alt — two-pass replaces broken PCRE lookahead
  local alt_count=0
  while IFS=: read -r ln tag; do
    if grep -qE 'alt=' <<<"$tag"; then continue; fi
    if [ "$alt_count" -ge "$MAX_PER_CATEGORY_PER_FILE" ]; then
      WARNINGS+=("$file:0: <img>-without-alt findings truncated (>${MAX_PER_CATEGORY_PER_FILE} in this file)")
      break
    fi
    WARNINGS+=("$file:$ln: <img> without alt attribute")
    alt_count=$((alt_count + 1))
  done < <(grep -noE '<img[^>]*>' "$file" || true)

  # Non-HTTPS URLs with line numbers
  local http_count=0
  while IFS=: read -r ln _; do
    if [ "$http_count" -ge "$MAX_PER_CATEGORY_PER_FILE" ]; then
      WARNINGS+=("$file:0: Non-HTTPS URL findings truncated (>${MAX_PER_CATEGORY_PER_FILE} in this file)")
      break
    fi
    WARNINGS+=("$file:$ln: Non-HTTPS URL")
    http_count=$((http_count + 1))
  done < <(grep -noE 'http://[^"'\''[:space:]>]*' "$file" || true)
}

if [ -d "$SCAN_TARGET" ]; then
  while IFS= read -r -d '' file; do
    analyze_html "$file"
  done < <(find "$SCAN_TARGET" \
    \( -name node_modules -o -name .git -o -name .astro -o -name studio \) -prune -o \
    \( -name "*.html" -o -name "*.htm" \) -type f -print0)
  [ "$FILES_SCANNED" -gt 0 ] || fail "no_html_found" "No built .html/.htm files found in '$SCAN_TARGET'" "Run 'npm run build' and pass web/dist"
elif [ -f "$SCAN_TARGET" ]; then
  analyze_html "$SCAN_TARGET"
else
  fail "invalid_input" "Target is not a regular file or directory: $SCAN_TARGET" "Pass a path to web/dist or an .html/.htm file"
fi

issue_total=${#ISSUES[@]}
warning_total=${#WARNINGS[@]}

to_json_array() {
  printf '%s\n' "$@" | jq -Rs 'split("\n") | map(select(length > 0))'
}

if [ "$issue_total" -gt 0 ]; then
  issues_json=$(to_json_array "${ISSUES[@]:0:$MAX_FINDINGS}")
else
  issues_json='[]'
fi

if [ "$warning_total" -gt 0 ]; then
  warnings_json=$(to_json_array "${WARNINGS[@]:0:$MAX_FINDINGS}")
else
  warnings_json='[]'
fi

echo "Scanned $FILES_SCANNED HTML file(s) in $SCAN_TARGET. $issue_total issues, $warning_total warnings." >&2

jq -n \
  --arg scannedTarget "$SCAN_TARGET" \
  --argjson filesScanned "$FILES_SCANNED" \
  --argjson issues "$issues_json" \
  --argjson warnings "$warnings_json" \
  --argjson issue_total "$issue_total" \
  --argjson warning_total "$warning_total" \
  --argjson max "$MAX_FINDINGS" \
  '{
    success: true,
    scannedTarget: $scannedTarget,
    filesScanned: $filesScanned,
    issues: $issues,
    warnings: $warnings,
    issueCount: $issue_total,
    warningCount: $warning_total,
    truncated: (($issue_total > $max) or ($warning_total > $max))
  }'
