variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where the EKS cluster will be deployed"
  type        = string
}

variable "public_subnets" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "private_subnets" {
  description = "List of private subnet IDs"
  type        = list(string)
}

variable "cluster_version" {
  description = "Kubernetes version for EKS cluster"
  type        = string
  default     = "1.24"
}

variable "node_instance_type" {
  description = "EC2 instance type for EKS worker nodes"
  type        = string
  default     = "t3.large"
}

variable "node_desired_size" {
  description = "Desired number of worker nodes in EKS cluster"
  type        = number
  default     = 2
}

variable "node_max_size" {
  description = "Maximum number of worker nodes in EKS cluster"
  type        = number
  default     = 4
}

variable "node_min_size" {
  description = "Minimum number of worker nodes in EKS cluster"
  type        = number
  default     = 1
} 