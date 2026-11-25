# ChessSaiFare – code repository (public)

Read this file before any change. It works on its own, without the private repository.

If `../ChessSaiFare-content` is available, the full rules (in Italian) are in its `documentazione/16-regole-ai/`.
Start sessions with: `claude --add-dir ../ChessSaiFare-content`
If it is not available, follow this file, skip the steps that need it and say which ones you skipped.

@app/AGENTS.md

## Languages
- **English** for code, identifiers, code comments, commit messages, branch names, pull requests, issues and every file outside `documentazione/`.
- **Italian** for everything inside `documentazione/` and for user-facing text (kept in content files, never hard-coded in logic).

## Before starting
- Read the topic's `.md` file in `documentazione/` and `documentazione/STATO.md`.
- Propose a short plan (files, tests, risks) and wait for approval before non-trivial changes.

## Non-negotiable rules
1. **Minors**: no identifying data about children; no chat, contact with strangers, ads, external links or personal AI in Junior profiles. Every new feature answers "what about a child?".
2. **Security**: no secrets in code; external input (user, FEN, PGN, APIs, LLM output) validated with Zod and never rendered as HTML; RLS on every table; no concatenated SQL; `service_role` only in documented Edge Functions.
3. **Resilience**: timeout on every network call, at most 2 retries with backoff, a fallback for every AI feature; offline-first saves with idempotent `upsert`.
4. **Clean code**: strict TypeScript, no `any`; layers domain / application / infrastructure / features / shared; small functions; no duplication; injected dependencies.
5. **Quality**: every change comes with tests; lint, types and tests actually run before saying "done"; never disable checks to make a change pass.
6. **Honesty**: do not invent APIs, options, moves or data; if unsure, check the official documentation or ask.
7. **Scope**: touch only what the request needs; report anything else separately. Never run destructive commands without confirmation.
8. **Content**: moves and positions verified with chess.js and the engine; texts written by us; from external sources only facts and links.

## At the end of every change
- Update the topic's `.md` file (status, checkboxes, log) — in Italian.
- Run `python3 strumenti/genera_stato.py` in the content repository (on Windows use `python`).
- Conventional commit in English (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`).

## This repository
- `documentazione/`, `contenuti/` and `strumenti/` are in `../ChessSaiFare-content/`.
- The app is in `app/` (Next.js, strict TypeScript). Layers: `src/domain`, `src/application`, `src/infrastructure`, `src/features`, `src/shared`.
- Checks, run in `app/`: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`.
- Full content check, run in `app/`: `CONTENT_DIR=../../ChessSaiFare-content/contenuti npx vitest run tests/content`.
- Prototype: `cd prototipo && npm ci && npm test && node build.js`.

## Public repository
- This repository is PUBLIC (AGPL-3.0). Never copy full lessons, puzzles, documentation or social material from `ChessSaiFare-content`: sample content only.
- No secrets, keys or personal data in any file.

## Agent team
- Subagents are in `.claude/agents/`. Reviewers must never edit code: they answer PASS or BLOCK with file:line, rule and fix. For reviewers that have `Bash` this is an instruction, not a technical limit: check `git status` after they run.
- A change is done only when every reviewer that applies says PASS and all checks are green.
- Agents never push, merge or deploy: they commit on a branch, write the pull request description and stop. Pushing, the pull request and the merge are human decisions.
- One work cycle: `/ciclo`.
