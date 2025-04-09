"use client"

import Link from "next/link";
import { motion } from "framer-motion";

export default function DemoDashboard() {
  const demoFunds = [
    { name: "Blackstone Capital Partners", budget: 500_000_000 },
    { name: "KKR Growth Fund", budget: 750_000_000 },
    { name: "Carlyle Group", budget: 600_000_000 },
  ];

  const demoCards = [
    { user: "Alice Johnson", last4: "1234", limit: 50_000, used: 32_000 },
    { user: "Bob Smith", last4: "5678", limit: 75_000, used: 40_000 },
  ];

  const demoExpenses = [
    { vendor: "Delta Airlines", amount: 850, category: "Travel" },
    { vendor: "Costco Wholesale", amount: 300, category: "Office Supplies" },
    { vendor: "American Express", amount: 1200, category: "Travel" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <motion.h1
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Demo Dashboard
        </motion.h1>
        <motion.p
          className="text-center text-lg text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Explore our demo dashboard to see how our platform streamlines spend management.
        </motion.p>
        <nav className="mt-4 text-center">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          {" | "}
          <Link href="/auth/sign-in" className="text-blue-600 hover:underline">Sign In</Link>
        </nav>
      </header>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Funds Overview</h2>
          {demoFunds.map((fund, index) => (
            <div key={index} className="mb-3 border-b pb-2">
              <p className="font-medium">{fund.name}</p>
              <p className="text-gray-500">Budget: ${fund.budget.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Card Performance</h2>
          {demoCards.map((card, index) => (
            <div key={index} className="mb-3 border-b pb-2">
              <p className="font-medium">{card.user} (•••• {card.last4})</p>
              <p className="text-gray-500">
                Limit: ${card.limit.toLocaleString()} &nbsp; Used: ${card.used.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          {demoExpenses.map((exp, index) => (
            <div key={index} className="mb-3 border-b pb-2">
              <p className="font-medium">{exp.vendor}</p>
              <p className="text-gray-500">
                ${exp.amount} &nbsp; <span className="italic">{exp.category}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Spending Trends Chart (Placeholder) */}
      <motion.section
        className="mt-12 bg-white p-6 rounded shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Spending Trends</h2>
        <div className="h-64 border-2 border-dashed border-gray-300 flex items-center justify-center">
          <p className="text-gray-500">Demo Chart Placeholder</p>
        </div>
      </motion.section>
    </div>
  );
}
