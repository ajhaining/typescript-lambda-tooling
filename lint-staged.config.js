/** @type {import('lint-staged').Configuration} */

// lint-staged configuration - see README.md#lint-staged for details
const config = {
  "*.{js,cjs,mjs,ts,cts,mts,jsx,tsx}": [
    "eslint --cache --fix",
    "prettier --write",
  ],
  "*.{json,md,html,yml,yaml}": "prettier --write",
};

export default config;
