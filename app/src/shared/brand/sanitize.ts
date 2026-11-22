// Attribute values reach the shadow DOM markup, so they are checked before use.
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const PIXEL_SIZE = /^\d{2,4}$/;

export function cssColor(value: string | null, fallback: string): string {
  return value !== null && HEX_COLOR.test(value) ? value : fallback;
}

export function cssSize(value: string | null, fallback: string): string {
  return value !== null && PIXEL_SIZE.test(value) ? value : fallback;
}

/** Escapes text for use inside an attribute or element. */
export function escapeText(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[char] ?? char;
  });
}

export function defineOnce(tag: string, element: CustomElementConstructor): void {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get(tag)) customElements.define(tag, element);
}
