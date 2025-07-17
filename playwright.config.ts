import { defineConfig } from "@playwright/test";

const PORT = 3010; // ローカルと CI で共通ポート

export default defineConfig({
  testDir: "./tests",
  retries: 1,

  use: {
    baseURL: `http://localhost:${PORT}`, // ← ここに移動
  },

  /* サーバーを自動起動 */
  webServer: {
    command: `npm run dev -- -p ${PORT}`, // Next.js を 3010 で起動
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
