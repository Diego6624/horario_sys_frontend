export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // azul personalizado
        secondary: "#F59E0B", // naranja personalizado
      },
    },
  },
  plugins: [require("daisyui")],
}
