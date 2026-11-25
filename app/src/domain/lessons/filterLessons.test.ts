import { describe, expect, it } from 'vitest';
import { type LessonSummary, NO_FILTER, filterLessons } from './filterLessons';

const LESSONS: LessonSummary[] = [
  { id: 'a', name: 'Uno', level: 'Principiante', side: 'bianco' },
  { id: 'b', name: 'Due', level: 'Avanzato', side: 'nero' },
  { id: 'c', name: 'Tre', level: 'Principiante', side: 'nero' },
];

describe('filterLessons', () => {
  it('returns every lesson when no filter is active', () => {
    expect(filterLessons(LESSONS, NO_FILTER)).toHaveLength(3);
  });

  it('filters by level', () => {
    expect(filterLessons(LESSONS, { level: 'Principiante', side: null }).map((l) => l.id)).toEqual([
      'a',
      'c',
    ]);
  });

  it('filters by side', () => {
    expect(filterLessons(LESSONS, { level: null, side: 'nero' }).map((l) => l.id)).toEqual([
      'b',
      'c',
    ]);
  });

  it('applies both filters together', () => {
    expect(
      filterLessons(LESSONS, { level: 'Principiante', side: 'nero' }).map((l) => l.id),
    ).toEqual(['c']);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterLessons(LESSONS, { level: 'Intermedio', side: null })).toEqual([]);
  });

  it('does not modify the input', () => {
    const copy = [...LESSONS];
    filterLessons(LESSONS, { level: 'Avanzato', side: null });
    expect(LESSONS).toEqual(copy);
  });
});
