/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#e99713",
          dark: "#0b0b0b",
          ink: "#111111",
          light: "#f4f4f4",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};
