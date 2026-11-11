/** Tailwind config for catalog.html. Colours are CSS variables so light/dark switch in input.css. */
module.exports = {
  content: ["../catalog.html", "../catalog.js"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        wash: "rgb(var(--wash) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        chip: "rgb(var(--chip) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--accent-ink) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"DM Sans"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
