// Text for every language has exactly these keys. A missing key is a compile error.
export const LOCALES = ['it', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export type SiteContent = {
  brand: {
    logoLabel: string;
  };
  home: {
    title: string;
    subtitle: string;
    status: string;
  };
};
