/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        'primary': '#1a1a1a',
        "primary-bg": '#303642',
        "primary-box": '#3d4552',
        "primary-text": '#ccc',
        "primary-btn": '#ff7461',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        }
      },
    },
  },
  plugins: [],
}