// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik-one': ['"Rubik One"', 'sans-serif'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
      },
      borderRadius: {
        'brutal-sm': '8px',
        'brutal-md': '12px',
        'brutal-lg': '16px',
      },
      boxShadow: {
        'brutal-sm': '1px 2px 0 0 #1B2125',
        'brutal-md': '2px 2px 0 0 #1B2125',
        'brutal-lg': '2px 4px 0 0 #1B2125',
        'none': 'none',
      },
    },
  },
  plugins: [],
}