import type { SiteContent } from './types';

// Italian text. Kept out of the logic on purpose.
export const it = {
  brand: {
    logoLabel: 'Punto interrogativo di ChessSaiFare',
  },
  nav: {
    lessons: 'Lezioni',
    switchLanguage: 'English',
    switchLanguageLabel: 'Passa all’inglese',
  },
  home: {
    title: 'ChessSaiFare',
    subtitle: 'Impara a giocare a scacchi con un prof che ti spiega ogni mossa.',
    status: 'Stiamo costruendo la prima versione del sito.',
  },
  board: {
    heading: 'Scacchiera',
    fenLabel: 'Posizione (FEN)',
    valid: 'Posizione valida.',
    reasons: {
      'invalid-fen': 'Il testo non è una posizione FEN valida.',
      kings: 'Ci deve essere esattamente un re per colore.',
      'pawn-back-rank': 'Un pedone non può stare sulla prima o sull’ottava traversa.',
      'too-many-pawns': 'Ogni colore può avere al massimo otto pedoni.',
      'opponent-in-check': 'Il lato che non muove non può essere sotto scacco.',
    },
  },
  lessons: {
    heading: 'Lezioni',
    filterLevel: 'Livello',
    filterSide: 'Colore',
    all: 'Tutti',
    levels: {
      Principiante: 'Principiante',
      Intermedio: 'Intermedio',
      Avanzato: 'Avanzato',
    },
    sides: {
      bianco: 'Bianco',
      nero: 'Nero',
    },
    empty: 'Nessuna lezione con questi filtri.',
  },
} satisfies SiteContent;
