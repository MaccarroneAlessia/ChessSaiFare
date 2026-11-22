import { describe, expect, it } from 'vitest';
import { sanFromItalian, sanToItalian } from './italian';

describe('Italian notation', () => {
  it.each([
    ['Cf3', 'Nf3'],
    ['Dxd8', 'Qxd8'],
    ['Tb8+', 'Rb8+'],
    ['Ae5', 'Be5'],
    ['Re1', 'Ke1'],
    ['e8=D', 'e8=Q'],
    ['e4', 'e4'],
    ['O-O', 'O-O'],
  ])('%s becomes %s in international notation', (italian, international) => {
    expect(sanFromItalian(italian)).toBe(international);
  });

  it('converts back to Italian', () => {
    expect(sanToItalian('Nf3')).toBe('Cf3');
    expect(sanToItalian('e8=Q')).toBe('e8=D');
    expect(sanToItalian('O-O')).toBe('O-O');
  });
});
