import { getHomeContent } from '@/application/home/getHomeContent';
import type { LessonSummary } from '@/domain/lessons/filterLessons';
import { LessonList } from '@/features/lessons/LessonList';
import { SiteHeader } from '@/features/layout/SiteHeader';
import { type Locale, contentFor } from '@/shared/content';

export function HomePage({
  locale,
  lessons,
}: Readonly<{ locale: Locale; lessons: readonly LessonSummary[] }>) {
  const content = getHomeContent(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="home" lang={locale}>
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>
        <p className="status">{content.status}</p>
        <LessonList lessons={lessons} text={contentFor(locale).lessons} />
      </main>
    </>
  );
}
