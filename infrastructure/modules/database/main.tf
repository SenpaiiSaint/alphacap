resource "aws_db_subnet_group" "main" {
  name       = "${var.environment}-db-subnet-group"
  subnet_ids = var.private_subnets

  tags = {
    Name        = "${var.environment}-db-subnet-group"
    Environment = var.environment
  }
}

resource "aws_rds_cluster" "main" {
  cluster_identifier      = "${var.environment}-aurora-cluster"
  engine                 = "aurora-postgresql"
  engine_version         = "14.6"
  database_name          = var.db_name
  master_username        = var.db_username
  master_password        = var.db_password
  vpc_security_group_ids = [aws_security_group.main.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  skip_final_snapshot    = true

  serverlessv2_scaling_configuration {
    min_capacity = 0.5
    max_capacity = 2.0
  }

  tags = {
    Name        = "${var.environment}-aurora-cluster"
    Environment = var.environment
  }
}

resource "aws_rds_cluster_instance" "main" {
  count              = 1
  identifier         = "${var.environment}-aurora-instance-${count.index + 1}"
  cluster_identifier = aws_rds_cluster.main.id
  instance_class     = "db.serverless"
  engine             = aws_rds_cluster.main.engine
  engine_version     = aws_rds_cluster.main.engine_version

  tags = {
    Name        = "${var.environment}-aurora-instance-${count.index + 1}"
    Environment = var.environment
  }
}

resource "aws_security_group" "main" {
  name        = "${var.environment}-aurora-sg"
  description = "Security group for Aurora PostgreSQL"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = var.allowed_security_groups
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.environment}-aurora-sg"
    Environment = var.environment
  }
}

# Outputs
output "endpoint" {
  value = aws_rds_cluster.main.endpoint
}

output "port" {
  value = aws_rds_cluster.main.port
}

output "database_name" {
  value = aws_rds_cluster.main.database_name
}

output "security_group_id" {
  value = aws_security_group.main.id
} 