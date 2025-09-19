import { defineConfig } from "vitest/config";

// Vitest configuration - see README.md#vitest for details
export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "node_modules/**",
        "dist/**",
        "tests/**",
        "**/*.{test,spec}.*",
        "**/*.config.*",
        "**/*.d.ts",
      ],
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    globals: true,
    include: ["tests/**", "**/*.{test,spec}.*"],
  },
});
