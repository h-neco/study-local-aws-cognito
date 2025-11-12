resource "aws_dynamodb_table" "user_table" {
  name         = "${var.env.name}UserTable"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "user_id"

  attribute {
    name = "user_id"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }
}

#resource "aws_dynamodb_table" "session_table" {
#  name         = "${var.local.env}SessionTable"
#  billing_mode = "PAY_PER_REQUEST"
#  hash_key     = "session_id"
#
#  attribute {
#    name = "session_id"
#    type = "S"
#  }
#}
