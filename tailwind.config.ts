// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // aquí habilitamos dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customLight: "#efe7dd", // tu color claro
      },
    },
  },
  plugins: [],
}

export default config
