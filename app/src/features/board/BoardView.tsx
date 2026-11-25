'use client';

import { useState } from 'react';
import { START_FEN } from '@/domain/chess/rules';
import { type Piece, type SquareCell, cellsFromPlacement } from '@/domain/board/placement';
import { checkPosition } from '@/domain/board/position';
import type { SiteContent } from '@/shared/content';

export type BoardViewProps = Readonly<{ text: SiteContent['board'] }>;

const SYMBOLS: Record<Piece['color'], Record<Piece['type'], string>> = {
  w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
  b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
};

/**
 * Board with a FEN field. The board always shows the last valid position: an invalid text
 * shows its reason, but never blocks the board.
 */
export function BoardView({ text }: BoardViewProps) {
  const [draft, setDraft] = useState(START_FEN);
  const [shown, setShown] = useState(START_FEN);

  const check = checkPosition(draft);
  const message = check.ok
    ? text.valid
    : check.reasons.map((reason) => text.reasons[reason]).join(' ');
  const cells = cellsFromPlacement(shown.split(' ')[0] ?? '');

  return (
    <section aria-labelledby="board-heading" className="board-section">
      <h2 id="board-heading">{text.heading}</h2>
      <label>
        <span>{text.fenLabel}</span>
        <input
          type="text"
          value={draft}
          onChange={(event) => {
            const next = event.target.value;
            setDraft(next);
            if (checkPosition(next).ok) setShown(next);
          }}
          aria-describedby="board-message"
          spellCheck={false}
          autoComplete="off"
        />
      </label>
      <p id="board-message" role="status">
        {message}
      </p>
      <div className="board" role="img" aria-label={text.heading}>
        {cells.map((cell) => (
          <Square key={cell.square} cell={cell} />
        ))}
      </div>
    </section>
  );
}

function Square({ cell }: Readonly<{ cell: SquareCell }>) {
  const file = cell.square.charCodeAt(0) - 97;
  const rank = Number(cell.square[1]);
  const dark = (file + rank) % 2 === 1;
  return (
    <div className={dark ? 'board-square dark' : 'board-square light'}>
      {cell.piece === null ? '' : SYMBOLS[cell.piece.color][cell.piece.type]}
    </div>
  );
}
