/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
      'white': '#fff',
      'blue': '#7395AE',
      'blue-dark': '#557A95',
      'gray-dark': '#5D5C61',
      'gray': '#379683',
      'gray-light': '#B1A296',
      'text-gray': "#bababa"
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
  },
}

