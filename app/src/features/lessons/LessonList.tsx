'use client';

import { useState } from 'react';
import {
  type LessonFilter,
  type LessonSummary,
  NO_FILTER,
  filterLessons,
} from '@/domain/lessons/filterLessons';
import type { SiteContent } from '@/shared/content';

export type LessonListProps = Readonly<{
  lessons: readonly LessonSummary[];
  text: SiteContent['lessons'];
}>;

const LEVELS = ['Principiante', 'Intermedio', 'Avanzato'] as const;
const SIDES = ['bianco', 'nero'] as const;

/** Lesson listing with level and colour filters. Filters are local to the page, not saved. */
export function LessonList({ lessons, text }: LessonListProps) {
  const [filter, setFilter] = useState<LessonFilter>(NO_FILTER);
  const visible = filterLessons(lessons, filter);

  return (
    <section id="lezioni" aria-labelledby="lessons-heading" className="lessons">
      <h2 id="lessons-heading">{text.heading}</h2>

      <div className="filters">
        <fieldset>
          <legend>{text.filterLevel}</legend>
          <FilterButton
            label={text.all}
            pressed={filter.level === null}
            onPress={() => {
              setFilter({ ...filter, level: null });
            }}
          />
          {LEVELS.map((level) => (
            <FilterButton
              key={level}
              label={text.levels[level]}
              pressed={filter.level === level}
              onPress={() => {
                setFilter({ ...filter, level });
              }}
            />
          ))}
        </fieldset>

        <fieldset>
          <legend>{text.filterSide}</legend>
          <FilterButton
            label={text.all}
            pressed={filter.side === null}
            onPress={() => {
              setFilter({ ...filter, side: null });
            }}
          />
          {SIDES.map((side) => (
            <FilterButton
              key={side}
              label={text.sides[side]}
              pressed={filter.side === side}
              onPress={() => {
                setFilter({ ...filter, side });
              }}
            />
          ))}
        </fieldset>
      </div>

      {visible.length === 0 ? (
        <p>{text.empty}</p>
      ) : (
        <ul className="lesson-cards">
          {visible.map((lesson) => (
            <li key={lesson.id} className="lesson-card">
              <h3>{lesson.name}</h3>
              <p>
                {text.levels[lesson.level]} · {text.sides[lesson.side]}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FilterButton({
  label,
  pressed,
  onPress,
}: Readonly<{ label: string; pressed: boolean; onPress: () => void }>) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onPress} className="filter-button">
      {label}
    </button>
  );
}
