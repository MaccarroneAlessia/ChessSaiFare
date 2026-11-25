import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import type { LessonSummary } from '@/domain/lessons/filterLessons';
import { LessonSchema } from '@/domain/schemas/content';

/**
 * Folder with the lesson files: CONTENT_DIR when set (the private repository at build time),
 * otherwise the public samples in prototipo/. Relative paths resolve from the app folder.
 */
export const LESSONS_DIR = path.resolve(
  process.cwd(),
  process.env['CONTENT_DIR'] ?? '../prototipo',
);
export const LESSONS_FILE = path.join(LESSONS_DIR, 'lessons.js');

/**
 * Reads the lessons at build time and keeps only the fields shown in the listing.
 * The steps (the full scripts) are never returned, so they cannot reach the HTML or the bundle.
 * Throws if the file is missing or a lesson does not match the schema: a broken lesson must
 * stop the build, not reach the page.
 */
export function readLessonSummaries(file: string = LESSONS_FILE): LessonSummary[] {
  if (!existsSync(file)) throw new Error(`missing lessons file: ${file}`);
  const require = createRequire(import.meta.url);
  // turbopackIgnore: the file lives outside the app, in the content folder chosen at build time.
  const raw: unknown = require(/* turbopackIgnore: true */ file);
  if (!Array.isArray(raw)) throw new Error('lessons file must export an array');
  return raw.map((item, index) => {
    const parsed = LessonSchema.safeParse(item);
    if (!parsed.success) {
      throw new Error(`invalid lesson at index ${String(index)}: ${parsed.error.message}`);
    }
    const { id, name, level, side } = parsed.data;
    return { id, name, level, side };
  });
}
