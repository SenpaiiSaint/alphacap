"use client";

import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import Link from "next/link";

export default function Dashboard() {
  const { funds, expenses, cards } = useData();

  // Calculate key metrics
  const totalFunds = funds?.length || 0;
  const totalCapital = funds?.reduce((sum, fund) => sum + fund.totalCapital, 0) || 0;
  const activeCards = cards?.filter(card => card.status === 'active').length || 0;
  const pendingExpenses = expenses?.filter(expense => expense.status === 'pending').length || 0;

  const featureSections = [
    {
      title: "Fund & Portfolio Management",
      features: [
        {
          title: "Multi-Entity Budgets",
          description: "Create and track budgets per fund, portfolio company, or department",
          icon: "📊",
          link: "/dashboard/budgets"
        },
        {
          title: "Allocation Management",
          description: "Allocate budget slices to specific deals or SPVs",
          icon: "💰",
          link: "/dashboard/allocations"
        }
      ]
    },
    {
      title: "Policy & Compliance",
      features: [
        {
          title: "Dynamic Spend Policies",
          description: "Define and enforce rules at the card-transaction level",
          icon: "⚖️",
          link: "/dashboard/policies"
        },
        {
          title: "Tiered Approvals",
          description: "Automated approval workflows based on spend criteria",
          icon: "✅",
          link: "/dashboard/approvals"
        }
      ]
    },
    {
      title: "Advanced Analytics",
      features: [
        {
          title: "Interactive Dashboards",
          description: "Drill down by fund, company, category, or time period",
          icon: "📈",
          link: "/dashboard/analytics"
        },
        {
          title: "IRR/MOIC Impact",
          description: "Model how spends affect key KPIs for each deal",
          icon: "📊",
          link: "/dashboard/impact"
        }
      ]
    },
    {
      title: "Cash & Liquidity",
      features: [
        {
          title: "Real-Time Cash Position",
          description: "View available liquidity across funds and SPVs",
          icon: "💵",
          link: "/dashboard/cash"
        },
        {
          title: "Capital Call Tracking",
          description: "Manage LP commitments and distribution waterfalls",
          icon: "📋",
          link: "/dashboard/capital"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-50/90">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Private Equity Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Funds", value: totalFunds, icon: "🏦" },
            { title: "Total Capital", value: `$${totalCapital.toLocaleString()}`, icon: "💰" },
            { title: "Active Cards", value: activeCards, icon: "💳" },
            { title: "Pending Expenses", value: pendingExpenses, icon: "📝" }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Sections */}
        {featureSections.map((section, sectionIndex) => (
          <section key={section.title} className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="text-xl font-semibold text-slate-900 mb-6"
            >
              {section.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.features.map((feature, featureIndex) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (sectionIndex * 2 + featureIndex) * 0.1 }}
                  className="group"
                >
                  <Link
                    href={feature.link}
                    className="block bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-3xl">{feature.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
