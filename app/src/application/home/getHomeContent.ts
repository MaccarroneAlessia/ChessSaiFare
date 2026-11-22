import { it } from '@/shared/content/it';

export type HomeContent = Readonly<{ title: string; subtitle: string; status: string }>;

/** Returns the text for the home page. Pure: no I/O. */
export function getHomeContent(): HomeContent {
  return { ...it.home };
}
