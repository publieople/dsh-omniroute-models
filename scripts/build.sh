#!/bin/bash
# Self-contained build: compile src/index.ts → lib/ with the local typescript.
# Client bundle is produced by the `build:client` (tsdown) script.
: "${DSH_PATH:=node_modules/typescript/bin/tsc}"
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f "$DSH_PATH" ]; then
  echo "build: tsc not found at $DSH_PATH" >&2
  exit 1
fi

echo "=== Compiling src → lib (host) ==="
node "$DSH_PATH" -p tsconfig.json
echo "=== Host build complete ==="
