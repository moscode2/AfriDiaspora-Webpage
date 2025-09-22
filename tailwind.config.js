/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb", // light gray background
        foreground: "#111827", // dark text color
        border: "#e5e7eb",     // if you still want border-border
      },
    },
  },
  plugins: [],
}
