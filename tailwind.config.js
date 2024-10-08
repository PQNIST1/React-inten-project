/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', "./node_modules/react-tailwindcss-select/dist/index.esm.js"],
  theme: {
    extend: {
      colors: {
        customColor: 'rgb(15 23 42 / <alpha-value>)',
      },
      skew: {
        "25": '25deg'
      },
      height: {
        "15": '60px',
        "512": '512px',
        "448": '448px',
        "1016": '1016px',
      },
      width: {
        "22": '88px',
        "13":'51px',
        "424": '424px',
      },
      fontSize: {
        "tn": '10px' // Thêm kích thước chữ tùy chỉnh
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
