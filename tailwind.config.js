/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          green: '#4caf50',
          orange: '#f57c00',
          dark: '#121212',
          card: 'rgba(18, 18, 18, 0.4)'
        }
      }
    },
  },
  plugins: [],
}
