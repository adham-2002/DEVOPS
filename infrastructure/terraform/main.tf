terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.94.1"
    }
  }
}
# define used region and provider
provider "aws" {
    region = var.aws_region
}
# define key pair for EC2 instances
data "aws_key_pair" "existing" {
    key_name   = "kubeshop-key"
    

}
# define security group for EC2 istances 
resource "aws_security_group" "tf-sg"{
    name = "kubeshop-sg23021442"
    description = "Allow SSH and HTTP connction"
    // allow SSH
ingress{
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"] // allow all ips 
}
    // allow Http
ingress{
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"] // allow all ips 
}
    // allow HTTPS
ingress{
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"] // allow all ips 
}
}
// define EC2 instances 
resource "aws_instance" "kubeshop-tf"{
    count = var.instance_count
    ami = "ami-084568db4383264d4"
    instance_type = "t2.micro"
    key_name = data.aws_key_pair.existing.key_name
    security_groups = [aws_security_group.tf-sg.name]
    tags = {
        Name = "my_ecommerce_server-${count.index}"
    }
}