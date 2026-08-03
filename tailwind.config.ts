import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111113',
        paper: '#fbfbf7',
        signal: '#2440ff',
        lime: '#d7ff3f',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(3%, -4%) scale(1.05)' },
          '66%': { transform: 'translate(-2%, 3%) scale(0.98)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-1%, -2%)' },
          '30%': { transform: 'translate(2%, 1%)' },
          '50%': { transform: 'translate(-2%, 2%)' },
          '70%': { transform: 'translate(1%, -1%)' },
          '90%': { transform: 'translate(-1%, 1%)' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite reverse',
        blink: 'blink 1.1s step-end infinite',
        grain: 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
