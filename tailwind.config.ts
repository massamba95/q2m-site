import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1a3a6b',
          'blue-light': '#2a5298',
          'blue-dark': '#0f2548',
          gold: '#d4952a',
          'gold-light': '#e8b560',
          'gold-dark': '#b07a1e',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
