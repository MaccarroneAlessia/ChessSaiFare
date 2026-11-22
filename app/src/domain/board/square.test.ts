import { describe, expect, it } from 'vitest';
import { isSquare } from './square';

describe('isSquare', () => {
  it.each(['a1', 'e4', 'h8'])('accepts %s', (value) => {
    expect(isSquare(value)).toBe(true);
  });

  it.each(['', 'i1', 'a9', 'E4', 'e44', 'e', ' e4'])('rejects %j', (value) => {
    expect(isSquare(value)).toBe(false);
  });
});
