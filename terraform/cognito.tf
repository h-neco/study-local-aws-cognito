resource "aws_cognito_user_pool" "main" {
  name = "${var.env.name}-user-pool"
  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "custom:isAdmin"
    string_attribute_constraints {
      min_length = 1
      max_length = 5
    }
  }
}

resource "aws_cognito_user_pool_client" "app" {
  name         = "${var.env.name}-app-client"
  user_pool_id = aws_cognito_user_pool.main.id
}
