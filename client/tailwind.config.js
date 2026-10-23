/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F58220',
          navy: '#0F2942',
          dark: '#0A1726'
        }
      }
    },
  },
  plugins: [],
}
