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
      height: {
        "15":'60px',
        "512":'512px',
        "448":'448px',
      },
      width: {
        "22":'88px',
        "424":'424px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
