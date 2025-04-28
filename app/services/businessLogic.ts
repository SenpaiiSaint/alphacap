import { z } from 'zod';

// Data schemas
export const FundSchema = z.object({
  id: z.string(),
  name: z.string(),
  totalCapital: z.number(),
  deployedCapital: z.number(),
  remainingCapital: z.number(),
  performance: z.number(),
  status: z.enum(['active', 'closed', 'pending']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ExpenseSchema = z.object({
  id: z.string(),
  fundId: z.string(),
  amount: z.number(),
  category: z.enum(['operating', 'investment', 'management', 'other']),
  description: z.string(),
  status: z.enum(['pending', 'approved', 'rejected']),
  date: z.date(),
  attachments: z.array(z.string()).optional(),
});

export const CardSchema = z.object({
  id: z.string(),
  fundId: z.string(),
  cardNumber: z.string(),
  cardHolder: z.string(),
  limit: z.number(),
  balance: z.number(),
  status: z.enum(['active', 'suspended', 'cancelled']),
  type: z.enum(['physical', 'virtual']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Business logic functions
export class BusinessLogicService {
  // Fund management
  static calculateFundMetrics(fund: z.infer<typeof FundSchema>) {
    const utilizationRate = (fund.deployedCapital / fund.totalCapital) * 100;
    const availableCapital = fund.totalCapital - fund.deployedCapital;
    const projectedReturns = this.calculateProjectedReturns(fund);

    return {
      utilizationRate,
      availableCapital,
      projectedReturns,
      riskScore: this.calculateRiskScore(fund),
    };
  }

  static calculateProjectedReturns(fund: z.infer<typeof FundSchema>) {
    // Implement sophisticated return projection algorithm
    const baseReturn = fund.performance;
    const timeFactor = (Date.now() - fund.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365);
    const marketFactor = 1.2; // This would come from market data API
    return baseReturn * timeFactor * marketFactor;
  }

  static calculateRiskScore(fund: z.infer<typeof FundSchema>) {
    // Implement risk scoring algorithm
    const utilizationRisk = (fund.deployedCapital / fund.totalCapital) * 0.4;
    const performanceRisk = (1 - (fund.performance / 100)) * 0.3;
    const timeRisk = 0.3; // This would be calculated based on fund age and market conditions
    return (utilizationRisk + performanceRisk + timeRisk) * 100;
  }

  // Expense management
  static analyzeExpensePatterns(expenses: z.infer<typeof ExpenseSchema>[]) {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const monthlyTrends = this.calculateMonthlyTrends(expenses);
    const anomalyDetection = this.detectAnomalies(expenses);

    return {
      categoryTotals,
      monthlyTrends,
      anomalyDetection,
      recommendations: this.generateExpenseRecommendations(expenses),
    };
  }

  static calculateMonthlyTrends(expenses: z.infer<typeof ExpenseSchema>[]) {
    const monthlyData = expenses.reduce((acc, expense) => {
      const month = expense.date.toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({ month, amount }));
  }

  static detectAnomalies(expenses: z.infer<typeof ExpenseSchema>[]) {
    // Implement anomaly detection algorithm
    const amounts = expenses.map(e => e.amount);
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const stdDev = Math.sqrt(
      amounts.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / amounts.length
    );

    return expenses.filter(expense => {
      const zScore = Math.abs((expense.amount - mean) / stdDev);
      return zScore > 2; // Flag expenses more than 2 standard deviations from mean
    });
  }

  static generateExpenseRecommendations(expenses: z.infer<typeof ExpenseSchema>[]) {
    const recommendations = [];
    const categorySpending = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Analyze spending patterns and generate recommendations
    if (categorySpending.operating > categorySpending.investment * 0.5) {
      recommendations.push({
        type: 'optimization',
        message: 'Consider reallocating some operating expenses to investment opportunities',
        priority: 'medium',
      });
    }

    // Add more sophisticated recommendations based on business rules
    return recommendations;
  }

  // Card management
  static analyzeCardUsage(cards: z.infer<typeof CardSchema>[]) {
    const usageMetrics = cards.map(card => ({
      cardId: card.id,
      utilizationRate: (card.balance / card.limit) * 100,
      spendingPattern: this.analyzeSpendingPattern(card),
      riskScore: this.calculateCardRiskScore(card),
    }));

    return {
      overallMetrics: this.calculateOverallMetrics(usageMetrics),
      individualMetrics: usageMetrics,
      recommendations: this.generateCardRecommendations(usageMetrics),
    };
  }

  static analyzeSpendingPattern(card: z.infer<typeof CardSchema>) {
    // This would be implemented with actual transaction data
    return {
      averageTransaction: 0,
      frequency: 'medium',
      categoryDistribution: {},
    };
  }

  static calculateCardRiskScore(card: z.infer<typeof CardSchema>) {
    const utilizationRisk = (card.balance / card.limit) * 0.4;
    const statusRisk = card.status === 'active' ? 0.2 : 0.6;
    const typeRisk = card.type === 'physical' ? 0.4 : 0.2;
    return (utilizationRisk + statusRisk + typeRisk) * 100;
  }

  static calculateOverallMetrics(metrics: any[]) {
    return {
      averageUtilization: metrics.reduce((a, b) => a + b.utilizationRate, 0) / metrics.length,
      totalRiskScore: metrics.reduce((a, b) => a + b.riskScore, 0) / metrics.length,
      activeCards: metrics.filter(m => m.riskScore < 70).length,
    };
  }

  static generateCardRecommendations(metrics: any[]) {
    return metrics
      .filter(m => m.utilizationRate > 80 || m.riskScore > 70)
      .map(m => ({
        cardId: m.cardId,
        type: m.utilizationRate > 80 ? 'limit' : 'risk',
        message: m.utilizationRate > 80
          ? 'Consider increasing card limit due to high utilization'
          : 'Review card usage due to elevated risk score',
        priority: 'high',
      }));
  }
} 