import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'conecta-azul': '#00ABD0',
        'conecta-azul-claro': '#70E5FF',
        'conecta-azul-escuro': '#00748D',
        secundaria: '#383838',
        terciaria: '#001121',
        'cinza-1': '#C0BFC0',
        'cinza-2': '#ECECEC',
        'cinza-3': '#3C4854',
        'cinza-4': '#676767',
        'cinza-5': '#A1A1A1',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config
