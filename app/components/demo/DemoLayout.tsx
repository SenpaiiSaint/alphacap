"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { FiHome, FiPieChart, FiTrendingUp, FiAlertCircle, FiSettings } from "react-icons/fi";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const [activeNav, setActiveNav] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview", icon: FiHome },
    { id: "spend", label: "Spend Analytics", icon: FiPieChart },
    { id: "forecast", label: "Forecast", icon: FiTrendingUp },
    { id: "alerts", label: "Alerts", icon: FiAlertCircle },
    { id: "settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-50/90">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/40 backdrop-blur-md border-b border-slate-200/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-extrabold text-blue-600/90">
              AlphaCap
            </Link>
            <span className="text-xs font-bold text-blue-400/90 bg-blue-50/50 px-2 py-1 rounded-full backdrop-blur-sm">
              DEMO
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600/90">AUM</p>
                <p className="text-lg font-semibold text-blue-600/90">$2.4B</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600/90">YTD Spend</p>
                <p className="text-lg font-semibold text-blue-600/90">$48.2M</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600/90">Efficiency Score</p>
                <p className="text-lg font-semibold text-blue-600/90">92%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white/40 backdrop-blur-md border-r border-slate-200/30">
        <nav className="h-full py-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeNav === item.id
                        ? "bg-blue-50/50 text-blue-600/90"
                        : "text-slate-600/90 hover:bg-blue-50/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
} 