# tmn-todo-240102

> **Status**: 🎨 DESIGNING

## 概要

シンプルで使いやすいToDoリストアプリケーション。タスクの追加、編集、削除、完了マークができます。

## 機能

- [ ] タスク追加
- [ ] タスク編集
- [ ] タスク削除
- [ ] タスク完了マーク
- [ ] タスクリスト表示

## 画面

| パス | 画面名 | 説明 |
|------|--------|------|
| `/` | Home | ToDoリストのメインページ。全タスクを表示し、新規タスク追加ができる |
| `/create` | CreateTask | 新規タスクを作成するページ |

## データ

### Task

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | string | タスクの一意の識別子 |
| title | string | タスクのタイトル |
| description | string | タスクの詳細説明 |
| isCompleted | boolean | タスクの完了状態 |
| createdAt | string | タスク作成日時 |

## 認証

なし

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Database: Vercel KV
- Hosting: Vercel
