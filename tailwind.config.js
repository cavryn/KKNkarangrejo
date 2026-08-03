/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#DE9227",
          goldHover: "#C7801E",
          goldLight: "#FEF3C7",
          navy: "#0E2B4C",
          navyHover: "#091E36",
          navyLight: "#EFF6FF",
          green: "#2A614A",
          greenHover: "#214C39",
          greenLight: "#ECFDF5",
          bg: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          text: "#0E2B4C",
          textMuted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
