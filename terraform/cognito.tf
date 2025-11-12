resource "aws_cognito_user_pool" "main" {
  name = "${var.env.name}-user-pool"
}

resource "aws_cognito_user_pool_client" "app" {
  name         = "${var.env.name}-app-client"
  user_pool_id = aws_cognito_user_pool.main.id
}
