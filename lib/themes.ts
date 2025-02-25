export const themes = {
  jade: {
    name: "Jade",
    colors: {
      primary: "#00A86B",
      secondary: "#004B40",
      background: "#F0FFF4",
      foreground: "#1A2E29",
      muted: "#E0F2E9",
      border: "#004B40",
    },
  },
  indigo: {
    name: "Indigo",
    colors: {
      primary: "#4F46E5",
      secondary: "#312E81",
      background: "#F5F3FF",
      foreground: "#1E1B4B",
      muted: "#E0E7FF",
      border: "#312E81",
    },
  },
  barbra: {
    name: "Barbra",
    colors: {
      primary: "#EC4899",
      secondary: "#831843",
      background: "#FDF2F8",
      foreground: "#500724",
      muted: "#FCE7F3",
      border: "#831843",
    },
  },
  lagoon: {
    name: "Lagoon",
    colors: {
      primary: "#06B6D4",
      secondary: "#164E63",
      background: "#ECFEFF",
      foreground: "#083344",
      muted: "#CFFAFE",
      border: "#164E63",
    },
  },
  sunflower: {
    name: "Sun Flower",
    colors: {
      primary: "#FFD700",
      secondary: "#2F4F4F",
      background: "#FFFAF0",
      foreground: "#1A472A",
      muted: "#FFF8DC",
      border: "#2F4F4F",
    },
  },
} as const

export type ThemeKey = keyof typeof themes

