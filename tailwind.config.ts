import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#46B1C9",   // Azul fuerte
          secondary: "#84C0C6", // Azul claro
          accent: "#9FB7B9",    // Gris azulado
          neutral: "#BCC1BA",   // Gris verdoso
          background: "#F2E2D2" // Beige
        }
      }
    },
  },
  plugins: [],
};
export default config;
