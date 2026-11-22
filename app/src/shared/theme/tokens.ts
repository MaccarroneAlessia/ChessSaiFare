// Visual identity tokens. Confirmed on 2026-11-22; the same values live in design/theme.json.
// Colors and fonts depend on the audience (adults or Junior), never on the language.
export const THEMES = {
  adult: {
    colors: {
      ground: '#F4EFE6',
      ink: '#0D1B2A',
      primary: '#1B4332',
      accent: '#C4572E',
      soft: '#E6ECE7',
      decorative: '#C98B2B',
    },
    fonts: {
      display: '"Fraunces", Georgia, serif',
      body: '"Plus Jakarta Sans", system-ui, sans-serif',
    },
  },
  junior: {
    colors: {
      ground: '#2B1D4A',
      ink: '#FFF4E6',
      primary: '#2A9D8F',
      accent: '#BF51E7',
      soft: '#E9C46A',
      secondary: '#E76F51',
    },
    fonts: {
      display: '"Fredoka", system-ui, sans-serif',
      body: '"Plus Jakarta Sans", system-ui, sans-serif',
    },
  },
} as const;

export type ThemeName = keyof typeof THEMES;

/** Keys every theme must define, so pages can rely on them. */
export const REQUIRED_COLOR_KEYS = ['ground', 'ink', 'primary', 'accent', 'soft'] as const;

/** CSS custom properties for a theme, e.g. "--color-ground: #F4EFE6". */
export function themeCssVariables(name: ThemeName): Record<string, string> {
  const theme = THEMES[name];
  const variables: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme.colors)) variables[`--color-${key}`] = value;
  for (const [key, value] of Object.entries(theme.fonts)) variables[`--font-${key}`] = value;
  return variables;
}

/** Turns variables into a CSS rule for :root. */
export function themeCssRule(name: ThemeName): string {
  const body = Object.entries(themeCssVariables(name))
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return `:root {\n${body}\n}`;
}
