# study-local-aws-cognito

Cognito の個人学習用に作成したリポジトリです。
ローカルで検証のみ実施しており、Cognito は moto を利用し、他の AWS サービスは localstack を利用してます。
mail は SES を擬似的に mailhog で再現してます。

```
TODO:
  - API クライアントの抽象化
  - パスワード/emailリセット
  - Refresh Token の対応（バックエンド + フロント）
  - トークン有効判定（API or Lambda@Edge）
  - バックエンドでの Cognito JWT 検証ミドルウェア
  - 管理者権限ルートの保護（フロント＋API 両方）
  - ユーザーの「自分の情報ページ」（プロフィール表示）

  - 管理者用
    - ユーザー一覧取得のページング化
    - ログ一覧ページ作成（API + フロント）

  - フロントエンド
    - UI/UX 調整
```

以下機能の実装

- ユーザー共通

```
サインアップ
ログイン
ログアウト
退会
```

- 管理者のみ

```
ユーザー一覧
管理者権限付与
管理者権限剥奪
ユーザー削除
```

# deploy for local

```bash
docker compose up -d

### infra
cd terraform
terraform init && terraform plan
terraform apply
cd ..

### backend
cd backend
npm run dev &
cd ..

## frontend
cd frontend
npm run dev
```

## メール確認 (ローカルで擬似再現)

```
open http://localhost:8025/
```

## ユーザー作成

```
open http://localhost:5173/
```

## ユーザー admin 作成

初期ユーザーのみ以下 CLI で admin を作成。以後、管理画面にて操作

```bash
aws cognito-idp admin-update-user-attributes \
 --user-pool-id us-east-idp \
 --username test@example.com \
 --user-attributes Name="custom:isAdmin",Value="true" \
 --endpoint-url http://localhost:5001 \
 --region us-east-1
```
