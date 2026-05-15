import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        iris: '#8f67ff',
        'iris-soft': '#c7b0ff',
      },
    },
  },
  plugins: [],
}
export default config
