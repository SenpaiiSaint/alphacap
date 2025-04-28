terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  backend "s3" {
    bucket = "alphacap-terraform-state"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
module "vpc" {
  source = "./modules/vpc"

  environment = var.environment
  vpc_cidr    = var.vpc_cidr
}

# RDS Aurora PostgreSQL
module "database" {
  source = "./modules/database"

  environment     = var.environment
  vpc_id         = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  db_name        = var.db_name
  db_username    = var.db_username
  db_password    = var.db_password
}

# EKS Cluster
module "eks" {
  source = "./modules/eks"

  environment     = var.environment
  vpc_id         = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  public_subnets  = module.vpc.public_subnets
}

# API Gateway and Lambda Functions
module "api" {
  source = "./modules/api"

  environment = var.environment
  vpc_id     = module.vpc.vpc_id
}

# S3 Buckets
module "storage" {
  source = "./modules/storage"

  environment = var.environment
}

# Redis Cache
module "cache" {
  source = "./modules/cache"

  environment     = var.environment
  vpc_id         = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
}

# Event Bus and Kinesis
module "events" {
  source = "./modules/events"

  environment = var.environment
}

# Monitoring and Logging
module "monitoring" {
  source = "./modules/monitoring"

  environment = var.environment
}

# Authentication
module "auth" {
  source = "./modules/auth"

  environment = var.environment
  domain     = var.domain
}

# Outputs
output "vpc_id" {
  value = module.vpc.vpc_id
}

output "database_endpoint" {
  value = module.database.endpoint
}

output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "api_gateway_url" {
  value = module.api.api_gateway_url
}

output "s3_bucket_name" {
  value = module.storage.bucket_name
}

output "redis_endpoint" {
  value = module.cache.endpoint
}

output "cognito_user_pool_id" {
  value = module.auth.user_pool_id
} 