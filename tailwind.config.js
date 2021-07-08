const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: 'jit',
  purge: [
    './www/**/*.html',
    './public/**/*.html',
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        playfairDisplay:  "'Playfair Display', serif",
        lora:  "'Lora', serif"
      },
      colors: require('daisyui/colors'),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/typography")
  ],
};
