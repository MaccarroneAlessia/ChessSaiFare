---
description: Run one work cycle from the roadmap to a pull request, with the agent team.
argument-hint: "[optional: the roadmap prompt or task to do]"
---
Run one work cycle. Task: $ARGUMENTS (if empty, pick it from the roadmap).

1. Read `../ChessSaiFare-content/documentazione/STATO.md`, `15-roadmap/roadmap.md` and `15-roadmap/prompt-per-ai.md`.
   Pick the first prompt or item not done yet, unless a task was given.
2. Propose a short plan: files, tests, risks, which reviewers apply. STOP and wait for my approval.
3. Create a branch named after the task (`feat/...`, `fix/...`). Use the `implementer` agent to build it.
4. Run in parallel the reviewers that apply: `architecture-reviewer`, `cleaner`, `security-reviewer`, `qa`,
   plus `minors-guardian` and `chess-verifier` when the change touches their area.
5. Send every BLOCK back to `implementer`, then re-run only the reviewers that blocked.
   After 3 rounds with BLOCKs still open, stop and ask me.
6. Update the topic `.md` files in `../ChessSaiFare-content/documentazione/` (Italian: status, checkboxes, log),
   add a row to `15-roadmap/registro-cicli.md`, run `python3 strumenti/genera_stato.py` there.
7. Conventional commits in English on the branch. Write the pull request description from the template
   in your final message. STOP: you never push or merge (pushing is denied in settings).
   I push the branch and open the pull request myself.
8. Final message: what was done, reviewers' verdicts, anything left for later.
