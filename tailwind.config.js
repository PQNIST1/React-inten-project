/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customColor: 'rgb(15 23 42 / <alpha-value>)',
      },
      skew: {
        "25":'25deg'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
