import type { Config } from "tailwindcss";

const config: Config = {
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
        "custom-gradient-1":
          "radial-gradient(75.4% 259.17% at 94.48% 100%, #1fffbc 0%, #540ba1 100%)",
        "custom-gradient-2":
          "radial-gradient(circle, #fecaca, #fda4af, #fef08a)",
      },
    },
  },
  plugins: [],
};
export default config;
