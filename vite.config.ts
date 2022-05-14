import { defineConfig } from "vite"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    environment: "happy-dom",
    // This setting is required because at least `jest-styled-components` depends on `globals`.
    globals: true,
    include: [
      "app-src/**/*.test.ts",
      "app-src/**/*.test.tsx",
      "app/**/*.test.ts",
      "app/**/*.test.tsx",
    ],
  },
})
