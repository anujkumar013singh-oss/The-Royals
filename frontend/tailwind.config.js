/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        royal: { black: '#0a0a0a', gold: '#d4af37', cream: '#f5f0e8', dark: '#1a1a1a' },
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Cormorant Garamond', 'serif'],
        ui: ['Inter', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee var(--duration, 40s) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration, 40s) linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap, 1rem)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap, 1rem)))' },
        },
      },
    },
  },
  plugins: [],
};
