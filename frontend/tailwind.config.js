const colors = require("tailwindcss/colors")

module.exports = {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    daisyui: {
      themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
    },
    extend: {
      keyframes: {
        pingOne: {
          '0%, 100%' : {
            'transform': 'translateY(25%)',
            'animation- timing - function': 'cubic- bezier(0.8, 0, 1, 1)',
          },
        //    '50%' : {
        //     'transform': 'translateY(0)',
        //     'animation- timing - function': 'cubic- bezier(0, 0, 0.2, 1)',
        // },
        },
      },
      animation: {
        'pingOne': 'pingOne 1s cubic-bezier(0, 0, 0.2, 1)',
      },
      colors: {
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-secondary": colors.white, // Dark mode Datepicker color
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui"),
  ],
}
