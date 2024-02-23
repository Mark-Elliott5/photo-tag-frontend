/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        leaderboard: '1fr 3fr 1fr',
      },
      margin: {
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
      },
      scale: {
        300: '3',
      },
      animation: {
        fade: 'fadeIn 0.25s ease-in-out',
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
};
