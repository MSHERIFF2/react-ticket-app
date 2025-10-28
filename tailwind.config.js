/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      colors: {
        open: "#22c55e",
        in_progress: "#f59e0b",
        closed: "#9ca3af",
      },
    },
  },
};
