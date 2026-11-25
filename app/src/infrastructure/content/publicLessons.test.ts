import { describe, expect, it } from 'vitest';
import { LESSONS_FILE, readLessonSummaries } from './publicLessons';

describe('readLessonSummaries', () => {
  it('reads the lessons with only the listing fields, never the steps', () => {
    const lessons = readLessonSummaries(LESSONS_FILE);
    expect(lessons.length).toBeGreaterThan(0);
    for (const lesson of lessons) {
      expect(Object.keys(lesson).sort()).toEqual(['id', 'level', 'name', 'side']);
    }
  });

  it('throws when the file is missing', () => {
    expect(() => readLessonSummaries('/does/not/exist/lessons.js')).toThrow(/missing lessons file/);
  });
});
