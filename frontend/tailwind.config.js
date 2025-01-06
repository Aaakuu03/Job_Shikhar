/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#2B2B2B",
        customSil: "#B3B3B3", // Add your custom color here
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "coffee",
      "garden",
      "wireframe",
      "valemtine",
    ],
  },
};
