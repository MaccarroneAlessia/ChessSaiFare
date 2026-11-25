# ChessSaiFare – code repository (public)

The project rules live in the private repository `ChessSaiFare-content`, cloned next to this one.
Start sessions with: `claude --add-dir ../ChessSaiFare-content`

@../ChessSaiFare-content/CLAUDE.md
@app/AGENTS.md

## This repository
- `documentazione/`, `contenuti/` and `strumenti/` mentioned in the rules are in `../ChessSaiFare-content/`.
- The app is in `app/` (Next.js, strict TypeScript). Layers: `src/domain`, `src/application`, `src/infrastructure`, `src/features`, `src/shared`.
- Checks, run in `app/`: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`.
- Full content check, run in `app/`: `CONTENT_DIR=../../ChessSaiFare-content/contenuti npx vitest run tests/content`.

## Public repository
- This repository is PUBLIC (AGPL-3.0). Never copy full lessons, puzzles, documentation or social material from `ChessSaiFare-content`: sample content only.
- No secrets, keys or personal data in any file.

## Agent team
- Subagents are in `.claude/agents/`. Reviewers never edit code: they answer PASS or BLOCK with file:line, rule and fix.
- A change is done only when every reviewer that applies says PASS and all checks are green.
- Agents never push, merge or deploy: they commit on a branch, write the pull request description and stop. Pushing, the pull request and the merge are human decisions.
- One work cycle: `/ciclo`.
