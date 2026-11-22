import { getHomeContent } from '@/application/home/getHomeContent';
import { SiteHeader } from '@/features/layout/SiteHeader';
import type { Locale } from '@/shared/content';

export function HomePage({ locale }: Readonly<{ locale: Locale }>) {
  const content = getHomeContent(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="home" lang={locale}>
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>
        <p className="status">{content.status}</p>
      </main>
    </>
  );
}
