/** @type {import("prettier").Config} */

// Prettier configuration - see README.md#prettier for details
const config = {
  objectWrap: "preserve",

  overrides: [
    {
      files: "*.md",
      options: {
        proseWrap: "always",
      },
    },
  ],
};

export default config;
