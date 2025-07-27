# Playwright E2E × GitHub Actions Demo

[![DELOGs 記事へ](https://img.shields.io/badge/DELOGs-記事はこちら-1e90ff?logo=githubpages)](https://delogs.jp/next-js/supplement/playwright-ci)

記事「[CI で E2E を回す](https://delogs.jp/next-js/supplement/playwright-ci)」の実践結果のリポジトリです。

---

## 📦 Tech Stack

| Tool / Lib               | Version | Purpose                          |
| ------------------------ | :-----: | -------------------------------- |
| **Next.js**              |  15.x   | サンプルフォーム（お問い合わせ） |
| **TypeScript**           |   5.x   | 型安全                           |
| **Playwright Test**      | 1.54.x  | E2E テスト                       |
| **shadcn/ui + Tailwind** | latest  | UI コンポーネント                |
| **GitHub Actions**       |    —    | CI / HTML レポート保存           |

---

## ✨ できること

- `npx playwright codegen` で **ブラウザ操作を録画 → テスト自動生成**
- `npx playwright test` で
  - **スクリーンショット差分** によるレイアウト崩れ検知
  - **フォーム送信** の正常動作テスト
- Push / PR ごとに GitHub Actions が
  1. Next.js をポート **3010** で自動起動
  2. Playwright ブラウザをダウンロード & キャッシュ
  3. テスト実行 → **HTML レポート** をアーティファクトに添付
- ブランチ保護ルールで **緑 ✓ 以外は main にマージ不可**

---

## 🚀 クイックスタート

### 1. セットアップ

```bash
git clone https://github.com/delogs-jp/playwright-ci.git
cd playwright-ci

# 依存ライブラリ
npm install

# Playwright ブラウザバイナリ
npx playwright install --with-deps
```

### 2. ローカルサーバー & テスト

```bash
# 開発サーバーは自動起動されるので不要
# そのままテスト実行
npx playwright test --reporter=html
npx playwright show-report  # レポートをブラウザで確認
```

> **初回だけ** ベースライン画像を生成する必要があります  
> （スクリーンショット差分テスト用）

```bash
npx playwright test tests/contact-visual.spec.ts --update-snapshots
```

### 3. GitHub Actions CI

1. リポジトリを GitHub にプッシュ
2. `.github/workflows/playwright.yml` が自動で実行
3. **Actions タブ → 実行 → Artifacts → `playwright-report`** で  
   失敗したステップのスクショ / Diff を参照できます

---

## 📂 主要ファイル

```
.
├─ .github/workflows/playwright.yml      # CI 定義
├─ playwright.config.ts                  # webServer & スナップショット設定
├─ tests/
│  ├─ contact-happy.spec.ts              # フォーム正常系
│  └─ contact-visual.spec.ts             # レイアウト差分チェック
└─ src/                                  # Next.js サンプルアプリ
```

## 📜 ライセンス

MIT

> サンプルのコード・記事内容はご自由に利用 / 改変ください  
> （引用時はリンクいただけるとうれしいです 🙌）

---

### 🙏 Credits / Author

- **DELOGs** – <https://delogs.jp>  
  技術ブログ × Web サービスで “届ける” 技術を探求中
- Twitter / X: [@DELOGs2506](https://x.com/DELOGs2506)
