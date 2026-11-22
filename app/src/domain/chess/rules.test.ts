import { describe, expect, it } from 'vitest';
import { START_FEN, checkFen, replay } from './rules';

describe('checkFen', () => {
  it('accepts the standard position', () => {
    expect(checkFen(START_FEN)).toEqual({ ok: true });
  });

  it('rejects text that is not a FEN', () => {
    expect(checkFen('not a fen').ok).toBe(false);
  });
});

describe('replay', () => {
  it('plays a legal line from the start position', () => {
    const result = replay(undefined, ['e4', 'e5', 'Nf3']);
    expect(result.ok).toBe(true);
  });

  it('reports the first illegal move', () => {
    const result = replay(undefined, ['e4', 'e4']);
    expect(result).toMatchObject({ ok: false, failedIndex: 1, san: 'e4' });
  });

  it('rejects an invalid start position without playing', () => {
    const result = replay('garbage', ['e4']);
    expect(result).toMatchObject({ ok: false, failedIndex: -1 });
  });
});
