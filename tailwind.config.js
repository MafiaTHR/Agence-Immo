/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        d8: {
          black: '#0B0C0E',
          charcoal: '#16181C',
          panel: '#1D2025',
          line: '#2A2D33',
          gold: '#C9A24B',
          'gold-bright': '#E8C878',
          'gold-dim': '#8C7333',
          cream: '#EDE7DA',
          muted: '#9CA0A8',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,162,75,0.35), 0 8px 30px -8px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
