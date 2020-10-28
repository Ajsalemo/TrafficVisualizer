module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      margin: {
        "-12": "-3rem",
      },
      width: {
        ft: "fit-content",
      },
    },
  },
  variants: {},
  plugins: [],
};
