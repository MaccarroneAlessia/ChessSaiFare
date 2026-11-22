import type { ReactNode } from 'react';
import '../../globals.css';
import { themeCssRule } from '@/shared/theme/tokens';

export const metadata = {
  title: 'LetsChess',
  description: 'Learn chess with a teacher who explains every move.',
};

export default function EnglishLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
        <style dangerouslySetInnerHTML={{ __html: themeCssRule('adult') }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
