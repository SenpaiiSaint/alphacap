output "api_id" {
  description = "The ID of the API Gateway"
  value       = aws_apigatewayv2_api.main.id
}

output "api_endpoint" {
  description = "The endpoint of the API Gateway"
  value       = aws_apigatewayv2_api.main.api_endpoint
}

output "api_execution_arn" {
  description = "The execution ARN of the API Gateway"
  value       = aws_apigatewayv2_api.main.execution_arn
}

output "stage_arn" {
  description = "The ARN of the API Gateway stage"
  value       = aws_apigatewayv2_stage.main.arn
}

output "log_group_arn" {
  description = "The ARN of the CloudWatch log group"
  value       = aws_cloudwatch_log_group.api_gateway.arn
} 