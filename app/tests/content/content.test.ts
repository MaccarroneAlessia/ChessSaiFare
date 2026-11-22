import { describe, expect, it } from 'vitest';
import { checkLesson, checkPuzzle } from '@/application/content/checkContent';
import { ThemeSchema } from '@/domain/schemas/content';
import { loadLessons, loadPuzzles } from './load-content';

describe('lessons', () => {
  const lessons = loadLessons();

  it('loads at least one lesson', () => {
    expect(lessons.length).toBeGreaterThan(0);
  });

  it.each(lessons.map((lesson, index) => [index, lesson] as const))(
    'lesson %i is valid and legal',
    (_index, lesson) => {
      expect(checkLesson(lesson)).toEqual([]);
    },
  );

  it('has unique ids', () => {
    const ids = lessons.map((lesson) => (lesson as { id: string }).id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('puzzles', () => {
  const { puzzles, themes } = loadPuzzles();

  it('loads puzzles and themes', () => {
    expect(puzzles.length).toBeGreaterThan(0);
    expect(themes.length).toBeGreaterThan(0);
  });

  it.each(themes.map((theme, index) => [index, theme] as const))(
    'theme %i is valid',
    (_index, theme) => {
      expect(ThemeSchema.safeParse(theme).success).toBe(true);
    },
  );

  it.each(puzzles.map((puzzle, index) => [index, puzzle] as const))(
    'puzzle %i is valid and legal',
    (_index, puzzle) => {
      expect(checkPuzzle(puzzle)).toEqual([]);
    },
  );

  it('uses only known themes', () => {
    const known = new Set(themes.map((theme) => (theme as { id: string }).id));
    for (const puzzle of puzzles) {
      expect(known.has((puzzle as { theme: string }).theme)).toBe(true);
    }
  });
});
