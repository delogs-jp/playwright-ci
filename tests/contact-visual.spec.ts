import { test, expect } from "@playwright/test";

test("お問い合わせフォームのレイアウト", async ({ page }) => {
  await page.goto("/");
  await page.setViewportSize({ width: 1280, height: 720 });

  await expect(page).toHaveScreenshot("contact-baseline.png", {
    threshold: 0.01, // 許容差分 1%
  });
});
