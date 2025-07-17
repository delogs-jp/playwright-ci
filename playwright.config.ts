import { defineConfig } from "@playwright/test";

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

  expect: {
    toHaveScreenshot: {
      /* ← 1% まで許容（必要に応じて微調整） */
      maxDiffPixelRatio: 0.015, // 0.015 = 1.5 %
    },
  },

  /* サーバーを自動起動 */
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
