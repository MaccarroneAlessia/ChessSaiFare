export const MOVE_QUALITIES = ['best', 'good', 'inaccuracy', 'mistake', 'blunder'] as const;
export type MoveQuality = (typeof MOVE_QUALITIES)[number];

/**
 * Upper limits of centipawn loss for each quality. First version: to be tuned with real games.
 * A loss above the last limit is a blunder.
 */
export const LOSS_LIMITS_CP: Readonly<Record<Exclude<MoveQuality, 'blunder'>, number>> = {
  best: 10,
  good: 50,
  inaccuracy: 150,
  mistake: 300,
};

/** Maps the evaluation lost by a move (in centipawns) to a quality. Negative losses count as 0. */
export function classifyCentipawnLoss(loss: number): MoveQuality {
  if (!Number.isFinite(loss)) throw new RangeError('loss must be a finite number');
  const cp = Math.max(0, loss);
  if (cp <= LOSS_LIMITS_CP.best) return 'best';
  if (cp <= LOSS_LIMITS_CP.good) return 'good';
  if (cp <= LOSS_LIMITS_CP.inaccuracy) return 'inaccuracy';
  if (cp <= LOSS_LIMITS_CP.mistake) return 'mistake';
  return 'blunder';
}
