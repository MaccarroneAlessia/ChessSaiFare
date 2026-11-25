import type { SiteContent } from './types';

// English text. Same keys as the Italian file; the compiler checks it.
export const en = {
  brand: {
    logoLabel: 'LetsChess question mark',
  },
  nav: {
    lessons: 'Lessons',
    switchLanguage: 'Italiano',
    switchLanguageLabel: 'Switch to Italian',
  },
  home: {
    title: 'LetsChess',
    subtitle: 'Learn chess with a teacher who explains every move.',
    status: 'We are building the first version of the site.',
  },
  board: {
    heading: 'Board',
    fenLabel: 'Position (FEN)',
    valid: 'Valid position.',
    reasons: {
      'invalid-fen': 'The text is not a valid FEN position.',
      kings: 'There must be exactly one king per colour.',
      'pawn-back-rank': 'A pawn cannot stand on the first or eighth rank.',
      'too-many-pawns': 'Each colour can have at most eight pawns.',
      'opponent-in-check': 'The side not to move cannot be in check.',
    },
  },
  lessons: {
    heading: 'Lessons',
    filterLevel: 'Level',
    filterSide: 'Colour',
    all: 'All',
    levels: {
      Principiante: 'Beginner',
      Intermedio: 'Intermediate',
      Avanzato: 'Advanced',
    },
    sides: {
      bianco: 'White',
      nero: 'Black',
    },
    empty: 'No lessons match these filters.',
  },
} satisfies SiteContent;
