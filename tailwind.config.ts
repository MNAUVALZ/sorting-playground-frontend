import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dicoding: {
          navy: '#0F172A',
          dark: '#1E293B',
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          cyan: '#0891B2',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          text: '#334155',
          'text-light': '#64748B'
        }
      },
      boxShadow: {
        'dicoding': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'dicoding-hover': '0 10px 25px -3px rgba(37, 99, 235, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
