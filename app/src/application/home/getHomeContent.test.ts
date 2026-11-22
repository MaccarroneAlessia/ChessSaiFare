import { describe, expect, it } from 'vitest';
import { getHomeContent } from './getHomeContent';

describe('getHomeContent', () => {
  it('returns a non-empty title, subtitle and status', () => {
    const content = getHomeContent();
    expect(content.title.length).toBeGreaterThan(0);
    expect(content.subtitle.length).toBeGreaterThan(0);
    expect(content.status.length).toBeGreaterThan(0);
  });
});
