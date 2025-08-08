/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // This line tells Tailwind to look in the src folder for all .js and .jsx files.
    "./public/index.html"  // You should also include your index.html file.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}