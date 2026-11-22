import { replay } from '@/domain/chess/rules';
import { type Lesson, LessonSchema, type Puzzle, PuzzleSchema } from '@/domain/schemas/content';

function describeIssues(issues: readonly { path: PropertyKey[]; message: string }[]): string[] {
  return issues.map((issue) => `${issue.path.map(String).join('.')}: ${issue.message}`);
}

/** Returns the problems of one lesson. An empty list means it is valid and every move is legal. */
export function checkLesson(input: unknown): string[] {
  const parsed = LessonSchema.safeParse(input);
  if (!parsed.success) return describeIssues(parsed.error.issues);
  return checkLessonMoves(parsed.data);
}

function checkLessonMoves(lesson: Lesson): string[] {
  const result = replay(
    undefined,
    lesson.steps.map((step) => step.san),
  );
  if (result.ok) return [];
  return [`${lesson.id}: step ${String(result.failedIndex + 1)} (${result.san}): ${result.reason}`];
}

/** Returns the problems of one puzzle: setup, solution, alternatives and accepted first moves. */
export function checkPuzzle(input: unknown): string[] {
  const parsed = PuzzleSchema.safeParse(input);
  if (!parsed.success) return describeIssues(parsed.error.issues);
  return checkPuzzleMoves(parsed.data);
}

function checkPuzzleMoves(puzzle: Puzzle): string[] {
  const start = replay(puzzle.fen, puzzle.moves ?? []);
  if (!start.ok) return [`${puzzle.id}: setup (${start.san}): ${start.reason}`];

  const errors: string[] = [];
  const solution = replay(start.fen, puzzle.sol);
  if (!solution.ok) {
    errors.push(
      `${puzzle.id}: solution move ${String(solution.failedIndex + 1)} (${solution.san}): ${solution.reason}`,
    );
  }
  for (const [userMove, continuation] of Object.entries(puzzle.alt ?? {})) {
    const line = replay(start.fen, [userMove, ...continuation]);
    if (!line.ok)
      errors.push(`${puzzle.id}: alternative ${userMove}: ${line.reason} at ${line.san}`);
  }
  for (const move of puzzle.accept ?? []) {
    const accepted = replay(start.fen, [move]);
    if (!accepted.ok) errors.push(`${puzzle.id}: accepted move ${move}: ${accepted.reason}`);
  }
  return errors;
}
