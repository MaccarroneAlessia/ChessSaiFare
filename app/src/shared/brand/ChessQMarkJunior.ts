import { cssColor, cssSize, defineOnce, escapeText } from './sanitize';

export const JUNIOR_TAG = 'chess-qmark-junior';

// Outside the browser (tests, static build) there is no HTMLElement: the class is defined but never used.
const BaseElement = (
  typeof HTMLElement === 'undefined' ? Object : HTMLElement
) as typeof HTMLElement;

const DEFAULT_PRIMARY = '#fff4e6';
const DEFAULT_SECONDARY = '#1e2a5a';
const DEFAULT_SIZE = '240';

const PLAY_ONCE = `
  @media (prefers-reduced-motion: no-preference) {
    #waving-arm { animation: wave 0.8s ease-in-out 0.4s 2; }
    .brand-stroke, .white-fill { animation: pop 0.4s ease-out both; }
  }
  @keyframes wave { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(14deg); } }
  @keyframes pop { from { opacity: 0; } to { opacity: 1; } }
`;

function markup(
  primary: string,
  secondary: string,
  size: string,
  animated: boolean,
  label: string,
): string {
  return `
    <style>
      :host { display: inline-block; line-height: 0; }
      svg { width: ${size}px; height: auto; overflow: visible; }
      .brand-blue { fill: ${primary}; }
      .brand-stroke { fill: none; stroke: ${primary}; stroke-width: 4.5; stroke-linecap: round; stroke-linejoin: round; }
      .white-fill { fill: ${secondary}; }
      .white-stroke { fill: none; stroke: ${secondary}; stroke-width: 5; stroke-linecap: round; }
      #waving-arm { transform-origin: 16px 32px; }
      ${animated ? PLAY_ONCE : ''}
    </style>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 420" role="img" aria-label="${escapeText(label)}">
      <defs>
        <clipPath id="qmark-clip">
          <path d="M 75 135 C 75 52, 245 52, 245 142 C 245 202, 182 218, 182 268 C 182 282, 172 290, 156 290 L 138 290 C 124 290, 116 282, 116 266 C 116 202, 178 184, 178 144 C 178 114, 136 114, 136 142 C 136 156, 126 164, 112 164 L 94 164 C 82 164, 75 154, 75 135 Z" />
        </clipPath>
      </defs>
      <path class="brand-blue" d="M 75 135 C 75 52, 245 52, 245 142 C 245 202, 182 218, 182 268 C 182 282, 172 290, 156 290 L 138 290 C 124 290, 116 282, 116 266 C 116 202, 178 184, 178 144 C 178 114, 136 114, 136 142 C 136 156, 126 164, 112 164 L 94 164 C 82 164, 75 154, 75 135 Z" />
      <path class="white-stroke" d="M 96 130 C 98 92, 145 78, 178 86" />
      <g clip-path="url(#qmark-clip)">
        <g transform="translate(110, 185) rotate(-18)">
          <rect x="0" y="0" width="16" height="16" class="white-fill"/>
          <rect x="32" y="0" width="16" height="16" class="white-fill"/>
          <rect x="64" y="0" width="16" height="16" class="white-fill"/>
          <rect x="16" y="16" width="16" height="16" class="white-fill"/>
          <rect x="48" y="16" width="16" height="16" class="white-fill"/>
          <rect x="0" y="32" width="16" height="16" class="white-fill"/>
          <rect x="32" y="32" width="16" height="16" class="white-fill"/>
          <rect x="64" y="32" width="16" height="16" class="white-fill"/>
          <rect x="16" y="48" width="16" height="16" class="white-fill"/>
          <rect x="48" y="48" width="16" height="16" class="white-fill"/>
          <rect x="0" y="64" width="16" height="16" class="white-fill"/>
          <rect x="32" y="64" width="16" height="16" class="white-fill"/>
          <rect x="16" y="80" width="16" height="16" class="white-fill"/>
        </g>
      </g>
      <g class="white-fill" transform="translate(206, 178)">
        <rect x="-12" y="0" width="24" height="5" rx="2"/>
        <polygon points="-9,0 -6,-26 6,-26 9,0"/>
        <rect x="-9" y="-30" width="18" height="4" rx="1.5"/>
        <polygon points="-7,-30 -9,-38 9,-38 7,-30"/>
        <rect x="-1.8" y="-47" width="3.6" height="9" rx="1"/>
        <rect x="-5.5" y="-44" width="11" height="3.2" rx="1"/>
      </g>
      <path class="brand-stroke" d="M 74 238 C 68 212, 102 222, 98 196" />
      <circle class="brand-blue" cx="98" cy="193" r="4.5" />
      <g transform="translate(88, 308)">
        <path class="white-fill brand-stroke" d="M -20 62 L -16 18 L 16 18 L 20 62 Z"/>
        <rect class="white-fill brand-stroke" x="-18" y="8" width="36" height="10" rx="3"/>
        <path class="white-fill brand-stroke" d="M -18 8 L -18 -2 L -8 -2 L -8 3 L -2 3 L -2 -2 L 8 -2 L 8 3 L 18 3 L 18 -2 L 18 8 Z"/>
        <path class="brand-stroke" stroke-width="3" d="M -7 28 Q -5 25 -3 28"/>
        <path class="brand-stroke" stroke-width="3" d="M 3 28 Q 5 25 7 28"/>
        <path class="brand-stroke" stroke-width="3" d="M -5 35 Q 0 40 5 35"/>
        <rect class="white-fill brand-stroke" x="-24" y="62" width="48" height="8" rx="4"/>
      </g>
      <g id="pedone-junior" class="brand-blue" transform="translate(148, 306)">
        <circle cx="0" cy="14" r="14" />
        <rect x="-14" y="29" width="28" height="6" rx="3" />
        <path d="M -10 35 C -12 49, -18 58, -22 65 L 22 65 C 18 58, 12 49, 10 35 Z" />
        <rect x="-26" y="65" width="52" height="9" rx="4.5" />
      </g>
      <g transform="translate(216, 282)">
        <g id="waving-arm">
          <path class="brand-stroke" d="M 16 32 C 32 28, 36 12, 34 0" />
          <polygon class="white-fill brand-stroke" points="26,0 24,-12 31,-8 35,-13 39,-8 44,-12 42,0"/>
        </g>
        <path class="white-fill brand-stroke" d="M -18 88 L -13 30 L 13 30 L 18 88 Z"/>
        <rect class="white-fill brand-stroke" x="-16" y="21" width="32" height="9" rx="3"/>
        <polygon class="white-fill brand-stroke" points="-14,21 -17,9 -6,14 0,7 6,14 17,9 14,21"/>
        <path class="brand-stroke" stroke-width="3" d="M -7 44 Q -5 41 -3 44"/>
        <path class="brand-stroke" stroke-width="3" d="M 3 44 Q 5 41 7 44"/>
        <path class="brand-stroke" stroke-width="3" d="M -5 51 Q 0 56 5 51"/>
        <rect class="white-fill brand-stroke" x="-22" y="88" width="44" height="8" rx="4"/>
      </g>
    </svg>`;
}

/** Junior question mark: a solid curve with a checkered band, pieces and a waving queen. */
export class ChessQMarkJunior extends BaseElement {
  static get observedAttributes(): string[] {
    return ['primary-color', 'secondary-color', 'size', 'animated', 'label'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = markup(
      cssColor(this.getAttribute('primary-color'), DEFAULT_PRIMARY),
      cssColor(this.getAttribute('secondary-color'), DEFAULT_SECONDARY),
      cssSize(this.getAttribute('size'), DEFAULT_SIZE),
      this.hasAttribute('animated'),
      this.getAttribute('label') ?? 'ChessSaiFare',
    );
  }
}

defineOnce(JUNIOR_TAG, ChessQMarkJunior);
