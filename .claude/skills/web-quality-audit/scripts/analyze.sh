#!/bin/bash
# Thin wrapper delegating to cross-platform Node.js analyzer (no jq required).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "$SCRIPT_DIR/analyze.mjs" "$@"
