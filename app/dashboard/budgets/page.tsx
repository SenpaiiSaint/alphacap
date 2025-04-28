"use client";

import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useState } from "react";

interface Budget {
  id: string;
  name: string;
  entityType: "fund" | "portfolio" | "department";
  totalAmount: number;
  allocatedAmount: number;
  startDate: string;
  endDate: string;
  status: "active" | "draft" | "closed";
}

export default function BudgetsPage() {
  const { funds } = useData();
  const [selectedEntityType, setSelectedEntityType] = useState<"fund" | "portfolio" | "department">("fund");
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Mock data for demonstration
  const mockBudgets: Budget[] = [
    {
      id: "1",
      name: "Fund I - 2024",
      entityType: "fund",
      totalAmount: 100000000,
      allocatedAmount: 75000000,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active"
    },
    {
      id: "2",
      name: "Portfolio Company A",
      entityType: "portfolio",
      totalAmount: 5000000,
      allocatedAmount: 3000000,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active"
    },
    {
      id: "3",
      name: "Operations Department",
      entityType: "department",
      totalAmount: 2000000,
      allocatedAmount: 1500000,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active"
    }
  ];

  const entityTypes = [
    { value: "fund", label: "Funds" },
    { value: "portfolio", label: "Portfolio Companies" },
    { value: "department", label: "Departments" }
  ];

  const filteredBudgets = mockBudgets.filter(budget => budget.entityType === selectedEntityType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-50/90">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Multi-Entity Budgets</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Create New Budget
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Entity Type Selector */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {entityTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedEntityType(type.value as "fund" | "portfolio" | "department")}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  selectedEntityType === type.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBudgets.map((budget, index) => (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{budget.name}</h3>
                  <p className="text-sm text-slate-600">
                    {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  budget.status === "active" ? "bg-green-100 text-green-800" :
                  budget.status === "draft" ? "bg-yellow-100 text-yellow-800" :
                  "bg-slate-100 text-slate-800"
                }`}>
                  {budget.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Total Budget</span>
                    <span>${budget.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(budget.allocatedAmount / budget.totalAmount) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Allocated</span>
                  <span className="font-medium">${budget.allocatedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Remaining</span>
                  <span className="font-medium">
                    ${(budget.totalAmount - budget.allocatedAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm text-slate-600 hover:text-slate-900">
                  View Details
                </button>
                <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
} 