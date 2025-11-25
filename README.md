# study-local-aws-cognito

Cognito の個人学習用に作成したリポジトリです。
ローカルで検証のみ実施しており、Cognito は moto を利用し、他の AWS サービスは localstack を利用してます。
mail は SES を擬似的に mailhog で再現してます。

```
TODO:
  - トークン有効判定（API or Lambda@Edge）
  - バックエンドでの Cognito JWT 検証ミドルウェア
  - 管理者権限ルートの保護（フロント＋API 両方）
  - ユーザーの「自分の情報ページ」（プロフィール表示）
```

- 以下機能の実装

```
http://localhost:5173
```

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

### backend & frontend
./local-start.sh start
./local-start.sh stop
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
aws cognito-idp list-users \
  --user-pool-id $USER_POOL_ID \
  --endpoint-url http://localhost:5001 \
  --region $REGION \
  --query 'Users[].Username' \
  --output text

aws cognito-idp admin-update-user-attributes \
 --user-pool-id us-east-1_25b89f2e1d1445fb9f817bdd7f78a739 \
 --username 5e31e653-38fc-4ce5-af19-e4145dd8c6f4 \
 --user-attributes Name="custom:isAdmin",Value="true" \
 --endpoint-url http://localhost:5001 \
 --region us-east-1
```
