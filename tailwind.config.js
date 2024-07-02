/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient":
          "linear-gradient(90deg, #22377E 0%, rgba(255,103,0,1) 51%, #22377E 100%)",
        "custom-gradient2":
          "linear-gradient(90deg, #f8fafc 0%, rgba(255,103,0,1) 51%, #f8fafc 100%)",
      },
      colors: {
        "spin-blue": "#22377E", // Azul Spin premia
        "spin-secondary-blue": "rgb(0,183,198)", //Azul secundario Spin Premia
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
