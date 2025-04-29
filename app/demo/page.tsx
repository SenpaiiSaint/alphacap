'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, BarChart, Bar, LineChart, Line } from 'recharts';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, RefreshCw, Bell, Settings, ChevronDown, ChevronUp, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Clock, DollarSign, BarChart3, LineChart as LineChartIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge } from "@/components/ui";
import { CommandPalette } from "@/components/command-palette"
import { CorrelationChord } from "@/components/correlation-chord"
import { HeatCalendar } from "@/components/heat-calendar"
import { MonteCarloFan } from "@/components/monte-carlo"
import { PriceUpdates } from "@/components/price-updates"
import { ScrollArea } from "@/components/ui/scroll-area"
import { portfolioData, transactions, alerts } from "@/lib/mock-data"
import { useMockAuth } from "@/lib/mock-auth"
import Link from "next/link"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const spendData = [
  { month: 'Jan', actual: 120000, forecast: 125000, budget: 130000, variance: -10000 },
  { month: 'Feb', actual: 150000, forecast: 130000, budget: 130000, variance: 20000 },
  { month: 'Mar', actual: 180000, forecast: 135000, budget: 130000, variance: 50000 },
  { month: 'Apr', actual: 160000, forecast: 140000, budget: 130000, variance: 30000 },
  { month: 'May', actual: 190000, forecast: 145000, budget: 130000, variance: 60000 },
  { month: 'Jun', actual: 220000, forecast: 150000, budget: 130000, variance: 90000 },
];

// Add mock data for product features
const mockProductFeatures = {
  portfolioIntelligence: {
    spendForecasting: 98,
    performanceTracking: 99.5,
    complianceMonitoring: 99.9,
    benchmarking: 95
  },
  riskCompliance: {
    systemUptime: 99.99,
    transactionSpeed: 0.5, // seconds
    fraudDetection: 99.8,
    complianceAlerts: 100
  },
  spendManagement: {
    processReduction: 60,
    transactionSpeed: 40,
    reconciliation: 95,
    availability: 100
  }
};

// Add mock data for solution metrics
const mockSolutionMetrics = {
  emergingManagers: {
    aum: 500,
    funds: 3,
    companies: 10,
    efficiency: 75
  },
  midMarket: {
    aum: 5000,
    funds: 10,
    companies: 30,
    efficiency: 85
  },
  largeFirms: {
    aum: 10000,
    funds: 20,
    companies: 50,
    efficiency: 95
  }
};

// Update the stats array to include product and solution metrics
const stats = [
  { name: 'Total Assets', value: '$10M', change: '+5.2%', trend: 'up', icon: '💰', description: 'Total portfolio value' },
  { name: 'Active Funds', value: '12', change: '+2', trend: 'up', icon: '🏦', description: 'Number of active investments' },
  { name: 'Compliance Score', value: '98%', change: '+2%', trend: 'up', icon: '✅', description: 'Overall compliance rating' },
  { name: 'Risk Level', value: 'Medium', change: '-1', trend: 'down', icon: '⚠️', description: 'Current risk assessment' },
  { name: 'ROI', value: '15.3%', change: '+3.2%', trend: 'up', icon: '📈', description: 'Return on investment' },
  { name: 'Liquidity', value: '$2.5M', change: '+1.2%', trend: 'up', icon: '💧', description: 'Available cash' },
  { name: 'System Uptime', value: '99.99%', change: '+0.01%', trend: 'up', icon: '🔄', description: 'Platform availability' },
  { name: 'Process Automation', value: '60%', change: '+5%', trend: 'up', icon: '⚡', description: 'Automated workflows' },
  { name: 'Compliance Rate', value: '99.9%', change: '+0.1%', trend: 'up', icon: '🛡️', description: 'Regulatory compliance' }
];

// Update the mockAnalytics array to include product features
const mockAnalytics = [
  { name: "Sharpe Ratio", value: 1.8, change: "+0.2", trend: "up" },
  { name: "Sortino Ratio", value: 2.1, change: "+0.3", trend: "up" },
  { name: "Max Drawdown", value: -12.5, change: "-1.5", trend: "down" },
  { name: "Volatility", value: 15.2, change: "-0.8", trend: "down" },
  { name: "Spend Forecasting", value: "98%", change: "+2%", trend: "up" },
  { name: "System Uptime", value: "99.99%", change: "+0.01%", trend: "up" },
  { name: "Process Automation", value: "60%", change: "+5%", trend: "up" },
  { name: "Compliance Rate", value: "99.9%", change: "+0.1%", trend: "up" }
];

const mockTransactions = [
  { id: 1, date: "2024-03-15", type: "Buy", symbol: "AAPL", amount: 5000, price: 175.25 },
  { id: 2, date: "2024-03-14", type: "Sell", symbol: "MSFT", amount: 3000, price: 415.75 },
  { id: 3, date: "2024-03-13", type: "Buy", symbol: "GOOGL", amount: 2000, price: 142.50 },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Add product offerings section
const productOfferings = [
  {
    title: "Portfolio Intelligence Platform",
    description: "AI-driven spend analytics with real-time portfolio visibility and predictive insights.",
    icon: "📊",
    metrics: [
      "98% accuracy in spend forecasting",
      "Real-time fund performance tracking",
      "Automated compliance monitoring",
      "Cross-fund benchmarking",
    ],
    impact: "Reduced operational costs by $2.5M annually"
  },
  {
    title: "Risk & Compliance Engine",
    description: "Enterprise-grade security with automated controls and real-time monitoring.",
    icon: "🛡️",
    metrics: [
      "99.99% system uptime",
      "Sub-second transaction processing",
      "Automated fraud detection",
      "Real-time compliance alerts",
    ],
    impact: "99.9% compliance rate across all funds"
  },
  {
    title: "Smart Spend Management",
    description: "End-to-end automation with intelligent workflows and process optimization.",
    icon: "⚡",
    metrics: [
      "60% reduction in manual processes",
      "40% faster transaction processing",
      "95% automated reconciliation",
      "24/7 system availability",
    ],
    impact: "15% improvement in operational efficiency"
  }
];

// Add solutions section
const solutions = [
  {
    title: "Emerging Managers",
    description: "Streamline operations and scale efficiently with our entry-level solution.",
    features: [
      "Fund-level spend management",
      "Basic compliance monitoring",
      "Standard reporting",
      "Core integrations"
    ],
    metrics: [
      "Up to $500M AUM",
      "1-3 funds",
      "5-10 portfolio companies"
    ]
  },
  {
    title: "Mid-Market Firms",
    description: "Advanced features for growing private equity firms.",
    features: [
      "Multi-fund management",
      "Advanced analytics",
      "Custom workflows",
      "API access"
    ],
    metrics: [
      "$500M - $5B AUM",
      "3-10 funds",
      "10-30 portfolio companies"
    ]
  },
  {
    title: "Large Investment Firms",
    description: "Enterprise-grade solution for global private equity firms.",
    features: [
      "Global operations support",
      "Custom integrations",
      "Dedicated support",
      "Advanced security"
    ],
    metrics: [
      "$5B+ AUM",
      "10+ funds",
      "30+ portfolio companies"
    ]
  }
];

// Update the portfolioData array to include solution-specific metrics
const updatedPortfolioData = [
  {
    name: "Emerging Manager Fund",
    value: 2500000,
    performance: 12.5,
    allocation: 25,
    risk: "Low",
    sector: "Technology",
    solution: "Emerging Managers",
    metrics: mockSolutionMetrics.emergingManagers
  },
  {
    name: "Mid-Market Growth Fund",
    value: 5000000,
    performance: 15.8,
    allocation: 35,
    risk: "Medium",
    sector: "Healthcare",
    solution: "Mid-Market",
    metrics: mockSolutionMetrics.midMarket
  },
  {
    name: "Global Investment Fund",
    value: 10000000,
    performance: 18.2,
    allocation: 40,
    risk: "High",
    sector: "Financial Services",
    solution: "Large Firms",
    metrics: mockSolutionMetrics.largeFirms
  }
];

// Enhanced mock data
const enhancedPortfolioData = [
  {
    name: "Tech Growth Fund",
    value: 2500000,
    performance: 12.5,
    allocation: 25,
    risk: "Low",
    sector: "Technology",
    metrics: {
      sharpeRatio: 1.8,
      sortinoRatio: 2.1,
      maxDrawdown: -12.5,
      volatility: 15.2,
      beta: 1.2,
      alpha: 2.5
    },
    holdings: [
      { name: "AAPL", weight: 15, value: 375000, change: 2.5 },
      { name: "MSFT", weight: 12, value: 300000, change: 1.8 },
      { name: "GOOGL", weight: 10, value: 250000, change: 3.2 }
    ]
  },
  {
    name: "Healthcare Innovation",
    value: 5000000,
    performance: 15.8,
    allocation: 35,
    risk: "Medium",
    sector: "Healthcare",
    metrics: {
      sharpeRatio: 2.1,
      sortinoRatio: 2.5,
      maxDrawdown: -15.2,
      volatility: 18.5,
      beta: 1.5,
      alpha: 3.2
    },
    holdings: [
      { name: "JNJ", weight: 20, value: 1000000, change: 1.5 },
      { name: "PFE", weight: 15, value: 750000, change: -0.8 },
      { name: "UNH", weight: 10, value: 500000, change: 2.1 }
    ]
  },
  {
    name: "Global Opportunities",
    value: 10000000,
    performance: 18.2,
    allocation: 40,
    risk: "High",
    sector: "Financial Services",
    metrics: {
      sharpeRatio: 2.5,
      sortinoRatio: 2.8,
      maxDrawdown: -18.5,
      volatility: 22.1,
      beta: 1.8,
      alpha: 4.2
    },
    holdings: [
      { name: "JPM", weight: 25, value: 2500000, change: 3.5 },
      { name: "BAC", weight: 20, value: 2000000, change: 2.8 },
      { name: "GS", weight: 15, value: 1500000, change: 4.2 }
    ]
  }
];

// Enhanced performance data
const performanceData = [
  { date: '2024-01', portfolio: 100, benchmark: 100, riskFree: 100 },
  { date: '2024-02', portfolio: 105.2, benchmark: 102.5, riskFree: 100.2 },
  { date: '2024-03', portfolio: 108.5, benchmark: 104.8, riskFree: 100.4 },
  { date: '2024-04', portfolio: 112.3, benchmark: 107.2, riskFree: 100.6 },
  { date: '2024-05', portfolio: 115.8, benchmark: 109.5, riskFree: 100.8 },
  { date: '2024-06', portfolio: 118.2, benchmark: 111.8, riskFree: 101.0 }
];

// Enhanced risk metrics
const riskMetrics = [
  { name: "Value at Risk (95%)", value: "-2.5%", change: "-0.3%", trend: "down" },
  { name: "Expected Shortfall", value: "-3.8%", change: "-0.5%", trend: "down" },
  { name: "Tracking Error", value: "4.2%", change: "-0.2%", trend: "down" },
  { name: "Information Ratio", value: "1.8", change: "+0.2", trend: "up" },
  { name: "Beta", value: "1.2", change: "-0.1", trend: "down" },
  { name: "Alpha", value: "2.5%", change: "+0.3%", trend: "up" }
];

// Enhanced sector allocation
const sectorAllocation = [
  { name: "Technology", value: 35, color: "#0088FE" },
  { name: "Healthcare", value: 25, color: "#00C49F" },
  { name: "Financial Services", value: 20, color: "#FFBB28" },
  { name: "Consumer Goods", value: 10, color: "#FF8042" },
  { name: "Energy", value: 5, color: "#8884d8" },
  { name: "Other", value: 5, color: "#82ca9d" }
];

// Enhanced stats with more metrics
const enhancedStats = [
  { name: 'Total Assets', value: '$17.5M', change: '+5.2%', trend: 'up', icon: '💰', description: 'Total portfolio value' },
  { name: 'Active Funds', value: '3', change: '+0', trend: 'neutral', icon: '🏦', description: 'Number of active investments' },
  { name: 'Compliance Score', value: '98%', change: '+2%', trend: 'up', icon: '✅', description: 'Overall compliance rating' },
  { name: 'Risk Level', value: 'Medium', change: '-1', trend: 'down', icon: '⚠️', description: 'Current risk assessment' },
  { name: 'ROI', value: '15.3%', change: '+3.2%', trend: 'up', icon: '📈', description: 'Return on investment' },
  { name: 'Liquidity', value: '$2.5M', change: '+1.2%', trend: 'up', icon: '💧', description: 'Available cash' },
  { name: 'Sharpe Ratio', value: '1.8', change: '+0.2', trend: 'up', icon: '📊', description: 'Risk-adjusted return' },
  { name: 'Beta', value: '1.2', change: '-0.1', trend: 'down', icon: '📉', description: 'Market correlation' },
  { name: 'Alpha', value: '2.5%', change: '+0.3%', trend: 'up', icon: '📈', description: 'Excess return' }
];

export default function DemoDashboard() {
  const { data: session } = useMockAuth();
  const [selectedFund, setSelectedFund] = useState('All Funds');
  const [timeRange, setTimeRange] = useState('1M');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedStats, setExpandedStats] = useState<Record<string, boolean>>({});
  const [realTimeData, setRealTimeData] = useState(enhancedPortfolioData);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prevData => 
        prevData.map(fund => ({
          ...fund,
          value: fund.value * (1 + (Math.random() * 0.02 - 0.01)),
          performance: fund.performance + (Math.random() * 0.4 - 0.2),
          holdings: fund.holdings.map(holding => ({
            ...holding,
            value: holding.value * (1 + (Math.random() * 0.02 - 0.01)),
            change: holding.change + (Math.random() * 0.4 - 0.2)
          }))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleStat = (statName: string) => {
    setExpandedStats(prev => ({
      ...prev,
      [statName]: !prev[statName]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-slate-900">AlphaCap</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Product
                </Link>
                <Link
                  href="/solutions"
                  className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Solutions
                </Link>
                <Link
                  href="/demo"
                  className="border-blue-500 text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Demo
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="ml-4">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Investment Dashboard</h1>
            <p className="text-slate-500 mt-1">Private Equity Portfolio Management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
            </div>
            <Select value={selectedFund} onValueChange={setSelectedFund}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select fund" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Funds">All Funds</SelectItem>
                {realTimeData.map((fund) => (
                  <SelectItem key={fund.name} value={fund.name}>
                    {fund.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1W">1 Week</SelectItem>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <Download size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <Bell size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <Settings size={18} />
            </Button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {enhancedStats.map((stat) => (
                <motion.div key={stat.name} variants={item}>
                  <Card 
                    className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm cursor-pointer"
                    onClick={() => toggleStat(stat.name)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{stat.icon}</span>
                        <CardTitle className="text-sm font-medium text-slate-500">
                          {stat.name}
                        </CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-slate-500'
                        }`}>
                          {stat.change}
                        </span>
                        {expandedStats[stat.name] ? (
                          <ChevronUp size={16} className="text-slate-400" />
                        ) : (
                          <ChevronDown size={16} className="text-slate-400" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      {expandedStats[stat.name] && (
                        <div className="mt-2 text-xs text-slate-500">
                          {stat.description}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area type="monotone" dataKey="portfolio" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Portfolio" />
                        <Area type="monotone" dataKey="benchmark" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Benchmark" />
                        <Area type="monotone" dataKey="riskFree" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} name="Risk-Free" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Sector Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sectorAllocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Metrics */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {riskMetrics.map((metric) => (
                    <div key={metric.name} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">{metric.name}</span>
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                        <span className={`ml-2 text-sm ${
                          metric.trend === "up" ? "text-green-500" : "text-red-500"
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Portfolio Performance</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="1M">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Time Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1W">1 Week</SelectItem>
                          <SelectItem value="1M">1 Month</SelectItem>
                          <SelectItem value="3M">3 Months</SelectItem>
                          <SelectItem value="1Y">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {realTimeData.map((fund) => (
                      <div key={fund.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div>
                          <h3 className="font-semibold">{fund.name}</h3>
                          <p className="text-sm text-slate-500">{fund.sector}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${fund.value.toLocaleString()}</p>
                          <Badge variant={fund.performance > 10 ? "success" : "warning"}>
                            {fund.performance}% ROI
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Risk Analysis</CardTitle>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CorrelationChord />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockAnalytics.map((metric) => (
                <Card key={metric.name}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.name}
                    </CardTitle>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className={`text-xs ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {metric.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Live Price Updates</CardTitle>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search..."
                        className="w-[200px]"
                      />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <PriceUpdates />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Exposure Analysis</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="sector">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="View by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sector">Sector</SelectItem>
                          <SelectItem value="region">Region</SelectItem>
                          <SelectItem value="marketCap">Market Cap</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      realTimeData.reduce((acc, fund) => {
                        fund.holdings.forEach(holding => {
                          if (!acc[fund.sector]) {
                            acc[fund.sector] = 0;
                          }
                          acc[fund.sector] += holding.value;
                        });
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([sector, value]) => (
                      <div key={sector} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{sector}</span>
                          <span className="text-sm font-medium">${value.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${(value / realTimeData.reduce((acc, fund) => 
                              acc + fund.holdings.reduce((sum, holding) => sum + holding.value, 0), 0)) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Fund Performance Comparison</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="1M">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1W">1 Week</SelectItem>
                        <SelectItem value="1M">1 Month</SelectItem>
                        <SelectItem value="3M">3 Months</SelectItem>
                        <SelectItem value="1Y">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {realTimeData.map((fund) => (
                    <div key={fund.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{fund.name}</p>
                          <p className="text-sm text-slate-500">{fund.sector}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${fund.value.toLocaleString()}</p>
                          <p className={`text-sm ${fund.performance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {fund.performance >= 0 ? '+' : ''}{fund.performance}%
                          </p>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            fund.performance >= 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ 
                            width: `${Math.abs(fund.performance) * 5}%`,
                            transform: `scaleX(${fund.performance >= 0 ? 1 : -1})`
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
                        <div>
                          <p>Sharpe Ratio</p>
                          <p className="font-medium">{fund.metrics.sharpeRatio}</p>
                        </div>
                        <div>
                          <p>Volatility</p>
                          <p className="font-medium">{fund.metrics.volatility}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium">{transaction.type} {transaction.symbol}</p>
                          <p className="text-sm text-slate-500">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                          <p className="text-sm text-slate-500">@ ${transaction.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Holdings Breakdown</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="value">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="value">Value</SelectItem>
                          <SelectItem value="weight">Weight</SelectItem>
                          <SelectItem value="change">Change</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {realTimeData.flatMap(fund => 
                        fund.holdings.map(holding => ({
                          ...holding,
                          fundName: fund.name,
                          sector: fund.sector
                        }))
                      ).sort((a, b) => b.value - a.value).map((holding) => (
                        <div key={`${holding.fundName}-${holding.name}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium">{holding.name}</p>
                            <p className="text-sm text-slate-500">{holding.fundName} • {holding.sector}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${holding.value.toLocaleString()}</p>
                            <p className="text-sm text-slate-500">
                              {holding.weight}% • 
                              <span className={holding.change >= 0 ? "text-green-500" : "text-red-500"}>
                                {holding.change >= 0 ? "+" : ""}{holding.change}%
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Asset Correlation Matrix</CardTitle>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Asset</th>
                          {realTimeData.flatMap(fund => fund.holdings).map(holding => (
                            <th key={holding.name} className="text-right p-2">{holding.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {realTimeData.flatMap(fund => fund.holdings).map((holding1) => (
                          <tr key={holding1.name}>
                            <td className="p-2 font-medium">{holding1.name}</td>
                            {realTimeData.flatMap(fund => fund.holdings).map((holding2) => {
                              const correlation = Math.random() * 2 - 1; // Simulated correlation
                              return (
                                <td key={`${holding1.name}-${holding2.name}`} className="text-right p-2">
                                  <span className={`inline-block px-2 py-1 rounded ${
                                    correlation > 0.7 ? "bg-green-100 text-green-800" :
                                    correlation < -0.7 ? "bg-red-100 text-red-800" :
                                    "bg-slate-100 text-slate-800"
                                  }`}>
                                    {correlation.toFixed(2)}
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Transaction History</CardTitle>
                  <div className="flex space-x-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1W">Last Week</SelectItem>
                        <SelectItem value="1M">Last Month</SelectItem>
                        <SelectItem value="3M">Last 3 Months</SelectItem>
                        <SelectItem value="1Y">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Download size={18} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'investment' ? 'bg-blue-100' : 
                          transaction.type === 'expense' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          <span className={`font-semibold ${
                            transaction.type === 'investment' ? 'text-blue-600' : 
                            transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {transaction.type.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-slate-500">{transaction.date}</p>
                            <Badge variant="outline">{transaction.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <Badge variant={transaction.status === 'completed' ? 'success' : 'warning'}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={spendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="actual" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="forecast" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Exposure Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {riskMetrics.map((metric) => (
                      <div key={metric.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <span className="text-sm font-medium">{metric.value}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              metric.trend === "up" ? "bg-green-500" : "bg-red-500"
                            }`}
                            style={{ 
                              width: `${Math.abs(parseFloat(metric.value)) * 10}%`,
                              transform: `scaleX(${metric.trend === "up" ? 1 : -1})`
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Last Month</span>
                          <span>{metric.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Portfolio Attribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={realTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="performance" fill="#8884d8" name="Performance" />
                        <Bar dataKey="allocation" fill="#82ca9d" name="Allocation" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <CommandPalette />
        </Tabs>
      </div>
    </div>
  );
} 