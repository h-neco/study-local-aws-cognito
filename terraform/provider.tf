provider "aws" {
  region                      = "us-east-1"
  access_key                  = "mock"
  secret_key                  = "mock"
  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3         = "http://127.0.0.1:4566"
    dynamodb   = "http://127.0.0.1:4566"
    cognitoidp = "http://127.0.0.1:5001"
  }
}
