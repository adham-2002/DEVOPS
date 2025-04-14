
# infrastructure/terraform/outputs.tf
output "instance_ips" {
  value = join(",",aws_instance.kubeshop-tf[*].public_ip)
}