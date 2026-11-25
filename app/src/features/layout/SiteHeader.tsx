import { type Locale, contentFor } from '@/shared/content';

const HOME: Record<Locale, string> = { it: '/', en: '/en/' };
const OTHER: Record<Locale, { href: string; locale: Locale }> = {
  it: { href: '/en/', locale: 'en' },
  en: { href: '/', locale: 'it' },
};

/** Site header: logo (from public/brand), a link to the lessons, and the language switch. */
export function SiteHeader({ locale }: Readonly<{ locale: Locale }>) {
  const content = contentFor(locale);
  const other = OTHER[locale];
  return (
    <header className="site-header">
      <a href={HOME[locale]} className="site-home">
        <img
          className="site-logo"
          src="/brand/logo-adulti.png"
          alt={content.brand.logoLabel}
          width={160}
          height={90}
        />
      </a>
      <nav className="site-nav" aria-label={content.nav.lessons}>
        <a href={`${HOME[locale]}#lezioni`}>{content.nav.lessons}</a>
        <a
          href={other.href}
          lang={other.locale}
          hrefLang={other.locale}
          title={content.nav.switchLanguageLabel}
        >
          {content.nav.switchLanguage}
        </a>
      </nav>
    </header>
  );
}
