export const portfolioData = [
  { name: 'Fund A', value: 5000000, performance: 12.5, allocation: 35, risk: 'Medium', sector: 'Technology' },
  { name: 'Fund B', value: 3000000, performance: 8.2, allocation: 25, risk: 'Low', sector: 'Healthcare' },
  { name: 'Fund C', value: 2000000, performance: 15.7, allocation: 20, risk: 'High', sector: 'Finance' },
  { name: 'Fund D', value: 1000000, performance: 5.3, allocation: 10, risk: 'Medium', sector: 'Real Estate' },
  { name: 'Fund E', value: 500000, performance: 9.8, allocation: 10, risk: 'Low', sector: 'Consumer' },
];

export const transactions = [
  { id: 1, description: 'Investment in TechCo', amount: 250000, date: '2024-03-15', status: 'completed', type: 'investment', category: 'Technology' },
  { id: 2, description: 'Monthly Operations', amount: -75000, date: '2024-03-14', status: 'completed', type: 'expense', category: 'Operations' },
  { id: 3, description: 'Fund B Capital Call', amount: 500000, date: '2024-03-13', status: 'pending', type: 'capital', category: 'Capital' },
  { id: 4, description: 'Legal Fees', amount: -25000, date: '2024-03-12', status: 'completed', type: 'expense', category: 'Legal' },
  { id: 5, description: 'Investment in HealthCorp', amount: 350000, date: '2024-03-11', status: 'completed', type: 'investment', category: 'Healthcare' },
];

export const alerts = [
  { id: 1, message: 'Unusual spending pattern detected in Fund A', date: '2024-03-15', severity: 'high', category: 'Spending' },
  { id: 2, message: 'Pending approval for large transaction', date: '2024-03-14', severity: 'medium', category: 'Approval' },
  { id: 3, message: 'Monthly compliance check due', date: '2024-03-13', severity: 'low', category: 'Compliance' },
  { id: 4, message: 'Risk assessment update required', date: '2024-03-12', severity: 'medium', category: 'Risk' },
]; 