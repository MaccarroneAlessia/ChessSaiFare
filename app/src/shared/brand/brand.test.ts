import { describe, expect, it } from 'vitest';
import { ADULT_TAG } from './ChessQMarkAdulti';
import { JUNIOR_TAG } from './ChessQMarkJunior';

describe('brand marks', () => {
  it('use distinct custom element names', () => {
    expect(ADULT_TAG).toBe('chess-qmark-adulti');
    expect(JUNIOR_TAG).toBe('chess-qmark-junior');
    expect(ADULT_TAG).not.toBe(JUNIOR_TAG);
  });
});
