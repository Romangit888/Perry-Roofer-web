import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1440px" }
    },
    extend: {
      colors: {
        // Brand: contractor's truck — deep navy, warm copper, paper-bag neutral
        ink: {
          DEFAULT: "#0F1B2D",
          50: "#F2F4F7",
          100: "#D9DEE6",
          200: "#A8B2C2",
          300: "#6E7B92",
          400: "#3E4A60",
          500: "#1F2A3F",
          600: "#0F1B2D",
          700: "#0A1320",
          800: "#060B16",
          900: "#03060D"
        },
        copper: {
          DEFAULT: "#C2410C",
          50: "#FFF5EC",
          100: "#FFE3CC",
          200: "#FBC394",
          300: "#F39E5C",
          400: "#E0762B",
          500: "#C2410C",
          600: "#9A340A",
          700: "#762807",
          800: "#561C05",
          900: "#3A1303"
        },
        paper: {
          DEFAULT: "#F7F3EE",
          warm: "#EFE7DA",
          cool: "#E8E5DF"
        },
        success: "#16A34A"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"]
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 5.75rem)", { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "600" }]
      },
      spacing: {
        section: "clamp(4rem, 9vw, 8rem)",
        gutter: "clamp(1.25rem, 4vw, 3rem)"
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,27,45,0.04), 0 8px 24px -12px rgba(15,27,45,0.18)",
        lift: "0 10px 40px -16px rgba(15,27,45,0.35)",
        ring: "0 0 0 4px rgba(194,65,12,0.18)"
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem"
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.6)", opacity: "0.55" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
