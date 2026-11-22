import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Content folder: CONTENT_DIR when set (private repo), otherwise the public samples in prototipo/.
 * The content files are plain CommonJS-compatible scripts, so they are loaded with require.
 */
export const contentDir =
  process.env['CONTENT_DIR'] ??
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../prototipo');

const require = createRequire(import.meta.url);

function loadModule(name: string): unknown {
  const file = path.join(contentDir, name);
  if (!existsSync(file)) throw new Error(`missing content file: ${file}`);
  return require(file);
}

export function loadLessons(): unknown[] {
  return loadModule('lessons.js') as unknown[];
}

export function loadPuzzles(): { puzzles: unknown[]; themes: unknown[] } {
  const mod = loadModule('puzzles.js') as { PUZZLES: unknown[]; THEMES: unknown[] };
  return { puzzles: mod.PUZZLES, themes: mod.THEMES };
}
