// Text for every language has exactly these keys. A missing key is a compile error.
export const LOCALES = ['it', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export type SiteContent = {
  brand: {
    logoLabel: string;
  };
  nav: {
    lessons: string;
    switchLanguage: string;
    switchLanguageLabel: string;
  };
  home: {
    title: string;
    subtitle: string;
    status: string;
  };
  lessons: {
    heading: string;
    filterLevel: string;
    filterSide: string;
    all: string;
    levels: Readonly<Record<'Principiante' | 'Intermedio' | 'Avanzato', string>>;
    sides: Readonly<Record<'bianco' | 'nero', string>>;
    empty: string;
  };
};
