/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        salmon: {
          DEFAULT: "hsl(350, 100%, 66%)",
          50: "hsl(350, 100%, 96%)",
          100: "hsl(350, 100%, 90%)",
          200: "hsl(350, 100%, 84%)",
          300: "hsl(350, 100%, 78%)",
          400: "hsl(350, 100%, 72%)",
          500: "hsl(350, 100%, 66%)",
          600: "hsl(350, 100%, 60%)",
          700: "hsl(350, 100%, 54%)",
          800: "hsl(350, 100%, 48%)",
          900: "hsl(350, 100%, 42%)",
        },
        charcoal: {
          DEFAULT: "hsl(240, 10%, 10%)",
          50: "hsl(240, 10%, 95%)",
          100: "hsl(240, 10%, 85%)",
          200: "hsl(240, 10%, 75%)",
          300: "hsl(240, 10%, 65%)",
          400: "hsl(240, 10%, 55%)",
          500: "hsl(240, 10%, 45%)",
          600: "hsl(240, 10%, 35%)",
          700: "hsl(240, 10%, 25%)",
          800: "hsl(240, 10%, 15%)",
          900: "hsl(240, 10%, 10%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
