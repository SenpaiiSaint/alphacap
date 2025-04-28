"use client";

import React, { useState } from 'react';
import { 
  FiTrendingUp,
  FiDollarSign,
  FiPieChart,
  FiAlertCircle,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
  FiDownload,
  FiFilter
} from 'react-icons/fi';
import { Card, CardContent } from '../ui/card';
import { Bar, Doughnut } from 'react-chartjs-2';

// Mock data for enhanced overview
const mockMetrics = {
  aum: {
    current: 2500000000,
    target: 3000000000,
    trend: 'up',
    change: 12,
    growth: 8.5
  },
  cashFlow: {
    q1: { inflows: 120, outflows: 80 },
    q2: { inflows: 190, outflows: 120 },
    q3: { inflows: 150, outflows: 100 },
    q4: { inflows: 200, outflows: 150 }
  },
  activeDeals: {
    seed: { count: 5, value: 5000000 },
    seriesA: { count: 8, value: 24000000 },
    seriesB: { count: 12, value: 60000000 },
    growth: { count: 7, value: 140000000 }
  },
  budget: {
    spent: 6500000,
    total: 10000000,
    efficiency: 85,
    categories: {
      management: 40,
      dealFees: 30,
      operations: 20,
      other: 10
    }
  }
};

const DemoDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('12M');

  // Enhanced chart data
  const cashFlowData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Inflows',
      data: Object.values(mockMetrics.cashFlow).map(q => q.inflows),
      backgroundColor: 'rgba(76, 175, 80, 0.8)',
      borderRadius: 4,
      borderWidth: 0
    }, {
      label: 'Outflows',
      data: Object.values(mockMetrics.cashFlow).map(q => q.outflows),
      backgroundColor: 'rgba(255, 107, 107, 0.8)',
      borderRadius: 4,
      borderWidth: 0
    }]
  };

  const activeDealsData = {
    labels: ['Seed', 'Series A', 'Series B', 'Growth'],
    datasets: [{
      data: Object.values(mockMetrics.activeDeals).map(d => d.count),
      backgroundColor: ['rgba(76, 175, 80, 0.8)', 'rgba(255, 142, 83, 0.8)', 'rgba(255, 107, 107, 0.8)', 'rgba(33, 150, 243, 0.8)'],
      borderWidth: 0
    }]
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="pt-24 p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Fund Overview
            </h1>
            <p className="text-gray-400 mt-1">Real-time insights and analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center space-x-2">
              <FiFilter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center space-x-2">
              <FiDownload className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button 
              onClick={handleRefresh}
              className={`p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-2 mb-6">
          {['1M', '3M', '6M', '12M', 'YTD'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setActiveTimeframe(timeframe)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTimeframe === timeframe
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <FiDollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium">AUM</h3>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  mockMetrics.aum.trend === 'up' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {mockMetrics.aum.trend === 'up' ? <FiArrowUp className="inline mr-1" /> : <FiArrowDown className="inline mr-1" />}
                  {mockMetrics.aum.change}%
                </span>
              </div>
              <div className="text-3xl font-bold mb-2">${(mockMetrics.aum.current / 1000000000).toFixed(1)}B</div>
              <div className="space-y-2">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${(mockMetrics.aum.current / mockMetrics.aum.target) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Target: ${(mockMetrics.aum.target / 1000000000).toFixed(1)}B</span>
                  <span className="text-gray-400">Growth: {mockMetrics.aum.growth}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <FiTrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium">Cash Flow</h3>
                </div>
                <span className="text-sm text-gray-400">Last {activeTimeframe}</span>
              </div>
              <div className="h-32 mb-2">
                <Bar
                  data={cashFlowData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context) => `$${context.raw}M`
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: { display: false }
                      },
                      x: {
                        grid: { display: false }
                      }
                    }
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">+${Object.values(mockMetrics.cashFlow).reduce((sum, q) => sum + q.inflows, 0)}M In</span>
                <span className="text-red-400">-${Object.values(mockMetrics.cashFlow).reduce((sum, q) => sum + q.outflows, 0)}M Out</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <FiPieChart className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium">Active Deals</h3>
                </div>
                <span className="text-sm text-gray-400">{Object.values(mockMetrics.activeDeals).reduce((sum, d) => sum + d.count, 0)} Total</span>
              </div>
              <div className="h-32 relative mb-2">
                <Doughnut
                  data={activeDealsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: { legend: { display: false } }
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">${(Object.values(mockMetrics.activeDeals).reduce((sum, d) => sum + d.value, 0) / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-gray-400">Total Value</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(mockMetrics.activeDeals).map(([stage, data]) => (
                  <div key={stage} className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeDealsData.datasets[0].backgroundColor[Object.keys(mockMetrics.activeDeals).indexOf(stage)] }} />
                    <span className="text-gray-400">{stage}</span>
                    <span className="text-white">({data.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <FiAlertCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-medium">Spend vs Budget</h3>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  mockMetrics.budget.efficiency >= 85 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {mockMetrics.budget.efficiency}% Efficient
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${(mockMetrics.budget.spent / mockMetrics.budget.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Spent: ${(mockMetrics.budget.spent / 1000000).toFixed(1)}M</span>
                  <span className="text-gray-400">Total: ${(mockMetrics.budget.total / 1000000).toFixed(1)}M</span>
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(mockMetrics.budget.categories).map(([category, percentage]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">{category}</span>
                    <span className="text-sm font-medium">${(mockMetrics.budget.spent * percentage / 1000000).toFixed(1)}M</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DemoDashboard; 