const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
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
    require('daisyui'),
    require("tailwindcss-debug-screens"),
  ],
};
