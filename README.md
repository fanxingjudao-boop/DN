# DN デモUI（通常 / ランサム事故 / 情報窃取 / 委託先起点）

啓蒙活動向けの **安全なデモ画面** です。  
実運用を目的とせず、外部接続・収集エージェント・リモート実行などの危険機能はありません（全部モックデータ）。

## できること

- 画面右上の **シナリオ切替**（4種）
  - Normal（通常運用）
  - Ransomware Incident（暗号化を伴う事故）
  - 情報窃取（静かに進行）
  - 委託先起点（サプライチェーン）
- **横断検索**（インシデント / アラート / 資産 / ナレッジ / プレイブック / 通知文面）
- インシデント詳細：**タイムライン（時間経過）**＋ **プレイブックのチェック**
- ナレッジ：初動優先順位、症状の時間変化、対外文面の叩き台など

> 重要: 本プロジェクトは HashRouter を使用します。URLに `/#/` が付くのは仕様です（GitHub Pagesで404を避けるため）。

## ローカル起動

```powershell
npm install
npm run dev
```

ブラウザで開く:
- http://localhost:5173/#/dashboard

## データの差し替え

デモ内容は JSON を編集するだけで増やせます。

- `src/data/normal/dataset.json`
- `src/data/incident/dataset.json`（ランサム事故）
- `src/data/infostealer/dataset.json`（情報窃取）
- `src/data/vendor/dataset.json`（委託先起点）

検索対象は自動でインデックス化されます。

## GitHub Pages（HTTPS）で公開

1. GitHub に push（main）
2. リポジトリ → Settings → Pages
3. **Build and deployment** → Source を **GitHub Actions** に設定

公開URL例:
- `https://<USER>.github.io/<REPO>/#/dashboard`

## 免責

教育・啓蒙目的のデモです。  
実環境への操作、攻撃再現、脆弱性検証などは行いません。
