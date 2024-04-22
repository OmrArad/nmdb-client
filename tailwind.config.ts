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
          "radial-gradient(80% 250% at 95% 95%, #ff2fa0 0%, #5a0bb1 100%)",
        "custom-gradient-2":
          "radial-gradient(85% 200% at 90% 90%, #ff33a0 0%, #4c0ba6 100%)",
        "custom-gradient-3":
          "radial-gradient(90% 220% at 85% 85%, #ff47b5 0%, #4e15ab 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
