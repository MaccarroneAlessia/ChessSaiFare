#!/usr/bin/env bash
# Stop hook: Claude cannot say "done" while format, lint, types or unit tests fail in app/.
input=$(cat)
# Second stop in a row: let Claude stop and report the failure, to avoid an endless loop.
if printf '%s' "$input" | grep -q '"stop_hook_active": *true'; then exit 0; fi
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
# Nothing changed in app/: no checks needed.
if [ -z "$(git status --porcelain -- app 2>/dev/null)" ]; then exit 0; fi
cd app || exit 0
out=$( { npm run --silent format:check && npm run --silent lint && npm run --silent typecheck && npm test --silent; } 2>&1 )
if [ $? -ne 0 ]; then
  printf 'Checks failed. Fix them before saying the work is done (never disable a check):\n%s\n' "$(printf '%s' "$out" | tail -n 40)" >&2
  exit 2
fi
exit 0
