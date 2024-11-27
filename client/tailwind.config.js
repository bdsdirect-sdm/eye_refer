/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#5BE4EC',
        customGreen: '#43D79E',
        teritory: '#35C0E4',
        teritoryDark: '#33adff',
        textColor:"#1C1C1C",
        backGround:"#ECF1F3",
        formBackground:"#f2f2f2",
        headingColor:"#FFF9E4",
        customGray: {
          light: '#D1D5DB',
          DEFAULT: '#6B7280',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
}