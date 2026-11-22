import type { ChessEngine, EvaluationResult } from '@/application/engine/chessEngine';
import { EngineUnavailableError } from '@/application/engine/chessEngine';
import { checkFen } from '@/domain/chess/rules';
import { parseBestMove, parseInfo } from './uci';

/** The part of a Web Worker the engine needs. Tests supply a fake; the browser uses a real Worker. */
export interface EngineWorker {
  postMessage(command: string): void;
  setListener(listener: (line: string) => void): void;
  terminate(): void;
}

const READY_STEPS: readonly { command: string; expect: string }[] = [
  { command: 'uci', expect: 'uciok' },
  { command: 'isready', expect: 'readyok' },
];

/**
 * Talks to Stockfish over UCI. One position at a time: requests are queued.
 * A request that gets no answer within the timeout stops the worker and rejects.
 */
export class StockfishWorkerEngine implements ChessEngine {
  private worker: EngineWorker | null = null;
  private ready: Promise<void> = Promise.resolve();
  private handler: ((line: string) => void) | null = null;
  private queue: Promise<unknown> = Promise.resolve();

  constructor(
    private readonly createWorker: () => EngineWorker,
    private readonly timeoutMs = 10_000,
  ) {}

  evaluate(fen: string, depth = 10): Promise<EvaluationResult> {
    const run = (): Promise<EvaluationResult> => this.runEvaluation(fen, depth);
    const next = this.queue.then(run, run);
    this.queue = next.catch(() => undefined);
    return next;
  }

  dispose(): void {
    this.stop();
  }

  private async runEvaluation(fen: string, depth: number): Promise<EvaluationResult> {
    const check = checkFen(fen);
    if (!check.ok) throw new RangeError(`invalid FEN: ${check.reason}`);
    const worker = await this.ensureReady();
    return this.collect(worker, fen, depth);
  }

  private async ensureReady(): Promise<EngineWorker> {
    const worker = this.worker ?? this.start();
    await this.ready;
    return worker;
  }

  private start(): EngineWorker {
    const worker = this.createWorker();
    worker.setListener((line) => {
      this.handler?.(line);
    });
    this.worker = worker;
    this.ready = this.handshake(worker).catch((error: unknown) => {
      this.stop();
      throw error;
    });
    return worker;
  }

  private async handshake(worker: EngineWorker): Promise<void> {
    for (const step of READY_STEPS) {
      await this.waitFor(worker, step.command, (line) => line === step.expect);
    }
  }

  private waitFor(
    worker: EngineWorker,
    command: string,
    done: (line: string) => boolean,
  ): Promise<void> {
    return this.withTimeout(
      new Promise<void>((resolve) => {
        this.handler = (line) => {
          if (done(line)) {
            this.handler = null;
            resolve();
          }
        };
        worker.postMessage(command);
      }),
      `no answer to ${command}`,
    );
  }

  private collect(worker: EngineWorker, fen: string, depth: number): Promise<EvaluationResult> {
    let latest: Pick<EvaluationResult, 'depth' | 'scoreCp' | 'mate'> = {
      depth: null,
      scoreCp: null,
      mate: null,
    };
    const answer = new Promise<EvaluationResult>((resolve) => {
      this.handler = (line) => {
        const info = parseInfo(line);
        if (info) latest = { ...latest, ...info };
        const bestMove = parseBestMove(line);
        if (bestMove !== null) {
          this.handler = null;
          resolve({ bestMove, ...latest });
        }
      };
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`go depth ${String(depth)}`);
    });
    return this.withTimeout(answer, 'engine did not return a move');
  }

  private withTimeout<T>(promise: Promise<T>, reason: string): Promise<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        this.stop();
        reject(new EngineUnavailableError(`${reason} within ${String(this.timeoutMs)} ms`));
      }, this.timeoutMs);
    });
    return Promise.race([promise, timeout]).finally(() => {
      clearTimeout(timer);
    });
  }

  private stop(): void {
    this.worker?.terminate();
    this.worker = null;
    this.ready = Promise.resolve();
    this.handler = null;
  }
}
