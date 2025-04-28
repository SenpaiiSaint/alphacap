"use client";

import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useState } from "react";

interface Policy {
  id: string;
  name: string;
  description: string;
  type: "amount" | "category" | "time" | "location";
  condition: string;
  action: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
}

export default function PoliciesPage() {
  const { funds } = useData();
  const [selectedType, setSelectedType] = useState<"amount" | "category" | "time" | "location">("amount");
  const [policies, setPolicies] = useState<Policy[]>([]);

  // Mock data for demonstration
  const mockPolicies: Policy[] = [
    {
      id: "1",
      name: "High-Value Transaction Approval",
      description: "Require CFO approval for transactions over $5,000",
      type: "amount",
      condition: "amount > 5000",
      action: "require_approval",
      status: "active",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "2",
      name: "Travel Category Limit",
      description: "Limit travel expenses to 10% of deal budget",
      type: "category",
      condition: "category = 'travel' AND amount > (budget * 0.1)",
      action: "block_transaction",
      status: "active",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "3",
      name: "After-Hours Transactions",
      description: "Flag transactions outside business hours",
      type: "time",
      condition: "hour < 9 OR hour > 17",
      action: "flag_for_review",
      status: "active",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "4",
      name: "International Transactions",
      description: "Require additional verification for international transactions",
      type: "location",
      condition: "country != 'US'",
      action: "require_verification",
      status: "active",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    }
  ];

  const policyTypes = [
    { value: "amount", label: "Amount-Based" },
    { value: "category", label: "Category-Based" },
    { value: "time", label: "Time-Based" },
    { value: "location", label: "Location-Based" }
  ];

  const filteredPolicies = mockPolicies.filter(policy => policy.type === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-50/90">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Dynamic Spend Policies</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Create New Policy
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Policy Type Selector */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {policyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value as "amount" | "category" | "time" | "location")}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  selectedType === type.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPolicies.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{policy.name}</h3>
                  <p className="text-sm text-slate-600">{policy.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  policy.status === "active" ? "bg-green-100 text-green-800" :
                  policy.status === "draft" ? "bg-yellow-100 text-yellow-800" :
                  "bg-slate-100 text-slate-800"
                }`}>
                  {policy.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Type</span>
                  <span className="font-medium capitalize">{policy.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Condition</span>
                  <span className="font-medium font-mono text-xs">{policy.condition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Action</span>
                  <span className="font-medium capitalize">{policy.action.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Last Updated</span>
                  <span className="font-medium">
                    {new Date(policy.updatedAt).toLocaleDateString()}
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