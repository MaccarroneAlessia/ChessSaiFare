import { en } from './en';
import { it } from './it';
import type { Locale, SiteContent } from './types';

export { LOCALES, type Locale, type SiteContent } from './types';

const CONTENT: Record<Locale, SiteContent> = { it, en };

export function contentFor(locale: Locale): SiteContent {
  return CONTENT[locale];
}
