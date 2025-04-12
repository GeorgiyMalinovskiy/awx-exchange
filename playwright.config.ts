import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.VITE_PORT || 5173;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run dev:all",
    url: `http://localhost:${PORT}`,
  },
});
