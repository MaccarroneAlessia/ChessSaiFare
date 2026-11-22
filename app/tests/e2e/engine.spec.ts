import { expect, test } from '@playwright/test';
import { Chess } from 'chess.js';

// Mate-in-one positions. The engine must find a move after which the opponent is checkmated.
const MATE_IN_ONE: readonly string[] = [
  '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
  'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
  '7k/5Q2/6K1/8/8/8/8/8 w - - 0 1',
];

test.describe('Stockfish in a Web Worker', () => {
  for (const fen of MATE_IN_ONE) {
    test(`finds a mate in one from ${fen.split(' ')[0] ?? fen}`, async ({ page }) => {
      await page.goto('/');
      const bestMove = await page.evaluate(
        (position) =>
          new Promise<string>((resolve, reject) => {
            const worker = new Worker('/engine/stockfish-19-lite-single.js');
            const timer = setTimeout(() => {
              worker.terminate();
              reject(new Error('engine timeout'));
            }, 25_000);
            worker.onmessage = (event: MessageEvent<unknown>) => {
              const line = String(event.data);
              if (line === 'uciok') worker.postMessage('isready');
              if (line === 'readyok') {
                worker.postMessage(`position fen ${position}`);
                worker.postMessage('go depth 8');
              }
              const match = /^bestmove (\S+)/.exec(line);
              if (match?.[1]) {
                clearTimeout(timer);
                worker.terminate();
                resolve(match[1]);
              }
            };
            worker.postMessage('uci');
          }),
        fen,
      );

      expect(bestMove).toMatch(/^[a-h][1-8][a-h][1-8][qrbn]?$/);
      const game = new Chess(fen);
      game.move({
        from: bestMove.slice(0, 2),
        to: bestMove.slice(2, 4),
        ...(bestMove.length === 5 ? { promotion: bestMove[4] } : {}),
      });
      expect(game.isCheckmate()).toBe(true);
    });
  }
});
