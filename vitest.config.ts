import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["app/**/*.test.ts", "server/**/*.test.ts", "server/**/*.spec.ts"],
  },
});
