import { describe, expect, it } from 'vitest';
import { cssColor, cssSize, escapeText } from './sanitize';

describe('brand attribute checks', () => {
  it('accepts six-digit hex colors and falls back otherwise', () => {
    expect(cssColor('#1c2e26', '#000000')).toBe('#1c2e26');
    expect(cssColor('red', '#000000')).toBe('#000000');
    expect(cssColor('#fff;background:url(x)', '#000000')).toBe('#000000');
    expect(cssColor(null, '#000000')).toBe('#000000');
  });

  it('accepts plain pixel sizes only', () => {
    expect(cssSize('220', '240')).toBe('220');
    expect(cssSize('220px;display:none', '240')).toBe('240');
    expect(cssSize(null, '240')).toBe('240');
  });

  it('escapes markup characters in labels', () => {
    expect(escapeText('<b>"Chess" & fare</b>')).toBe(
      '&lt;b&gt;&quot;Chess&quot; &amp; fare&lt;/b&gt;',
    );
  });
});
