import type { EvaluationResult } from '@/application/engine/chessEngine';

/** Reads "bestmove e2e4 ponder e7e5" and returns "e2e4". Returns null when there is no move. */
export function parseBestMove(line: string): string | null {
  const match = /^bestmove\s+(\S+)/.exec(line);
  if (!match?.[1] || match[1] === '(none)') return null;
  return match[1];
}

/** Reads the depth and score from an "info" line. Missing fields stay null. */
export function parseInfo(
  line: string,
): Pick<EvaluationResult, 'depth' | 'scoreCp' | 'mate'> | null {
  if (!line.startsWith('info ')) return null;
  const depth = /\bdepth (\d+)/.exec(line)?.[1];
  const cp = /\bscore cp (-?\d+)/.exec(line)?.[1];
  const mate = /\bscore mate (-?\d+)/.exec(line)?.[1];
  return {
    depth: depth === undefined ? null : Number(depth),
    scoreCp: cp === undefined ? null : Number(cp),
    mate: mate === undefined ? null : Number(mate),
  };
}
