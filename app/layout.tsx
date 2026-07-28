import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist, JetBrains_Mono } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import Ticker from './components/Ticker';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
  style: ['normal', 'italic'],
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://codio.co.in'),
  title: {
    default: 'Codio Systems — software, mobile & cloud engineering',
    template: '%s — Codio Systems',
  },
  description:
    'Codio Systems is a small, senior software company. We design, build, and deliver reliable software for teams that need it — web, mobile, and cloud.',
  keywords: ['software company', 'web development', 'mobile apps', 'cloud engineering', 'product design'],
  authors: [{ name: 'Codio Systems' }],
  openGraph: {
    title: 'Codio Systems — software, mobile & cloud',
    description: 'Senior software engineering from start to finish. Web, mobile, and cloud.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f3ec',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} ${jetbrains.variable}`}>
      <body>
        <Cursor />
        <ScrollProgress />
        <Ticker />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
