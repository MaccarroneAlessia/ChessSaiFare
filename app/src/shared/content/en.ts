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
