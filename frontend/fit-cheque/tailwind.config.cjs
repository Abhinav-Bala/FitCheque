/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html" ,"./src/**/*.{jsx,js}"],
  theme: {
    fontSize: {
      'title': ['200px', {
        lineHeight: '200px',
      }],
      'heading': ['2rem', {
        lineHeight: '2.25rem',
        letterSpacing: '-0.02em',
        fontWeight: '300',
      }],
    },
    extend: {
      fontFamily: {
        display: ["Chivo", "sans-serif"],
      },
    },
  },
  plugins: [],
}
