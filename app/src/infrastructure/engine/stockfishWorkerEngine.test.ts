import { describe, expect, it } from 'vitest';
import { EngineUnavailableError } from '@/application/engine/chessEngine';
import { START_FEN } from '@/domain/chess/rules';
import { type EngineWorker, StockfishWorkerEngine } from './stockfishWorkerEngine';

/** Fake UCI engine: answers uci, isready and go. Counts how many workers were started and stopped. */
class FakeWorker implements EngineWorker {
  static created = 0;
  static terminated = 0;
  private listener: (line: string) => void = () => undefined;

  constructor(private readonly silent = false) {
    FakeWorker.created += 1;
  }

  postMessage(command: string): void {
    if (this.silent) return;
    if (command === 'uci') this.reply('uciok');
    if (command === 'isready') this.reply('readyok');
    if (command.startsWith('go ')) {
      this.reply('info depth 8 score cp 35 pv e2e4');
      this.reply('bestmove e2e4 ponder e7e5');
    }
  }

  setListener(listener: (line: string) => void): void {
    this.listener = listener;
  }

  terminate(): void {
    FakeWorker.terminated += 1;
  }

  private reply(line: string): void {
    queueMicrotask(() => {
      this.listener(line);
    });
  }
}

describe('StockfishWorkerEngine', () => {
  it('returns the best move and the score from UCI lines', async () => {
    const engine = new StockfishWorkerEngine(() => new FakeWorker());
    await expect(engine.evaluate(START_FEN, 8)).resolves.toEqual({
      bestMove: 'e2e4',
      scoreCp: 35,
      mate: null,
      depth: 8,
    });
    engine.dispose();
  });

  it('starts the worker once and reuses it', async () => {
    FakeWorker.created = 0;
    const engine = new StockfishWorkerEngine(() => new FakeWorker());
    await engine.evaluate(START_FEN);
    await engine.evaluate(START_FEN);
    expect(FakeWorker.created).toBe(1);
    engine.dispose();
  });

  it('rejects an invalid FEN before talking to the engine', async () => {
    const engine = new StockfishWorkerEngine(() => new FakeWorker());
    await expect(engine.evaluate('not a fen')).rejects.toThrow(RangeError);
    engine.dispose();
  });

  it('rejects with EngineUnavailableError and stops the worker when the engine is silent', async () => {
    FakeWorker.terminated = 0;
    const engine = new StockfishWorkerEngine(() => new FakeWorker(true), 20);
    await expect(engine.evaluate(START_FEN)).rejects.toBeInstanceOf(EngineUnavailableError);
    expect(FakeWorker.terminated).toBeGreaterThan(0);
  });
});
