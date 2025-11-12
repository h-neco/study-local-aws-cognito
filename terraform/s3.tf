resource "aws_s3_bucket" "frontend" {
  bucket = "${var.env.name}-frontend-bucket"
}
