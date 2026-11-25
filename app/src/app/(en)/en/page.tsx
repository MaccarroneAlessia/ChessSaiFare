import { HomePage } from '@/features/home/HomePage';
import { readLessonSummaries } from '@/infrastructure/content/publicLessons';

export default function Page() {
  return <HomePage locale="en" lessons={readLessonSummaries()} />;
}
