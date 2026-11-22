import type { EngineWorker } from './stockfishWorkerEngine';

/** Starts a real engine in a Web Worker. Browser only: not used by unit tests. */
export function createBrowserEngineWorker(url: string): EngineWorker {
  const worker = new Worker(url);
  return {
    postMessage: (command) => {
      worker.postMessage(command);
    },
    setListener: (listener) => {
      worker.onmessage = (event: MessageEvent<unknown>) => {
        listener(String(event.data));
      };
    },
    terminate: () => {
      worker.terminate();
    },
  };
}
