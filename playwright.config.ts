import { defineConfig } from "@playwright/test";
import path from "path";

const PORT = 3010;

export default defineConfig({
  testDir: "./tests",
  retries: 1,

  /* すべてのテスト共通で使うオプション */
  use: {
    baseURL: `http://localhost:${PORT}`,
  },

  // すべてのスナップショットに共通のテンプレート
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",

  /* サーバーを自動起動 */
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
