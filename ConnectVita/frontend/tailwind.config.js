/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        navcolor:"#ffffff",
        navinput:"#eef3f8",
        Homecolor:"#f3f2ef",
        hover:"#797977"
      },
      translate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      spacing: {
        '-2': '-2px',
      },
    },
  },
  plugins: [],
}