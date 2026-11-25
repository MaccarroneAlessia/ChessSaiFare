import { describe, expect, it } from 'vitest';
import { START_FEN } from '../chess/rules';
import { cellsFromPlacement } from './placement';

describe('cellsFromPlacement', () => {
  const placement = START_FEN.split(' ')[0] ?? '';
  const cells = cellsFromPlacement(placement);

  it('returns 64 cells, from a8 to h1', () => {
    expect(cells).toHaveLength(64);
    expect(cells[0]?.square).toBe('a8');
    expect(cells[63]?.square).toBe('h1');
  });

  it('places the pieces of the starting position', () => {
    const at = (square: string) => cells.find((c) => c.square === square)?.piece;
    expect(at('e1')).toEqual({ color: 'w', type: 'k' });
    expect(at('d8')).toEqual({ color: 'b', type: 'q' });
    expect(at('e4')).toBeNull();
  });

  it('counts 32 pieces in the starting position', () => {
    expect(cells.filter((c) => c.piece !== null)).toHaveLength(32);
  });
});
