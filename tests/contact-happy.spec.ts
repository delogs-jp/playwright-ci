import { test, expect } from "@playwright/test";

test("お問い合わせフォーム 正常送信", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("お名前").fill("テスト太郎");
  await page.getByLabel("メールアドレス").fill("taro@example.com");
  await page.getByLabel("お問い合わせ内容").fill("Playwright の動作確認です。");

  await page.locator("#category-trigger").click();
  await page.getByRole("option", { name: "質問" }).click();

  await page.getByRole("button", { name: "送信" }).click();

  await expect(page).toHaveURL(/\/thanks/);
  await expect(
    page.getByRole("heading", { name: "送信ありがとうございました" }),
  ).toBeVisible();
});
