export type EvaluationResult = {
  bestMove: string;
  scoreCp: number | null;
  mate: number | null;
  depth: number | null;
};

/** Port: anything that can suggest the best move for a position. */
export interface ChessEngine {
  evaluate(fen: string, depth?: number): Promise<EvaluationResult>;
  dispose(): void;
}

/** Raised when the engine does not answer in time or cannot start. Callers show a fallback. */
export class EngineUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EngineUnavailableError';
  }
}
