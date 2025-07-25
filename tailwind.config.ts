import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        // Custom ScriptioKit Colors (refined palette)
        // Using shades of gray for base, and a specific blue for accent
        "sk-white": {
          DEFAULT: "#FFFFFF",
          "50": "#F9FAFB", // Lightest gray for subtle backgrounds
        },
        "sk-gray": {
          "100": "#F3F4F6",
          "200": "#E5E7EB",
          "300": "#D1D5DB",
          "400": "#9CA3AF",
          "500": "#6B7280",
          "600": "#4B5563",
          "700": "#374151",
          "800": "#1F2937",
          "900": "#111827", // Dark gray/near black
          "950": "#0A0D14", // Near black for backgrounds
        },
        "sk-blue": {
          DEFAULT: "#2A68E1", // A slightly darker, more sophisticated Royal Blue
          "50": "#EBF2FE",
          "100": "#D4E0FC", // Mais claro para hovers em light mode
          "200": "#A9C2F9",
          "300": "#7E9EF6",
          "400": "#537BF3",
          "500": "#2A68E1",
          "600": "#1F52B3",
          "700": "#163D85", // Mais escuro para hovers em dark mode
          "800": "#0E2857",
          "900": "#07142A",
        },
        "sk-gold": {
          // Keeping a gold accent for specific elements like stars/icons
          DEFAULT: "#C9A236",
          "50": "#FFFBEB",
          "100": "#FEF3C7",
          "200": "#FDE68A",
          "300": "#FCD34D",
          "400": "#FBBF24",
          "500": "#F59E0B",
          "600": "#D97706",
          "700": "#B45309",
          "800": "#92400E",
          "900": "#78350F",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
