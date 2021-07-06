const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: 'jit',
  purge: ["./**/*.html"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Barlow Condensed", ...defaultTheme.fontFamily.sans],
      },
      colors: require('daisyui/colors'),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
};