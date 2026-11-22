import { describe, expect, it } from 'vitest';
import { REQUIRED_COLOR_KEYS, THEMES, themeCssRule, themeCssVariables } from './tokens';

describe('themes', () => {
  it.each(Object.keys(THEMES) as (keyof typeof THEMES)[])(
    '%s defines every required color',
    (name) => {
      const colors = THEMES[name].colors as Record<string, string>;
      for (const key of REQUIRED_COLOR_KEYS) expect(colors[key]).toBeDefined();
    },
  );

  it('every theme defines the display and body fonts', () => {
    for (const theme of Object.values(THEMES)) {
      expect(Object.keys(theme.fonts).sort()).toEqual(['body', 'display']);
    }
  });

  it('every color is a 6-digit hex value', () => {
    for (const theme of Object.values(THEMES)) {
      for (const value of Object.values(theme.colors)) expect(value).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('exposes colors and fonts as CSS variables', () => {
    const variables = themeCssVariables('adult');
    expect(variables['--color-accent']).toBe('#C4572E');
    expect(variables['--font-display']).toContain('Fraunces');
  });

  it('renders a :root rule with the junior ground', () => {
    expect(themeCssRule('junior')).toMatch(/^:root \{\n {2}--color-ground: #2B1D4A;/);
  });
});
