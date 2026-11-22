import { type Locale, contentFor } from '@/shared/content';

export type HomeContent = Readonly<{ title: string; subtitle: string; status: string }>;

/** Returns the home page text in the given language. Pure: no I/O. */
export function getHomeContent(locale: Locale = 'it'): HomeContent {
  return { ...contentFor(locale).home };
}
