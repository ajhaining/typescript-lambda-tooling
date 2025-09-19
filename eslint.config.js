import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

// ESLint configuration - see README.md#eslint for details
export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  perfectionist.configs["recommended-natural"],
  prettierConfig,
);
