import { Chess, validateFen } from 'chess.js';

export type PositionReason =
  'invalid-fen' | 'kings' | 'pawn-back-rank' | 'too-many-pawns' | 'opponent-in-check';

export type PositionCheck = { ok: true } | { ok: false; reasons: readonly PositionReason[] };

/**
 * Checks a position built by hand (the position editor) before it is used for play or analysis.
 * Rules: one king per colour, no pawn on the first or eighth rank, at most eight pawns per colour,
 * and the side that is not to move is not in check.
 * The placement rules run first, so the user gets a specific reason instead of a generic FEN error.
 */
export function checkPosition(fen: string): PositionCheck {
  const placement = fen.split(' ')[0] ?? '';
  const ranks = placement.split('/');
  if (ranks.length !== 8) return { ok: false, reasons: ['invalid-fen'] };

  const count = (piece: string): number => placement.split(piece).length - 1;

  const reasons: PositionReason[] = [];
  if (count('K') !== 1 || count('k') !== 1) reasons.push('kings');
  if (/[pP]/.test(ranks[0] ?? '') || /[pP]/.test(ranks[7] ?? '')) reasons.push('pawn-back-rank');
  if (count('P') > 8 || count('p') > 8) reasons.push('too-many-pawns');
  if (reasons.length > 0) return { ok: false, reasons };

  if (!validateFen(fen).ok) return { ok: false, reasons: ['invalid-fen'] };
  if (opponentInCheck(fen)) return { ok: false, reasons: ['opponent-in-check'] };
  return { ok: true };
}

/** Checks whether the side that is NOT to move is attacked, by asking chess.js with the turn flipped. */
function opponentInCheck(fen: string): boolean {
  const fields = fen.split(' ');
  fields[1] = fields[1] === 'w' ? 'b' : 'w';
  fields[3] = '-';
  try {
    return new Chess(fields.join(' ')).isCheck();
  } catch {
    return true;
  }
}
