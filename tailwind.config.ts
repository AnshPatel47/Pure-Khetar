import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:      "#FAF6EC",
        "cream-dk": "#F0E8D0",
        forest:     "#1F4D2E",
        "forest-l": "#2E6B3F",
        marigold:   "#E0A528",
        terracotta: "#C86D3B",
        sage:       "#7A9A6B",
<<<<<<< HEAD
        whatsapp:      "#25D366",
        "whatsapp-dk": "#128C4A",
=======
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        sans:  ["var(--font-plus-jakarta)", "'Plus Jakarta Sans'", "sans-serif"],
      },
      backgroundImage: {
        "radial-forest":
          "radial-gradient(ellipse at 30% 50%, rgba(31,77,46,0.92) 0%, rgba(31,77,46,0.6) 50%, transparent 80%)",
        "radial-cream":
          "radial-gradient(ellipse at center, #FAF6EC 0%, #F0E8D0 100%)",
        "shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
      },
      boxShadow: {
        "organic":    "0 8px 32px rgba(31,77,46,0.12)",
        "organic-lg": "0 20px 60px rgba(31,77,46,0.18)",
        "glow-gold":  "0 0 30px rgba(224,165,40,0.35)",
        "glow-green": "0 0 30px rgba(31,77,46,0.3)",
        "card":       "0 2px 16px rgba(31,77,46,0.08), 0 1px 4px rgba(31,77,46,0.06)",
        "card-hover": "0 12px 40px rgba(31,77,46,0.16), 0 4px 12px rgba(31,77,46,0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionDuration: {
<<<<<<< HEAD
        "350": "350ms",
=======
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
        "400": "400ms",
      },
      keyframes: {
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-slow": {
          "0%":   { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
<<<<<<< HEAD
        "shimmer-slide": {
          "100%": { transform: "translateX(100%)" },
        },
=======
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.6s ease forwards",
        "fade-in":  "fade-in 0.8s ease forwards",
        "zoom-slow": "zoom-slow 12s ease-out forwards",
        "float":     "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
