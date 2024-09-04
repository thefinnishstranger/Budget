/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/public/background.png')",
        'background1': "url('/public/background1.jpg')",
        'background2': "url('/public/background2.png')",
        'background3': "url('/public/background3.jpg')",
        'background4': "url('/public/background4.jpg')",
        'background5': "url('/public/background5.jpg')",
      }
    },
  },
  plugins: [],
}