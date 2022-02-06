module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, 1fr)",
        32: "repeat(32, 1fr)",
      },
    },
  },
  plugins: [],
};
