import { Chess, validateFen as validateChessFen } from 'chess.js';

export const START_FEN = new Chess().fen();

export type FenCheck = { ok: true } | { ok: false; reason: string };

/** Validates a FEN string before it is used. Rejects anything chess.js cannot read. */
export function checkFen(fen: string): FenCheck {
  const result = validateChessFen(fen);
  return result.ok ? { ok: true } : { ok: false, reason: result.error ?? 'invalid FEN' };
}

export type ReplayResult =
  { ok: true; fen: string } | { ok: false; failedIndex: number; san: string; reason: string };

/**
 * Plays the moves from a start position (the standard one when omitted).
 * Strict mode: a move that is not legal stops the replay and reports its index.
 */
export function replay(startFen: string | undefined, sans: readonly string[]): ReplayResult {
  if (startFen !== undefined) {
    const check = checkFen(startFen);
    if (!check.ok) return { ok: false, failedIndex: -1, san: '', reason: check.reason };
  }
  const game = startFen === undefined ? new Chess() : new Chess(startFen);
  for (const [index, san] of sans.entries()) {
    try {
      game.move(san, { strict: true });
    } catch {
      return { ok: false, failedIndex: index, san, reason: 'illegal move' };
    }
  }
  return { ok: true, fen: game.fen() };
}
