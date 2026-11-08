import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      md: '768px',
      xl: '1200px',
    },
    extend: {
      colors: {
        cream: 'var(--color-cream)',
        paper: 'var(--color-paper)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        muted: 'var(--color-muted)',
        faint: 'var(--color-faint)',
        line: 'var(--color-line)',
        peach: 'var(--color-peach)',
        'peach-soft': 'var(--color-peach-soft)',
        rust: 'var(--color-rust)',
        skeleton: 'var(--color-skeleton)',
        avatar: 'var(--color-avatar)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        'card-mobile': 'var(--radius-card-mobile)',
        inner: 'var(--radius-inner)',
        pill: 'var(--radius-pill)',
      },
      borderWidth: {
        outline: 'var(--stroke-outline)',
        tag: 'var(--stroke-tag)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
      },
      fontSize: {
        display: ['var(--text-display)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        h1: ['var(--text-h1)', { lineHeight: '1.03', letterSpacing: '-0.025em' }],
        h2: ['var(--text-h2)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        h3: ['var(--text-h3)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h4: ['var(--text-h4)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        lead: ['var(--text-lead)', { lineHeight: '1.5' }],
        body: ['var(--text-body)', { lineHeight: '1.55' }],
        small: ['var(--text-small)', { lineHeight: '1.4' }],
        mono: ['var(--text-mono)', { lineHeight: '1.3' }],
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      transitionDuration: {
        fast: 'var(--motion-fast)',
        base: 'var(--motion-base)',
        slow: 'var(--motion-slow)',
      },
      transitionTimingFunction: {
        out: 'var(--motion-ease-out)',
        pop: 'var(--motion-ease-pop)',
      },
    },
  },
  plugins: [],
};

export default config;
