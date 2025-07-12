/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // This enables class-based dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other paths that contain your components
  ],
  theme: {
    extend: {}, // You can extend default theme here if needed
  },
  plugins: [], // Add any Tailwind plugins here if needed
}