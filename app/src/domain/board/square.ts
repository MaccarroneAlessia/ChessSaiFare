export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

export type File = (typeof FILES)[number];
export type Rank = (typeof RANKS)[number];
export type Square = `${File}${Rank}`;

const SQUARE_PATTERN = /^[a-h][1-8]$/;

/** True when the value is a board square name such as "e4". Case sensitive. */
export function isSquare(value: string): value is Square {
  return SQUARE_PATTERN.test(value);
}
