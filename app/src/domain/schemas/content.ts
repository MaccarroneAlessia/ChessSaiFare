import { z } from 'zod';
import { checkFen } from '../chess/rules';

const sanPattern =
  /^(?:O-O(?:-O)?|[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRBN])?|[a-h]x?[a-h][1-8](?:=[QRBN])?)[+#]?$/;

export const SanSchema = z.string().regex(sanPattern, { message: 'not a SAN move' });

export const FenSchema = z.string().refine((fen) => checkFen(fen).ok, { message: 'invalid FEN' });

export const LessonStepSchema = z.strictObject({
  san: SanSchema,
  t: z.string().min(1),
  k: z.string().min(1),
});

export const LessonSchema = z.strictObject({
  id: z.string().min(1),
  name: z.string().min(1),
  kidName: z.string().min(1),
  level: z.enum(['Principiante', 'Intermedio', 'Avanzato']),
  side: z.enum(['bianco', 'nero']),
  kids: z.boolean(),
  intro: z.string().min(1),
  kidIntro: z.string().min(1),
  steps: z.array(LessonStepSchema).min(1),
});

export const ThemeSchema = z.strictObject({
  id: z.string().min(1),
  name: z.string().min(1),
  kid: z.string().min(1),
  desc: z.string().min(1),
});

export const PuzzleSchema = z.strictObject({
  id: z.string().min(1),
  theme: z.string().min(1),
  title: z.string().min(1),
  kid: z.string().min(1),
  fen: FenSchema.optional(),
  moves: z.array(SanSchema).optional(),
  sol: z.array(SanSchema).min(1),
  alt: z.record(z.string(), z.array(SanSchema)).optional(),
  accept: z.array(SanSchema).optional(),
  t: z.string().min(1),
  k: z.string().min(1),
});

export const NotationExampleSchema = z.strictObject({
  moves: z.array(z.string()),
  mark: z.string(),
  note: z.string(),
});

export const NotationTopicSchema = z.strictObject({
  id: z.string().min(1),
  kids: z.boolean(),
  title: z.string().min(1),
  kid: z.string().min(1),
  text: z.string().min(1),
  kidText: z.string().optional(),
  examples: z.array(NotationExampleSchema),
});

export type Lesson = z.infer<typeof LessonSchema>;
export type Puzzle = z.infer<typeof PuzzleSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type NotationTopic = z.infer<typeof NotationTopicSchema>;
