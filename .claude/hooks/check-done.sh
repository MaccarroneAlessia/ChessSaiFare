#!/usr/bin/env bash
# Stop hook: sends Claude back to work while checks fail.
# - app/: format, lint, types and unit tests.
# - ../ChessSaiFare-content/documentazione (when present and changed): genera_stato.py --check,
#   because the content repo's own hooks do not load in sessions started here with --add-dir.
# It is a reminder, not a guarantee: on the second stop in a row it lets Claude stop, to avoid
# an endless loop, and only warns the user. The mandatory gate is CI.
# A passing state is remembered (hash in .git/), so turns that change nothing skip the slow checks.
input=$(cat)
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

# True when app/ differs from where the branch left origin/main, committed or not.
# Without a base to compare with, assume it does.
app_changed() {
  local base
  base=$(git merge-base HEAD origin/main 2>/dev/null) || return 0
  ! git diff --quiet "$base" -- app || [ -n "$(git status --porcelain -- app)" ]
}

# Fingerprint of app/ as it is now: commit, tracked changes and untracked files.
app_state() {
  {
    git rev-parse HEAD
    git diff HEAD -- app
    git ls-files --others --exclude-standard -- app | git hash-object --stdin-paths
  } 2>/dev/null | git hash-object --stdin
}

fail=""
cache="$(git rev-parse --git-dir 2>/dev/null)/claude-check-done.ok"

if app_changed; then
  state=$(app_state)
  if [ ! -f "$cache" ] || [ "$(cat "$cache" 2>/dev/null)" != "$state" ]; then
    if out=$(cd app 2>&1 && { npm run --silent format:check && npm run --silent lint && npm run --silent typecheck && npm test --silent; } 2>&1); then
      printf '%s' "$state" > "$cache"
    else
      fail="Checks in app/ failed:
$(printf '%s' "$out" | tail -n 40)"
    fi
  fi
fi

content="../ChessSaiFare-content"
if [ -f "$content/strumenti/genera_stato.py" ] && [ -n "$(git -C "$content" status --porcelain -- documentazione 2>/dev/null)" ]; then
  PY=python3
  "$PY" --version >/dev/null 2>&1 || PY=python
  if ! dout=$(cd "$content" && "$PY" strumenti/genera_stato.py --check 2>&1); then
    fail="$fail
Documentation check failed in $content. Fix the topic files, then run: $PY strumenti/genera_stato.py
$(printf '%s' "$dout" | tail -n 20)"
  fi
fi

[ -z "$fail" ] && exit 0

if printf '%s' "$input" | grep -q '"stop_hook_active" *: *true'; then
  printf '{"systemMessage": "WARNING: checks are STILL FAILING. The work is not done."}\n'
  exit 0
fi
printf 'Fix these before saying the work is done (never disable a check):\n%s\n' "$fail" >&2
exit 2
