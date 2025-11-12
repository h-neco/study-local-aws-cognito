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

curl -X POST http://localhost:3000/auth/signup \
 -H "Content-Type: application/json" \
 -d '{"email":"test@example.com","password":"Passw0rd!"}'

## 承認確認

aws cognito-idp list-users \
 --user-pool-id us-east-1_f8f3eebbf20f40dda572a18965310902 \
 --endpoint-url http://localhost:5001 \
 --region us-east-1
