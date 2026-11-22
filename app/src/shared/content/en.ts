import type { SiteContent } from './types';

// English text. Same keys as the Italian file; the compiler checks it.
export const en = {
  brand: {
    logoLabel: 'LetsChess question mark',
  },
  home: {
    title: 'LetsChess',
    subtitle: 'Learn chess with a teacher who explains every move.',
    status: 'We are building the first version of the site.',
  },
} satisfies SiteContent;
