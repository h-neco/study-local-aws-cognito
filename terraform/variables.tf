variable "env" {
  description = "Environment configuration"
  type = object({
    name = string
  })
  default = {
    name = "local"
  }
}
