import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import './globals.css';

const fraunces = localFont({
  src: './fonts/Fraunces[SOFT,WONK,opsz,wght].ttf',
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = localFont({
  src: './fonts/DMSans[opsz,wght].ttf',
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = localFont({
  src: [
    { path: './fonts/DMMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/DMMono-Medium.ttf', weight: '500', style: 'normal' },
  ],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zanuar.dev'),
  title: 'zanuar',
  description: 'Small, friendly tools I build for the moments an agent gets stuck.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
