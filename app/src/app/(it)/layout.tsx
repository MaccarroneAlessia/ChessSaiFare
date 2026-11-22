import type { ReactNode } from 'react';
import '../globals.css';
import { themeCssRule } from '@/shared/theme/tokens';

export const metadata = {
  title: 'ChessSaiFare',
  description: 'Impara a giocare a scacchi con un prof che ti spiega ogni mossa.',
};

export default function ItalianLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it">
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
