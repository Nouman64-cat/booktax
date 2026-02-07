import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-axiforma)", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
};
export default config;
