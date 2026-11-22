import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'ChessSaiFare',
  description: 'Learn chess with a teacher who explains every move.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
