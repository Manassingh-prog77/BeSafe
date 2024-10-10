/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Adjust based on your structure
    "./components/**/*.{js,jsx,ts,tsx}", // Include components directory
    "./assets/**/*.{js,jsx,ts,tsx}", // Include assets if using Tailwind there
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
