import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
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
        gray: {
          100: "hsl(0, 0%, 98%)", // Very Light Gray: hsl(0, 0%, 98%)
          200: "hsl(0, 0%, 92%)", // Very Light Grayish Blue: hsl(236, 33%, 92%)
          300: "hsl(0, 0%, 84%)", // Light Grayish Blue: hsl(233, 11%, 84%)
          400: "hsl(0, 0%, 61%)", // Dark Grayish Blue: hsl(236, 9%, 61%)
          500: "hsl(0, 0%, 35%)", // Very Dark Grayish Blue: hsl(235, 19%, 35%)a
        },
        blue: {
          100: "hsl(236, 33%, 92%)", // Light Grayish Blue (hover)
          200: "hsl(234, 39%, 85%)", // Light Grayish Blue
          300: "hsl(234, 11%, 52%)", // Dark Grayish Blue
          400: "hsl(233, 14%, 35%)", // Very Dark Grayish Blue
          500: "hsl(237, 14%, 26%)", // Very Dark Grayish Blue
          600: "hsl(235, 24%, 19%)", // Very Dark Desaturated Blue
          700: "hsl(235, 21%, 11%)", // Very Dark Blue
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
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
} satisfies Config

export default config