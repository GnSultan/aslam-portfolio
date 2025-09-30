import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        footer: 'var(--footer)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      fontSize: {
        'h1': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'h2': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h3': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'container': '1200px',
        'content': '65ch',
        'wide-content': '75ch',
      },
      spacing: {
        'section': 'var(--section-padding)',
      },
    },
  },
  plugins: [],
}

export default config
