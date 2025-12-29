# tmn-todo-240102

> **Status**: 🎨 DESIGNING

## 概要

シンプルで使いやすいToDoリストアプリケーション。タスクの追加、編集、削除、完了マークができます。

## 機能

- ✅ タスク追加
- ✅ タスク編集
- ✅ タスク削除
- ✅ タスク完了マーク
- ✅ タスクリスト表示

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Vercel KV
- **Hosting**: Vercel
- **Language**: TypeScript

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. 環境変数の設定
```bash
cp .env.example .env.local
```

`.env.local`ファイルを編集し、Vercel KVの設定を追加してください。

3. 開発サーバーの起動
```bash
npm run dev
```

## 環境変数

以下の環境変数が必要です：

```
KV_URL=your_kv_url_here
KV_REST_API_URL=your_kv_rest_api_url_here
KV_REST_API_TOKEN=your_kv_rest_api_token_here
KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token_here
```

Vercelにデプロイする場合は、Vercel KVストレージを作成し、自動的に環境変数が設定されます。

## デプロイ

Vercelにデプロイする最も簡単な方法：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/tmn-todo-240102)

## API エンドポイント

- `GET /api/tasks` - すべてのタスクを取得
- `POST /api/tasks` - 新しいタスクを作成
- `PATCH /api/tasks/[id]` - タスクを更新
- `DELETE /api/tasks/[id]` - タスクを削除

## ライセンス

MIT