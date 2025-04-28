"use client";

import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useState } from "react";

interface Allocation {
  id: string;
  name: string;
  fundId: string;
  dealId: string;
  amount: number;
  allocatedAmount: number;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "closed";
  category: "deal" | "spv" | "operating";
}

export default function AllocationsPage() {
  const { funds } = useData();
  const [selectedCategory, setSelectedCategory] = useState<"deal" | "spv" | "operating">("deal");
  const [allocations, setAllocations] = useState<Allocation[]>([]);

  // Mock data for demonstration
  const mockAllocations: Allocation[] = [
    {
      id: "1",
      name: "Deal A - Initial Investment",
      fundId: "fund1",
      dealId: "deal1",
      amount: 50000000,
      allocatedAmount: 25000000,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      category: "deal"
    },
    {
      id: "2",
      name: "SPV B - Follow-on",
      fundId: "fund1",
      dealId: "spv1",
      amount: 10000000,
      allocatedAmount: 5000000,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      category: "spv"
    },
    {
      id: "3",
      name: "Operating Budget Q1",
      fundId: "fund1",
      dealId: "ops1",
      amount: 2000000,
      allocatedAmount: 1500000,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "active",
      category: "operating"
    }
  ];

  const categories = [
    { value: "deal", label: "Deals" },
    { value: "spv", label: "SPVs" },
    { value: "operating", label: "Operating" }
  ];

  const filteredAllocations = mockAllocations.filter(allocation => allocation.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-50/90">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Allocation Management</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              New Allocation
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Selector */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value as "deal" | "spv" | "operating")}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  selectedCategory === category.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Allocations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAllocations.map((allocation, index) => (
            <motion.div
              key={allocation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{allocation.name}</h3>
                  <p className="text-sm text-slate-600">
                    {new Date(allocation.startDate).toLocaleDateString()} - {new Date(allocation.endDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  allocation.status === "active" ? "bg-green-100 text-green-800" :
                  allocation.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  "bg-slate-100 text-slate-800"
                }`}>
                  {allocation.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Total Allocation</span>
                    <span>${allocation.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(allocation.allocatedAmount / allocation.amount) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Allocated</span>
                  <span className="font-medium">${allocation.allocatedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Remaining</span>
                  <span className="font-medium">
                    ${(allocation.amount - allocation.allocatedAmount).toLocaleString()}
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