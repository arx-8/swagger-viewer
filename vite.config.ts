import { crx } from "@crxjs/vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import manifest from "./manifest.json"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  plugins: [react(), crx({ manifest: manifest as any })],
  test: {
    environment: "happy-dom",
    // This setting is required because at least `jest-styled-components` depends on `globals`.
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
})
