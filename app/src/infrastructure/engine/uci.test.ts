import { describe, expect, it } from 'vitest';
import { parseBestMove, parseInfo } from './uci';

describe('parseBestMove', () => {
  it('reads the move and ignores ponder', () => {
    expect(parseBestMove('bestmove e2e4 ponder e7e5')).toBe('e2e4');
  });

  it('returns null when there is no move', () => {
    expect(parseBestMove('bestmove (none)')).toBeNull();
    expect(parseBestMove('info depth 1')).toBeNull();
  });
});

describe('parseInfo', () => {
  it('reads depth and centipawn score', () => {
    expect(parseInfo('info depth 12 score cp -40 pv e2e4')).toEqual({
      depth: 12,
      scoreCp: -40,
      mate: null,
    });
  });

  it('reads a mate score', () => {
    expect(parseInfo('info depth 3 score mate 2')).toEqual({ depth: 3, scoreCp: null, mate: 2 });
  });

  it('ignores lines that are not info', () => {
    expect(parseInfo('readyok')).toBeNull();
  });
});
