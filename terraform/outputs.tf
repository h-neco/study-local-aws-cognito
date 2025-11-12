output "aws_cognito_user_pool" {
  value = aws_cognito_user_pool.main.id
}

output "aws_cognito_user_pool_client" {
  value = aws_cognito_user_pool_client.app.id
}
