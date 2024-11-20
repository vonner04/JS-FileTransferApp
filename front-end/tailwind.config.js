/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-background': '#2B3A55',
        'primary-background-hover': '#1E2A3F',
        'primary-text': '#FFFFFF'
      },
      transitionProperty: {
        'width': 'width',
      },
    },
    
  },
  plugins: [],
}