/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "typegres-blue": "#3B82F6",
        "typegres-dark": "#111827",
        "typegres-gray": "#6B7280",
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "row-flash": "rowFlash 1800ms ease-out",
        "cell-flash": "cellFlash 1800ms ease-out",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        // Hold the saturated colour for the first ~40% of the run so
        // the eye actually catches it; ease-out alone fades too fast
        // to register on a quick mutation.
        rowFlash: {
          "0%, 40%": { backgroundColor: "rgba(34, 197, 94, 0.6)" },
          "100%": { backgroundColor: "transparent" },
        },
        cellFlash: {
          "0%, 40%": { backgroundColor: "rgba(234, 179, 8, 0.7)" },
          "100%": { backgroundColor: "transparent" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
