"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessLogicService } from '../services/businessLogic';
import type { FundSchema, ExpenseSchema, CardSchema } from '../services/businessLogic';

type DataContextType = {
  funds: z.infer<typeof FundSchema>[];
  expenses: z.infer<typeof ExpenseSchema>[];
  cards: z.infer<typeof CardSchema>[];
  fundMetrics: Record<string, any>;
  expenseAnalysis: any;
  cardAnalysis: any;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [funds, setFunds] = useState<z.infer<typeof FundSchema>[]>([]);
  const [expenses, setExpenses] = useState<z.infer<typeof ExpenseSchema>[]>([]);
  const [cards, setCards] = useState<z.infer<typeof CardSchema>[]>([]);
  const [fundMetrics, setFundMetrics] = useState<Record<string, any>>({});
  const [expenseAnalysis, setExpenseAnalysis] = useState<any>(null);
  const [cardAnalysis, setCardAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from API
      const [fundsResponse, expensesResponse, cardsResponse] = await Promise.all([
        fetch('/api/funds'),
        fetch('/api/expenses'),
        fetch('/api/cards'),
      ]);

      if (!fundsResponse.ok || !expensesResponse.ok || !cardsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [fundsData, expensesData, cardsData] = await Promise.all([
        fundsResponse.json(),
        expensesResponse.json(),
        cardsResponse.json(),
      ]);

      setFunds(fundsData);
      setExpenses(expensesData);
      setCards(cardsData);

      // Calculate metrics and analysis
      const metrics = fundsData.reduce((acc: Record<string, any>, fund: z.infer<typeof FundSchema>) => {
        acc[fund.id] = BusinessLogicService.calculateFundMetrics(fund);
        return acc;
      }, {});

      const analysis = {
        expenses: BusinessLogicService.analyzeExpensePatterns(expensesData),
        cards: BusinessLogicService.analyzeCardUsage(cardsData),
      };

      setFundMetrics(metrics);
      setExpenseAnalysis(analysis.expenses);
      setCardAnalysis(analysis.cards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    funds,
    expenses,
    cards,
    fundMetrics,
    expenseAnalysis,
    cardAnalysis,
    loading,
    error,
    refreshData: fetchData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
} 