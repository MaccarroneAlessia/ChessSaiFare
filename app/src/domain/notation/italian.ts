/** Italian piece letters (R, D, T, A, C) and the international ones (K, Q, R, B, N). */
const ITALIAN_TO_INTERNATIONAL: Readonly<Record<string, string>> = {
  R: 'K',
  D: 'Q',
  T: 'R',
  A: 'B',
  C: 'N',
};

const INTERNATIONAL_TO_ITALIAN: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(ITALIAN_TO_INTERNATIONAL).map(([it, en]) => [en, it]),
);

function translatePieces(san: string, table: Readonly<Record<string, string>>): string {
  return san
    .replace(/^[A-Z]/, (letter) => table[letter] ?? letter)
    .replace(/=([A-Z])/, (_, letter: string) => `=${table[letter] ?? letter}`);
}

/** "Cf3" -> "Nf3", "e8=D" -> "e8=Q". Castling and pawn moves are unchanged. */
export function sanFromItalian(san: string): string {
  return translatePieces(san, ITALIAN_TO_INTERNATIONAL);
}

/** "Nf3" -> "Cf3", "e8=Q" -> "e8=D". Castling and pawn moves are unchanged. */
export function sanToItalian(san: string): string {
  return translatePieces(san, INTERNATIONAL_TO_ITALIAN);
}
