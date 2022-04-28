const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    './www/**/*.html',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        playfairDisplay:  "'Playfair Display', serif",
        lora:  "'Lora', serif"
      }
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
