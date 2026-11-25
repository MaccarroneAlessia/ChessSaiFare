import { describe, expect, it } from 'vitest';
import { START_FEN } from '../chess/rules';
import { checkPosition } from './position';

describe('checkPosition', () => {
  it('accepts the standard starting position', () => {
    expect(checkPosition(START_FEN)).toEqual({ ok: true });
  });

  it('rejects a FEN that chess.js cannot read', () => {
    expect(checkPosition('not a fen')).toEqual({ ok: false, reasons: ['invalid-fen'] });
  });

  it('rejects a position without exactly one king per colour', () => {
    const result = checkPosition('8/8/8/8/8/8/8/4K3 w - - 0 1');
    expect(result).toEqual({ ok: false, reasons: ['kings'] });
  });

  it('rejects a pawn on the first or eighth rank', () => {
    const result = checkPosition('4k3/8/8/8/8/8/8/P3K3 w - - 0 1');
    expect(result).toEqual({ ok: false, reasons: ['pawn-back-rank'] });
  });

  it('rejects more than eight pawns of one colour', () => {
    // Nine black pawns: eight on the seventh rank and one on the sixth.
    const result = checkPosition('4k3/pppppppp/p7/8/8/8/8/4K3 w - - 0 1');
    expect(result).toEqual({ ok: false, reasons: ['too-many-pawns'] });
  });

  it('rejects a placement that does not have eight ranks', () => {
    expect(checkPosition('8/8/8/8 w - - 0 1')).toEqual({ ok: false, reasons: ['invalid-fen'] });
  });

  it('rejects the side that is not to move being in check', () => {
    // White to move, but the black king on e8 is attacked by the rook on h8.
    const result = checkPosition('4k2R/8/8/8/8/8/8/4K3 w - - 0 1');
    expect(result).toEqual({ ok: false, reasons: ['opponent-in-check'] });
  });

  it('accepts a position where the side to move is in check', () => {
    // Black to move and the black king is in check: that is legal.
    expect(checkPosition('4k2R/8/8/8/8/8/8/4K3 b - - 0 1')).toEqual({ ok: true });
  });
});
