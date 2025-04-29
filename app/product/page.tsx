"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Portfolio Intelligence",
    description: "AI-driven spend analytics with real-time portfolio visibility and predictive insights.",
    icon: "📊",
    metrics: [
      "98% accuracy in spend forecasting",
      "Real-time fund performance tracking",
      "Automated compliance monitoring",
      "Cross-fund benchmarking"
    ],
    impact: "Reduced operational costs by $2.5M annually"
  },
  {
    title: "Risk & Compliance",
    description: "Enterprise-grade security with automated controls and real-time monitoring.",
    icon: "🛡️",
    metrics: [
      "99.99% system uptime",
      "Sub-second transaction processing",
      "Automated fraud detection",
      "Real-time compliance alerts"
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
      "24/7 system availability"
    ],
    impact: "15% improvement in operational efficiency"
  }
];

export default function ProductPage() {
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
                  className="border-blue-500 text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
                  className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Product Features
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive suite of tools designed to streamline private equity operations and enhance decision-making.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">{feature.description}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Key Metrics</h3>
                      <ul className="space-y-2">
                        {feature.metrics.map((metric) => (
                          <li key={metric} className="flex items-center text-slate-600">
                            <span className="mr-2">•</span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Impact</h3>
                      <p className="text-slate-600">{feature.impact}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button className="w-full">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a demo to see how our product can transform your private equity operations.
          </p>
          <Button size="lg">Schedule a Demo</Button>
        </motion.div>
      </div>
    </div>
  );
} 