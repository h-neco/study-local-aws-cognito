# study-local-aws-cognito

TODO:後で書く

## deploy

```bash
docker compose up -d

cd terraform
terraform init && terraform plan
terraform apply
```

## ユーザー登録

```bash
curl -X POST http://localhost:3000/auth/signup \
 -H "Content-Type: application/json" \
 -d '{"email":"test@example.com","password":"Passw0rd!"}'
```

## メール確認 (ローカルで擬似再現)

```
open http://localhost:8025/
```

## ユーザー承認

```bash
curl -X GET "http://localhost:3000/auth/confirm?email=test2@example.com&code=999999
```

## ログイン

```bash
curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"test@example.com","password":"Passw0rd!"}'
```

## admin にする

```bash
aws cognito-idp admin-update-user-attributes \
 --user-pool-id us-east-idp \
 --username test@example.com \
 --user-attributes Name="custom:role",Value="admin" \
 --endpoint-url http://localhost:5001 \
 --region us-east-1
```

## ユーザー取得

```bash
curl -X GET http://localhost:3000/admin/users \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

## 削除

```bash
curl -X POST http://localhost:3000/admin/delete \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
 -d '{"email":"test2@example.com"}'
```

## logout

```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  -d '{
    "accessToken": "<ADMIN_JWT_TOKEN>"
  }'
```
