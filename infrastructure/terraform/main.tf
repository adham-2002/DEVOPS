terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.94.1"
    }
  }
}

# Define AWS provider
provider "aws" {
  region = var.aws_region
}

# Get existing key pair
data "aws_key_pair" "existing" {
  key_name = "kubeshop-key"
}

# Get the default VPC
data "aws_vpc" "default" {
  default = true
}

# Get subnets in the default VPC
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Define security group
resource "aws_security_group" "tf-sg" {
  name        = "kubeshop-sg20424"
  description = "Allow SSH and HTTP/HTTPS connections"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Define EC2 instances
resource "aws_instance" "kubeshop-tf" {
  count         = var.instance_count
  ami           = "ami-084568db4383264d4"
  instance_type = "t2.micro"
  key_name      = data.aws_key_pair.existing.key_name
  subnet_id     = data.aws_subnets.default.ids[0] # pick first subnet
  vpc_security_group_ids = [aws_security_group.tf-sg.id]

  tags = {
    Name = "my_ecommerce_server-${count.index}"
  }
}
