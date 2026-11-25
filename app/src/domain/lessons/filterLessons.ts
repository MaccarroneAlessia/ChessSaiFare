/** The fields of a lesson that are safe to show in an adult listing. */
export type LessonSummary = Readonly<{
  id: string;
  name: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzato';
  side: 'bianco' | 'nero';
}>;

export type LessonFilter = Readonly<{
  level: LessonSummary['level'] | null;
  side: LessonSummary['side'] | null;
}>;

export const NO_FILTER: LessonFilter = { level: null, side: null };

/** Keeps the lessons that match every active filter. A null filter matches everything. */
export function filterLessons(
  lessons: readonly LessonSummary[],
  filter: LessonFilter,
): LessonSummary[] {
  return lessons.filter(
    (lesson) =>
      (filter.level === null || lesson.level === filter.level) &&
      (filter.side === null || lesson.side === filter.side),
  );
}
