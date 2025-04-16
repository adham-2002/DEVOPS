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

# Security Group for ALB
resource "aws_security_group" "alb_sg" {
  name        = "alb-sg"
  description = "Allow HTTP/HTTPS traffic to ALB"
  vpc_id      = data.aws_vpc.default.id

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

# Security Group for EC2 Instances
resource "aws_security_group" "tf-sg" {
  name        = "kubeshop-sg"
  description = "Allow SSH from anywhere, HTTP/HTTPS only from ALB"
  vpc_id      = data.aws_vpc.default.id

  # Allow SSH from anywhere (adjust as needed)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTP only from the ALB
  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  # Allow HTTPS only from the ALB
  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
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
  count               = var.instance_count
  ami                 = "ami-084568db4383264d4"
  instance_type       = "t2.micro"
  key_name            = data.aws_key_pair.existing.key_name
  subnet_id           = data.aws_subnets.default.ids[0] # pick first subnet
  vpc_security_group_ids = [aws_security_group.tf-sg.id]

  tags = {
    Name = "my_ecommerce_server-${count.index}"
  }
}

# Define ALB 
resource "aws_lb" "ci_cd_pipeline" {
  name               = "ci-cd-pipeline-lb"
  internal           = false
  load_balancer_type = "application"# application or network
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = data.aws_subnets.default.ids

  enable_deletion_protection = false
}

# Target Group for ALB
resource "aws_lb_target_group" "app_tg" {
  name     = "app-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

# Listener for ALB
resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.ci_cd_pipeline.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

# Target Group Attachments for EC2 instances
resource "aws_lb_target_group_attachment" "tg_attachment" {
  count            = var.instance_count
  target_group_arn = aws_lb_target_group.app_tg.arn
  target_id        = aws_instance.kubeshop-tf[count.index].id
  port             = 80
}
