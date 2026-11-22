import { cssColor, cssSize, defineOnce, escapeText } from './sanitize';

export const ADULT_TAG = 'chess-qmark-adulti';

// Outside the browser (tests, static build) there is no HTMLElement: the class is defined but never used.
const BaseElement = (
  typeof HTMLElement === 'undefined' ? Object : HTMLElement
) as typeof HTMLElement;

const DEFAULT_PRIMARY = '#1c2e26';
const DEFAULT_PIECE = '#c4572e';
const DEFAULT_SIZE = '320';

const PLAY_ONCE = `
  @media (prefers-reduced-motion: no-preference) {
    .chess-piece { animation: rise 0.5s ease-out both; }
    #pedone-base { animation: hop 0.7s ease-out 0.3s both; }
    .chess-piece:nth-child(2) { animation-delay: 0.1s; }
    .chess-piece:nth-child(3) { animation-delay: 0.2s; }
    .chess-piece:nth-child(4) { animation-delay: 0.3s; }
  }
  @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  @keyframes hop { 0% { transform: translateY(0); } 40% { transform: translateY(-8px); } 100% { transform: translateY(0); } }
`;

function markup(
  primary: string,
  piece: string,
  size: string,
  animated: boolean,
  label: string,
): string {
  return `
    <style>
      :host { display: inline-block; line-height: 0; }
      svg { width: ${size}px; height: auto; overflow: visible; }
      .stroke-primary { fill: none; stroke: ${primary}; stroke-linecap: round; stroke-linejoin: round; }
      .piece-dark { fill: ${piece}; }
      ${animated ? PLAY_ONCE : ''}
    </style>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 420" role="img" aria-label="${escapeText(label)}">
      <path class="stroke-primary" stroke-width="14" d="M 78 135 C 78 65, 232 65, 232 145 C 232 205, 165 225, 165 278" />
      <path class="stroke-primary" stroke-width="9" d="M 105 135 C 105 92, 205 92, 205 145 C 205 190, 145 212, 145 278" />
      <line class="stroke-primary" stroke-width="10" x1="138" y1="280" x2="172" y2="280" />
      <g class="piece-dark">
        <g class="chess-piece" transform="translate(106, 222) rotate(-28)">
          <rect x="-10" y="0" width="20" height="5" rx="1"/>
          <polygon points="-8,0 -6,-18 6,-18 8,0"/>
          <rect x="-9" y="-23" width="18" height="5"/>
          <rect x="-9" y="-27" width="4" height="4"/>
          <rect x="-2" y="-27" width="4" height="4"/>
          <rect x="5" y="-27" width="4" height="4"/>
        </g>
        <g class="chess-piece" transform="translate(124, 202) rotate(-18)">
          <rect x="-10" y="0" width="20" height="5" rx="1"/>
          <polygon points="-8,0 -5,-26 5,-26 8,0"/>
          <rect x="-8" y="-30" width="16" height="4" rx="1"/>
          <polygon points="-6,-30 -8,-37 8,-37 6,-30"/>
          <rect x="-1.5" y="-46" width="3" height="9"/>
          <rect x="-5" y="-43" width="10" height="3"/>
        </g>
        <g class="chess-piece" transform="translate(145, 192) rotate(-6)">
          <rect x="-10" y="0" width="20" height="5" rx="1"/>
          <polygon points="-8,0 -5,-25 5,-25 8,0"/>
          <rect x="-8" y="-29" width="16" height="4" rx="1"/>
          <polygon points="-7,-29 -9,-37 -3,-33 0,-38 3,-33 9,-37 7,-29"/>
          <circle cx="0" cy="-40" r="2.2"/>
        </g>
        <g class="chess-piece" transform="translate(170, 188) rotate(8)">
          <rect x="-11" y="0" width="22" height="5" rx="1"/>
          <path d="M -8 0 C -9 -12, -5 -22, 0 -29 L -3 -35 L 3 -31 C 9 -30, 14 -24, 14 -17 C 14 -14, 10 -12, 6 -13 C 4 -8, 6 -4, 8 0 Z"/>
        </g>
      </g>
      <g id="pedone-base" class="piece-dark" transform="translate(155, 305)">
        <circle cx="0" cy="14" r="12" />
        <rect x="-13" y="27" width="26" height="5" rx="2.5" />
        <path d="M -9 32 C -11 48, -16 58, -19 66 L 19 66 C 16 58, 11 48, 9 32 Z" />
        <rect x="-23" y="66" width="46" height="8" rx="4" />
        <rect x="-26" y="75" width="52" height="7" rx="3.5" />
      </g>
    </svg>`;
}

/** Adult question mark: three strokes and pieces sliding into the curve, with a pawn as the dot. */
export class ChessQMarkAdulti extends BaseElement {
  static get observedAttributes(): string[] {
    return ['primary-color', 'piece-color', 'size', 'animated', 'label'];
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
      cssColor(this.getAttribute('piece-color'), DEFAULT_PIECE),
      cssSize(this.getAttribute('size'), DEFAULT_SIZE),
      this.hasAttribute('animated'),
      this.getAttribute('label') ?? 'ChessSaiFare',
    );
  }
}

defineOnce(ADULT_TAG, ChessQMarkAdulti);
