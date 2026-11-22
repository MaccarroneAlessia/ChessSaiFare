import { describe, expect, it } from 'vitest';
import { LOCALES } from '@/shared/content';
import { getHomeContent } from './getHomeContent';

describe('getHomeContent', () => {
  it.each(LOCALES)('returns non-empty text for %s', (locale) => {
    const content = getHomeContent(locale);
    expect(content.title.length).toBeGreaterThan(0);
    expect(content.subtitle.length).toBeGreaterThan(0);
    expect(content.status.length).toBeGreaterThan(0);
  });

  it('uses the Italian name by default and the English name in English', () => {
    expect(getHomeContent().title).toBe('ChessSaiFare');
    expect(getHomeContent('en').title).toBe('LetsChess');
  });
});
