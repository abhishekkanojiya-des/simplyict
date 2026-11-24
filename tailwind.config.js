/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05080F',
        elevated: '#0A1322',
        brand: { blue: '#3B82F6', cyan: '#22D3EE' },
        ok: '#34D399',
      },
      fontFamily: {
        display: ['Geist', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1340px' },
    },
  },
  plugins: [],
}
