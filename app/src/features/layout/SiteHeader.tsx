import { contentFor, type Locale } from '@/shared/content';

/** Site header with the logo (image from public/brand). The logo already contains the name. */
export function SiteHeader({ locale }: Readonly<{ locale: Locale }>) {
  const content = contentFor(locale);
  return (
    <header className="site-header">
      <img
        className="site-logo"
        src="/brand/logo-adulti.png"
        alt={content.brand.logoLabel}
        width={160}
        height={90}
      />
    </header>
  );
}
