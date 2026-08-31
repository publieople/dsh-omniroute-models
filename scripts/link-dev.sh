#!/usr/bin/env bash
# Local dev helper: make the plugin's @deepseek-ai/* peer deps resolvable from
# its OWN node_modules while the plugin is `link:`-mounted into a DSH profile.
#
# Why: pnpm 11 `link:` only creates a symlink — it does NOT install or hoist the
# package's peers, and Node resolves `import '@deepseek-ai/...'` by walking UP from
# the plugin's REAL path (the source repo), which never reaches the profile's
# node_modules. So we point each peer at the exact runtime DSH already loads,
# keeping a single runtime identity (no cordis/react duplication).
#
# Idempotent: re-running re-makes the links; no-op once they exist.
# Env override: DSH_PROFILE, DSH_GLOBAL (machine-specific defaults below).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DSH_PROFILE="${DSH_PROFILE:-$HOME/.dsh/profiles/web}"
DSH_GLOBAL="${DSH_GLOBAL:-$(npm root -g)/@deepseek-ai/dsh/node_modules/@deepseek-ai}"
PROFILE_AI="$DSH_PROFILE/node_modules/@deepseek-ai"
DEST="$ROOT/node_modules/@deepseek-ai"
mkdir -p "$DEST"
link() { ln -sfn "$1" "$2"; }

# peers supplied by the DSH profile (host runtimes)
for p in cordis schemastery; do
  if [ -e "$PROFILE_AI/$p" ]; then link "$PROFILE_AI/$p" "$DEST/$p"; else echo "MISS profile peer: $p"; fi
done

# peers supplied by the global DSH install (host/client services)
for p in dsh-settings dsh-host-webserver dsh-client-runtime dsh-client-ui-settings dsh-client-locale dsh-web dsh-credentials; do
  if [ -e "$DSH_GLOBAL/$p" ]; then link "$DSH_GLOBAL/$p" "$DEST/$p"; else echo "MISS global peer: $p"; fi
done

echo "link:dev done -> $DEST"
