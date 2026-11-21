/* Board customisation: themes, piece styles and validation of saved preferences.
   Pure data and functions, no DOM access. Anything read from storage goes through
   boardPrefsClean() so unknown or tampered values can never reach the page. */
var BOARD_THEMES = [
  { id: 'auto', name: 'Predefinito', light: null, dark: null, hl: null, sel: null },
  { id: 'classic', name: 'Classico', light: '#eedcbf', dark: '#b58863', hl: '#f6e27a', sel: '#9fd3a8' },
  { id: 'green', name: 'Verde', light: '#eeeed2', dark: '#769656', hl: '#f6f669', sel: '#7fc8f8' },
  { id: 'blue', name: 'Blu', light: '#dee3e6', dark: '#8ca2ad', hl: '#f6e27a', sel: '#9fd3a8' },
  { id: 'grey', name: 'Grigio', light: '#e8e8e8', dark: '#8d8d8d', hl: '#f6e27a', sel: '#9fd3a8' },
  { id: 'contrast', name: 'Alto contrasto', light: '#ffffff', dark: '#6b6b6b', hl: '#ffd400', sel: '#00a0ff' },
  { id: 'cvd', name: 'Daltonici', light: '#fff8e0', dark: '#5c6f91', hl: '#ffb000', sel: '#56b4e9' }
];

var PIECE_STYLES = [
  { id: 'classic', name: 'Classico' },
  { id: 'bold', name: 'Contorno marcato' },
  { id: 'soft', name: 'Morbido' }
];

var BOARD_PREFS_DEFAULT = { theme: 'auto', pieces: 'classic', coords: true, hints: true, lastMove: true };

function boardPrefsClean(raw) {
  var out = {}, r = raw && typeof raw === 'object' ? raw : {};
  function pick(list, v, d) { for (var i = 0; i < list.length; i++) if (list[i].id === v) return v; return d; }
  out.theme = pick(BOARD_THEMES, r.theme, BOARD_PREFS_DEFAULT.theme);
  out.pieces = pick(PIECE_STYLES, r.pieces, BOARD_PREFS_DEFAULT.pieces);
  ['coords', 'hints', 'lastMove'].forEach(function (key) { out[key] = typeof r[key] === 'boolean' ? r[key] : BOARD_PREFS_DEFAULT[key]; });
  return out;
}

function boardThemeById(id) {
  for (var i = 0; i < BOARD_THEMES.length; i++) if (BOARD_THEMES[i].id === id) return BOARD_THEMES[i];
  return BOARD_THEMES[0];
}
if (typeof module !== 'undefined') module.exports = { BOARD_THEMES, PIECE_STYLES, BOARD_PREFS_DEFAULT, boardPrefsClean, boardThemeById };
