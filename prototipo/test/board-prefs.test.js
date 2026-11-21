const test = require('node:test');
const assert = require('node:assert/strict');
const {
  BOARD_THEMES, PIECE_STYLES, BOARD_PREFS_DEFAULT, boardPrefsClean, boardThemeById,
} = require('../board-prefs.js');

test('missing or invalid input gives the defaults', () => {
  for (const raw of [null, undefined, 'x', 42, []]) {
    assert.deepEqual(boardPrefsClean(raw), BOARD_PREFS_DEFAULT);
  }
});

test('valid values are kept', () => {
  const raw = { theme: 'contrast', pieces: 'bold', coords: false, hints: false, lastMove: false };
  assert.deepEqual(boardPrefsClean(raw), raw);
});

test('unknown theme or piece style falls back to the default', () => {
  const out = boardPrefsClean({ theme: '<script>', pieces: 'neon' });
  assert.equal(out.theme, BOARD_PREFS_DEFAULT.theme);
  assert.equal(out.pieces, BOARD_PREFS_DEFAULT.pieces);
});

test('non-boolean flags fall back to the default', () => {
  const out = boardPrefsClean({ coords: 'yes', hints: 1, lastMove: null });
  assert.deepEqual(
    [out.coords, out.hints, out.lastMove],
    [BOARD_PREFS_DEFAULT.coords, BOARD_PREFS_DEFAULT.hints, BOARD_PREFS_DEFAULT.lastMove],
  );
});

test('unknown keys are dropped', () => {
  const out = boardPrefsClean({ theme: 'green', evil: 'payload' });
  assert.equal('evil' in out, false);
});

test('unknown theme id resolves to the first theme', () => {
  assert.equal(boardThemeById('nope').id, BOARD_THEMES[0].id);
});

test('every custom theme has valid hex colours', () => {
  const hex = /^#[0-9a-f]{6}$/i;
  for (const t of BOARD_THEMES.filter((x) => x.light)) {
    for (const key of ['light', 'dark', 'hl', 'sel']) assert.match(t[key], hex, `${t.id}.${key}`);
  }
});

test('piece style ids are unique', () => {
  const ids = PIECE_STYLES.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});
