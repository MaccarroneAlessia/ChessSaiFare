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
