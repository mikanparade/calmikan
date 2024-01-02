import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'calmikan',
  description: '忙しさを可視化できるカレンダーアプリ',
};

const iconFont = localFont({
  variable: '--font-material-symbols',
  style: 'normal',
  src: '../../node_modules/material-symbols/material-symbols-outlined.woff2',
  display: 'block',
  weight: '100 700',
});

const interFont = localFont({
  variable: '--font-inter',
  src: [
    {
      path: '../../node_modules/inter-ui/web/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../node_modules/inter-ui/Inter (web)/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${interFont.variable} ${iconFont.variable}`}>{children}</body>
    </html>
  );
}
