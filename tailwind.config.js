/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mainBG:'#F7F7F7',
        purple:'#A900B7',
        
      }
    },
  },
  plugins: [],
}

