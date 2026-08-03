import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { GradientMesh } from '@/components/gradient-mesh';
import { SOCIAL_LINKS } from '@/lib/site';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
});

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

const siteUrl = 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Zanuar: AI Agent Engineer',
    template: '%s | Zanuar',
  },
  description:
    'QA engineer transitioning into AI agent engineering. Case studies in LangGraph orchestration, MCP tool integration, and RAG systems.',
  openGraph: {
    type: 'website',
    siteName: 'Zanuar',
    title: 'Zanuar: AI Agent Engineer',
    description:
      'QA engineer transitioning into AI agent engineering. Case studies in LangGraph orchestration, MCP tool integration, and RAG systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zanuar: AI Agent Engineer',
    description:
      'QA engineer transitioning into AI agent engineering. Case studies in LangGraph orchestration, MCP tool integration, and RAG systems.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <GradientMesh />
        <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-tight text-ink"
            >
              <span className="text-signal">~/</span>zanuar
            </Link>
            <div className="flex gap-2 font-mono text-xs uppercase tracking-[0.1em]">
              <Link
                href="/"
                className="rounded-md border-2 border-transparent px-3 py-1.5 text-ink/60 transition-colors hover:border-ink hover:text-ink"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-md border-2 border-transparent px-3 py-1.5 text-ink/60 transition-colors hover:border-ink hover:text-ink"
              >
                About
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-16">{children}</main>
        <footer className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10 font-mono text-xs text-ink/35">
          <span>© {new Date().getFullYear()} Zanuar.</span>
          <div className="flex gap-4 uppercase tracking-[0.1em]">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
