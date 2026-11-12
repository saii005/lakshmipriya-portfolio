/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          warm: '#FAF7F0',
          cream: '#F7F2E9',
          linen: '#F0E9DC',
          sand: '#E7DDD0',
          peach: '#E8CBB1',
          sage: '#D8E0D5',
          ink: '#2A302D',
          muted: '#59625B',
          rust: '#9D5A41',
          deep: '#3D4A3D',
          forest: '#344438',
          forestDark: '#243529',
          line: '#DED8CD',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
