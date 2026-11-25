import { FILES, RANKS, type Square } from './square';

export type Piece = { color: 'w' | 'b'; type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k' };

export type SquareCell = { square: Square; piece: Piece | null };

/**
 * Turns the placement part of a FEN (the first field) into 64 cells, from a8 to h1.
 * Assumes the input was already validated (see checkPosition).
 */
export function cellsFromPlacement(placement: string): SquareCell[] {
  const ranks = placement.split('/');
  const cells: SquareCell[] = [];
  for (const [rankIndex, rankText] of ranks.entries()) {
    const rank = RANKS[7 - rankIndex];
    if (rank === undefined) continue;
    let fileIndex = 0;
    for (const char of rankText) {
      const empty = Number(char);
      if (Number.isInteger(empty) && empty > 0) {
        for (let i = 0; i < empty; i++) {
          cells.push({ square: squareAt(fileIndex, rank), piece: null });
          fileIndex++;
        }
      } else {
        const lower = char.toLowerCase() as Piece['type'];
        cells.push({
          square: squareAt(fileIndex, rank),
          piece: { color: char === lower ? 'b' : 'w', type: lower },
        });
        fileIndex++;
      }
    }
  }
  return cells;
}

function squareAt(fileIndex: number, rank: (typeof RANKS)[number]): Square {
  const file = FILES[fileIndex];
  if (file === undefined) throw new Error(`file index out of range: ${String(fileIndex)}`);
  return `${file}${rank}`;
}
