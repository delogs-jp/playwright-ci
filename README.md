# Playwright E2E 体験用サンプル

Next.js (App Router) + shadcn/ui で作った **お問い合わせフォーム** を材料に、  
**Playwright** の **録画（codegen）→ 自動テスト実行** を 5 分で体験できるリポジトリです。

> **関連記事**  
> [はじめての Playwright ─ “録画” で体験する E2E テスト入門](https://delogs.jp/next-js/supplement/playwright-e2e)

---

## 🚀 クイックスタート

```bash
# 1. クローン
git clone https://github.com/your-org/playwright-e2e-sample.git
cd playwright-e2e-sample

# 2. 依存インストール（Playwright はまだ入っていない）
npm install              # または pnpm / yarn

# 3. Playwright を dev 依存に追加
npm i -D @playwright/test

# 4. ブラウザバイナリを取得（初回のみ）
npx playwright install

# 5. 開発サーバー起動
npm run dev              # → http://localhost:3000

# 6. 別ターミナルで録画を開始
npx playwright codegen http://localhost:3000
```

- 右ペイン＝ブラウザ、左ペイン＝自動生成されるテストコード
- 操作後、💾 アイコンで `tests/contact.spec.ts` などに保存
- テスト実行：`npx playwright test`
- レポート：`playwright-report/index.html`

---

## 📁 ディレクトリ構成（抜粋）

```
src/
  app/
    page.tsx            # お問い合わせフォーム（トップページに直置き）
    thanks/page.tsx     # 送信後サンクスページ
components/ui/          # shadcn/ui コンポーネント
tests/                  # ← 録画したテストを入れる
playwright.config.ts    # テスト設定（録画保存時に自動生成）
```

---

## 🛠️ 前提環境

| Tool              | Version (例)            | 備考                  |
| ----------------- | ----------------------- | --------------------- |
| Node.js           | 18 以上                 | 20.x で動作確認       |
| npm / pnpm / yarn | 最新                    | 任意                  |
| OS                | macOS / Windows / Linux | Apple Silicon でも OK |

---

## 🔑 仕組みのポイント

1. **フォームはトップページに直置き** — READMEの手順だけで試せる
2. **Zod + React-Hook-Form** で必須チェック・型バリデーション
3. **shadcn/ui** で見栄えを即確保
4. **Playwright 設定はデフォルト** — 3 ブラウザ（Chromium / Firefox / WebKit）並列実行

---

## 🧪 テスト実行コマンド

```bash
# すべてのブラウザでテスト
npx playwright test

# 失敗ステップをデバッグ
npx playwright test --debug
```

- **HTML レポート**：`playwright-report/index.html`
- **録画リプレイ**：`npx playwright show-report`

---

## ✏️ カスタマイズ例

| やりたいこと                       | 手順概要                                            |
| ---------------------------------- | --------------------------------------------------- |
| CI（GitHub Actions）で自動実行     | `.github/workflows/playwright.yml` を追加           |
| コンポーネントを増やす             | `npx shadcn add textarea` など                      |
| スクリーンショット比較の閾値を変更 | `expect(page).toHaveScreenshot({ threshold: 0.1 })` |

---

## 📜 License

MIT © 2025 DELOGs
