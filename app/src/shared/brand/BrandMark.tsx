'use client';

import { createElement } from 'react';
import { THEMES, type ThemeName } from '@/shared/theme/tokens';
// Importing these modules registers the custom elements (browser only; guarded for the static build).
import { ADULT_TAG } from './ChessQMarkAdulti';
import { JUNIOR_TAG } from './ChessQMarkJunior';

export type BrandMarkProps = Readonly<{
  theme: ThemeName;
  label: string;
  size?: number;
}>;

/** The question-mark logo, colored from the theme tokens. Plays its animation once on load. */
export function BrandMark({ theme, label, size = 96 }: BrandMarkProps) {
  const colors = THEMES[theme].colors;
  if (theme === 'junior') {
    return createElement(JUNIOR_TAG, {
      'primary-color': colors.ink,
      'secondary-color': colors.ground,
      size: String(size),
      animated: '',
      label,
    });
  }
  return createElement(ADULT_TAG, {
    'primary-color': colors.primary,
    'piece-color': colors.accent,
    size: String(size),
    animated: '',
    label,
  });
}
