'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const generateSpendData = (timeframe: string) => {
  const baseData = {
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      actual: [30000, 35000, 40000, 45000],
      budget: [35000, 35000, 35000, 35000]
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      actual: [120000, 150000, 180000, 160000, 200000, 220000],
      budget: [150000, 150000, 150000, 150000, 150000, 150000]
    },
    quarterly: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      actual: [450000, 540000, 580000, 620000],
      budget: [450000, 450000, 450000, 450000]
    }
  };

  return baseData[timeframe as keyof typeof baseData] || baseData.monthly;
};

const SpendAnalytics = () => {
  const [timeframe, setTimeframe] = useState('monthly');

  const chartData = useMemo(() => {
    const { labels, actual, budget } = generateSpendData(timeframe);
    
    return {
      labels,
      datasets: [
        {
          label: 'Actual Spend',
          data: actual,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Budget',
          data: budget,
          borderColor: 'rgb(16, 185, 129)',
          borderDash: [5, 5],
          tension: 0,
        }
      ]
    };
  }, [timeframe]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: $${(value / 1000).toFixed(1)}k`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${(value / 1000).toFixed(0)}k`
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Spend Analytics</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendAnalytics; 