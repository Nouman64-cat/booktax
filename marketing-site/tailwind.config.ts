import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-axiforma)", "sans-serif"],
      },
      colors: {
        black: "#1c2143", // Replacing black with primary color
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#1c2143", // Replaces gray-900 with primary
          950: "#0e1021", // Darker shade for contrast
        },
        // Overriding all green-like colors with the new brand color #1c2143
        emerald: {
          50: "#eaebf0",
          100: "#d0d3df",
          200: "#aab0c8",
          300: "#7d86ab",
          400: "#565f8a",
          500: "#3b436e",
          600: "#1c2143", // Main brand color
          700: "#161a36",
          800: "#11142a",
          900: "#0c0e1d",
          950: "#06070f",
        },
        green: {
          50: "#eaebf0",
          100: "#d0d3df",
          200: "#aab0c8",
          300: "#7d86ab",
          400: "#565f8a",
          500: "#3b436e",
          600: "#1c2143",
          700: "#161a36",
          800: "#11142a",
          900: "#0c0e1d",
          950: "#06070f",
        },
        teal: {
          50: "#eaebf0",
          100: "#d0d3df",
          200: "#aab0c8",
          300: "#7d86ab",
          400: "#565f8a",
          500: "#3b436e",
          600: "#1c2143",
          700: "#161a36",
          800: "#11142a",
          900: "#0c0e1d",
          950: "#06070f",
        },
        lime: {
          50: "#eaebf0",
          100: "#d0d3df",
          200: "#aab0c8",
          300: "#7d86ab",
          400: "#565f8a",
          500: "#3b436e",
          600: "#1c2143",
          700: "#161a36",
          800: "#11142a",
          900: "#0c0e1d",
          950: "#06070f",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
};
export default config;
