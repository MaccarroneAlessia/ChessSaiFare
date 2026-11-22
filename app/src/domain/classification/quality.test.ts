import { describe, expect, it } from 'vitest';
import { classifyCentipawnLoss } from './quality';

describe('classifyCentipawnLoss', () => {
  it.each([
    [0, 'best'],
    [10, 'best'],
    [11, 'good'],
    [50, 'good'],
    [51, 'inaccuracy'],
    [150, 'inaccuracy'],
    [151, 'mistake'],
    [300, 'mistake'],
    [301, 'blunder'],
  ])('loss %i is %s', (loss, quality) => {
    expect(classifyCentipawnLoss(loss)).toBe(quality);
  });

  it('treats a negative loss as zero', () => {
    expect(classifyCentipawnLoss(-30)).toBe('best');
  });

  it('rejects non-finite values', () => {
    expect(() => classifyCentipawnLoss(Number.NaN)).toThrow(RangeError);
  });
});
