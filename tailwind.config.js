/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1F193F',
        'secondary-dark': '#282c34',
        'highlight': '#00FF00',
        'border-gray': '#E0E0E0',
        'text-dark': '#191442',
      },
      boxShadow: {
        '3d': '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
      },
    },
  },
  plugins: [],
}
