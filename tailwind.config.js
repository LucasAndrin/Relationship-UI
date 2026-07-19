/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(top|left|h|w)-([0-9]+)/,
    },
  ],
  plugins: [],
};
